import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  Users, Settings, Activity, CreditCard, ExternalLink, 
  Building2, Globe, Landmark, ImageIcon, X, ChevronRight, ChevronLeft, Info, GraduationCap, ArrowUpRight
} from 'lucide-react';

const assetModules = import.meta.glob('../projects/**/*.{png,jpg,jpeg,mp4}', { eager: true, query: '?url', import: 'default' });

const getAsset = (url: string) => {
  if (!url) return '';
  const path = url.replace('/projects', '../projects');
  return (assetModules as Record<string, string>)[path] || url;
};

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

  // ─── TIER 1: OPERIX CORE ECOSYSTEM (Fully Restored) ───
  const corePlatforms: Platform[] = [
	{
	  id: 'operations',
	  titleEn: 'OPERIX Operations',
	  titleAr: 'أوبيريكس لإدارة العمليات',
	  subEn: 'Fleet & Workforce Matrix',
	  subAr: 'إدارة أسطول العمليات والقوى العاملة',
	  descEn: 'The core operations hub replacing manual logbooks. Features comprehensive ANPR parking, valet management, and real-time gig workforce deployment tracking.',
	  descAr: 'محور العمليات الأساسي الذي يحل محل دفاتر السجلات اليدوية. إدارة متكاملة لمواقف السيارات بكاميرات التعرف الذكي (ANPR)، وتوجيه القوى العاملة.',
	  url: 'https://www.ops.operix-solutions.online',
	  icon: Settings,
	  accentColor: '#ef4444',
	  status: 'LIVE TELEMETRY',
	  image: '/projects/ops.png',
	  previews: [
		{ url: '/projects/ops/exe-dash.png', titleEn: 'Executive Command Center', titleAr: 'مركز القيادة التنفيذية', descEn: 'High-level administrative hub for C-Suite approvals, IT operations, and identity access management across the entire enterprise.', descAr: 'مركز إداري رفيع المستوى لاعتمادات الإدارة التنفيذية، وعمليات تقنية المعلومات، وإدارة هويات الوصول عبر المؤسسة.' },
		{ url: '/projects/ops/ops-dash.mp4', titleEn: 'Enterprise Operations Matrix', titleAr: 'مصفوفة عمليات المؤسسة', descEn: 'The central nervous system of the operations floor. Provides direct access to ANPR scanners, task hubs, inventory control, and fleet tracking modules.', descAr: 'العصب المركزي لطابق العمليات. يوفر وصولاً مباشراً لماسحات ANPR، ومراكز المهام، والتحكم في المخزون، ووحدات تتبع الأسطول.' },
		{ url: '/projects/ops/ai-email-ops.png', titleEn: 'AI-Powered Communications Core', titleAr: 'مركز الاتصالات المدعوم بالذكاء الاصطناعي', descEn: 'Smart email drafting utilizing generative AI. Features pre-configured corporate templates for official notices, updates, and HR compliance letters.', descAr: 'صياغة ذكية لرسائل البريد الإلكتروني باستخدام الذكاء الاصطناعي التوليدي. يحتوي على قوالب مؤسسية مسبقة الإعداد للإشعارات الرسمية والتحديثات.' },
		{ url: '/projects/ops/analyticsandreports-ops.png', titleEn: 'Advanced Analytics & Reporting', titleAr: 'التحليلات المتقدمة والتقارير', descEn: 'Dynamic data visualization and custom report generation. Filter vast datasets across the enterprise and export directly to Excel or secure PDF formats.', descAr: 'تصوير مرئي ديناميكي للبيانات وإنشاء تقارير مخصصة. تصفية مجموعات البيانات الضخمة عبر المؤسسة وتصديرها مباشرة بتنسيقات إكسل أو PDF آمنة.' },
		{ url: '/projects/ops/crm-ops.png', titleEn: 'CRM & Lead Pipeline Matrix', titleAr: 'مصفوفة إدارة علاقات العملاء (CRM)', descEn: 'Centralized marketing workspace tracking ad spend, campaign ROI, and lead conversion funnels in real-time.', descAr: 'مساحة عمل تسويقية مركزية لتتبع الإنفاق الإعلاني، وعائد الاستثمار للحملات، ومسارات تحويل العملاء المحتملين في الوقت الفعلي.' },
		{ url: '/projects/ops/doc-generateandsendemail-ops.png', titleEn: 'Automated Document Generator', titleAr: 'منشئ المستندات المؤسسية الآلي', descEn: 'Instantly generate official employment offers, contracts, and internal memos complete with dynamic variables and secure ledger archiving.', descAr: 'إنشاء فوري لعروض العمل الرسمية والعقود والمذكرات الداخلية مع متغيرات ديناميكية وأرشفة آمنة في السجل.' },
		{ url: '/projects/ops/external-standaloneapps-ops.png', titleEn: 'Decentralized Portals & QR Gateway', titleAr: 'البوابات اللامركزية ورموز الاستجابة السريعة', descEn: 'Manage public-facing touchpoints and standalone apps for gig workers, field staff, and VIP valet clients via generated access links and QR codes.', descAr: 'إدارة نقاط الاتصال العامة والتطبيقات المستقلة للعاملين المستقلين والموظفين الميدانيين وعملاء خدمة صف السيارات (Valet) عبر روابط وصول ورموز QR.' },
		{ url: '/projects/ops/facilitandtraining-ops.png', titleEn: 'Facility Configuration & Academy Hub', titleAr: 'تهيئة المرافق وإدارة الأكاديميات', descEn: 'Spin up and configure complex project environments, set daily operational targets, and manage internal training course capacities.', descAr: 'إنشاء وتهيئة بيئات مشاريع معقدة، وتحديد أهداف التشغيل اليومية، وإدارة السعة الاستيعابية للدورات التدريبية الداخلية.' },
		{ url: '/projects/ops/hr-ops.png', titleEn: 'Master HR & Roster Directory', titleAr: 'الدليل الشامل للموارد البشرية والورديات', descEn: 'Global administrative view of human capital. Track shift assignments, monitor active timesheets, and execute top-level personnel overrides.', descAr: 'عرض إداري شامل لرأس المال البشري. تتبع المهام والورديات، ومراقبة سجلات الحضور النشطة، وتنفيذ الإجراءات الإدارية العليا للموظفين.' },
		{ url: '/projects/ops/it-ops.png', titleEn: 'IT IAM & Infrastructure Control', titleAr: 'عمليات تقنية المعلومات وإدارة الهويات', descEn: 'Secure Identity and Access Management (IAM) panel. Provision user roles, manage system permissions, and monitor core infrastructure health.', descAr: 'لوحة آمنة لإدارة الهويات والوصول (IAM). منح أدوار المستخدمين، وإدارة صلاحيات النظام، ومراقبة صحة البنية التحتية الأساسية.' },
		{ url: '/projects/ops/performance-ops.png', titleEn: 'Live Operational KPI Telemetry', titleAr: 'القياس اللحظي لمؤشرات الأداء (KPIs)', descEn: 'High-level overview of global enterprise metrics, tracking ANPR traffic flow, active subscribers, and operational revenue in real time.', descAr: 'نظرة عامة رفيعة المستوى على مقاييس المؤسسة، تتبع تدفق حركة المرور (ANPR)، والمشتركين النشطين، والإيرادات التشغيلية في الوقت الفعلي.' },
		{ url: '/projects/ops/setshift-ops.png', titleEn: 'Geofenced Shift Orchestration', titleAr: 'إدارة الورديات بنطاق جغرافي (Geofencing)', descEn: 'Pinpoint workforce deployment using interactive mapping and strict GPS radius limits to guarantee accurate on-site field staff attendance.', descAr: 'التوجيه الدقيق للقوى العاملة باستخدام الخرائط التفاعلية وحدود نطاق جغرافي صارمة لضمان دقة حضور الموظفين الميدانيين في الموقع.' }
	  ]
	},
	{
	  id: 'fmis',
	  titleEn: 'OPERIX FMIS',
	  titleAr: 'أوبيريكس للإدارة المالية',
	  subEn: 'Corporate Ledger System',
	  subAr: 'نظام السجلات المالية للشركات',
	  descEn: 'Financial management ecosystem, corporate ledger reconciliation, ZATCA Phase 2 Integration Matrix, and automated budget loops.',
	  descAr: 'نظام إدارة مالية متكامل يشمل التسويات المحاسبية للشركات، متوافق بالكامل مع متطلبات المرحلة الثانية لهيئة الزكاة والدخل (ZATCA).',
	  url: 'https://www.fmis.operix-solutions.online',
	  icon: CreditCard,
	  accentColor: '#10b981',
	  status: 'ZATCA V2',
	  image: '/projects/fmis.png',
	  previews: [
		{ url: '/projects/fmis/dash-fmis.png', titleEn: 'Executive Dashboard & P&L', titleAr: 'لوحة القيادة التنفيذية والأرباح والخسائر', descEn: 'Real-time overview of profit and loss, revenue pipelines, and pending liabilities. Provides C-level executives with immediate financial health metrics.', descAr: 'نظرة عامة لحظية على الأرباح والخسائر، وتدفقات الإيرادات، والالتزامات المعلقة. توفر للإدارة التنفيذية مؤشرات فورية للصحة المالية.' },
		{ url: '/projects/fmis/opx-ai-fmis.png', titleEn: 'OPERIX AI Copilot Integration', titleAr: 'مساعد الذكاء الاصطناعي المدمج', descEn: 'Embedded AI assistant that analyzes financial databases, automates complex module navigation, and generates live telemetry reports on command.', descAr: 'مساعد ذكاء اصطناعي مدمج يحلل قواعد البيانات المالية، ويقوم بأتمتة التنقل المعقد بين الوحدات، ويولد تقارير لحظية عند الطلب.' },
		{ url: '/projects/fmis/quot-fmis.png', titleEn: 'Automated Quotation Builder', titleAr: 'منشئ عروض الأسعار التلقائي', descEn: 'Streamlined proposal generation tool that maps directly to the CRM, allowing quick drafting, approval, and dispatching of corporate estimates.', descAr: 'أداة متطورة لإنشاء العروض ترتبط مباشرة بنظام إدارة علاقات العملاء (CRM)، مما يتيح صياغة واعتماد وإرسال التقديرات المالية للشركات بسرعة.' },
		{ url: '/projects/fmis/help-fmis.png', titleEn: 'System Architecture & Help Matrix', titleAr: 'هيكلية النظام والمساعدة الذكية', descEn: 'Comprehensive, built-in documentation and mission-control mapping that guides users through GL, WBS, and Payroll engine workflows.', descAr: 'وثائق ومصفوفة توجيه شاملة مدمجة ترشد المستخدمين عبر سير عمل دفتر الأستاذ العام، وهيكلة المشاريع (WBS)، ومحرك مسيرات الرواتب.' }
	  ]
	},
	{
	  id: 'hris',
	  titleEn: 'OPERIX HRIS',
	  titleAr: 'أوبيريكس لإدارة الموارد البشرية',
	  subEn: 'Human Capital Infrastructure',
	  subAr: 'بنية رأس المال البشري',
	  descEn: 'Complete HR automation — GPS-enforced attendance tracking, automated salary deductions, and seamless employee self-service pipelines.',
	  descAr: 'أتمتة كاملة للموارد البشرية — تسجيل الحضور والغياب بنطاق الحماية الجغرافي (GPS)، ومحرك احتساب الاستقطاعات التلقائي للرواتب.',
	  url: 'https://www.hris.operix-solutions.online',
	  icon: Users,
	  accentColor: '#6366f1',
	  status: 'LIVE',
	  image: '/projects/hris.png',
	  previews: [
		{ url: '/projects/hris/ai-scanner-hris.png', titleEn: 'AI-Powered CV Scanner', titleAr: 'الماسح الضوئي للسير الذاتية بالذكاء الاصطناعي', descEn: 'Automated recruitment engine utilizing Edge AI to instantly parse, score, and extract data from applicant CVs, mapping them directly to open requisitions.', descAr: 'محرك توظيف آلي يعتمد على الذكاء الاصطناعي الطرفي لقراءة السير الذاتية واستخراج البيانات منها وتقييمها فورياً، مع ربطها مباشرة بالوظائف الشاغرة.' },
		{ url: '/projects/hris/resutl-ats-hris.png', titleEn: 'AI Scan Results & Match Analysis', titleAr: 'نتائج المسح الضوئي وتحليل التطابق', descEn: 'Detailed breakdown of candidate profiles, showcasing AI-generated skill gap analysis and automated role matching probabilities.', descAr: 'تحليل مفصل لملفات المرشحين، يعرض الفجوات المهارية المستخرجة بالذكاء الاصطناعي واحتماليات التطابق التلقائي مع الأدوار الوظيفية.' },
		{ url: '/projects/hris/emp-pro-hris.png', titleEn: 'Master Employee Profiles', titleAr: 'الملفات الشاملة للموظفين', descEn: 'Centralized digital twin of the workforce. Stores identity documents, contract financials, and live disciplinary or attendance records in one secure vault.', descAr: 'توأمة رقمية مركزية للقوى العاملة. تحفظ مستندات الهوية، والبيانات المالية للعقود، والسجلات الحية للحضور والانضباط في خزانة آمنة واحدة.' },
		{ url: '/projects/hris/pipline-hris.png', titleEn: 'Kanban Recruitment Pipeline', titleAr: 'مسار التوظيف وإدارة المرشحين', descEn: 'Visual drag-and-drop applicant tracking system (ATS). Seamlessly move candidates from initial screening to final offer with automated status triggers.', descAr: 'نظام تتبع للمتقدمين (ATS) مرئي يعمل بالسحب والإفلات. ينقل المرشحين بسلاسة من الفرز الأولي إلى العرض النهائي مع مشغلات حالة تلقائية.' },
		{ url: '/projects/hris/visa-mgm-hris.png', titleEn: 'Muqeem Visa Management', titleAr: 'إدارة تأشيرات مقيم', descEn: 'Direct API integration for tracking expatriate Iqama expiries, managing exit/entry visas, and ensuring 100% governmental compliance.', descAr: 'ربط واجهة برمجة التطبيقات (API) مباشر لتتبع انتهاء إقامات الوافدين، وإدارة تأشيرات الخروج والعودة، وضمان الامتثال الحكومي بنسبة 100%.' },
		{ url: '/projects/hris/doc-hris.png', titleEn: 'Corporate Document Builder', titleAr: 'منشئ المستندات والخطابات الرسمية', descEn: 'Automated letterhead generator for official corporate correspondence, warnings, and salary certificates, stored in an immutable ledger.', descAr: 'منشئ خطابات آلي للمراسلات الرسمية للشركة، والإنذارات، وشهادات الرواتب، محفوظة في سجل غير قابل للتعديل.' },
		{ url: '/projects/hris/external-apps-hris.png', titleEn: 'External Freelance Portals', titleAr: 'بوابات العمل الحر الخارجية', descEn: 'Secure, passcode-protected public gateways for gig workers and external applicants to submit credentials without accessing the core system.', descAr: 'بوابات عامة آمنة ومحمية بكلمة مرور تتيح للمستقلين والمتقدمين الخارجيين تقديم بياناتهم دون الحاجة للوصول إلى النظام الأساسي.' }
	  ]
	},
	{
	  id: 'care',
	  titleEn: 'OPERIX Health Care',
	  titleAr: 'أوبيريكس كير للرعاية الطبية',
	  subEn: 'Clinical Management Core',
	  subAr: 'منظومة الإدارة السريرية',
	  descEn: 'Advanced hospital management ecosystem. End-to-end clinical workflow from patient intake and triage through physician consultation, pharmacy dispensary, surgical operations, blood bank, and full financial treasury.',
	  descAr: 'منظومة متكاملة لإدارة المستشفيات. سير عمل سريري شامل من استقبال المريض والفرز وصولاً إلى الاستشارة الطبية، والصيدلية، وغرف العمليات، وبنك الدم، والخزانة المالية.',
	  url: 'https://www.care.operix-solutions.online',
	  icon: Activity,
	  accentColor: '#f43f5e',
	  status: 'CLINICAL SYNC',
	  image: '/projects/care.png',
	  previews: [
		{ url: '/projects/care/admin-care.png', titleEn: 'Command Center — Admin Console', titleAr: 'مركز القيادة — لوحة الإدارة', descEn: 'Enterprise analytics and access control hub. Real-time counters for active visits, pending prescriptions, and surgeries. Houses the Account Approvals queue, a full Access & Security Registry with role-based clearances, and Quick Portals to instantly navigate any clinical department.', descAr: 'مركز تحليلات المؤسسة والتحكم في الوصول. عدادات لحظية للزيارات النشطة والوصفات المعلقة والعمليات الجراحية. يضم طابور اعتماد الحسابات، وسجل الأمان الكامل بصلاحيات مبنية على الأدوار، وبوابات سريعة للتنقل الفوري بين الأقسام السريرية.' },
		{ url: '/projects/care/reception-care.png', titleEn: 'Front Desk — New Patient Enrollment', titleAr: 'الاستقبال — تسجيل مريض جديد', descEn: 'Patient intake form capturing full demographics: name, DOB, sex, blood group, phone, and email. One-tap "Proceed to Triage & Services" routes the registered patient into the nurse station workflow, triggering the live triage queue.', descAr: 'نموذج استقبال المريض الذي يسجل البيانات الكاملة: الاسم وتاريخ الميلاد والجنس والفصيلة الدموية والهاتف والبريد الإلكتروني. ينقل "الانتقال إلى الفرز والخدمات" المريض المسجل فوراً إلى سير عمل محطة التمريض ويُشغّل قائمة الفرز الحي.' },
		{ url: '/projects/care/appoint-care.png', titleEn: 'Front Desk — Appointments & Scheduling', titleAr: 'الاستقبال — المواعيد والجدولة', descEn: 'Dual-panel appointment hub. Schedule new visits by selecting the patient, assigning a doctor, setting date and time slot, and noting the visit reason. The Upcoming Schedule panel confirms all booked appointments with treating physician details and one-tap Check-in buttons to activate the patient visit.', descAr: 'مركز مواعيد ثنائي اللوحات. جدّل زيارات جديدة باختيار المريض وتعيين الطبيب وتحديد التاريخ والفترة الزمنية وسبب الزيارة. لوحة الجدول القادم تؤكد جميع المواعيد المحجوزة مع بيانات الطبيب المعالج وأزرار تسجيل الوصول الفوري.' },
		{ url: '/projects/care/doc-workspace-care.png', titleEn: 'Doctor Workspace — Consultation Waitlist', titleAr: 'بيئة عمل الطبيب — قائمة انتظار الاستشارات', descEn: 'Live triage board showing all patients awaiting the physician. Each card displays MRN, ordered services, and bypass status. Supports MRN scan-override lookup and one-click Re-sync Live Triage to pull the latest nurse queue instantly.', descAr: 'لوحة الفرز الحي التي تعرض جميع المرضى في انتظار الطبيب. كل بطاقة تعرض رقم السجل الطبي والخدمات المطلوبة وحالة التجاوز. تدعم بحث MRN بالمسح وإعادة المزامنة الفورية مع الفرز الحي من محطة التمريض.' },
		{ url: '/projects/care/doc-care.png', titleEn: 'Doctor Workspace — Examination & Diagnosis', titleAr: 'بيئة عمل الطبيب — الفحص والتشخيص', descEn: 'Full clinical encounter workspace. Left panel shows the patient card with triage vitals and nurse bypass status. Right panel captures vitals (BP, HR, Temp, Weight), symptoms, ICD-coded diagnosis, and prescriptions from the formulary — all via voice dictation. Finalised with "Sign off & Route to Pharmacy."', descAr: 'مساحة عمل الاستشارة الكاملة. اللوحة اليسرى تعرض بيانات المريض والعلامات الحيوية وحالة تجاوز التمريض. اللوحة اليمنى تسجّل العلامات الحيوية والأعراض والتشخيص بترميز ICD والأدوية من قائمة الدواء — كل ذلك بالإملاء الصوتي. تنتهي بـ"توقيع وإحالة إلى الصيدلية".' },
		{ url: '/projects/care/chemist-care.png', titleEn: 'Pharmacy Unit — Chemist Portal (Dispensary)', titleAr: 'وحدة الصيدلية — بوابة الصيدلاني', descEn: "MRN-driven dispensary portal. Scan or enter the patient's record number to instantly pull their active prescription. Tabs switch between Dispensary & Billing and full Inventory management for a complete pharmacist workflow in one screen.", descAr: 'بوابة صرف مُدارة برقم السجل الطبي. امسح أو أدخل الرقم لاستدعاء وصفة المريض النشطة فوراً. تبديل التبويبات بين الصرف والفوترة وإدارة المخزون الكامل — سير عمل الصيدلاني في شاشة واحدة.' },
		{ url: '/projects/care/pharm-inven-care.png', titleEn: 'Pharmacy Unit — Master Inventory', titleAr: 'وحدة الصيدلية — المخزون الرئيسي', descEn: 'Pharmaceutical formulary management. Add medications with generic name, brand, dosage form, manufacturer, country, dates, and a three-currency pricing matrix (SDG / USD / SAR). The master inventory table lists the full catalogue with inline edit and delete controls.', descAr: 'إدارة قائمة الأدوية. أضف أدوية مع الاسم العلمي والتجاري والجرعة والمصنّع والدولة والتواريخ ومصفوفة أسعار ثلاثية (جنيه / دولار / ريال). يعرض جدول المخزون الكتالوج الكامل مع أدوات التعديل والحذف المدمجة.' },
		{ url: '/projects/care/ops-care.png', titleEn: 'Operations OR — Surgical Board', titleAr: 'غرفة العمليات — لوحة العمليات الجراحية', descEn: 'Real-time surgical scheduling with live blood bank availability in the header by blood type. Book procedures by selecting patient, surgeon, operation name, required blood units, and notes — with voice dictation. "Verify Blood & Schedule" cross-checks inventory before confirming to prevent supply shortfalls.', descAr: 'جدولة العمليات الجراحية اللحظية مع إتاحة بنك الدم الحية في الرأس حسب فصيلة الدم. احجز إجراءً بتحديد المريض والجراح والعملية والدم المطلوب والملاحظات — بالإملاء الصوتي. "التحقق من الدم والجدولة" يراجع المخزون قبل التأكيد لتفادي النقص.' },
		{ url: '/projects/care/bloodbank-care.png', titleEn: 'Blood Bank Operations — Live Inventory', titleAr: 'عمليات بنك الدم — المخزون الحي', descEn: 'Enterprise hemotherapy dispensing and tracking. Shows total vault capacity, critical shortage groups, and system health. Each blood type displays unit count, a colour-coded LOW STOCK / HEALTHY status bar, and Dispense / Add controls — synced directly with the Surgical OR board.', descAr: 'صرف وتتبع مستحضرات الدم. يعرض السعة الإجمالية ومجموعات النقص الحرج وصحة النظام. كل فصيلة تظهر عدد الوحدات وشريط الحالة (نقص / كافٍ) وعناصر الصرف والإضافة — متزامنة مع لوحة غرفة العمليات.' },
		{ url: '/projects/care/inside-file-care.png', titleEn: 'Patient History — Full Clinical Record', titleAr: 'سجل المريض — الملف السريري الكامل', descEn: 'Complete longitudinal patient record. Profile card shows DOB, sex, blood type, and contact with an external document upload zone. The Clinical Timeline renders every encounter — Check Visits with vitals, Diagnosis & RX, Pathology results, and Surgical Operations with completion status. Exportable to PDF.', descAr: 'السجل الطولي الكامل للمريض. بطاقة الملف تعرض تاريخ الميلاد والجنس والفصيلة وبيانات التواصل مع منطقة رفع الوثائق. يرسم الجدول الزمني كل زيارة — الزيارات مع العلامات الحيوية، والتشخيص والوصفة، ونتائج التحاليل، والعمليات مع الحالة. قابل للتصدير PDF.' },
		{ url: '/projects/care/financial-care.png', titleEn: 'Financial Controller — Corporate Treasury', titleAr: 'المراقب المالي — الخزانة المؤسسية', descEn: 'Live financial ledger for the facility. Displays gross revenue, payroll, and operating expenses against real-time P&L. The Log Transaction panel posts entries by type, currency (SAR / USD / SDG), amount, and memo. The Master Ledger provides a full immutable audit trail of every financial event.', descAr: 'السجل المالي الحي للمنشأة. يعرض الإيرادات والرواتب والمصاريف التشغيلية مقابل الربح والخسارة اللحظي. لوحة المعاملات ترحّل القيود حسب النوع والعملة والمبلغ والملاحظة. يوفر السجل الرئيسي مسار تدقيق كامل وغير قابل للتعديل.' },
		{ url: '/projects/care/radio-lab-care.png', titleEn: 'Radiography Lab — Diagnostic Department', titleAr: 'مختبر الأشعة — قسم التشخيص', descEn: 'Diagnostic imaging portal. The active queue lists pending scan requests (X-Ray, MRI, CT) pulled from physician orders. Selecting a patient opens the result entry panel: clinical observations, optional image/report attachment, and "Finalize & Send to Patient File" to push the completed report into the clinical timeline.', descAr: 'بوابة التصوير التشخيصي. تسرد قائمة الانتظار طلبات الفحص المعلقة (أشعة، رنين، توموغرافي) من أوامر الطبيب. اختيار المريض يفتح لوحة إدخال النتائج مع حقل الملاحظات ومرفق اختياري وإجراء "اعتماد وإرسال لملف المريض" الذي يُدرج التقرير في الجدول السريري.' }
	  ]
	},
	{
	  id: 'edu',
	  titleEn: 'OPERIX Edu',
	  titleAr: 'أوبيريكس للتعليم',
	  subEn: 'School Management Platform',
	  subAr: 'منظومة الإدارة المدرسية',
	  descEn: 'Cloud-based school management platform purpose-built for Ministry of Education standards across the Middle East. Combines academic governance with modern technology to empower school leaders and teachers.',
	  descAr: 'منصة سحابية متكاملة مصممة خصيصاً لتلبي معايير وزارات التعليم في الشرق الأوسط. نجمع بين رصانة الإدارة الأكاديمية وسلاسة التقنية الحديثة لتمكين قادة المدارس والمعلمين.',
	  url: 'https://www.edu.operix-solutions.online',
	  icon: GraduationCap,
	  accentColor: '#f59e0b',
	  status: 'ENTERPRISE 2026',
	  image: '/projects/opx-edu-cover.jpeg',
	  previews: [
		{ url: '/projects/edu/edu-dash.png', titleEn: 'Executive Dashboard — School Command Center', titleAr: 'لوحة القيادة المدرسية — المركز التنفيذي', descEn: 'High-level administrative overview for school principals and directors. Tracks active students, class schedules, attendance rates, and academic performance KPIs in real time.', descAr: 'نظرة إدارية شاملة لمديري المدارس والقيادات التنفيذية. تتبع الطلاب النشطين، والجداول الدراسية، ومعدلات الحضور، ومؤشرات الأداء الأكاديمي في الوقت الفعلي.' },
		{ url: '/projects/edu/edu-dox.png', titleEn: 'Dox Studio — Results, Exams & Behaviour Records', titleAr: 'Dox Studio — النتائج والاختبارات والسجلات السلوكية', descEn: 'Automated document generation engine for student results, exam attendance sheets, and behaviour records. Produces 4K-print-ready certificates fully compatible with official Ministry of Education formatting standards.', descAr: 'محرك إنشاء المستندات الآلي لنتائج الطلاب وكشوف حضور الاختبارات والسجلات السلوكية. ينتج شهادات جاهزة للطباعة بجودة 4K متوافقة تماماً مع التنسيقات الرسمية لوزارة التعليم.' },
		{ url: '/projects/edu/edu-fees.png', titleEn: 'Financial Board — Fees, Registration & Treasury', titleAr: 'اللوحة المالية — الرسوم والتسجيل والخزانة', descEn: 'Comprehensive student registration and fee management system. Tracks tuition collection, instalment plans, outstanding balances, and generates financial summaries for the school treasury.', descAr: 'نظام شامل لتسجيل الطلاب وإدارة الرسوم الدراسية. يتتبع تحصيل الأقساط وخطط التقسيط والأرصدة المستحقة، ويولد ملخصات مالية لخزانة المدرسة.' },
		{ url: '/projects/edu/edu-studs.png', titleEn: 'Student Registry — Master Profiles', titleAr: 'سجل الطلاب — الملفات الشاملة', descEn: 'Centralised digital registry for all enrolled students. Stores academic history, class assignments, contact information, and links directly to grade records, attendance logs, and behaviour incidents.', descAr: 'سجل رقمي مركزي لجميع الطلاب الملتحقين. يحفظ السجل الأكاديمي والتكليفات الدراسية وبيانات التواصل، ويرتبط مباشرة بسجلات الدرجات والحضور والحوادث السلوكية.' },
		{ url: '/projects/edu/edu-par.png', titleEn: 'Parent Portal — Guardian Management', titleAr: 'بوابة أولياء الأمور — إدارة الأسرة', descEn: 'Direct linkage between student records and parent or guardian accounts. Enables streamlined communication, periodic progress report dispatch, and instant notifications for attendance and behavioural updates.', descAr: 'ربط مباشر بين بيانات الطالب وحساب ولي أمره. يتيح التواصل المنظّم وإرسال تقارير التقدم الدورية والإشعارات الفورية لتحديثات الحضور والسلوك.' },
		{ url: '/projects/edu/edu-sub.png', titleEn: 'Academic Subjects & Curriculum Management', titleAr: 'إدارة المواد الدراسية والمنهج الأكاديمي', descEn: 'Advanced subject and curriculum configuration engine. Manage school subjects, assign teachers, set grading weights, configure semester structures, and automate cumulative GPA calculations.', descAr: 'محرك متقدم لإعداد المواد والمنهج الدراسي. إدارة المواد المدرسية وتعيين المعلمين وضبط أوزان الدرجات وهيكلة الفصول الدراسية واحتساب المعدلات التراكمية آلياً.' },
		{ url: '/projects/edu/edu-res.png', titleEn: 'Results Engine — Academic Grade Records', titleAr: 'محرك النتائج — سجلات الدرجات الأكاديمية', descEn: 'Precise academic grade recording and result management system. Supports multi-term entries, automatic GPA computation, and one-click export of official result sheets aligned with Ministry grading frameworks.', descAr: 'نظام دقيق لتسجيل الدرجات الأكاديمية وإدارة النتائج. يدعم الإدخال متعدد الفصول والحساب التلقائي للمعدلات وتصدير كشوف النتائج الرسمية المتوافقة مع أطر تقدير وزارة التعليم بنقرة واحدة.' }
	  ]
	}
  ];

  const clientProjects = [
	{
	  id: 'mamey',
	  titleEn: 'Mamey Platform',
	  titleAr: 'منصة مامي',
	  subEn: 'General Trading & Investment',
	  subAr: 'التجارة العامة والاستثمار',
	  descEn: 'A South Sudanese enterprise specializing in the import, distribution, and supply of foodstuffs, building materials, logistics, and essential services.',
	  descAr: 'مؤسسة جنوب سودانية متخصصة في استيراد وتوزيع وتوريد المواد الغذائية ومواد البناء والخدمات اللوجستية والخدمات الأساسية.',
	  url: 'https://mamey.vercel.app',
	  icon: Globe,
	  accentColor: '#38bdf8',
	  image: '/projects/mamey.png'
	},
	{
	  id: 'abdullah',
	  titleEn: 'Abdullah Bin Abbas',
	  titleAr: 'مركز عبدالله بن عباس',
	  subEn: 'Institutional Portal',
	  subAr: 'البوابة المؤسسية',
	  descEn: 'Dedicated administrative portal mapped for institutional resource planning, community outreach tracking, and digital archive management.',
	  descAr: 'بوابة إدارية مخصصة لتخطيط الموارد المؤسسية، وتتبع التواصل المجتمعي، وإدارة الأرشيف الرقمي.',
	  url: 'https://www.bin-abbas.operix-solutions.online',
	  icon: Landmark,
	  accentColor: '#10b981',
	  image: '/projects/abbas.png'
	},
	{
	  id: 'community',
	  titleEn: 'Hasad Community Hub',
	  titleAr: 'بوابة حصاد الالكترونية',
	  subEn: 'Smart Community Hub',
	  subAr: 'مركز المجتمع الذكي',
	  descEn: 'Real estate and property management ecosystem handling resident requests, facility maintenance logs, and community billing cycles.',
	  descAr: 'منظومة إدارة العقارات والممتلكات للتعامل مع طلبات السكان، وسجلات صيانة المرافق، ودورات الفوترة المجتمعية.',
	  url: 'https://www.hasad.operix-solutions.online/Naseem_City',
	  icon: Building2,
	  accentColor: '#f43f5e',
	  image: '/projects/naseem.png'
	}
  ];

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
				<div className="h-48 relative overflow-hidden bg-vercel-bg/50 border-b border-vercel-border cursor-pointer" onClick={() => window.open(p.url, '_blank')}>
				  <img src={getAsset(p.image)} alt={p.titleEn} className="w-full h-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
				  <div className="absolute inset-0 transition-opacity duration-300 pointer-events-none" style={{ background: `linear-gradient(to top, ${p.accentColor}30 0%, transparent 80%)`, opacity: isHov ? 1 : 0 }} />
				  <div className="absolute top-4 left-4 bg-vercel-surface/90 backdrop-blur-md border border-vercel-border text-vercel-surface-text text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg transition-colors duration-500">
					<span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.accentColor }} />
					{p.status}
				  </div>
				</div>

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
			<div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setActivePreview(null)} />

			<motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-[1400px] max-h-[90vh] flex flex-col z-10 bg-vercel-surface rounded-2xl border border-vercel-border shadow-2xl overflow-hidden transition-colors duration-500">
			  
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

			  <div className="flex flex-col lg:flex-row flex-1 min-h-0">
				<div className="relative flex-1 bg-black flex flex-col min-h-[300px] lg:min-h-0" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
				  <div className="flex-1 flex items-center justify-center p-4 relative group overflow-hidden">
					{!imgLoaded && <div className="absolute inset-4 rounded-xl bg-vercel-bg animate-pulse" />}
					
					{getAsset(activePreview.previews[currentImgIndex].url).endsWith('.mp4') ? (
					  <video key={`v-${currentImgIndex}`} src={getAsset(activePreview.previews[currentImgIndex].url)} controls autoPlay muted loop onLoadedData={() => setImgLoaded(true)} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
					) : (
					  <img key={`i-${currentImgIndex}`} src={getAsset(activePreview.previews[currentImgIndex].url)} alt="System Preview" onLoad={() => setImgLoaded(true)} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }} />
					)}

					<button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-4 w-10 h-10 rounded-full bg-vercel-surface/80 hover:bg-brand-gold text-vercel-surface-text hover:text-black flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 border border-vercel-border shadow-xl backdrop-blur-sm z-10">
					  {isAr ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
					</button>
					<button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-4 w-10 h-10 rounded-full bg-vercel-surface/80 hover:bg-brand-gold text-vercel-surface-text hover:text-black flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 border border-vercel-border shadow-xl backdrop-blur-sm z-10">
					  {isAr ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
					</button>
				  </div>

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

				<div className="lg:w-96 bg-vercel-surface border-t lg:border-t-0 lg:border-l border-vercel-border flex flex-col shrink-0 transition-colors duration-500">
				  <div className="p-6 border-b border-vercel-border bg-vercel-bg/30">
					<span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-vercel-muted mb-3">
					  <Info size={12} style={{ color: activePreview.accentColor }} /> {isAr ? "الوحدة التشغيلية" : "Operational Module"}
					</span>
					<h4 key={currentImgIndex} className="font-serif font-black text-xl text-vercel-surface-text leading-tight mb-4">
					  {isAr ? activePreview.previews[currentImgIndex].titleAr : activePreview.previews[currentImgIndex].titleEn}
					</h4>
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