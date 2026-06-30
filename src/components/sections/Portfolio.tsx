import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ExternalLink, Eye, ArrowUpRight } from 'lucide-react';

const projects = (isAr: boolean) => [
  {
	title:      isAr ? 'نظام إسناد للموارد والعمليات' : 'Esnad ERP & Operations',
	category:   isAr ? 'إدارة المؤسسات'                : 'Enterprise Management',
	desc:       isAr
	  ? 'منظومة متكاملة لإدارة الموارد البشرية والعمليات اللوجستية والمالية في بيئة واحدة.'
	  : 'A unified suite for HR, logistics, and financial operations in a single environment.',
	accent:     '#D4AF37',
	accentRgb:  '212,175,55',
	launchUrl:  'https://www.ops.operix-solutions.online',
	badge:      isAr ? 'مباشر' : 'Live',
  },
  {
	title:      isAr ? 'نظام شفاء للرعاية الصحية' : 'Shifa Healthcare System',
	category:   isAr ? 'تكنولوجيا طبية'             : 'Medical Tech',
	desc:       isAr
	  ? 'نظام إدارة مستشفيات وعيادات يحفظ السجلات الطبية ويسهل مسارات الرعاية في أصعب الظروف.'
	  : 'Hospital and clinic management that secures medical records and streamlines care under any conditions.',
	accent:     '#EF4444',
	accentRgb:  '239,68,68',
	launchUrl:  'https://www.care.operix-solutions.online',
	badge:      isAr ? 'مباشر' : 'Live',
  },
  {
	title:      isAr ? 'مجتمع حصاد الرقمي' : 'Hased Community Hub',
	category:   isAr ? 'منصات مجتمعية'     : 'Community Platforms',
	desc:       isAr
	  ? 'منصة رقمية لإدارة الأحياء السكنية، التواصل المجتمعي، وخدمات الإدارة المدنية المتكاملة.'
	  : 'A digital platform for residential management, community engagement, and integrated civic services.',
	accent:     '#10B981',
	accentRgb:  '16,185,129',
	launchUrl:  'https://www.hasad.operix-solutions.online',
	badge:      isAr ? 'مباشر' : 'Live',
  },
];

