import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Settings, Users, FileCheck, ShieldCheck, HeartPulse, Building2, Globe, ArrowUpRight } from 'lucide-react';

const products = (isAr: boolean) => [
  {
	name:    'OPERIX Core',
	icon:    Settings,
	tag:     isAr ? 'المنظومة الأساسية' : 'Core Platform',
	desc:    isAr ? 'المنظومة الأساسية الشاملة لإدارة المؤسسات والعمليات التنظيمية المتكاملة.' : 'The comprehensive core enterprise management system for integrated organizational operations.',
	accent:  '#D4AF37',
	status:  isAr ? 'مباشر' : 'Live',
  },
  {
	name:    'OPERIX HRIS',
	icon:    Users,
	tag:     isAr ? 'الموارد البشرية' : 'HR Management',
	desc:    isAr ? 'إدارة الموارد البشرية ودورة حياة الموظف الكاملة من التعيين حتى المغادرة.' : 'Human Resources and Human Capital Management — full employee lifecycle from hire to exit.',
	accent:  '#6B73FF',
	status:  isAr ? 'مباشر' : 'Live',
  },
  {
	name:    'OPERIX FMIS',
	icon:    FileCheck,
	tag:     isAr ? 'الإدارة المالية' : 'Finance',
	desc:    isAr ? 'الإدارة المالية والمحاسبية الدقيقة مع تقارير ذكية وتدفق نقدي آني.' : 'Precise financial and accounting management with intelligent reports and real-time cash flow.',
	accent:  '#10B981',
	status:  isAr ? 'مباشر' : 'Live',
  },
  {
	name:    'OPERIX Operations',
	icon:    ShieldCheck,
	tag:     isAr ? 'إدارة العمليات' : 'Operations',
	desc:    isAr ? 'إدارة العمليات والمسارات اللوجستية مع لوحة تحكم ميدانية مباشرة.' : 'Operations and logistics management with a live field control dashboard.',
	accent:  '#F5A623',
	status:  isAr ? 'مباشر' : 'Live',
  },
  {
	name:    'Shifa Care',
	icon:    HeartPulse,
	tag:     isAr ? 'الرعاية الصحية' : 'Healthcare',
	desc:    isAr ? 'نظام الرعاية الصحية المتكامل لإدارة المرضى، المواعيد، والسجلات الطبية.' : 'Integrated healthcare management for patients, appointments, and medical records.',
	accent:  '#EF4444',
	status:  isAr ? 'مباشر' : 'Live',
  },
  {
	name:    'Esnad',
	icon:    Building2,
	tag:     isAr ? 'خدمات الأعمال' : 'Business Services',
	desc:    isAr ? 'نظام إسناد لخدمات الأعمال والمرافق والإدارة اللوجستية المتكاملة.' : 'Esnad system for business services, facilities, and integrated logistics management.',
	accent:  '#8B5CF6',
	status:  isAr ? 'مباشر' : 'Live',
  },
  {
	name:    'Hased Community',
	icon:    Globe,
	tag:     isAr ? 'إدارة المجتمع' : 'Community',
	desc:    isAr ? 'منصة مجتمعية رقمية لإدارة الأحياء السكنية والخدمات المدنية.' : 'Digital community platform for residential neighborhood and civic services management.',
	accent:  '#06B6D4',
	status:  isAr ? 'مباشر' : 'Live',
  },
];

