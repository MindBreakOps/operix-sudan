import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Cloud, ShieldCheck, Database } from 'lucide-react';

export default function Services() {
  const { isAr } = useLanguage();

  const services = [
	{ title: isAr ? "استضافة سحابية آمنة" : "Secure Cloud Hosting", icon: Cloud, desc: isAr ? "بنية تحتية سحابية مصممة لتحمل أقصى درجات الضغط وضمان الاستمرارية." : "Cloud infrastructure designed to withstand maximum load and ensure continuity." },
	{ title: isAr ? "أمن سيبراني صارم" : "Strict Cyber Security", icon: ShieldCheck, desc: isAr ? "تشفير وحماية متقدمة لبياناتك ومؤسستك ضد أي هجمات سيبرانية." : "Advanced encryption and protection for your data against cyber threats." },
	{ title: isAr ? "ترحيل البيانات (Data Migration)" : "Data Migration", icon: Database, desc: isAr ? "نقل بياناتك القديمة إلى أنظمة OPERIX الحديثة بأمان وسرعة فائقة." : "Safely and rapidly migrate your legacy data to modern OPERIX systems." },
  ];

  return (
	<main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
	  <div className="text-center mb-20">
		<h1 className="text-5xl font-black font-serif text-vercel-base mb-6">
		  {isAr ? "الخدمات التقنية" : "Technical Services"}
		</h1>
	  </div>

	  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
		{services.map((s, i) => (
		  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-vercel-surface border border-vercel-border p-10 rounded-3xl text-center">
			<s.icon className="text-brand-gold mx-auto mb-6" size={48} />
			<h3 className="text-2xl font-bold text-vercel-surface-text mb-4">{s.title}</h3>
			<p className="text-vercel-muted">{s.desc}</p>
		  </motion.div>
		))}
	  </div>
	</main>
  );
}