import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Users, LayoutGrid, Heart, Server } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Services() {
  const { isAr } = useLanguage();

  const services = [
	{
	  title: isAr ? "نظام شفاء (Shifa)" : "Shifa Healthcare",
	  icon: Activity,
	  description: isAr 
		? "لأن صحة أهلنا تهمنا. نظام متكامل لإدارة المستشفيات والعيادات، يحفظ تاريخ المرضى ويسهل عمل الأطباء في أصعب الظروف."
		: "Because our people's health matters. A complete hospital management system that secures patient history and eases medical workflows."
	},
	{
	  title: isAr ? "إسناد (Esnad)" : "Esnad Management",
	  icon: LayoutGrid,
	  description: isAr
		? "سند حقيقي لإدارة الموارد البشرية والعمليات (HRIS & FMIS). ننظم لك الهيكلة لتتفرغ أنت لنمو أعمالك."
		: "True support for your HR and Facility management. We organize your structure so you can focus on growth."
	},
	{
	  title: isAr ? "مجتمع حصاد (Hased)" : "Hased Community",
	  icon: Users,
	  description: isAr
		? "منصات مجتمعية مترابطة تجمع الناس، تسهل التواصل، وتبني بيئة رقمية آمنة للتعاون والعمل المشترك."
		: "Interconnected platforms that bring people together, facilitating communication in a safe digital environment."
	},
	{
	  title: isAr ? "أمن سيبراني صارم" : "Strict Cyber Security",
	  icon: ShieldCheck,
	  description: isAr
		? "حماية بياناتك هي أمانتنا. نوفر بنية تحتية مقاومة للاختراقات لضمان استمرارية أعمالك دون قلق."
		: "Protecting your data is our duty. We provide hack-resistant infrastructure ensuring business continuity."
	},
	{
	  title: isAr ? "تطبيقات بتجربة مستخدم مريحة" : "Comforting UX Apps",
	  icon: Heart,
	  description: isAr
		? "نصمم واجهات باللون الأسود الملكي المريح للعين، مع تفاعلات سلسة تُشعر المستخدم بالثقة والاحترافية."
		: "We design interfaces in eye-comforting royal black, with smooth interactions that build user trust."
	},
	{
	  title: isAr ? "استضافة سحابية موثوقة" : "Reliable Cloud Hosting",
	  icon: Server,
	  description: isAr
		? "خوادم سحابية تضمن بقاء أنظمتك تعمل على مدار الساعة، لأن توقف العمل ليس خياراً."
		: "Cloud servers that guarantee your systems stay online 24/7, because downtime is not an option."
	}
  ];

  return (
	<section id="services" className="relative bg-royal-dark px-6 py-32 border-t border-royal-border">
	  <div className="mx-auto max-w-7xl">
		<motion.div
		  initial={{ opacity: 0, y: 30 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.8 }}
		  viewport={{ once: true }}
		  className="mb-20 text-center"
		>
		  <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-brand-yellow">
			{isAr ? "ما نقدمه لك" : "WHAT WE OFFER"}
		  </p>
		  <h2 className="text-4xl font-black text-white md:text-5xl font-serif">
			{isAr ? "حلول تقنية تنبض بالحياة" : "Tech Solutions with a Heartbeat"}
		  </h2>
		  <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 font-light">
			{isAr 
			  ? "صممنا حزم أوبريكس لتكون مرنة؛ يمكنك استخدامها كحزمة متكاملة أو كنظام مستقل، لتناسب احتياجك الحالي بالضبط."
			  : "We designed OPERIX modules to be flexible; use them as a bundled ecosystem or standalone systems, fitting your exact needs."}
		  </p>
		</motion.div>

		<div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
		  {services.map((service, index) => {
			const Icon = service.icon;
			return (
			  <motion.div
				key={service.title}
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: index * 0.1, duration: 0.5 }}
				viewport={{ once: true }}
				className="group relative overflow-hidden rounded-3xl border border-royal-border bg-royal-surface p-8 transition duration-500 hover:-translate-y-2 hover:border-brand-yellow/40 hover:shadow-[0_10px_40px_rgba(234,179,8,0.05)]"
			  >
				<div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/0 to-brand-yellow/5 opacity-0 transition group-hover:opacity-100" />
				<div className="relative z-10">
				  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-yellow/10 text-brand-yellow">
					<Icon size={32} />
				  </div>
				  <h3 className="mb-4 text-2xl font-bold text-white">
					{service.title}
				  </h3>
				  <p className="leading-relaxed text-gray-400 font-medium">
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