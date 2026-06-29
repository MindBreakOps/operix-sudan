import React from 'react';
import { ExternalLink, Settings, Users, FileCheck, ShieldCheck, HeartPulse, Building2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Added English/Arabic names and specific gradient colors for each product
const products = [
  { nameEn: "OPERIX Core", nameAr: "أوبيركس كور", url: "ops.operix-solutions.online", icon: Settings, color: "from-blue-600 to-cyan-500" },
  { nameEn: "HRIS", nameAr: "نظام الموارد البشرية", url: "hris.operix-solutions.online", icon: Users, color: "from-purple-600 to-pink-500" },
  { nameEn: "FMIS", nameAr: "النظام المالي", url: "fmis.operix-solutions.online", icon: FileCheck, color: "from-emerald-600 to-teal-400" },
  { nameEn: "OPERATIONS", nameAr: "إدارة العمليات", url: "operations.operix-solutions.online", icon: ShieldCheck, color: "from-orange-500 to-amber-500" },
  { nameEn: "Shifa", nameAr: "شفاء", url: "care.operix-solutions.online", icon: HeartPulse, color: "from-rose-600 to-red-500" },
  { nameEn: "Esnad", nameAr: "إسناد", url: "bin-abbas.operix-solutions.online", icon: Building2, color: "from-indigo-600 to-blue-700" }
];

export default function TechMarquee() {
  const { isAr } = useLanguage();

  return (
	<section className="relative overflow-hidden border-y border-vercel-border bg-vercel-surface py-5 flex items-center">
	  <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-vercel-surface to-transparent z-10 pointer-events-none" />
	  <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-vercel-surface to-transparent z-10 pointer-events-none" />

	  <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
		{[...products, ...products, ...products, ...products].map((p, i) => (
		  <a 
			key={i} 
			href={`https://www.${p.url}`} 
			target="_blank" 
			rel="noreferrer"
			className={`mx-4 flex items-center gap-3 bg-gradient-to-r ${p.color} px-6 py-2.5 rounded-full hover:scale-105 transition-all duration-300 shadow-lg group`}
		  >
			<div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm transition-colors group-hover:bg-white/30">
			  <p.icon size={16} className="text-white drop-shadow-sm" />
			</div>
			
			{/* Translated Name instead of URL */}
			<span className="text-sm font-bold text-white tracking-wide drop-shadow-sm">
			  {isAr ? p.nameAr : p.nameEn}
			</span>
			
			<ExternalLink size={14} className="text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" />
		  </a>
		))}
	  </div>
	</section>
  );
}