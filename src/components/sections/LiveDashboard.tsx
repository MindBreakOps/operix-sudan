import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function LiveDashboard() {
  const { isAr } = useLanguage();
  return (
	<section className="max-w-7xl mx-auto px-6 py-20">
	  <div className="grid lg:grid-cols-2 gap-8">
		{/* Signal Map */}
		<div className="bg-vercel-surface border border-vercel-border p-6 rounded-2xl shadow-xl">
		  <div className="flex justify-between mb-4">
			<h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs">{isAr ? "خريطة الإشارات الحية" : "LIVE SIGNAL MAP"}</h3>
			<div className="flex gap-2">
			  <span className="text-[10px] bg-vercel-bg px-2 py-1 rounded text-white border border-vercel-border">VISITORS: 1,331</span>
			  <span className="text-[10px] bg-vercel-bg px-2 py-1 rounded text-white border border-vercel-border">HITS: 1,331</span>
			</div>
		  </div>
		  <div className="w-full h-64 bg-vercel-bg/50 rounded-lg border border-vercel-border flex items-center justify-center">
			<span className="text-vercel-muted text-xs font-mono">[ World Map Rendering... ]</span>
		  </div>
		</div>

		{/* Hero Info & Buttons */}
		<div className="flex flex-col justify-center">
		  <span className="text-brand-gold font-black text-xs uppercase tracking-[0.2em] mb-4">
			{isAr ? "البنية التحتية التشغيلية من الجيل القادم" : "NEXT-GEN OPERATIONAL INFRASTRUCTURE"}
		  </span>
		  <h2 className="text-4xl md:text-5xl font-black mb-6 text-vercel-text">
			{isAr ? "تمكين المؤسسات باستخدام " : "Empowering Enterprises with "}
			<span className="text-brand-gold">OPERIX Solutions</span>
		  </h2>
		  <p className="text-vercel-muted mb-8 font-medium leading-relaxed">
			{isAr ? "نحن لا نبني أنظمة ذكية فحسب. بل ننشر كوادر خبيرة لتشغيل منشآتك، وشبكات المواقف، والفعاليات الضخمة بكفاءة ميدانية." : "We don't just build intelligent systems. We deploy expert personnel to run your facilities, parking grids, and large-scale events flawlessly on the ground."}
		  </p>
		  <div className="flex gap-4">
			<a href="https://www.operix-solutions.com" className="bg-brand-gold text-black font-bold px-8 py-3 rounded-lg hover:bg-brand-gold/90 transition-all">
			  {isAr ? "جدولة عرض توضيحي" : "SCHEDULE A DEMO →"}
			</a>
			<a href="https://www.operix-solutions.com" className="border border-vercel-border text-white font-bold px-8 py-3 rounded-lg hover:bg-vercel-hover transition-all">
			  {isAr ? "اعرف المزيد" : "LEARN MORE"}
			</a>
		  </div>
		</div>
	  </div>
	</section>
  );
}