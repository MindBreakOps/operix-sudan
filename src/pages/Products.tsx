import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Settings, Users, FileCheck, ShieldCheck, HeartPulse, Building2, Globe } from 'lucide-react';

export default function Products() {
  const { isAr } = useLanguage();

  const products = [
	{ name: "OPERIX", icon: Settings, desc: isAr ? "المنظومة الأساسية الشاملة لإدارة المؤسسات." : "The comprehensive core enterprise management system." },
	{ name: "HRIS", icon: Users, desc: isAr ? "إدارة الموارد البشرية ورأس المال البشري." : "Human Resources and Human Capital Management." },
	{ name: "FMIS", icon: FileCheck, desc: isAr ? "الإدارة المالية والمحاسبية الدقيقة." : "Precise Financial and Accounting Management." },
	{ name: "OPERATIONS", icon: ShieldCheck, desc: isAr ? "إدارة العمليات والمسارات اللوجستية." : "Operations and Logistics Management." },
	{ name: "Shifa", icon: HeartPulse, desc: isAr ? "نظام الرعاية الصحية المتكامل." : "Integrated Healthcare Management System." },
	{ name: "Esnad", icon: Building2, desc: isAr ? "نظام إسناد لخدمات الأعمال والمرافق." : "Esnad system for business and facility services." },
	{ name: "Hased Community", icon: Globe, desc: isAr ? "منصة مجتمعية للتواصل الرقمي." : "Community platform for digital networking." },
  ];

  return (
	<main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
	  <div className="text-center mb-20">
		<h1 className="text-5xl font-black font-serif text-vercel-base mb-6">
		  {isAr ? "منظوماتنا التشغيلية" : "Our Operational Ecosystem"}
		</h1>
		<p className="text-vercel-muted text-lg max-w-2xl mx-auto">
		  {isAr 
			? "صممنا أنظمتنا لتكون مرنة. يمكنك الحصول على منظومة متكاملة، أو اختيار برامج مستقلة تتناسب مع حجم أعمالك." 
			: "We designed our systems to be flexible. You can operate the entire ecosystem bundled, or select standalone modules."}
		</p>
	  </div>

	  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{products.map((p, i) => (
		  <motion.div 
			key={i}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: i * 0.1 }}
			className="bg-vercel-surface border border-vercel-border p-8 rounded-3xl hover:border-brand-gold transition-colors group"
		  >
			<div className="w-14 h-14 bg-vercel-bg border border-vercel-border rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/30 transition-colors">
			  <p.icon className="text-brand-gold" size={24} />
			</div>
			<h3 className="text-2xl font-bold text-vercel-surface-text mb-3">{p.name}</h3>
			<p className="text-vercel-muted">{p.desc}</p>
		  </motion.div>
		))}
	  </div>
	</main>
  );
}