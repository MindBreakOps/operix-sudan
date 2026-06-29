import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function About() {
  const { isAr } = useLanguage();

  return (
	<main className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
	  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
		<h1 className="text-5xl font-black font-serif text-vercel-base mb-6">
		  {isAr ? "من نحن" : "Who We Are"}
		</h1>
		<div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
	  </motion.div>

	  <div className="bg-vercel-surface border border-vercel-border rounded-3xl p-10 md:p-16 shadow-2xl">
		<p className="text-xl leading-relaxed text-vercel-surface-text/90 mb-8 font-medium">
		  {isAr 
			? "في أوبيركس ٢٤٩، نحن لا نكتب مجرد أسطر من البرمجة؛ بل نبني شرايين رقمية تضمن بقاء أعمالك حية ومستمرة مهما كانت الظروف قاسية." 
			: "At OPERIX 249, we don't just write lines of code; we build digital arteries that ensure your business remains alive and operational, no matter how harsh the conditions."}
		</p>
		<p className="text-lg leading-relaxed text-vercel-muted">
		  {isAr 
			? "نرتكز على التزام صارم بالمعايير العالمية لبناء أنظمة مثل OPERIX و Shifa و Esnad. مهمتنا هي توفير استقرار تشغيلي بنسبة ٩٩.٩٪ لعملائنا في السودان وخارجه." 
			: "We are anchored in a strict commitment to global standards, building systems like OPERIX, Shifa, and Esnad. Our mission is to provide 99.9% operational stability to our clients in Sudan and beyond."}
		</p>
	  </div>
	</main>
  );
}