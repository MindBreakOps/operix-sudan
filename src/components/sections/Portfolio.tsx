import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ExternalLink, Eye } from 'lucide-react';

export default function Portfolio() {
  const { isAr } = useLanguage();

  const projects = [
	{
	  title: isAr ? "نظام إسناد للموارد والعمليات" : "Esnad ERP & Operations",
	  category: isAr ? "إدارة المؤسسات" : "Enterprise Management",
	  gradient: "from-brand-yellow/10 via-transparent to-transparent",
	  launchUrl: "https://www.ops.operix-solutions.online"
	},
	{
	  title: isAr ? "نظام شفاء للرعاية الصحية" : "Shifa Healthcare System",
	  category: isAr ? "تكنولوجيا طبية" : "Medical Tech",
	  gradient: "from-blue-500/10 via-transparent to-transparent",
	  launchUrl: "https://www.care.operix-solutions.online"
	},
	{
	  title: isAr ? "مجتمع حصاد الرقمي" : "Hased Community Hub",
	  category: isAr ? "منصات مجتمعية" : "Community Platforms",
	  gradient: "from-emerald-500/10 via-transparent to-transparent",
	  launchUrl: "https://www.edu.operix-solutions.online"
	},
  ];

  return (
	<section id="portfolio" className="relative overflow-hidden bg-vercel-bg px-6 py-32">
	  <div className="mx-auto max-w-7xl">
		<motion.div
		  initial={{ opacity: 0, y: 40 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.8 }}
		  viewport={{ once: true }}
		  className="mb-20 text-center"
		>
		  <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-brand-yellow">
			{isAr ? "منظوماتنا التشغيلية" : "OUR OPERATIONAL SYSTEMS"}
		  </p>
		  <h2 className="text-4xl font-black text-white md:text-5xl font-serif">
			{isAr ? "مشاريع صُممت لتصمد وتنمو" : "Projects Built to Endure and Grow"}
		  </h2>
		</motion.div>

		<div className="grid gap-10 lg:grid-cols-3">
		  {projects.map((project, index) => (
			<motion.div
			  key={project.title}
			  initial={{ opacity: 0, y: 50 }}
			  whileInView={{ opacity: 1, y: 0 }}
			  transition={{ delay: index * 0.15 }}
			  viewport={{ once: true }}
			  className="group relative overflow-hidden rounded-[32px] border border-vercel-border bg-vercel-surface transition-all duration-300 hover:border-vercel-muted"
			>
			  <div className="relative h-[420px] flex flex-col justify-between overflow-hidden p-8">
				<div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 transition duration-500 group-hover:scale-110 pointer-events-none`} />
				<div className="absolute inset-0 bg-vercel-bg/30 pointer-events-none" />

				<div className="relative z-10">
				  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
					{project.category}
				  </p>
				  <h3 className="text-2xl font-bold text-white leading-tight">
					{project.title}
				  </h3>
				</div>

				{/* Interactive Action Buttons */}
				<div className="relative z-10 flex items-center gap-3 mt-auto pt-6 border-t border-vercel-border/50">
				  <a 
					href={project.launchUrl} 
					target="_blank" 
					rel="noreferrer"
					className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3 px-4 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
				  >
					<ExternalLink size={16} />
					{isAr ? "تشغيل مباشر" : "Direct Launch"}
				  </a>
				  <a 
					href="https://www.operix-solutions.com/products" 
					target="_blank" 
					rel="noreferrer"
					className="flex-1 flex items-center justify-center gap-2 bg-vercel-bg border border-vercel-border text-white py-3 px-4 rounded-xl font-bold text-sm hover:border-brand-yellow hover:text-brand-yellow transition-all"
				  >
					<Eye size={16} />
					{isAr ? "معاينة التفاصيل" : "Preview"}
				  </a>
				</div>
			  </div>
			</motion.div>
		  ))}
		</div>
	  </div>
	</section>
  );
}