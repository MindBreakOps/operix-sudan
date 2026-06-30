import React from 'react';
import { Mail, Phone, MapPin, AtSign, Globe, ArrowUpRight, Settings, Users, FileCheck, Activity, GraduationCap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ── Custom Social Icons ── */
const YTIcon  = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>);
const XIcon   = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/></svg>);
const FBIcon  = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const IGIcon  = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const WAIcon  = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>);

export default function Footer() {
  const { isAr } = useLanguage();

  const cloudPortals = [
	{ href: 'https://www.ops.operix-solutions.online',  Icon: Settings,      labelEn: 'OPERIX Operations', labelAr: 'أوبيريكس للعمليات' },
	{ href: 'https://www.hris.operix-solutions.online', Icon: Users,         labelEn: 'OPERIX HRIS',       labelAr: 'أوبيريكس للموارد' },
	{ href: 'https://www.fmis.operix-solutions.online', Icon: FileCheck,     labelEn: 'OPERIX FMIS',       labelAr: 'أوبيريكس للمالية' },
	{ href: 'https://www.care.operix-solutions.online', Icon: Activity,      labelEn: 'Shifa Care',        labelAr: 'نظام شفاء' },
	{ href: 'https://www.edu.operix-solutions.online',  Icon: GraduationCap, labelEn: 'OPERIX Edu',        labelAr: 'أوبيريكس للتعليم' },
  ];

  const contacts = [
	{ email: 'info@operix-solutions.com',         labelEn: 'Headquarters',      labelAr: 'المقر الرئيسي',      loc: 'Riyadh, SA · Khartoum, SD' },
	{ email: 'support@operix-solutions.com',      labelEn: 'Technical Support', labelAr: 'الدعم التقني',       loc: 'Riyadh, SA · Khartoum, SD' },
	{ email: 'subscription@operix-solutions.com', labelEn: 'Subscriptions',     labelAr: 'الاشتراكات',         loc: 'Riyadh, SA · Khartoum, SD' },
	{ email: 'sudan.office@operix-solutions.com', labelEn: 'Sudan Office',      labelAr: 'المكتب السوداني',    loc: 'Khartoum, Sudan'           },
  ];

  const socials = [
	{ href: 'https://whatsapp.com/channel/0029VbCjmxEChq6KQEBPiX1C', Icon: WAIcon,        bg: '#25D366',  title: 'WhatsApp Channel'  },
	{ href: 'https://wa.me/966500823643',                            Icon: Phone,          bg: '#128C7E',  title: 'WhatsApp Business' },
	{ href: 'https://x.com/operixsolutions?s=11',                    Icon: XIcon,          bg: '#1A1A2E',  title: 'X (Twitter)'       },
	{ href: 'https://www.facebook.com/share/1BoQkRsiJB/',            Icon: FBIcon,         bg: '#1877F2',  title: 'Facebook'          },
	{ href: 'https://www.instagram.com/operix.solutions/',           Icon: IGIcon,         bg: 'none',     title: 'Instagram'         },
	{ href: 'https://www.youtube.com/@Operix.Solutions',             Icon: YTIcon,         bg: '#EF4444',  title: 'YouTube'           },
	{ href: 'https://www.threads.com/@operix.solutions',             Icon: AtSign,         bg: '#1A1A2E',  title: 'Threads'           },
  ];

  const quickLinks = [
	{ path: '/',         labelEn: 'Home',     labelAr: 'الرئيسية' },
	{ path: '/about',    labelEn: 'About',    labelAr: 'من نحن'   },
	{ path: '/services', labelEn: 'Services', labelAr: 'خدماتنا' },
	{ path: '/products', labelEn: 'Products', labelAr: 'منتجاتنا'},
	{ path: '/contact',  labelEn: 'Contact',  labelAr: 'تواصل'    },
  ];

  return (
	<footer
	  className="w-full border-t"
	  style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
	>
	  {/* Top divider accent */}
	  <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

	  {/* ── LIVE CLOUD PORTALS STRIP ── */}
	  <div className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
		<div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-col lg:flex-row items-center gap-5 justify-center lg:justify-between">
		  <span className={`uppercase text-brand-gold ${isAr ? 'font-black text-[12px] tracking-wide' : 'font-black text-[10px] tracking-[0.2em]'}`}>
			{isAr ? 'البوابات السحابية المباشرة' : 'Live Cloud Portals'}
		  </span>
		  <div className="flex flex-wrap items-center justify-center gap-3">
			{cloudPortals.map(({ href, Icon, labelEn, labelAr }) => (
			  <a
				key={href}
				href={href}
				target="_blank"
				rel="noreferrer"
				className="group flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200"
				style={{
				  borderColor: 'var(--border)',
				  background: 'transparent',
				}}
				onMouseEnter={(e) => {
				  e.currentTarget.style.borderColor = '#D4AF37';
				  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.05)';
				}}
				onMouseLeave={(e) => {
				  e.currentTarget.style.borderColor = 'var(--border)';
				  e.currentTarget.style.background = 'transparent';
				}}
			  >
				<Icon size={15} className="transition-colors duration-200" style={{ color: '#D4AF37' }} />
				<span className={`transition-colors duration-200 ${isAr ? 'text-xs font-black text-vercel-text opacity-90' : 'text-[10px] font-bold tracking-wide'}`} style={{ color: isAr ? '' : 'var(--text)' }}>
				  {isAr ? labelAr : labelEn}
				</span>
			  </a>
			))}
		  </div>
		</div>
	  </div>

	  <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

		  {/* ── Brand & Contacts ── */}
		  <div className="lg:col-span-5 space-y-8">
			<div>
			  {/* Force LTR direction here so "249" is always on the right side of "OPERIX" */}
			  <Link to="/" dir="ltr" className="inline-flex items-center gap-1.5 mb-4">
				<span
				  className="text-2xl font-bold tracking-wide"
				  style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
				>
				  OPERIX
				</span>
				<span
				  className="text-2xl font-bold"
				  style={{
					fontFamily: 'var(--font-display)',
					background: 'linear-gradient(135deg,#D4AF37,#F5A623)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					backgroundClip: 'text',
				  }}
				>
				  249
				</span>
			  </Link>
			  <p
				className={`leading-relaxed max-w-sm ${isAr ? 'text-base font-semibold text-vercel-text/90' : 'text-sm font-medium text-vercel-muted'}`}
				style={{ color: isAr ? '' : 'var(--text-muted)' }}
			  >
				{isAr
				  ? 'مجموعة قيادة مؤسسية موحدة تنسق العمليات، المسارات الطبية، ودورات حياة رأس المال البشري في مركز تحكم واحد.'
				  : 'A unified enterprise command suite coordinating operations, medical workflows, and human capital lifecycles into a singular control core.'}
			  </p>
			</div>

			{/* Contact list */}
			<div className="space-y-6">
			  {contacts.map(({ email, labelEn, labelAr, loc }) => (
				<div key={email}>
				  <span
					className={`uppercase text-brand-gold ${isAr ? 'font-black text-[12px] tracking-wide' : 'font-black text-[10px] tracking-[0.2em]'}`}
				  >
					{isAr ? labelAr : labelEn}
				  </span>
				  <a
					href={`mailto:${email}`}
					className="flex items-center gap-2 text-sm font-mono mt-1.5 transition-colors duration-200"
					style={{ color: 'var(--text)' }}
					onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
					onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
				  >
					<Mail size={14} style={{ color: '#D4AF37', opacity: 0.9, flexShrink: 0 }} />
					{email}
				  </a>
				  <div className="flex items-center gap-1.5 mt-1.5 pl-6">
					<MapPin size={12} style={{ color: 'var(--text-subtle)', flexShrink: 0 }} />
					<span
					  className={`uppercase tracking-wider ${isAr ? 'font-bold text-[11px]' : 'font-semibold text-[10px]'}`}
					  style={{ color: 'var(--text-subtle)' }}
					>
					  {loc}
					</span>
				  </div>
				</div>
			  ))}
			</div>
		  </div>

		  {/* ── Quick Links ── */}
		  <div className="lg:col-span-2 space-y-6">
			<h4
			  className={`uppercase text-brand-gold ${isAr ? 'font-black text-[12px] tracking-wide' : 'font-black text-[10px] tracking-[0.2em]'}`}
			>
			  {isAr ? 'روابط سريعة' : 'Quick Links'}
			</h4>
			<nav className="flex flex-col gap-4 mt-2">
			  {quickLinks.map((link) => (
				<Link
				  key={link.path}
				  to={link.path}
				  className={`group flex items-center gap-2 w-fit transition-colors duration-200 ${isAr ? 'text-[15px] font-bold text-vercel-text/80' : 'text-sm font-semibold'}`}
				  style={{ color: isAr ? '' : 'var(--text-muted)' }}
				  onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
				  onMouseLeave={(e) => (e.currentTarget.style.color = isAr ? 'var(--text)' : 'var(--text-muted)')}
				>
				  <ArrowUpRight
					size={14}
					className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
					style={{ color: '#D4AF37' }}
				  />
				  {isAr ? link.labelAr : link.labelEn}
				</Link>
			  ))}
			</nav>
		  </div>

		  {/* ── Social + Status ── */}
		  <div className="lg:col-span-5 flex flex-col gap-8">
			<div>
			  <h4
				className={`uppercase text-brand-gold mb-5 ${isAr ? 'font-black text-[12px] tracking-wide' : 'font-black text-[10px] tracking-[0.2em]'}`}
			  >
				{isAr ? 'التواصل الاجتماعي' : 'Social Connect'}
			  </h4>
			  <div className="flex flex-wrap gap-3">
				{socials.map(({ href, Icon, bg, title }, idx) => (
				  <motion.a
					key={idx}
					href={href}
					target="_blank"
					rel="noreferrer"
					title={title}
					whileHover={{ scale: 1.1, y: -2 }}
					whileTap={{ scale: 0.95 }}
					className="w-11 h-11 flex items-center justify-center rounded-xl text-white shadow-md transition-shadow duration-300 hover:shadow-lg"
					style={{
					  background:
						bg === 'none'
						  ? 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'
						  : bg,
					}}
				  >
					<Icon />
				  </motion.a>
				))}
			  </div>
			</div>

			{/* System status */}
			<div
			  className="flex items-center gap-2.5 px-4 py-3 rounded-xl self-start mt-2"
			  style={{
				background: 'rgba(16, 185, 129, 0.08)',
				border: '1px solid rgba(16, 185, 129, 0.2)',
			  }}
			>
			  <span className="relative flex h-2.5 w-2.5 shrink-0">
				<span
				  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
				  style={{ background: '#10B981' }}
				/>
				<span
				  className="relative inline-flex rounded-full h-2.5 w-2.5"
				  style={{ background: '#10B981' }}
				/>
			  </span>
			  <span className={`font-black ${isAr ? 'text-[13px]' : 'text-xs'}`} style={{ color: '#10B981' }}>
				{isAr ? 'جميع الأنظمة تعمل' : 'All Systems Operational'}
			  </span>
			</div>
		  </div>
		</div>

		{/* ── Bottom bar ── */}
		<div
		  className={`mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold ${isAr ? 'text-[13px] text-vercel-text/70' : 'text-xs'}`}
		  style={{ borderTop: '1px solid var(--border)', color: isAr ? '' : 'var(--text-subtle)' }}
		>
		  <p>
			&copy; {new Date().getFullYear()}{' '}
			{isAr
			  ? 'جميع حقوق الطبع والنشر محفوظة — أوبيركس سوليوشنز'
			  : 'All rights reserved — OPERIX Solutions'}
		  </p>
		  <div className="flex items-center gap-2" dir="ltr">
			<Globe size={14} style={{ color: '#D4AF37' }} />
			<span>operix-solutions.com</span>
		  </div>
		</div>
	  </div>
	</footer>
  );
}