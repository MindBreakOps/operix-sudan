import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardCheck, HeartHandshake, Code2, ArrowUpLeft, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import StartProjectModal from '../ui/StartProjectModal';

import bgImage from '../../assets/ss.png';

const stats = (isAr: boolean) => [
  { icon: ClipboardCheck, val: '43+',   label: isAr ? 'إجمالي المشروعات الرقمية'  : 'Digital Projects'      },
  { icon: Code2,          val: '5+',    label: isAr ? 'منظومات OPERIX الأساسية'   : 'Core OPERIX Systems'   },
  { icon: Users,          val: '3',     label: isAr ? 'شركاء استراتيجيين'          : 'Strategic Partners'    },
  { icon: HeartHandshake, val: '99.9%', label: isAr ? 'معدل استقرار تشغيلي'        : 'Operational Uptime'    },
];

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAr } = useLanguage();

  const containerVariants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
	hidden: { opacity: 0, y: 28 },
	show:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
	<>
	  <section
		id="home"
		className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-20"
		style={{ background: 'var(--bg)' }}
	  >
		{/* ── Background Image ── */}
		<div className="absolute inset-0 z-0">
		  <img
			src={bgImage}
			alt=""
			aria-hidden="true"
			className="w-full h-full object-cover object-[75%_center] md:object-center opacity-70"
		  />
		  {/* Dark-mode gradient: strong left fade, subtle right */}
		  <div
			className="absolute inset-0"
			style={{
			  background:
				'linear-gradient(105deg, var(--bg) 0%, var(--bg)/90 40%, var(--bg)/50 70%, transparent 100%)',
			}}
		  />
		  {/* Grid overlay */}
		  <div className="absolute inset-0 bg-grid opacity-60" />
		</div>

		{/* ── Hero Content ── */}
		<motion.div
		  variants={containerVariants}
		  initial="hidden"
		  animate="show"
		  className="max-w-[1400px] mx-auto w-full px-6 md:px-16 z-10 flex flex-col flex-grow justify-center py-24"
		>
		  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
			<div className="lg:col-span-7 xl:col-span-6 flex flex-col">

			  {/* Eyebrow */}
			  <motion.div variants={itemVariants} className="flex items-center gap-3 mb-7">
				<div className="w-[3px] h-6 rounded-full" style={{ background: '#D4AF37' }} />
				<span className="tag-gold">
				  {isAr ? 'من قلب السودان، نبني المستقبل' : 'From the Heart of Sudan, Building the Future'}
				</span>
			  </motion.div>

			  {/* Headline */}
			  <motion.h1
				variants={itemVariants}
				className="text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.08] mb-7"
				style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
			  >
				{isAr ? (
				  <>
					وسط التحديات،{' '}
					<br />
					نكون{' '}
					<span className="shimmer-text">سندك التقني</span>
				  </>
				) : (
				  <>
					Amidst Challenges,
					<br />
					We Are Your{' '}
					<span className="shimmer-text">Technical Backbone</span>
				  </>
				)}
			  </motion.h1>

			  {/* Sub-copy */}
			  <motion.p
				variants={itemVariants}
				className="text-base md:text-lg mb-10 max-w-xl leading-relaxed"
				style={{ color: 'var(--text-muted)', fontWeight: 500 }}
			  >
				{isAr
				  ? 'نحن نفهم تماماً ما تمر به أعمالك. في أوبيركس ٢٤٩، نحن لسنا مجرد شركة برمجيات — بل إخوة وشركاء نجاح. نصمم أنظمة تحمي بياناتك، وتسهل إدارتك، لتعود أقوى مما كنت.'
				  : "We deeply understand what your business is going through. At OPERIX 249, we aren't just a software company — we are partners in your success. We design systems that protect your data and simplify your management, so you can return stronger than ever."}
			  </motion.p>

			  {/* CTAs */}
			  <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
				<button
				  onClick={() => setIsModalOpen(true)}
				  className="btn-primary flex items-center gap-2.5 group"
				>
				  <span>{isAr ? 'ابدأ رحلة التعافي معنا' : 'Start Your Recovery Journey'}</span>
				  <ArrowUpLeft
					size={18}
					className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
				  />
				</button>

				<a
				  href="https://www.operix-solutions.com"
				  target="_blank"
				  rel="noopener noreferrer"
				  className="btn-secondary flex items-center gap-2.5 group"
				>
				  <span>{isAr ? 'الموقع الرئيسي OPERIX' : 'Main OPERIX Branch'}</span>
				  <ExternalLink
					size={16}
					className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
				  />
				</a>
			  </motion.div>
			</div>
		  </div>
		</motion.div>

		{/* ── Stats Bar ── */}
		<motion.div
		  initial={{ opacity: 0, y: 24 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
		  className="w-full z-10 px-6 md:px-16 pb-8"
		  style={{ borderTop: '1px solid var(--border)' }}
		>
		  <div className="max-w-[1400px] mx-auto pt-6">
			<div
			  className="rounded-2xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-5 card-glow border-gradient-gold"
			  style={{ background: 'var(--surface)' }}
			>
			  {stats(isAr).map((stat, i) => (
				<motion.div
				  key={i}
				  initial={{ opacity: 0, y: 12 }}
				  animate={{ opacity: 1, y: 0 }}
				  transition={{ delay: 0.6 + i * 0.08 }}
				  className="flex items-center gap-4"
				>
				  <div
					className="p-2.5 rounded-xl shrink-0"
					style={{
					  background: 'var(--surface-2)',
					  border: '1px solid var(--border)',
					}}
				  >
					<stat.icon size={20} style={{ color: '#D4AF37' }} />
				  </div>
				  <div>
					<p
					  className="text-xl font-black tracking-tight leading-none mb-0.5"
					  style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
					>
					  {stat.val}
					</p>
					<p
					  className="text-xs font-medium leading-tight"
					  style={{ color: 'var(--text-muted)' }}
					>
					  {stat.label}
					</p>
				  </div>
				</motion.div>
			  ))}
			</div>
		  </div>
		</motion.div>
	  </section>

	  <StartProjectModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
	</>
  );
}