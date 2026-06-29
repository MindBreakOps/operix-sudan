import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const OPS_API = import.meta.env.VITE_OPS_API_URL;
const TARGET_EMAIL = 'info@operix-solutions.com';

export default function StartProjectModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const { isAr } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", projectType: "OPERIX Operations", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
	setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
	setIsSubmitting(true);

	const adminBody = `NEW CONTACT LEAD (MODAL)\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProject Type: ${formData.projectType}\nMessage: ${formData.message}`;
	const customerBody = `Dear ${formData.name},\n\nThank you for reaching out to OPERIX 249. We have received your request regarding "${formData.projectType}".\n\nOur system implementation architects will review your specifications and contact you within 24 hours.\n\nBest Regards,\nThe OPERIX 249 Team\nwww.operix-solutions.com`;

	try {
	  await fetch(OPS_API, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'sendEmail', to: TARGET_EMAIL, subject: `New Lead: ${formData.name}`, body: adminBody }) });
	  await fetch(OPS_API, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'sendEmail', to: formData.email, subject: `Request Received - OPERIX 249`, body: customerBody }) });
	  setIsSuccess(true);
	  setFormData({ name: "", email: "", phone: "", projectType: "OPERIX Operations", message: "" });
	} catch {
	  alert(isAr ? "حدث خطأ." : "Error occurred.");
	} finally {
	  setIsSubmitting(false);
	}
  };

  if (!open) return null;

  return (
	<AnimatePresence>
	  <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-vercel-bg/80 backdrop-blur-md">
		<motion.div 
		  initial={{ opacity: 0, scale: 0.95, y: 20 }}
		  animate={{ opacity: 1, scale: 1, y: 0 }}
		  exit={{ opacity: 0, scale: 0.95, y: 20 }}
		  className="relative w-full max-w-2xl bg-vercel-surface border border-vercel-border rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
		>
		  <button onClick={onClose} className="absolute top-6 right-6 text-vercel-muted hover:text-brand-yellow transition-colors">
			<X size={24} />
		  </button>
		  
		  {isSuccess ? (
			<div className="text-center py-12">
			  <CheckCircle size={64} className="mx-auto text-brand-yellow mb-6" />
			  <h3 className="text-2xl font-bold text-vercel-surface-text mb-4">{isAr ? "تم الإرسال بنجاح!" : "Request Sent Successfully!"}</h3>
			  <p className="text-vercel-muted mb-8">{isAr ? "سنتواصل معك قريباً." : "We will contact you shortly."}</p>
			  <button onClick={onClose} className="bg-brand-yellow text-black font-bold py-3 px-8 rounded-xl hover:bg-brand-amber transition-colors">
				{isAr ? "إغلاق" : "Close"}
			  </button>
			</div>
		  ) : (
			<>
			  <h3 className="text-2xl font-bold text-vercel-surface-text mb-2">
				{isAr ? "نحن هنا من أجلك" : "We Are Here For You"}
			  </h3>
			  <p className="text-vercel-muted mb-8 font-medium text-sm">
				{isAr ? "أخبرنا عن فكرتك وسيتواصل معك فريقنا. سيتم إرسال رسالة تأكيد إلكترونية مباشرة إلى بريدك." : "Tell us about your idea and our team will contact you. A confirmation email will be sent to your inbox."}
			  </p>

			  <form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				  <input required name="name" value={formData.name} onChange={handleChange} placeholder={isAr ? "الاسم الكامل *" : "Full Name *"} className="w-full rounded-xl border border-vercel-border bg-vercel-bg text-vercel-surface-text p-3 outline-none focus:border-brand-yellow" />
				  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder={isAr ? "البريد الإلكتروني *" : "Email Address *"} className="w-full rounded-xl border border-vercel-border bg-vercel-bg text-vercel-surface-text p-3 outline-none focus:border-brand-yellow" />
				  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={isAr ? "رقم الهاتف *" : "Phone Number *"} className="w-full rounded-xl border border-vercel-border bg-vercel-bg text-vercel-surface-text p-3 outline-none focus:border-brand-yellow" />
				  <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full rounded-xl border border-vercel-border bg-vercel-bg text-vercel-surface-text p-3 outline-none focus:border-brand-yellow">
					<option>OPERIX Operations</option>
					<option>OPERIX HRIS</option>
					<option>OPERIX FMIS</option>
					<option>Shifa Healthcare</option>
					<option>Esnad Enterprise</option>
					<option>Custom Solution</option>
				  </select>
				</div>
				<textarea required name="message" value={formData.message} onChange={handleChange} rows={4} placeholder={isAr ? "صف احتياجاتك التشغيلية..." : "Describe your operational needs..."} className="w-full rounded-xl border border-vercel-border bg-vercel-bg text-vercel-surface-text p-3 outline-none focus:border-brand-yellow resize-none" />
				<button type="submit" disabled={isSubmitting} className="w-full bg-brand-yellow text-black font-bold py-4 rounded-xl hover:bg-brand-amber transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
				  {isSubmitting ? (isAr ? "جاري الإرسال..." : "Dispatching...") : (isAr ? "إرسال الطلب" : "Submit Request")} <ExternalLink size={18} />
				</button>
			  </form>
			</>
		  )}
		</motion.div>
	  </div>
	</AnimatePresence>
  );
}