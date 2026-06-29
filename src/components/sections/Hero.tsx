import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardCheck, HeartHandshake, Code2, ArrowUpLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import StartProjectModal from '../ui/StartProjectModal';

// Import the background image
import bgImage from '../../assets/ss.png';

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAr } = useLanguage();

  return (
	<>
	  <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-vercel-bg pt-20 transition-colors duration-500">
		
		{/* Background Image Setup (Optimized for Mobile & Desktop) */}
		<div className="absolute inset-0 w-full h-full z-0">
		  <img 
			src={bgImage} 
			alt="OPERIX Sudan Future" 
			className="w-full h-full object-cover object-[75%_center] md:object-center opacity-90"
		  />
		  {/* Gradient Overlay to ensure text readability */}
		  <div className="absolute inset-0 bg-gradient-to-r from-vercel-bg via-vercel-bg/80 to-vercel-bg/20 transition-colors duration-500"></div>
		</div>
	
		<div className="mt-8 flex items-center gap-4">
		  <a href="https://www.operix-solutions.com" className="text-brand-gold font-bold underline underline-offset-4 decoration-brand-gold/50">
			{isAr ? "زيارة الموقع الرئيسي OPERIX Solutions" : "Visit Main OPERIX Solutions Site"}
		  </a>
		</div>

		<div className="max-w-[1400px] mx-auto w-full px-6 md:px-16 z-10 flex flex-col flex-grow justify-center py-20">
		  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
			
			<motion.div 
			  initial={{ opacity: 0, y: 30 }}
			  animate={{ opacity: 1, y: 0 }}
			  transition={{ duration: 0.8, ease: "easeOut" }}
			  className="lg:col-span-8 flex flex-col"
			>
			  <div className="flex items-center gap-3 mb-6">
				<div className="w-[3px] h-6 bg-brand-amber rounded-full"></div>
				<span className="text-brand-yellow font-bold text-sm tracking-wide uppercase drop-shadow-md">
				  {isAr ? "من قلب السودان، نبني المستقبل" : "From the Heart of Sudan, Building the Future"}
				</span>
			  </div>

			  <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-vercel-base leading-[1.2] mb-6 font-serif transition-colors duration-500">
				{isAr ? (
				  <>وسط التحديات، نكون <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-amber">سندك التقني</span></>
				) : (
				  <>Amidst Challenges, We Are Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-amber">Technical Backbone</span></>
				)}
			  </h1>
			  
			  <p className="text-vercel-muted text-lg md:text-xl mb-10 max-w-2xl leading-relaxed font-medium transition-colors duration-500">
				{isAr 
				  ? "نحن نفهم تماماً ما تمر به أعمالك. في أوبيركس ٢٤٩، نحن لسنا مجرد شركة برمجيات، بل إخوة وشركاء نجاح. نصمم أنظمة تحمي بياناتك، وتسهل إدارتك، لتعود أقوى مما كنت."
				  : "We deeply understand what your business is going through. At OPERIX 249, we aren't just a software company; we are partners in your success. We design systems that protect your data and simplify your management, so you can return stronger than ever."}
			  </p>

			  <div className="flex flex-wrap items-center gap-4">
				<button 
				  onClick={() => setIsModalOpen(true)}
				  className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-yellow to-brand-amber text-black font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 group shadow-[0_0_30px_rgba(234,179,8,0.2)]"
				>
				  <span>{isAr ? "ابدأ رحلة التعافي معنا" : "Start Your Recovery Journey"}</span>
				  <ArrowUpLeft className="w-5 h-5 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
				</button>
			  </div>
			</motion.div>
		  </div>
		</div>

		{/* Stats Bar */}
		<motion.div 
		  initial={{ opacity: 0, y: 20 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.8, delay: 0.3 }}
		  className="w-full bg-vercel-bg pt-10 pb-6 z-10 border-t border-vercel-border transition-colors duration-500"
		>
		  <div className="max-w-[1400px] mx-auto px-6 md:px-16">
			<div className="bg-vercel-surface border border-vercel-border rounded-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 items-center shadow-2xl transition-colors duration-500">
			  {[
				{ icon: ClipboardCheck, val: "43+", title: isAr ? "إجمالي المشروعات الرقمية" : "Total Digital Projects" },
				{ icon: Code2, val: "5+", title: isAr ? "منظومات OPERIX الأساسية" : "Core OPERIX Systems" },
				{ icon: Users, val: "3", title: isAr ? "شركاء استراتيجيين" : "Strategic Partners" },
				{ icon: HeartHandshake, val: "99.9%", title: isAr ? "معدل استقرار الأداء التشغيلي" : "Operational Uptime" }
			  ].map((stat, i) => (
				<div key={i} className="flex items-center gap-3">
				  <div className="p-3 bg-vercel-bg border border-vercel-border rounded-lg shadow-sm flex items-center justify-center transition-colors duration-500">
					<stat.icon className="w-5 h-5 text-brand-yellow" />
				  </div>
				  <div>
					<h4 className="text-xl font-bold text-vercel-surface-text tracking-tight transition-colors duration-500">{stat.val}</h4>
					<p className="text-xs text-vercel-muted font-medium transition-colors duration-500">{stat.title}</p>
				  </div>
				</div>
			  ))}
			</div>
		  </div>
		</motion.div>
	  </section>

	  <StartProjectModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
	</>
  );
}