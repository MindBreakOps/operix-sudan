import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, AtSign, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

// Custom Social SVGs
const YTIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>);
const XIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/></svg>);
const FBIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const IGIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);

export default function Footer() {
  const { isAr } = useLanguage();

  const contacts = [
	{ email: 'info@operix-solutions.com', loc: 'Riyadh, SA & Khartoum, SD', label: isAr ? 'المقر الرئيسي' : 'Headquarters' },
	{ email: 'support@operix-solutions.com', loc: 'Riyadh, SA & Khartoum, SD', label: isAr ? 'الدعم التقني' : 'Technical Support' },
	{ email: 'subscription@operix-solutions.com', loc: 'Riyadh, SA & Khartoum, SD', label: isAr ? 'الاشتراكات' : 'Subscriptions' },
	{ email: 'sudan.office@operix-solutions.com', loc: 'Khartoum, Sudan', label: isAr ? 'المكتب السوداني' : 'Sudan Office' },
  ];

  const socials = [
	{ href: 'https://whatsapp.com/channel/0029VbCjmxEChq6KQEBPiX1C', Icon: MessageCircle, bg: 'bg-[#25D366]', title: 'WhatsApp Channel' },
	{ href: 'https://wa.me/966500823643', Icon: Phone, bg: 'bg-[#128C7E]', title: 'WhatsApp Business' },
	{ href: 'https://x.com/operixsolutions?s=11', Icon: XIcon, bg: 'bg-black border border-vercel-border', title: 'X (Twitter)' },
	{ href: 'https://www.facebook.com/share/1BoQkRsiJB/', Icon: FBIcon, bg: 'bg-[#1877F2]', title: 'Facebook' },
	{ href: 'https://www.instagram.com/operix.solutions/', Icon: IGIcon, bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]', title: 'Instagram' },
	{ href: 'https://www.youtube.com/@Operix.Solutions', Icon: YTIcon, bg: 'bg-[#FF0000]', title: 'YouTube' },
	{ href: 'https://www.threads.com/@operix.solutions', Icon: AtSign, bg: 'bg-black border border-vercel-border', title: 'Threads' },
  ];

  // Fast direct links matching the Header
  const quickLinks = [
	{ path: '/', labelEn: 'Home', labelAr: 'الرئيسية' },
	{ path: '/about', labelEn: 'About', labelAr: 'من نحن' },
	{ path: '/services', labelEn: 'Services', labelAr: 'خدماتنا' },
	{ path: '/products', labelEn: 'Products', labelAr: 'منتجاتنا' },
	{ path: '/contact', labelEn: 'Contact', labelAr: 'تواصل' },
  ];

  return (
	<footer className="w-full bg-vercel-surface border-t border-vercel-border transition-colors duration-500">
	  <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
		  
		  {/* Brand & Contacts (Adjusted to col-span-4 to make room for links) */}
		  <div className="lg:col-span-4 space-y-8">
			<Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-1">
			  <span className="text-vercel-surface-text">OPERIX</span> 
			  <span className="text-brand-yellow drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">249</span>
			</Link>
			<p className="text-sm text-vercel-muted leading-relaxed font-medium max-w-md">
			  {isAr 
				? 'مجموعة قيادة مؤسسية موحدة تنسق العمليات، المسارات الطبية، ودورات حياة رأس المال البشري في مركز تحكم واحد.' 
				: 'A unified enterprise command suite coordinating operations, medical workflows, and human capital life-cycles into a singular control core.'} 
			</p>
			<div className="space-y-4">
			  {contacts.map(({ email, loc, label }) => (
				<div key={email} className="group">
				  <span className="text-[10px] font-black uppercase tracking-widest text-brand-yellow/80">{label}</span>
				  <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm font-mono text-vercel-surface-text hover:text-brand-yellow transition-colors mt-1">
					<Mail size={14} className="text-brand-yellow/80" /> {email}
				  </a>
				  <div className="flex items-center gap-1.5 mt-1 pl-5">
					<MapPin size={12} className="text-vercel-muted" />
					<span className="text-[10px] font-bold uppercase tracking-wider text-vercel-muted">{loc}</span>
				  </div>
				</div>
			  ))}
			</div>
		  </div>

		  {/* Quick Links */}
		  <div className="lg:col-span-3 space-y-6 lg:pl-8">
			<h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-yellow">
			  {isAr ? 'روابط سريعة' : 'QUICK LINKS'}
			</h4>
			<div className="flex flex-col space-y-4">
			  {quickLinks.map((link, idx) => (
				<Link 
				  key={idx} 
				  to={link.path} 
				  className="text-sm font-bold text-vercel-muted hover:text-brand-yellow transition-colors w-fit flex items-center gap-2"
				>
				  <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow/50"></div>
				  {isAr ? link.labelAr : link.labelEn}
				</Link>
			  ))}
			</div>
		  </div>

		  {/* Social Links & Status */}
		  <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between">
			<div className="w-full lg:text-right">
			  <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-yellow mb-4">
				{isAr ? 'التواصل الاجتماعي' : 'SOCIAL CONNECT'}
			  </h4>
			  <div className="flex flex-wrap gap-3 lg:justify-end">
				{socials.map(({ href, Icon, bg, title }, idx) => (
				  <a key={idx} href={href} target="_blank" rel="noreferrer" title={title} className={`w-10 h-10 flex items-center justify-center rounded-xl shadow-lg text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 ${bg}`}>
					<Icon />
				  </a>
				))}
			  </div>
			</div>

			<div className="mt-10 lg:mt-0 flex flex-col sm:flex-row items-center gap-4 text-xs font-semibold text-vercel-muted">
			  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900/10 border border-emerald-500/20 text-emerald-500">
				<span className="relative flex h-2 w-2 shrink-0">
				  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
				  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
				</span>
				{isAr ? 'جميع الأنظمة تعمل' : 'All Systems Operational'}
			  </div>
			  
			  {/* Updated Copyright string */}
			  <p className="text-center sm:text-left">
				&copy; {new Date().getFullYear()} {isAr ? 'جميع حقوق الطبع والنشر محفوظة. أوبيركس سوليوشنز.' : 'All copyrights reserved. OPERIX Solutions.'}
			  </p>
			  <Globe size={14} className="text-brand-yellow hidden sm:block" />
			</div>
		  </div>
		  
		</div>
	  </div>
	</footer>
  );
}