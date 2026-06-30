import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  Users, Settings, Activity, CreditCard, ExternalLink, 
  Building2, Globe, Landmark, ShieldCheck, 
  ImageIcon, X, ChevronRight, ChevronLeft, Info, GraduationCap,
  Monitor, ArrowUpRight
} from 'lucide-react';

// Dynamically import all assets from src/projects so Vite bundles them automatically
const assetModules = import.meta.glob('../projects/**/*.{png,jpg,jpeg,mp4}', { eager: true, query: '?url', import: 'default' });

const getAsset = (url: string) => {
  if (!url) return '';
  const path = url.replace('/projects', '../projects');
  return (assetModules as Record<string, string>)[path] || url;
};

// --- Interfaces ---
interface Preview {
  url: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

interface Platform {
  id: string;
  titleEn: string;
  titleAr: string;
  subEn: string;
  subAr: string;
  descEn: string;
  descAr: string;
  url: string;
  icon: React.ElementType;
  accentColor: string;
  status: string;
  image: string;
  previews: Preview[];
}

export default function Products() {
  const { isAr } = useLanguage();
  
  const [activePreview, setActivePreview] = useState<Platform | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;
  const thumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
	if (activePreview) {
	  document.body.style.overflow = 'hidden';
	  setImgLoaded(false);
	} else {
	  document.body.style.overflow = 'unset';
	}
	return () => { document.body.style.overflow = 'unset'; };
  }, [activePreview]);

  useEffect(() => {
	if (!thumbnailRef.current) return;
	const active = thumbnailRef.current.querySelector('[data-active="true"]');
	if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [currentImgIndex]);

  // ─── TIER 1: OPERIX CORE ECOSYSTEM ───
  const corePlatforms: Platform[] = [
	{
	  id: 'operations',
	  titleEn: 'OPERIX Operations',
	  titleAr: 'أوبيريكس لإدارة العمليات',
	  subEn: 'Fleet & Workforce Matrix',
	  subAr: 'إدارة أسطول العمليات والقوى العاملة',
	  descEn: 'The core operations hub replacing manual logbooks. Features comprehensive parking grids, valet management, and real-time gig workforce deployment tracking.',
	  descAr: 'محور العمليات الأساسي الذي يحل محل دفاتر السجلات اليدوية. إدارة متكاملة لمواقف السيارات، وتوجيه القوى العاملة الميدانية.',
	  url: 'https://www.ops.operix-solutions.online',
	  icon: Settings,
	  accentColor: '#F5A623',
	  status: isAr ? 'مباشر' : 'Live',
	  image: '/projects/ops.png',
	  previews: [
		{ url: '/projects/ops/exe-dash.png', titleEn: 'Executive Command Center', titleAr: 'مركز القيادة التنفيذية', descEn: 'High-level administrative hub for C-Suite approvals and operations overview.', descAr: 'مركز إداري رفيع المستوى لاعتمادات الإدارة التنفيذية وعمليات المراقبة.' },
		{ url: '/projects/ops/ops-dash.mp4', titleEn: 'Enterprise Operations Matrix', titleAr: 'مصفوفة عمليات المؤسسة', descEn: 'The central nervous system of the operations floor. Provides direct access to task hubs and fleet tracking.', descAr: 'العصب المركزي لطابق العمليات. يوفر وصولاً مباشراً لمراكز المهام وتتبع الأسطول.' },
		{ url: '/projects/ops/hr-ops.png', titleEn: 'Master HR & Roster Directory', titleAr: 'الدليل الشامل للورديات', descEn: 'Global administrative view of human capital and shift assignments.', descAr: 'عرض إداري شامل لتتبع المهام والورديات ومراقبة سجلات الحضور.' }
	  ]
	},
	{
	  id: 'fmis',
	  titleEn: 'OPERIX FMIS',
	  titleAr: 'أوبيريكس للإدارة المالية',
	  subEn: 'Corporate Ledger System',
	  subAr: 'نظام السجلات المالية للشركات',
	  descEn: 'Financial management ecosystem, corporate ledger reconciliation, ZATCA Phase 2 Integration Matrix, and automated budget loops.',
	  descAr: 'نظام إدارة مالية متكامل يشمل التسويات المحاسبية للشركات، متوافق بالكامل مع متطلبات هيئة الزكاة والدخل (ZATCA).',
	  url: 'https://www.fmis.operix-solutions.online',
	  icon: CreditCard,
	  accentColor: '#10B981',
	  status: 'ZATCA V2',
	  image: '/projects/fmis.png',
	  previews: [
		{ url: '/projects/fmis/dash-fmis.png', titleEn: 'Executive Dashboard & P&L', titleAr: 'لوحة القيادة التنفيذية والأرباح والخسائر', descEn: 'Real-time overview of profit and loss, revenue pipelines, and pending liabilities.', descAr: 'نظرة عامة لحظية على الأرباح والخسائر، وتدفقات الإيرادات، والالتزامات المعلقة.' },
		{ url: '/projects/fmis/quot-fmis.png', titleEn: 'Automated Quotation Builder', titleAr: 'منشئ عروض الأسعار التلقائي', descEn: 'Streamlined proposal generation tool that maps directly to the CRM.', descAr: 'أداة متطورة لإنشاء العروض ترتبط مباشرة بنظام إدارة علاقات العملاء.' }
	  ]
	},
	{
	  id: 'hris',
	  titleEn: 'OPERIX HRIS',
	  titleAr: 'أوبيريكس لإدارة الموارد البشرية',
	  subEn: 'Human Capital Infrastructure',
	  subAr: 'بنية رأس المال البشري',
	  descEn: 'Complete HR automation — attendance tracking, automated salary deductions, and seamless employee self-service pipelines.',
	  descAr: 'أتمتة كاملة للموارد البشرية — تسجيل الحضور والغياب، ومحرك احتساب الاستقطاعات التلقائي للرواتب.',
	  url: 'https://www.hris.operix-solutions.online',
	  icon: Users,
	  accentColor: '#6B73FF',
	  status: isAr ? 'مباشر' : 'Live',
	  image: '/projects/hris.png',
	  previews: [
		{ url: '/projects/hris/ai-scanner-hris.png', titleEn: 'AI-Powered CV Scanner', titleAr: 'الماسح الضوئي للسير الذاتية بالذكاء الاصطناعي', descEn: 'Automated recruitment engine utilizing AI to instantly parse and extract data from applicant CVs.', descAr: 'محرك توظيف آلي يعتمد على الذكاء الاصطناعي لقراءة السير الذاتية واستخراج البيانات منها.' },
		{ url: '/projects/hris/emp-pro-hris.png', titleEn: 'Master Employee Profiles', titleAr: 'الملفات الشاملة للموظفين', descEn: 'Centralized digital twin of the workforce. Stores identity documents and live records.', descAr: 'توأمة رقمية مركزية للقوى العاملة. تحفظ مستندات الهوية والسجلات الحية في خزانة آمنة واحدة.' }
	  ]
	},
	{
	  id: 'care',
	  titleEn: 'Shifa Healthcare',
	  titleAr: 'نظام شفاء للرعاية الصحية',
	  subEn: 'Clinical Management Core',
	  subAr: 'منظومة الإدارة السريرية',
	  descEn: 'Advanced hospital management ecosystem. End-to-end clinical workflow from patient intake through physician consultation and pharmacy.',
	  descAr: 'منظومة متكاملة لإدارة المستشفيات. سير عمل سريري شامل من استقبال المريض وصولاً إلى الاستشارة الطبية والصيدلية.',
	  url: 'https://www.care.operix-solutions.online',
	  icon: Activity,
	  accentColor: '#EF4444',
	  status: isAr ? 'مباشر' : 'Live',
	  image: '/projects/care.png',
	  previews: [
		{ url: '/projects/care/admin-care.png', titleEn: 'Command Center — Admin Console', titleAr: 'مركز القيادة — لوحة الإدارة', descEn: 'Enterprise analytics and access control hub. Real-time counters for active visits.', descAr: 'مركز تحليلات المؤسسة والتحكم في الوصول. عدادات لحظية للزيارات النشطة.' },
		{ url: '/projects/care/doc-workspace-care.png', titleEn: 'Doctor Workspace', titleAr: 'بيئة عمل الطبيب', descEn: 'Live triage board showing all patients awaiting the physician.', descAr: 'لوحة الفرز الحي التي تعرض جميع المرضى في انتظار الطبيب.' },
		{ url: '/projects/care/inside-file-care.png', titleEn: 'Patient History Record', titleAr: 'سجل المريض السريري', descEn: 'Complete longitudinal patient record rendering every encounter and diagnosis.', descAr: 'السجل الطولي الكامل للمريض. يرسم الجدول الزمني لكل زيارة والتشخيصات السابقة.' }
	  ]
	},
	{
	  id: 'edu',
	  titleEn: 'OPERIX Edu',
	  titleAr: 'أوبيريكس للتعليم',
	  subEn: 'School Management Platform',
	  subAr: 'منظومة الإدارة المدرسية',
	  descEn: 'Cloud-based school management platform. Combines academic governance with modern technology to empower school leaders.',
	  descAr: 'منصة سحابية متكاملة للتعليم. تجمع بين رصانة الإدارة الأكاديمية وسلاسة التقنية الحديثة.',
	  url: 'https://www.edu.operix-solutions.online',
	  icon: GraduationCap,
	  accentColor: '#06B6D4',
	  status: isAr ? 'مباشر' : 'Live',
	  image: '/projects/opx-edu-cover.jpeg',
	  previews: [
		{ url: '/projects/edu/edu-dash.png', titleEn: 'Executive Dashboard', titleAr: 'لوحة القيادة المدرسية', descEn: 'High-level administrative overview tracking active students and performance KPIs.', descAr: 'نظرة إدارية شاملة تتبع الطلاب النشطين ومؤشرات الأداء الأكاديمي.' },
		{ url: '/projects/edu/edu-studs.png', titleEn: 'Student Registry', titleAr: 'سجل الطلاب', descEn: 'Centralised digital registry storing academic history and class assignments.', descAr: 'سجل رقمي مركزي يحفظ السجل الأكاديمي والتكليفات الدراسية.' }
	  ]
	}
  ];

  // ─── TIER 2: CLIENT DEPLOYMENTS ───
  const clientProjects = [
	{
	  id: 'abdullah',
	  titleEn: 'Esnad Enterprise',
	  titleAr: 'منظومة إسناد للأعمال',
	  subEn: 'Institutional Portal',
	  subAr: 'البوابة المؤسسية',
	  descEn: 'Dedicated administrative portal mapped for institutional resource planning, outreach tracking, and digital archive management.',
	  descAr: 'بوابة إدارية مخصصة لتخطيط الموارد المؤسسية، وتتبع العمليات، وإدارة الأرشيف الرقمي.',
	  url: 'https://www.bin-abbas.operix-solutions.online',
	  icon: Landmark,
	  accentColor: '#8B5CF6',
	  image: '/projects/abbas.png'
	},
	{
	  id: 'community',
	  titleEn: 'Hased Community',
	  titleAr: 'بوابة حصاد المجتمعية',
	  subEn: 'Smart Community Hub',
	  subAr: 'مركز المجتمع الذكي',
	  descEn: 'Real estate and property management ecosystem handling resident requests, maintenance logs, and billing cycles.',
	  descAr: 'منظومة إدارة العقارات للتعامل مع طلبات السكان، وسجلات الصيانة، ودورات الفوترة.',
	  url: 'https://www.hasad.operix-solutions.online/Naseem_City',
	  icon: Building2,
	  accentColor: '#06B6D4',
	  image: '/projects/naseem.png'
	},
	{
	  id: 'mamey',
	  titleEn: 'Mamey Platform',
	  titleAr: 'منصة مامي',
	  subEn: 'General Trading & Logistics',
	  subAr: 'التجارة العامة والخدمات اللوجستية',
	  descEn: 'A South Sudanese enterprise specializing in the import, distribution, and supply of essential services.',
	  descAr: 'مؤسسة جنوب سودانية متخصصة في استيراد وتوزيع وتوريد المواد والخدمات اللوجستية.',
	  url: 'https://mamey.vercel.app',
	  icon: Globe,
	  accentColor: '#38bdf8',
	  image: '/projects/mamey.png'
	}
  ];

  // ─── MODAL CONTROLS ───
  const openPreview = useCallback((platform: Platform) => {
	setActivePreview(platform);
	setCurrentImgIndex(0);
  }, []);

  const nextImg = useCallback(() => {
	if (activePreview) {
	  setImgLoaded(false);
	  setCurrentImgIndex((prev) => (prev + 1) % activePreview.previews.length);
	}
  }, [activePreview]);

  const prevImg = useCallback(() => {
	if (activePreview) {
	  setImgLoaded(false);
	  setCurrentImgIndex((prev) => (prev === 0 ? activePreview.previews.length - 1 : prev - 1));
	}
  }, [activePreview]);

  useEffect(() => {
	const onKey = (e: KeyboardEvent) => {
	  if (!activePreview) return;
	  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextImg();
	  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevImg();
	  if (e.key === 'Escape') setActivePreview(null);
	};
	window.addEventListener('keydown', onKey);
	return () => window.removeEventListener('keydown', onKey);
  }, [activePreview, nextImg, prevImg]);

  const handleTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const handleTouchMove = (e: React.TouchEvent) => { setTouchEnd(e.targetTouches[0].clientX); };
  const handleTouchEnd = () => {
	if (!touchStart || !touchEnd) return;
	const dist = touchStart - touchEnd;
	if (dist > minSwipeDistance) nextImg();
	if (dist < -minSwipeDistance) prevImg();
  };

  return (
	<main className="min-h-screen pt-32 pb-24 px-6 bg-vercel-bg transition-colors duration-500">
	  <div className="max-w-7xl mx-auto">
		
		{/* ── Header ── */}
		<motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl mb-16 text-center md:text-left mx-auto md:mx-0">
		  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
			<div className="h-px w-10 bg-brand-gold" />
			<span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">
			  {isAr ? 'منظومة متكاملة' : 'Integrated Ecosystem'}
			</span>
		  </div>
		  <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 font-black font-serif text-vercel-base transition-colors duration-500">
			{isAr ? 'منظوماتنا التشغيلية' : 'Our Operational Ecosystem'}
		  </h1>
		  <p className="text-base md:text-lg leading-relaxed text-vercel-muted font-medium transition-colors duration-500">
			{isAr
			  ? 'صممنا أنظمتنا لتكون مرنة. يمكنك الحصول على منظومة متكاملة، أو اختيار برامج مستقلة تتناسب مع حجم أعمالك.'
			  : 'We designed our systems to be flexible. You can operate the entire ecosystem bundled, or select standalone modules that fit your scale.'}
		  </p>
		</motion.div>

		{/* ── Core Products Grid ── */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
		  {corePlatforms.map((p, i) => {
			const isHov = hoveredCard === p.id;
			return (
			  <motion.div
				key={p.id}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: i * 0.08 }}
				onMouseEnter={() => setHoveredCard(p.id)}
				onMouseLeave={() => setHoveredCard(null)}
				className="group relative rounded-[24px] border border-vercel-border bg-vercel-surface overflow-hidden transition-all duration-300 flex flex-col"
				style={{
				  borderColor: isHov ? `${p.accentColor}50` : 'var(--border)',
				  transform: isHov ? 'translateY(-4px)' : 'translateY(0)',
				  boxShadow: isHov ? `0 20px 40px ${p.accentColor}15` : 'none',
				}}
			  >
				{/* Image Cover */}
				<div className="h-48 relative overflow-hidden bg-vercel-bg/50 border-b border-vercel-border cursor-pointer" onClick={() => window.open(p.url, '_blank')}>
				  <img src={getAsset(p.image)} alt={p.titleEn} className="w-full h-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
				  
				  {/* Hover Overlay Gradient */}
				  <div className="absolute inset-0 transition-opacity duration-300 pointer-events-none" style={{ background: `linear-gradient(to top, ${p.accentColor}30 0%, transparent 80%)`, opacity: isHov ? 1 : 0 }} />
				  
				  {/* Status Badge */}
				  <div className="absolute top-4 left-4 bg-vercel-surface/90 backdrop-blur-md border border-vercel-border text-vercel-surface-text text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg transition-colors duration-500">
					<span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.accentColor }} />
					{p.status}
				  </div>
				</div>

				{/* Card Body */}
				<div className="p-6 flex flex-col flex-grow">
				  <div className="flex items-center gap-4 mb-4">
					<div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md transition-colors" style={{ background: isHov ? p.accentColor : 'var(--border)' }}>
					  <p.icon size={22} />
					</div>
					<div>
					  <h3 className="font-black text-vercel-surface-text text-lg leading-tight transition-colors duration-500">{isAr ? p.titleAr : p.titleEn}</h3>
					  <p className="text-[10px] font-bold uppercase tracking-[0.15em] mt-1" style={{ color: p.accentColor }}>{isAr ? p.subAr : p.subEn}</p>
					</div>
				  </div>
				  
				  <p className="text-sm text-vercel-muted leading-relaxed font-medium mb-6 flex-grow transition-colors duration-500">
					{isAr ? p.descAr : p.descEn}
				  </p>

				  {/* Actions */}
				  <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-vercel-border transition-colors duration-500">
					<a href={p.url} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-1.5 bg-vercel-bg border border-vercel-border text-vercel-surface-text py-3 rounded-xl font-bold text-[11px] tracking-wider uppercase transition-all hover:border-brand-gold hover:text-brand-gold">
					  {isAr ? "تشغيل مباشر" : "Launch"} <ArrowUpRight size={14} />
					</a>
					{p.previews.length > 0 && (
					  <button onClick={() => openPreview(p)} className="flex justify-center items-center gap-1.5 py-3 rounded-xl font-bold text-[11px] tracking-wider uppercase transition-all border" style={{ background: `${p.accentColor}10`, borderColor: `${p.accentColor}30`, color: p.accentColor }} onMouseEnter={e => { e.currentTarget.style.background = p.accentColor; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = `${p.accentColor}10`; e.currentTarget.style.color = p.accentColor; }}>
						<ImageIcon size={14} /> {isAr ? "معاينة النظام" : "Preview UI"}
					  </button>
					)}
				  </div>
				</div>
			  </motion.div>
			);
		  })}
		</div>

		{/* ── Client Projects Grid ── */}
		<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-8">
		  <div className="h-px w-10 bg-vercel-muted/50" />
		  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-vercel-muted">
			{isAr ? "مشاريع وتطبيقات العملاء" : "Featured Client Deployments"}
		  </span>
		  <div className="flex-1 h-px bg-vercel-border" />
		</motion.div>

		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
		  {clientProjects.map((proj, idx) => (
			<motion.div key={proj.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="group bg-vercel-surface border border-vercel-border rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-brand-gold transition-all duration-300">
			  <div className="h-32 relative overflow-hidden bg-vercel-bg cursor-pointer" onClick={() => window.open(proj.url, '_blank')}>
				<img src={getAsset(proj.image)} alt={proj.titleEn} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
			  </div>
			  <div className="p-6 flex flex-col flex-grow">
				<div className="w-10 h-10 rounded-lg flex items-center justify-center text-white -mt-10 mb-3 shadow-lg relative z-10" style={{ background: proj.accentColor }}>
				  <proj.icon size={18} />
				</div>
				<h3 className="font-black text-vercel-surface-text text-base">{isAr ? proj.titleAr : proj.titleEn}</h3>
				<p className="text-[10px] font-bold uppercase tracking-widest text-vercel-muted mt-0.5 mb-3">{isAr ? proj.subAr : proj.subEn}</p>
				<p className="text-xs text-vercel-muted leading-relaxed flex-grow">{isAr ? proj.descAr : proj.descEn}</p>
				<a href={proj.url} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest transition-colors hover:opacity-70" style={{ color: proj.accentColor }}>
				  {isAr ? "زيارة الموقع المباشر" : "Visit Live Portal"} <ExternalLink size={12} />
				</a>
			  </div>
			</motion.div>
		  ))}
		</div>
	  </div>

	  {/* ── PREVIEW MODAL (UI/UX Explorer) ── */}
	  <AnimatePresence>
		{activePreview && activePreview.previews.length > 0 && (
		  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
			{/* Dark Backdrop */}
			<div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setActivePreview(null)} />

			{/* Modal Shell */}
			<motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-[1400px] max-h-[90vh] flex flex-col z-10 bg-vercel-surface rounded-2xl border border-vercel-border shadow-2xl overflow-hidden transition-colors duration-500">
			  
			  {/* Top Bar */}
			  <div className="flex items-center justify-between px-6 py-4 border-b border-vercel-border shrink-0 bg-vercel-bg/50">
				<div className="flex items-center gap-3">
				  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md" style={{ background: activePreview.accentColor }}>
					<activePreview.icon size={16} />
				  </div>
				  <div>
					<span className="font-black text-vercel-surface-text text-sm block leading-none">{isAr ? activePreview.titleAr : activePreview.titleEn}</span>
					<span className="text-[9px] font-bold uppercase tracking-widest text-vercel-muted">{isAr ? "استعراض واجهة النظام" : "System UI Preview"}</span>
				  </div>
				</div>
				<button onClick={() => setActivePreview(null)} className="w-8 h-8 rounded-lg bg-vercel-bg border border-vercel-border text-vercel-muted flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
				  <X size={16} strokeWidth={2.5} />
				</button>
			  </div>

			  {/* Main Modal Layout */}
			  <div className="flex flex-col lg:flex-row flex-1 min-h-0">
				
				{/* Media Viewer */}
				<div className="relative flex-1 bg-black flex flex-col min-h-[300px] lg:min-h-0" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
				  <div className="flex-1 flex items-center justify-center p-4 relative group overflow-hidden">
					{!imgLoaded && <div className="absolute inset-4 rounded-xl bg-vercel-bg animate-pulse" />}
					
					{getAsset(activePreview.previews[currentImgIndex].url).endsWith('.mp4') ? (
					  <video key={`v-${currentImgIndex}`} src={getAsset(activePreview.previews[currentImgIndex].url)} controls autoPlay muted loop onLoadedData={() => setImgLoaded(true)} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
					) : (
					  <img key={`i-${currentImgIndex}`} src={getAsset(activePreview.previews[currentImgIndex].url)} alt="System Preview" onLoad={() => setImgLoaded(true)} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }} />
					)}

					{/* Navigation Arrows */}
					<button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-4 w-10 h-10 rounded-full bg-vercel-surface/80 hover:bg-brand-gold text-vercel-surface-text hover:text-black flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 border border-vercel-border shadow-xl backdrop-blur-sm z-10">
					  {isAr ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
					</button>
					<button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-4 w-10 h-10 rounded-full bg-vercel-surface/80 hover:bg-brand-gold text-vercel-surface-text hover:text-black flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 border border-vercel-border shadow-xl backdrop-blur-sm z-10">
					  {isAr ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
					</button>
				  </div>

				  {/* Thumbnail Strip */}
				  <div ref={thumbnailRef} className="flex gap-2 overflow-x-auto px-4 py-3 border-t border-vercel-border bg-vercel-surface/50 shrink-0 custom-scrollbar">
					{activePreview.previews.map((p, i) => (
					  <button key={i} data-active={i === currentImgIndex} onClick={() => { setImgLoaded(false); setCurrentImgIndex(i); }} className="shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200" style={{ borderColor: i === currentImgIndex ? activePreview.accentColor : 'transparent', opacity: i === currentImgIndex ? 1 : 0.5 }}>
						{getAsset(p.url).endsWith('.mp4') ? (
						  <video src={getAsset(p.url)} className="w-full h-full object-cover" muted />
						) : (
						  <img src={getAsset(p.url)} alt="" className="w-full h-full object-cover" />
						)}
					  </button>
					))}
				  </div>
				</div>

				{/* Description Panel */}
				<div className="lg:w-96 bg-vercel-surface border-t lg:border-t-0 lg:border-l border-vercel-border flex flex-col shrink-0 transition-colors duration-500">
				  <div className="p-6 border-b border-vercel-border bg-vercel-bg/30">
					<span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-vercel-muted mb-3">
					  <Info size={12} style={{ color: activePreview.accentColor }} /> {isAr ? "الوحدة التشغيلية" : "Operational Module"}
					</span>
					<h4 key={currentImgIndex} className="font-serif font-black text-xl text-vercel-surface-text leading-tight mb-4">
					  {isAr ? activePreview.previews[currentImgIndex].titleAr : activePreview.previews[currentImgIndex].titleEn}
					</h4>
					{/* Progress Bar */}
					<div className="h-1 w-full bg-vercel-border rounded-full overflow-hidden">
					  <div className="h-full transition-all duration-300" style={{ background: activePreview.accentColor, width: `${((currentImgIndex + 1) / activePreview.previews.length) * 100}%` }} />
					</div>
				  </div>
				  
				  <div className="flex-1 overflow-y-auto p-6 text-sm text-vercel-muted font-medium leading-relaxed">
					{isAr ? activePreview.previews[currentImgIndex].descAr : activePreview.previews[currentImgIndex].descEn}
				  </div>

				  <div className="p-6 border-t border-vercel-border bg-vercel-bg/30 flex gap-3">
					<a href={activePreview.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 text-white py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all hover:opacity-90 shadow-md" style={{ background: activePreview.accentColor }}>
					  {isAr ? "دخول المنصة" : "Launch"} <ExternalLink size={14} />
					</a>
				  </div>
				</div>

			  </div>
			</motion.div>
		  </motion.div>
		)}
	  </AnimatePresence>

	</main>
  );
}