export default function Products() {
  const { isAr } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);
  const items = products(isAr);

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
			<span className="tag-gold">{isAr ? 'منظومة متكاملة' : 'Integrated Ecosystem'}</span>
		  </div>
		  <h1
			className="text-4xl md:text-5xl lg:text-6xl mb-5"
			style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
		  >
			{isAr ? 'منظوماتنا التشغيلية' : 'Our Operational Ecosystem'}
		  </h1>
		  <p
			className="text-base md:text-lg leading-relaxed"
			style={{ color: 'var(--text-muted)' }}
		  >
			{isAr
			  ? 'صممنا أنظمتنا لتكون مرنة. يمكنك الحصول على منظومة متكاملة، أو اختيار برامج مستقلة تتناسب مع حجم أعمالك.'
			  : 'We designed our systems to be flexible. You can operate the entire ecosystem bundled, or select standalone modules that fit your scale.'}
		  </p>
		</motion.div>

		{/* ── Products Grid ── */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
		  {items.map((p, i) => {
			const isHov = hovered === i;
			return (
			  <motion.div
				key={i}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: i * 0.08 }}
				onMouseEnter={() => setHovered(i)}
				onMouseLeave={() => setHovered(null)}
				className="group relative rounded-2xl p-7 border overflow-hidden cursor-default transition-all duration-300"
				style={{
				  background:   'var(--surface)',
				  borderColor:  isHov ? `${p.accent}40` : 'var(--border)',
				  transform:    isHov ? 'translateY(-3px)' : 'translateY(0)',
				  boxShadow:    isHov ? `0 16px 40px ${p.accent}12` : 'none',
				}}
			  >
				{/* Subtle radial glow behind icon on hover */}
				<div
				  className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-500"
				  style={{
					background:  `radial-gradient(circle, ${p.accent}10 0%, transparent 70%)`,
					opacity:     isHov ? 1 : 0,
					transform:   'translate(40%,-40%)',
				  }}
				/>

				{/* Icon */}
				<div
				  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
				  style={{
					background:    isHov ? `${p.accent}15` : 'var(--surface-2)',
					border:        `1px solid ${isHov ? `${p.accent}30` : 'var(--border)'}`,
				  }}
				>
				  <p.icon size={22} style={{ color: p.accent }} />
				</div>

				{/* Tag + status */}
				<div className="flex items-center gap-2 mb-3">
				  <span
					className="text-[10px] font-bold uppercase tracking-[0.15em]"
					style={{ color: p.accent }}
				  >
					{p.tag}
				  </span>
				  <span
					className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
					style={{
					  background: 'rgba(16,185,129,0.1)',
					  border:     '1px solid rgba(16,185,129,0.25)',
					  color:      '#10B981',
					}}
				  >
					<span
					  className="w-1.5 h-1.5 rounded-full"
					  style={{ background: '#10B981' }}
					/>
					{p.status}
				  </span>
				</div>

				<h3
				  className="text-lg font-bold mb-2.5 transition-colors duration-200"
				  style={{ color: isHov ? p.accent : 'var(--text)' }}
				>
				  {p.name}
				</h3>
				<p
				  className="text-sm leading-relaxed"
				  style={{ color: 'var(--text-muted)' }}
				>
				  {p.desc}
				</p>

				{/* Hover arrow */}
				<div
				  className="absolute bottom-6 right-6 transition-all duration-300"
				  style={{ opacity: isHov ? 1 : 0, transform: isHov ? 'translate(0,0)' : 'translate(4px,4px)' }}
				>
				  <ArrowUpRight size={18} style={{ color: p.accent }} />
				</div>
			  </motion.div>
			);
		  })}
		</div>

		{/* ── Bottom CTA ── */}
		<motion.div
		  initial={{ opacity: 0 }}
		  animate={{ opacity: 1 }}
		  transition={{ delay: 0.8 }}
		  className="mt-14 text-center"
		>
		  <p
			className="text-sm font-medium mb-5"
			style={{ color: 'var(--text-muted)' }}
		  >
			{isAr ? 'هل تحتاج إلى منظومة مخصصة أو تكامل مع أنظمة قائمة؟' : 'Need a custom ecosystem or integration with your existing systems?'}
		  </p>
		  <a
			href="/contact"
			className="btn-primary inline-flex items-center gap-2"
		  >
			{isAr ? 'تحدث مع فريق الحلول' : 'Talk to Our Solutions Team'}
			<ArrowUpRight size={16} />
		  </a>
		</motion.div>
	  </div>
	</main>
  );
}