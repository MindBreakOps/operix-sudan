import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Cloud, ShieldCheck, Database, RefreshCw, LifeBuoy, BookOpen, ArrowUpRight } from 'lucide-react';

const services = (isAr: boolean) => [
  {
	icon:   Cloud,
	title:  isAr ? 'استضافة سحابية آمنة'           : 'Secure Cloud Hosting',
	desc:   isAr
	  ? 'بنية تحتية سحابية مصممة لتحمل أقصى درجات الضغط وضمان الاستمرارية. وقت تشغيل يضمن ٩٩.٩٪ SLA مع تشفير كامل للبيانات.'
	  : 'Cloud infrastructure designed to withstand maximum load and ensure continuity. 99.9% SLA uptime with full-stack data encryption.',
	accent: '#6B73FF',
	stat:   { val: '99.9%', label: isAr ? 'وقت التشغيل' : 'Uptime SLA' },
  },
  {
	icon:   ShieldCheck,
	title:  isAr ? 'أمن سيبراني صارم'               : 'Strict Cyber Security',
	desc:   isAr
	  ? 'تشفير وحماية متقدمة لبياناتك ومؤسستك ضد أي هجمات سيبرانية. مراقبة استباقية وتحديثات أمان مستمرة.'
	  : 'Advanced encryption and protection for your data against cyber threats. Proactive monitoring and continuous security updates.',
	accent: '#EF4444',
	stat:   { val: 'AES-256', label: isAr ? 'معيار التشفير' : 'Encryption Standard' },
  },
  {
	icon:   Database,
	title:  isAr ? 'ترحيل البيانات'                 : 'Data Migration',
	desc:   isAr
	  ? 'نقل بياناتك القديمة إلى أنظمة OPERIX الحديثة بأمان وسرعة فائقة. صفر توقف. صفر فقدان للبيانات.'
	  : 'Safely and rapidly migrate your legacy data to modern OPERIX systems. Zero downtime. Zero data loss.',
	accent: '#10B981',
	stat:   { val: '0%', label: isAr ? 'فقدان البيانات' : 'Data Loss' },
  },
  {
	icon:   RefreshCw,
	title:  isAr ? 'التحديث والصيانة'               : 'Updates & Maintenance',
	desc:   isAr
	  ? 'تحديثات منتظمة وصيانة استباقية لضمان أن أنظمتك تعمل دائماً بأحدث الإصدارات وأعلى أداء.'
	  : 'Regular updates and proactive maintenance to ensure your systems always run on the latest versions at peak performance.',
	accent: '#F5A623',
	stat:   { val: '24/7', label: isAr ? 'مراقبة مستمرة' : 'Monitoring' },
  },
  {
	icon:   LifeBuoy,
	title:  isAr ? 'الدعم الفني المباشر'             : 'Live Technical Support',
	desc:   isAr
	  ? 'فريق دعم متخصص متاح للرد الفوري على أي استفسار أو مشكلة تقنية عبر واتساب، البريد الإلكتروني، أو المكالمات.'
	  : 'Specialized support team available for immediate response to any inquiry or technical issue via WhatsApp, email, or calls.',
	accent: '#D4AF37',
	stat:   { val: '<2hr', label: isAr ? 'متوسط وقت الاستجابة' : 'Avg Response Time' },
  },
  {
	icon:   BookOpen,
	title:  isAr ? 'التدريب والتهيئة'                : 'Training & Onboarding',
	desc:   isAr
	  ? 'جلسات تدريبية مخصصة لفريقك تضمن استيعاباً كاملاً للنظام وتعظيم العائد من الاستثمار.'
	  : 'Custom training sessions for your team to ensure full system adoption and maximize your return on investment.',
	accent: '#8B5CF6',
	stat:   { val: '100%', label: isAr ? 'معدل التبني' : 'Adoption Rate' },
  },
];

