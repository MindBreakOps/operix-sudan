import React, { useState } from "react";
import { Mail, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const OPS_API = import.meta.env.VITE_OPS_API_URL;
const TARGET_EMAIL = 'info@operix-solutions.com';

export default function Contact() {
  const { isAr } = useLanguage();
  const [formData, setFormData] = useState({
	name: "", company: "", email: "", phone: "", projectType: "OPERIX Operations", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
	setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
	setIsSubmitting(true);

	const adminBody = `NEW CONTACT LEAD\n\nName: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProject Type: ${formData.projectType}\nMessage: ${formData.message}`;
	const customerBody = `Dear ${formData.name},\n\nThank you for reaching out to OPERIX 249. We have received your request regarding "${formData.projectType}".\n\nOur system implementation architects will review your specifications and contact you within 24 hours.\n\nBest Regards,\nThe OPERIX 249 Team\nwww.operix-solutions.com`;

	try {
	  await fetch(OPS_API, {
		method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' },
		body: JSON.stringify({ action: 'sendEmail', to: TARGET_EMAIL, subject: `New Lead: ${formData.company || formData.name}`, body: adminBody })
	  });
	  await fetch(OPS_API, {
		method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' },
		body: JSON.stringify({ action: 'sendEmail', to: formData.email, subject: `Request Received - OPERIX 249`, body: customerBody })
	  });

	  setIsSuccess(true);
	  setFormData({ name: "", company: "", email: "", phone: "", projectType: "OPERIX Operations", message: "" });
	} catch (error) {
	  alert(isAr ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "An error occurred. Please try again.");
	} finally {
	  setIsSubmitting(false);
	}
  };

  return (
	<main className="min-h-screen bg-vercel-bg px-6 py-32 transition-colors duration-500">
	  <div className="mx-auto max-w-5xl">
		<div className="mb-16 text-center">
		  <span className="text-sm font-bold uppercase tracking-[0.3em] text-brand-yellow">
			{isAr ? "ابدأ مشروعك" : "Start Your Project"}
		  </span>
		  <h1 className="mt-6 text-5xl font-black md:text-6xl font-sans text-vercel-base">
			{isAr ? "لنبنِ شيئاً عظيماً معاً" : "Let's Build Something Great Together"}
		  </h1>
		  <p className="mx-auto mt-6 max-w-2xl text-lg text-vercel-muted font-medium">
			{isAr 
			  ? "أخبرنا عن فكرتك وسيتواصل معك فريقنا خلال ٢٤ ساعة. سيتم إرسال رسالة تأكيد إلكترونية مباشرة إلى بريدك."
			  : "Tell us about your idea and our team will contact you within 24 hours. A confirmation email will be sent directly to your inbox."}
		  </p>
		</div>

		<div className="rounded-3xl border border-vercel-border bg-vercel-surface p-10 shadow-2xl transition-colors duration-500">
		  {isSuccess ? (
			<div className="text-center py-16">
			  <div className="mx-auto w-20 h-20 mb-6 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full flex items-center justify-center">
				 <Mail className="h-8 w-8 text-brand-yellow" />
			  </div>
			  <h2 className="text-3xl font-bold text-vercel-surface-text mb-4">{isAr ? "تم الإرسال بنجاح!" : "Request Sent Successfully!"}</h2>
			  <button onClick={() => setIsSuccess(false)} className="rounded-xl bg-transparent border border-brand-yellow text-brand-yellow px-8 py-3 font-bold hover:bg-brand-yellow/10 transition-colors">
				{isAr ? "إرسال طلب آخر" : "Send Another Request"}
			  </button>
			</div>
		  ) : (
			<form onSubmit={handleSubmit}>
			  <div className="grid gap-6 md:grid-cols-2">
				<input required name="name" value={formData.name} onChange={handleChange} placeholder={isAr ? "الاسم الكامل *" : "Full Name *"} className="rounded-xl border border-vercel-border bg-black/40 text-white p-4 outline-none focus:border-brand-yellow" />
				<input name="company" value={formData.company} onChange={handleChange} placeholder={isAr ? "اسم الشركة" : "Company Name"} className="rounded-xl border border-vercel-border bg-black/40 text-white p-4 outline-none focus:border-brand-yellow" />
				<input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder={isAr ? "البريد الإلكتروني *" : "Email Address *"} className="rounded-xl border border-vercel-border bg-black/40 text-white p-4 outline-none focus:border-brand-yellow" />
				<input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={isAr ? "رقم الهاتف *" : "Phone Number *"} className="rounded-xl border border-vercel-border bg-black/40 text-white p-4 outline-none focus:border-brand-yellow" />
			  </div>

			  <select name="projectType" value={formData.projectType} onChange={handleChange} className="mt-6 w-full rounded-xl border border-vercel-border bg-black/40 text-white p-4 outline-none focus:border-brand-yellow cursor-pointer">
				<option>OPERIX Operations</option>
				<option>OPERIX HRIS</option>
				<option>OPERIX FMIS</option>
				<option>Shifa Healthcare</option>
				<option>Esnad Enterprise</option>
				<option>Custom AI Solution</option>
				<option>Other Requirements</option>
			  </select>

			  <textarea name="message" value={formData.message} onChange={handleChange} rows={6} placeholder={isAr ? "صف احتياجاتك التشغيلية..." : "Describe your operational needs..."} className="mt-6 w-full rounded-xl border border-vercel-border bg-black/40 text-white p-4 outline-none focus:border-brand-yellow resize-none" />

			  <button type="submit" disabled={isSubmitting} className="mt-8 w-full rounded-xl bg-gradient-to-r from-brand-yellow to-brand-amber py-5 text-lg font-black text-black hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
				{isSubmitting ? (isAr ? "جاري الإرسال..." : "Dispatching...") : (isAr ? "تهيئة معطيات المشروع" : "Initialize Project Parameters")} <ExternalLink size={20} />
			  </button>
			</form>
		  )}
		</div>
	  </div>
	</main>
  );
}