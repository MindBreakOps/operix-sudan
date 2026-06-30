import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Target } from 'lucide-react';

const pillars = (isAr: boolean) => [
  {
	icon: Shield,
	title:    isAr ? 'حماية لا تتنازل عنها'   : 'Uncompromising Protection',
	desc:     isAr
	  ? 'تشفير متعدد الطبقات وبروتوكولات أمان تتوافق مع المعايير الدولية لحماية بياناتك في جميع الأوقات.'
	  : 'Multi-layer encryption and security protocols aligned with international standards to protect your data at all times.',
	accent: '#D4AF37',
  },
  {
	icon: Zap,
	title:    isAr ? 'استجابة فورية'            : 'Instant Response',
	desc:     isAr
	  ? 'فريق دعم متاح على مدار الساعة لضمان استمرارية عملياتك وحل أي مشكلة في أسرع وقت ممكن.'
	  : 'Support team available around the clock to ensure your operations continue and resolve any issue at maximum speed.',
	accent: '#6B73FF',
  },
  {
	icon: Globe,
	title:    isAr ? 'معايير عالمية'            : 'Global Standards',
	desc:     isAr
	  ? 'نبني بممارسات الشركات الكبرى — هندسة قابلة للتوسع، واجهات مختبَرة، وتكاملات موثوقة.'
	  : 'We build with enterprise-grade practices — scalable architecture, tested interfaces, and reliable integrations.',
	accent: '#10B981',
  },
  {
	icon: Target,
	title:    isAr ? 'شراكة حقيقية'             : 'True Partnership',
	desc:     isAr
	  ? 'نحن لسنا مزودي خدمة فحسب. نفهم السياق السوداني والخليجي ونصمم حلولاً تناسب واقعك تحديداً.'
	  : "We're not just service providers. We understand the Sudanese and Gulf context and design solutions for your specific reality.",
	accent: '#F5A623',
  },
];

export default function About() {
  const { isAr } = useLanguage();

  return (
	<main
	  className="min-h-screen pt-32 pb-24 px-6"
	  style={{ background: 'var(--bg)' }}
	>
	  <div className="max-w-5xl mx-auto">

		{/* ── Page Header ── */}
		<motion.div
		  initial={{ opacity: 0, y: 24 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.6 }}
		  className="mb-16"
		>
		  <div className="flex items-center gap-3 mb-4">
			<div className="h-px w-10 bg-brand-gold" />
			<span className="tag-gold">{isAr ? 'قصتنا' : 'Our Story'}</span>
		  </div>
		  <h1
			className="text-4xl md:text-5xl lg:text-6xl mb-6"
			style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
		  >
			{isAr ? 'من نحن' : 'Who We Are'}
		  </h1>
		  <div
			className="w-16 h-1 rounded-full mb-8"
			style={{ background: 'linear-gradient(90deg, #D4AF37, #F5A623)' }}
		  />
		</motion.div>

		{/* ── Mission Statement ── */}
		<motion.div
		  initial={{ opacity: 0, y: 20 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.6, delay: 0.15 }}
		  className="rounded-2xl p-8 md:p-12 mb-14 border-gradient-gold relative overflow-hidden card-glow"
		  style={{ background: 'var(--surface)' }}
		>
		  {/* Decorative corner accent */}
		  <div
			className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
			style={{
			  background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
			  transform: 'translate(30%, -30%)',
			}}
		  />
		  <p
			className="text-xl md:text-2xl leading-relaxed mb-6 font-semibold relative z-10"
			style={{ color: 'var(--text)' }}
		  >
			{isAr
			  ? 'في أوبيركس ٢٤٩، نحن لا نكتب مجرد أسطر من البرمجة؛ بل نبني شرايين رقمية تضمن بقاء أعمالك حية ومستمرة مهما كانت الظروف قاسية.'
			  : "At OPERIX 249, we don't just write lines of code; we build digital arteries that ensure your business remains alive and operational, no matter how harsh the conditions."}
		  </p>
		  <p
			className="text-base md:text-lg leading-relaxed relative z-10"
			style={{ color: 'var(--text-muted)' }}
		  >
			{isAr
			  ? 'نرتكز على التزام صارم بالمعايير العالمية لبناء أنظمة مثل OPERIX و Shifa و Esnad. مهمتنا هي توفير استقرار تشغيلي بنسبة ٩٩.٩٪ لعملائنا في السودان وخارجه.'
			  : 'We are anchored in a strict commitment to global standards, building systems like OPERIX, Shifa, and Esnad. Our mission is to provide 99.9% operational stability to our clients in Sudan and beyond.'}
		  </p>
		</motion.div>

		{/* ── Pillars Grid ── */}
		<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
		  {pillars(isAr).map((pillar, i) => (
			<motion.div
			  key={i}
			  initial={{ opacity: 0, y: 20 }}
			  animate={{ opacity: 1, y: 0 }}
			  transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
			  className="group relative rounded-2xl p-7 border overflow-hidden transition-all duration-300 hover:scale-[1.01]"
			  style={{
				background: 'var(--surface)',
				borderColor: 'var(--border)',
			  }}
			  onMouseEnter={(e) => {
				(e.currentTarget as HTMLElement).style.borderColor = `${pillar.accent}40`;
			  }}
			  onMouseLeave={(e) => {
				(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
			  }}
			>
			  {/* Glow on hover */}
			  <div
				className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
				style={{
				  background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${pillar.accent}08 0%, transparent 70%)`,
				}}
			  />

			  <div
				className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
				style={{
				  background: `${pillar.accent}15`,
				  border: `1px solid ${pillar.accent}30`,
				}}
			  >
				<pillar.icon size={20} style={{ color: pillar.accent }} />
			  </div>

			  <h3
				className="text-base font-bold mb-2.5"
				style={{ color: 'var(--text)' }}
			  >
				{pillar.title}
			  </h3>
			  <p
				className="text-sm leading-relaxed"
				style={{ color: 'var(--text-muted)' }}
			  >
				{pillar.desc}
			  </p>
			</motion.div>
		  ))}
		</div>
	  </div>
	</main>
  );
}