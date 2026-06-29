import React from 'react';
import { ExternalLink, Settings, Users, FileCheck, ShieldCheck, HeartPulse, Building2 } from 'lucide-react';

const products = [
  { name: "OPERIX Core", url: "ops.operix-solutions.online", icon: Settings },
  { name: "HRIS", url: "hris.operix-solutions.online", icon: Users },
  { name: "FMIS", url: "fmis.operix-solutions.online", icon: FileCheck },
  { name: "OPERATIONS", url: "operations.operix-solutions.online", icon: ShieldCheck },
  { name: "Shifa", url: "care.operix-solutions.online", icon: HeartPulse },
  { name: "Esnad", url: "bin-abbas.operix-solutions.online", icon: Building2 }
];

export default function TechMarquee() {
  return (
	<section className="relative overflow-hidden border-y border-vercel-border bg-vercel-surface py-5 flex items-center">
	  <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-vercel-surface to-transparent z-10 pointer-events-none" />
	  <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-vercel-surface to-transparent z-10 pointer-events-none" />

	  {/* Changed to use your tailwind config animation: animate-marquee */}
	  <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
		{[...products, ...products, ...products, ...products].map((p, i) => (
		  <a 
			key={i} 
			href={`https://www.${p.url}`} 
			target="_blank" 
			rel="noreferrer"
			className="mx-6 flex items-center gap-4 bg-vercel-bg border border-vercel-border px-5 py-2.5 rounded-full hover:border-brand-gold hover:bg-vercel-surface transition-all duration-300 cursor-pointer shadow-sm group"
		  >
			<div className="bg-vercel-surface p-1.5 rounded-full border border-vercel-border group-hover:border-brand-gold transition-colors">
			  <p.icon size={14} className="text-vercel-text group-hover:text-brand-gold transition-colors" />
			</div>
			<span className="text-sm font-bold text-vercel-text tracking-wide">{p.name}</span>
			<span className="text-xs font-mono text-vercel-text/60 flex items-center gap-1.5">
			  www.{p.url}
			  <ExternalLink size={12} className="text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
			</span>
		  </a>
		))}
	  </div>
	</section>
  );
}