import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

const projects = (isAr: boolean) => [
  {
	title:      isAr ? 'منظومة أوبيريكس للعمليات' : 'OPERIX Operations',
	category:   isAr ? 'إدارة العمليات الميدانية' : 'Field Operations',
	desc:       isAr
	  ? 'نظام متكامل لإدارة الأساطيل، مواقف السيارات، وتوجيه القوى العاملة الميدانية لحظياً.'
	  : 'Integrated system for fleet management, ANPR parking, and real-time field workforce deployment.',
	accent:     '#F5A623',
	accentRgb:  '245,166,35',
	launchUrl:  'https://www.ops.operix-solutions.online',
	badge:      isAr ? 'مباشر' : 'Live',
  },
  {
	title:      isAr ? 'أوبيريكس للموارد البشرية' : 'OPERIX HRIS',
	category:   isAr ? 'إدارة الموارد البشرية' : 'HR Management',
	desc:       isAr
	  ? 'أتمتة كاملة لدورة حياة الموظف، من التوظيف بالذكاء الاصطناعي إلى متابعة الحضور والرواتب.'
	  : 'Complete HR automation, from AI-driven recruitment to attendance tracking and payroll processing.',
	accent:     '#6B73FF',
	accentRgb:  '107,115,255',
	launchUrl:  'https://www.hris.operix-solutions.online',
	badge:      isAr ? 'مباشر' : 'Live',
  },
  {
	title:      isAr ? 'أوبيريكس للمالية' : 'OPERIX FMIS',
	category:   isAr ? 'الإدارة المالية' : 'Financial Management',
	desc:       isAr
	  ? 'نظام مالي متوافق مع متطلبات هيئة الزكاة (ZATCA)، يدير سجلات الأرباح، الالتزامات، والتقارير الآنية.'
	  : 'Financial system compliant with ZATCA requirements, managing ledgers, liabilities, and real-time reports.',
	accent:     '#10B981',
	accentRgb:  '16,185,129',
	launchUrl:  'https://www.fmis.operix-solutions.online',
	badge:      isAr ? 'مباشر' : 'Live',
  },
  {
	title:      isAr ? 'نظام شفاء للرعاية الصحية' : 'Shifa Healthcare',
	category:   isAr ? 'تكنولوجيا طبية' : 'Medical Tech',
	desc:       isAr
	  ? 'منظومة سريرية شاملة لإدارة المستشفيات، من تسجيل المرضى والعيادات إلى الصيدليات وبنك الدم.'
	  : 'Comprehensive clinical ecosystem for hospital management, from patient intake to pharmacy and blood bank.',
	accent:     '#EF4444',
	accentRgb:  '239,68,68',
	launchUrl:  'https://www.care.operix-solutions.online',
	badge:      isAr ? 'مباشر' : 'Live',
  },
  {
	title:      isAr ? 'إسناد (Esnad)' : 'Esnad Enterprise',
	category:   isAr ? 'خدمات الأعمال' : 'Business Services',
	desc:       isAr
	  ? 'منصة متخصصة لتخطيط الموارد المؤسسية ودعم العمليات الإدارية واللوجستية.'
	  : 'Specialized platform for institutional resource planning and administrative operations support.',
	accent:     '#D4AF37',
	accentRgb:  '212,175,55',
	launchUrl:  'https://www.bin-abbas.operix-solutions.online',
	badge:      isAr ? 'مباشر' : 'Live',
  },
  {
	title:      isAr ? 'مجتمع حصاد الرقمي' : 'Hased Community',
	category:   isAr ? 'إدارة المجتمعات' : 'Community Hub',
	desc:       isAr
	  ? 'حل رقمي متكامل لإدارة المجمعات السكنية، طلبات الصيانة، والفوترة المجتمعية.'
	  : 'Integrated digital solution for residential community management, maintenance, and billing.',
	accent:     '#06B6D4',
	accentRgb:  '6,182,212',
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
	  className="relative px-6 py-28 border-t border-vercel-border bg-vercel-bg"
	>
	  {/* Deep ambient background glows */}
	  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.03] bg-[#D4AF37]" />
		<div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.04] bg-[#0A192F]" />
	  </div>

	  <div className="mx-auto max-w-7xl relative z-10">
		
		{/* ── Header ── */}
		<div className="mb-16 fade-up">
		  <div className="flex items-center gap-3 mb-4">
			<div className="h-px w-10 bg-brand-gold" />
			<span className="tag-gold">
			  {isAr ? 'الأنظمة والمنصات' : 'Systems & Platforms'}
			</span>
		  </div>
		  <h2 className="text-4xl md:text-5xl lg:text-6xl mb-5 max-w-xl text-vercel-text font-display font-black">
			{isAr ? 'منظومة أوبريكس المتكاملة' : 'The OPERIX Ecosystem'}
		  </h2>
		  <p className="max-w-2xl text-base md:text-lg leading-relaxed text-vercel-muted font-medium">
			{isAr
			  ? 'اكتشف مجموعة منتجاتنا التي تعمل بتناغم تام لتوفير بنية تحتية تشغيلية لا مثيل لها، من الإدارة المالية إلى تخطيط الموارد البشرية.'
			  : 'Discover our suite of products working in perfect harmony to provide unparalleled operational infrastructure, from financial management to HR planning.'}
		  </p>
		</div>

		{/* ── Grid ── */}
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		  {items.map((project, i) => {
			const isHov = hovered === i;

			return (
			  <div
				key={project.title}
				onMouseEnter={() => setHovered(i)}
				onMouseLeave={() => setHovered(null)}
				className="group relative flex flex-col overflow-hidden rounded-2xl border bg-vercel-surface transition-all duration-300 fade-up"
				style={{
				  animationDelay: `${i * 100}ms`,
				  borderColor: isHov ? 'var(--color-brand-gold)' : 'var(--color-vercel-border)',
				  /* Blending dark gold and dark blue glows on hover */
				  boxShadow: isHov ? '0 10px 40px -10px rgba(212, 175, 55, 0.2), 0 4px 20px -5px rgba(10, 25, 47, 0.5)' : 'none',
				  transform: isHov ? 'translateY(-4px)' : 'translateY(0)',
				}}
			  >
				{/* Content */}
				<div className="p-7 flex-grow flex flex-col relative z-10">
				  <div className="flex justify-between items-start mb-6">
					<span className="text-xs font-bold tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded-md border border-brand-gold/20">
					  {project.category}
					</span>
					<span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
					  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
					  {project.badge}
					</span>
				  </div>

				  <h3 className="text-xl font-bold mb-3 text-vercel-text transition-colors duration-200 group-hover:text-brand-gold">
					{project.title}
				  </h3>

				  <p className="text-sm leading-relaxed text-vercel-muted mb-8 flex-grow">
					{project.desc}
				  </p>

				  {/* Launch Button */}
				  <a
					href={project.launchUrl}
					target="_blank"
					rel="noreferrer"
					className="inline-flex items-center justify-between w-full p-4 rounded-xl border border-vercel-border-bright bg-vercel-surface-2 transition-colors duration-300"
					style={{
					  /* Shift to dark blue background with gold borders on hover */
					  backgroundColor: isHov ? '#0A1128' : 'var(--color-vercel-surface-2)',
					  borderColor: isHov ? 'var(--color-brand-gold)' : 'var(--color-vercel-border-bright)'
					}}
				  >
					<span 
					  className="text-sm font-bold transition-colors duration-300"
					  style={{ color: isHov ? 'var(--color-brand-gold)' : 'var(--color-vercel-text)' }}
					>
					  {isAr ? 'دخول النظام' : 'Access System'}
					</span>
					<ArrowUpRight 
					  size={18} 
					  className="transition-colors duration-300"
					  style={{ color: isHov ? 'var(--color-brand-gold)' : 'var(--color-vercel-muted)' }} 
					/>
				  </a>
				</div>
			  </div>
			);
		  })}
		</div>
	  </div>
	</section>
  );
}