export default function Portfolio() {
  const { isAr } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);
  const items = projects(isAr);

  return (
	<section
	  id="portfolio"
	  className="relative overflow-hidden px-6 py-28"
	  style={{ background: 'var(--bg)' }}
	>
	  {/* Subtle background accent blob */}
	  <div
		className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.03] blur-3xl"
		style={{ background: 'radial-gradient(ellipse, #D4AF37 0%, transparent 70%)' }}
	  />

	  <div className="mx-auto max-w-7xl relative z-10">

		{/* ── Section Header ── */}
		<motion.div
		  initial={{ opacity: 0, y: 32 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
		  viewport={{ once: true }}
		  className="mb-16"
		>
		  <div className="flex items-center gap-3 mb-4">
			<div className="h-px w-10 bg-brand-gold" />
			<span className="tag-gold">
			  {isAr ? 'منظوماتنا التشغيلية' : 'Our Operational Systems'}
			</span>
		  </div>
		  <h2
			className="text-4xl md:text-5xl lg:text-6xl max-w-2xl"
			style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
		  >
			{isAr ? 'مشاريع صُممت لتصمد وتنمو' : 'Projects Built to Endure and Grow'}
		  </h2>
		</motion.div>

		{/* ── Cards Grid ── */}
		<div className="grid gap-6 lg:grid-cols-3">
		  {items.map((project, i) => {
			const isHov = hovered === i;

			return (
			  <motion.div
				key={project.title}
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
				viewport={{ once: true }}
				onMouseEnter={() => setHovered(i)}
				onMouseLeave={() => setHovered(null)}
				className="group relative overflow-hidden rounded-3xl border transition-all duration-400"
				style={{
				  background:   'var(--surface)',
				  borderColor:  isHov ? `${project.accent}45` : 'var(--border)',
				  transform:    isHov ? 'translateY(-4px)' : 'translateY(0)',
				  boxShadow:    isHov
					? `0 20px 60px rgba(${project.accentRgb},0.12), 0 0 0 1px ${project.accent}20`
					: '0 4px 20px rgba(0,0,0,0.08)',
				  transition:   'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
				}}
			  >
				{/* Gradient wash — accent color, adapts to light/dark */}
				<div
				  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
				  style={{
					background:  `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(${project.accentRgb},0.08) 0%, transparent 70%)`,
					opacity:     isHov ? 1 : 0.4,
				  }}
				/>

				{/* Scan line on hover */}
				{isHov && (
				  <div
					className="absolute inset-x-0 h-px pointer-events-none"
					style={{
					  background: `linear-gradient(90deg, transparent, ${project.accent}60, transparent)`,
					  animation:  'scan 2.5s linear infinite',
					  top: '0%',
					}}
				  />
				)}

				<div className="relative z-10 flex flex-col h-full p-8">

				  {/* Category + badge */}
				  <div className="flex items-center justify-between mb-5">
					<span
					  className="text-[10px] font-black uppercase tracking-[0.2em]"
					  style={{ color: project.accent }}
					>
					  {project.category}
					</span>
					<span
					  className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
					  style={{
						background: `rgba(${project.accentRgb},0.1)`,
						border:     `1px solid rgba(${project.accentRgb},0.25)`,
						color:      project.accent,
					  }}
					>
					  <span
						className="w-1.5 h-1.5 rounded-full animate-pulse"
						style={{ background: project.accent }}
					  />
					  {project.badge}
					</span>
				  </div>

				  {/* Title */}
				  <h3
					className="text-xl font-bold mb-3 leading-snug transition-colors duration-200"
					style={{ color: isHov ? project.accent : 'var(--text)' }}
				  >
					{project.title}
				  </h3>

				  {/* Description */}
				  <p
					className="text-sm leading-relaxed mb-8 flex-grow"
					style={{ color: 'var(--text-muted)' }}
				  >
					{project.desc}
				  </p>

				  {/* Action buttons */}
				  <div
					className="flex items-center gap-3 pt-5 border-t"
					style={{ borderColor: 'var(--border)' }}
				  >
					<a
					  href={project.launchUrl}
					  target="_blank"
					  rel="noreferrer"
					  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200"
					  style={{
						background: project.accent,
						color:      '#0A0A1F',
					  }}
					  onMouseEnter={(e) => {
						(e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)';
						(e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
					  }}
					  onMouseLeave={(e) => {
						(e.currentTarget as HTMLElement).style.filter = '';
						(e.currentTarget as HTMLElement).style.transform = '';
					  }}
					>
					  <ExternalLink size={15} />
					  {isAr ? 'تشغيل مباشر' : 'Direct Launch'}
					</a>

					<a
					  href="https://www.operix-solutions.com/products"
					  target="_blank"
					  rel="noreferrer"
					  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm border transition-all duration-200"
					  style={{
						background:  'var(--surface-2)',
						borderColor: 'var(--border)',
						color:       'var(--text-muted)',
					  }}
					  onMouseEnter={(e) => {
						const el = e.currentTarget as HTMLElement;
						el.style.borderColor = `${project.accent}50`;
						el.style.color = project.accent;
					  }}
					  onMouseLeave={(e) => {
						const el = e.currentTarget as HTMLElement;
						el.style.borderColor = 'var(--border)';
						el.style.color = 'var(--text-muted)';
					  }}
					>
					  <Eye size={15} />
					  {isAr ? 'معاينة التفاصيل' : 'Preview'}
					</a>
				  </div>
				</div>
			  </motion.div>
			);
		  })}
		</div>

		{/* ── Bottom link ── */}
		<motion.div
		  initial={{ opacity: 0 }}
		  whileInView={{ opacity: 1 }}
		  transition={{ delay: 0.5 }}
		  viewport={{ once: true }}
		  className="mt-12 text-center"
		>
		  <a
			href="https://www.operix-solutions.com/products"
			target="_blank"
			rel="noreferrer"
			className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
			style={{ color: 'var(--text-muted)' }}
			onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
			onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
		  >
			{isAr ? 'استعرض جميع المنتجات على الموقع الرئيسي' : 'See all products on the main site'}
			<ArrowUpRight size={15} />
		  </a>
		</motion.div>
	  </div>
	</section>
  );
}