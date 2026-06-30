import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Users, LayoutGrid, Heart, Server } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const services = (isAr: boolean) => [
  {
	title:      isAr ? 'نظام شفاء (Shifa)'               : 'Shifa Healthcare',
	icon:       Activity,
	accent:     '#EF4444',
	accentRgb:  '239,68,68',
	description: isAr
	  ? 'لأن صحة أهلنا تهمنا. نظام متكامل لإدارة المستشفيات والعيادات، يحفظ تاريخ المرضى ويسهل عمل الأطباء في أصعب الظروف.'
	  : "Because our people's health matters. A complete hospital management system that secures patient history and eases medical workflows under the harshest conditions.",
  },
  {
	title:      isAr ? 'إسناد (Esnad)'                   : 'Esnad Management',
	icon:       LayoutGrid,
	accent:     '#D4AF37',
	accentRgb:  '212,175,55',
	description: isAr
	  ? 'سند حقيقي لإدارة الموارد البشرية والعمليات (HRIS & FMIS). ننظم لك الهيكلة لتتفرغ أنت لنمو أعمالك.'
	  : 'True support for your HR and facility management (HRIS & FMIS). We organize your structure so you can focus on growth.',
  },
  {
	title:      isAr ? 'مجتمع حصاد (Hased)'              : 'Hased Community',
	icon:       Users,
	accent:     '#10B981',
	accentRgb:  '16,185,129',
	description: isAr
	  ? 'منصات مجتمعية مترابطة تجمع الناس، تسهل التواصل، وتبني بيئة رقمية آمنة للتعاون والعمل المشترك.'
	  : 'Interconnected community platforms that bring people together and build a safe digital environment for collaboration.',
  },
  {
	title:      isAr ? 'أمن سيبراني صارم'                : 'Strict Cyber Security',
	icon:       ShieldCheck,
	accent:     '#6B73FF',
	accentRgb:  '107,115,255',
	description: isAr
	  ? 'حماية بياناتك هي أمانتنا. نوفر بنية تحتية مقاومة للاختراقات لضمان استمرارية أعمالك دون قلق.'
	  : 'Protecting your data is our duty. We provide hack-resistant infrastructure ensuring business continuity without worry.',
  },
  {
	title:      isAr ? 'تطبيقات بتجربة مستخدم مريحة'    : 'Comforting UX Apps',
	icon:       Heart,
	accent:     '#F5A623',
	accentRgb:  '245,166,35',
	description: isAr
	  ? 'نصمم واجهات تُريح العين وتُشعر المستخدم بالثقة، مع تفاعلات سلسة تدعم العربية والإنجليزية.'
	  : 'We design interfaces that comfort the eye and inspire user confidence, with smooth interactions supporting both Arabic and English.',
  },
  {
	title:      isAr ? 'استضافة سحابية موثوقة'           : 'Reliable Cloud Hosting',
	icon:       Server,
	accent:     '#8B5CF6',
	accentRgb:  '139,92,246',
	description: isAr
	  ? 'خوادم سحابية تضمن بقاء أنظمتك تعمل على مدار الساعة، لأن توقف العمل ليس خياراً في بيئتنا.'
	  : "Cloud servers that guarantee your systems stay online 24/7, because downtime is not an option in our environment.",
  },
];

export default function Services() {
  const { isAr } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);
  const items = services(isAr);

  return (
	<section
	  id="services"
	  className="relative px-6 py-28 border-t"
	  style={{
		background:  'var(--bg)',
		borderColor: 'var(--border)',
	  }}
	>
	  {/* Background glow */}
	  <div
		className="pointer-events-none absolute inset-0 overflow-hidden"
		aria-hidden="true"
	  >
		<div
		  className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-[0.04]"
		  style={{ background: 'radial-gradient(ellipse, #D4AF37 0%, transparent 70%)' }}
		/>
	  </div>

	  <div className="mx-auto max-w-7xl relative z-10">

		{/* ── Header ── */}
		<motion.div
		  initial={{ opacity: 0, y: 30 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
		  viewport={{ once: true }}
		  className="mb-16"
		>
		  <div className="flex items-center gap-3 mb-4">
			<div className="h-px w-10 bg-brand-gold" />
			<span className="tag-gold">
			  {isAr ? 'ما نقدمه لك' : 'What We Offer'}
			</span>
		  </div>
		  <h2
			className="text-4xl md:text-5xl lg:text-6xl mb-5 max-w-xl"
			style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
		  >
			{isAr ? 'حلول تقنية تنبض بالحياة' : 'Tech Solutions with a Heartbeat'}
		  </h2>
		  <p
			className="max-w-2xl text-base md:text-lg leading-relaxed"
			style={{ color: 'var(--text-muted)', fontWeight: 500 }}
		  >
			{isAr
			  ? 'صممنا حزم أوبريكس لتكون مرنة؛ يمكنك استخدامها كحزمة متكاملة أو كنظام مستقل، لتناسب احتياجك الحالي بالضبط.'
			  : 'We designed OPERIX modules to be flexible — use them as a bundled ecosystem or standalone systems, fitting your exact current needs.'}
		  </p>
		</motion.div>

		{/* ── Cards ── */}
		<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
		  {items.map((service, i) => {
			const Icon  = service.icon;
			const isHov = hovered === i;

			return (
			  <motion.div
				key={service.title}
				initial={{ opacity: 0, y: 36 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: i * 0.09, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
				viewport={{ once: true }}
				onMouseEnter={() => setHovered(i)}
				onMouseLeave={() => setHovered(null)}
				className="group relative overflow-hidden rounded-2xl border p-7"
				style={{
				  background:  'var(--surface)',
				  borderColor: isHov ? `${service.accent}40` : 'var(--border)',
				  transform:   isHov ? 'translateY(-3px)' : 'translateY(0)',
				  boxShadow:   isHov
					? `0 16px 48px rgba(${service.accentRgb},0.1)`
					: 'none',
				  transition:  'all 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
				}}
			  >
				{/* Radial glow overlay */}
				<div
				  className="absolute inset-0 pointer-events-none transition-opacity duration-400"
				  style={{
					background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(${service.accentRgb},0.07) 0%, transparent 70%)`,
					opacity:    isHov ? 1 : 0,
				  }}
				/>

				{/* Gradient wash on hover */}
				<div
				  className="absolute inset-0 pointer-events-none transition-opacity duration-400"
				  style={{
					background: `linear-gradient(135deg, rgba(${service.accentRgb},0.04) 0%, transparent 60%)`,
					opacity:    isHov ? 1 : 0,
				  }}
				/>

				<div className="relative z-10">
				  {/* Icon */}
				  <div
					className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300"
					style={{
					  background: isHov
						? `rgba(${service.accentRgb},0.15)`
						: 'var(--surface-2)',
					  border: `1px solid ${isHov ? `rgba(${service.accentRgb},0.3)` : 'var(--border)'}`,
					}}
				  >
					<Icon
					  size={26}
					  style={{ color: service.accent }}
					/>
				  </div>

				  <h3
					className="mb-3 text-base font-bold leading-snug transition-colors duration-200"
					style={{ color: isHov ? service.accent : 'var(--text)' }}
				  >
					{service.title}
				  </h3>

				  <p
					className="text-sm leading-relaxed"
					style={{ color: 'var(--text-muted)' }}
				  >
					{service.description}
				  </p>
				</div>
			  </motion.div>
			);
		  })}
		</div>
	  </div>
	</section>
  );
}