export default function Services() {
  const { isAr } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);
  const items = services(isAr);

  return (
	<main
	  className="min-h-screen pt-32 pb-24 px-6"
	  style={{ background: 'var(--bg)' }}
	>
	  <div className="max-w-7xl mx-auto">

		{/* ── Header ── */}
		<motion.div
		  initial={{ opacity: 0, y: 24 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.6 }}
		  className="max-w-2xl mb-16"
		>
		  <div className="flex items-center gap-3 mb-4">
			<div className="h-px w-10 bg-brand-gold" />
			<span className="tag-gold">{isAr ? 'ما نقدمه' : 'What We Offer'}</span>
		  </div>
		  <h1
			className="text-4xl md:text-5xl lg:text-6xl mb-5"
			style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
		  >
			{isAr ? 'الخدمات التقنية' : 'Technical Services'}
		  </h1>
		  <p
			className="text-base md:text-lg leading-relaxed"
			style={{ color: 'var(--text-muted)' }}
		  >
			{isAr
			  ? 'من الاستضافة إلى الدعم المستمر — نوفر كل ما يحتاجه عملك الرقمي لينمو بثبات.'
			  : 'From hosting to continuous support — we provide everything your digital business needs to grow with stability.'}
		  </p>
		</motion.div>

		{/* ── Services Grid ── */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
		  {items.map((s, i) => {
			const isHov = hovered === i;
			return (
			  <motion.div
				key={i}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: i * 0.09 }}
				onMouseEnter={() => setHovered(i)}
				onMouseLeave={() => setHovered(null)}
				className="relative rounded-2xl p-7 border overflow-hidden transition-all duration-300"
				style={{
				  background:  'var(--surface)',
				  borderColor: isHov ? `${s.accent}40` : 'var(--border)',
				  transform:   isHov ? 'translateY(-3px)' : 'translateY(0)',
				  boxShadow:   isHov ? `0 16px 40px ${s.accent}10` : 'none',
				}}
			  >
				{/* Radial glow */}
				<div
				  className="absolute top-0 left-0 w-full h-32 pointer-events-none transition-opacity duration-500"
				  style={{
					background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${s.accent}08 0%, transparent 80%)`,
					opacity:    isHov ? 1 : 0,
				  }}
				/>

				{/* Icon */}
				<div
				  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
				  style={{
					background: isHov ? `${s.accent}15` : 'var(--surface-2)',
					border:     `1px solid ${isHov ? `${s.accent}30` : 'var(--border)'}`,
				  }}
				>
				  <s.icon size={22} style={{ color: s.accent }} />
				</div>

				<h3
				  className="text-base font-bold mb-2.5 transition-colors duration-200"
				  style={{ color: isHov ? s.accent : 'var(--text)' }}
				>
				  {s.title}
				</h3>
				<p
				  className="text-sm leading-relaxed mb-6"
				  style={{ color: 'var(--text-muted)' }}
				>
				  {s.desc}
				</p>

				{/* Stat pill */}
				<div
				  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl"
				  style={{
					background: `${s.accent}10`,
					border:     `1px solid ${s.accent}25`,
				  }}
				>
				  <span
					className="text-sm font-black"
					style={{ color: s.accent }}
				  >
					{s.stat.val}
				  </span>
				  <span
					className="text-xs font-semibold"
					style={{ color: 'var(--text-muted)' }}
				  >
					{s.stat.label}
				  </span>
				</div>

				{/* Arrow hint */}
				<div
				  className="absolute bottom-6 right-6 transition-all duration-300"
				  style={{
					opacity:   isHov ? 1 : 0,
					transform: isHov ? 'translate(0,0)' : 'translate(4px,4px)',
				  }}
				>
				  <ArrowUpRight size={18} style={{ color: s.accent }} />
				</div>
			  </motion.div>
			);
		  })}
		</div>

		{/* ── Process callout ── */}
		<motion.div
		  initial={{ opacity: 0, y: 20 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ delay: 0.8 }}
		  className="mt-14 rounded-2xl p-8 md:p-10 border"
		  style={{
			background:   'var(--surface)',
			borderColor:  'var(--border)',
		  }}
		>
		  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
			<div>
			  <h3
				className="text-xl font-bold mb-2"
				style={{ color: 'var(--text)' }}
			  >
				{isAr ? 'كيف نعمل معك؟' : 'How do we work with you?'}
			  </h3>
			  <p
				className="text-sm leading-relaxed max-w-xl"
				style={{ color: 'var(--text-muted)' }}
			  >
				{isAr
				  ? 'نبدأ بفهم احتياجاتك الحقيقية، ثم نصمم الحل المناسب، ننفذه، وندعمك على المدى البعيد. كل خطوة بشفافية كاملة.'
				  : 'We start by understanding your real needs, then design the right solution, implement it, and support you long-term. Every step with full transparency.'}
			  </p>
			</div>
			<a
			  href="/contact"
			  className="btn-primary inline-flex items-center gap-2 shrink-0"
			>
			  {isAr ? 'ابدأ معنا' : 'Start with Us'}
			  <ArrowUpRight size={16} />
			</a>
		  </div>
		</motion.div>
	  </div>
	</main>
  );
}