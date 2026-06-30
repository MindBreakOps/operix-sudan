import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import StartProjectModal from '../ui/StartProjectModal';
import { supabaseClient as supabase } from '../../config/supabase';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function LiveDashboard() {
  const { isAr } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [visitors, setVisitors] = useState(0);
  const [activeSignals, setActiveSignals] = useState<any[]>([]);

  useEffect(() => {
	const logVisitAndFetchData = async () => {
	  try {
		// 1. Get the user's real geographic location using a CORS-friendly API
		const geoResponse = await fetch('https://ipwho.is/');
		const geoData = await geoResponse.json();
	
		// 2. Insert the real data into Supabase
		if (geoData.success && geoData.ip) {
		  await supabase.from('operix_sudan_visitor_logs').insert([{
			ip_address: geoData.ip,
			ip_country: geoData.country, // Updated to match ipwho.is response
			city: geoData.city,
			lat: geoData.latitude,
			lng: geoData.longitude
		  }]);
		}
	
		// 3. Fetch the total count for the indicator
		const { count } = await supabase
		  .from('operix_sudan_visitor_logs')
		  .select('*', { count: 'exact', head: true });
	
		if (count !== null) setVisitors(count);
	
		// 4. Fetch the latest distinct locations for the map
		const { data: locations } = await supabase
		  .from('operix_sudan_visitor_logs')
		  .select('city, lat, lng, ip_country')
		  .not('lat', 'is', null)
		  .order('visited_at', { ascending: false })
		  .limit(50); 
	
		if (locations) setActiveSignals(locations);
	
	  } catch (err) {
		console.error("Failed to sync live data:", err);
	  }
	};

	logVisitAndFetchData();

	// 5. Listen for new visitors hitting the site live
	const subscription = supabase
	  .channel('public:operix_sudan_visitor_logs')
	  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'operix_sudan_visitor_logs' }, (payload) => {
		setVisitors((current) => current + 1);
		// Add the new ping to the map dynamically
		if (payload.new.lat && payload.new.lng) {
		  setActiveSignals((prev) => [payload.new, ...prev].slice(0, 50));
		}
	  })
	  .subscribe();

	return () => {
	  supabase.removeChannel(subscription);
	};
  }, []);

  return (
	<>
	  <section className="max-w-7xl mx-auto px-6 py-20">
		<div className="grid lg:grid-cols-2 gap-8">
		  
		  {/* Signal Map Area */}
		  <div className="bg-vercel-surface border border-vercel-border p-6 rounded-2xl shadow-xl flex flex-col">
			<div className="flex justify-between mb-4">
			  <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs">
				{isAr ? "خريطة الإشارات الحية" : "LIVE SIGNAL MAP"}
			  </h3>
			  <div className="flex gap-2">
				<span className="text-[10px] bg-vercel-bg px-2 py-1 rounded text-white border border-vercel-border font-mono transition-all">
				  TOTAL LOGS: {visitors.toLocaleString()}
				</span>
				<span className="text-[10px] bg-vercel-bg px-2 py-1 rounded text-white border border-vercel-border font-mono transition-all text-emerald-400">
				  REAL-TIME SYNC
				</span>
			  </div>
			</div>
			
			<div className="w-full flex-grow min-h-[350px] rounded-lg border border-vercel-border overflow-hidden relative z-0">
			  <MapContainer 
				center={[20.0, 40.0]} 
				zoom={4} 
				scrollWheelZoom={false}
				style={{ height: '100%', width: '100%', backgroundColor: '#000000' }}
			  >
				<TileLayer
				  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
				  attribution='&copy; CartoDB'
				/>
				
				{activeSignals.map((signal, idx) => (
				  <CircleMarker 
					key={idx}
					center={[signal.lat, signal.lng]}
					radius={6}
					pathOptions={{ 
					  color: '#d4af37', 
					  fillColor: '#d4af37', 
					  fillOpacity: 0.6,
					  weight: 2
					}}
				  >
					<Popup className="bg-vercel-surface text-vercel-text border-vercel-border">
					  <div className="text-center font-sans">
						<strong className="block text-brand-gold text-sm mb-1">{signal.city || 'Unknown Region'}</strong>
						<span className="text-xs text-gray-500">{signal.ip_country}</span>
					  </div>
					</Popup>
				  </CircleMarker>
				))}
			  </MapContainer>
			</div>
		  </div>

		  {/* Hero Info & Buttons */}
		  <div className="flex flex-col justify-center">
			<span className="text-brand-gold font-black text-xs uppercase tracking-[0.2em] mb-4">
			  {isAr ? "البنية التحتية التشغيلية من الجيل القادم" : "NEXT-GEN OPERATIONAL INFRASTRUCTURE"}
			</span>
			<h2 className="text-4xl md:text-5xl font-black mb-6 text-vercel-text leading-tight">
			  {isAr ? "تمكين المؤسسات باستخدام " : "Empowering Enterprises with "}
			  <br className="hidden md:block"/>
			  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-gold drop-shadow-sm">OPERIX Solutions</span>
			</h2>
			<p className="text-vercel-muted mb-8 font-medium leading-relaxed max-w-lg">
			  {isAr 
				? "نحن لا نبني أنظمة ذكية فحسب. بل ننشر كوادر خبيرة لتشغيل منشآتك، وشبكات المواقف، والفعاليات الضخمة بكفاءة ميدانية." 
				: "We don't just build intelligent systems. We deploy expert personnel to run your facilities, parking grids, and large-scale events flawlessly on the ground."}
			</p>
			<div className="flex flex-wrap gap-4">
			  <button 
				onClick={() => setIsModalOpen(true)} 
				className="bg-brand-gold text-black font-bold px-8 py-3 rounded-lg hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
			  >
				{isAr ? "جدولة عرض توضيحي" : "SCHEDULE A DEMO →"}
			  </button>
			  
			  <a 
				href="https://www.operix-solutions.com" 
				target="_blank"
				rel="noreferrer"
				className="border border-vercel-border text-vercel-text font-bold px-8 py-3 rounded-lg hover:bg-vercel-border/50 transition-all"
			  >
				{isAr ? "اعرف المزيد" : "LEARN MORE"}
			  </a>
			</div>
		  </div>
		</div>
	  </section>

	  <StartProjectModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
	</>
  );
}