
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import StartProjectModal from '../ui/StartProjectModal';
import { supabaseClient as supabase } from '../../config/supabase';
// 1. Import Leaflet Components and CSS
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// 2. Dummy locations to act as "Live Signals" (Focused around Sudan & Middle East)
const activeSignals = [
  { id: 1, lat: 15.5007, lng: 32.5599, city: "Khartoum, SD", users: 342 },
  { id: 2, lat: 24.7136, lng: 46.6753, city: "Riyadh, SA", users: 512 },
  { id: 3, lat: 25.2048, lng: 55.2708, city: "Dubai, AE", users: 128 },
  { id: 4, lat: 30.0444, lng: 31.2357, city: "Cairo, EG", users: 245 },
];

export default function LiveDashboard() {
  const { isAr } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
	const logVisitAndFetchCount = async () => {
	  try {
		await supabase.from('operix_sudan_visitor_logs').insert([{}]);
		const { count, error } = await supabase
		  .from('operix_sudan_visitor_logs')
		  .select('*', { count: 'exact', head: true });

		if (!error && count !== null) {
		  setVisitors(count);
		}
	  } catch (err) {
		console.error("Failed to connect to visitor logs:", err);
	  }
	};

	logVisitAndFetchCount();

	const subscription = supabase
	  .channel('public:operix_sudan_visitor_logs')
	  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'operix_sudan_visitor_logs' }, () => {
		setVisitors((current) => current + 1);
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
			
			{/* Real Interactive Leaflet Map */}
			{/* Note: The z-index is set to z-0 so it doesn't overlap your fixed Header */}
			<div className="w-full flex-grow min-h-[350px] rounded-lg border border-vercel-border overflow-hidden relative z-0">
			  <MapContainer 
				center={[20.0, 40.0]} // Centered between Sudan and Saudi Arabia
				zoom={4} 
				scrollWheelZoom={false} // Prevents page scrolling issues
				style={{ height: '100%', width: '100%', backgroundColor: '#000000' }}
			  >
				{/* Dark Mode Tiles */}
				<TileLayer
				  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
				  attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
				/>
				
				{/* Rendering the Signals */}
				{activeSignals.map((signal) => (
				  <CircleMarker 
					key={signal.id}
					center={[signal.lat, signal.lng]}
					radius={8}
					pathOptions={{ 
					  color: '#d4af37', // brand-gold
					  fillColor: '#d4af37', 
					  fillOpacity: 0.6,
					  weight: 2
					}}
				  >
					<Popup className="bg-vercel-surface text-vercel-text border-vercel-border">
					  <div className="text-center font-sans">
						<strong className="block text-brand-gold text-sm mb-1">{signal.city}</strong>
						<span className="text-xs text-gray-500">Active Sessions: {signal.users}</span>
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