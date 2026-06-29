import React, { useEffect, useState } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, Globe, Trash2, Edit3, LogOut, 
  UploadCloud, FileText, CheckCircle, Activity, LayoutGrid,
  Home, Info, Briefcase, Newspaper, Users
} from 'lucide-react';

const CATEGORIES = {
  services: { label: "Our Services", icon: Briefcase, badge: "bg-purple-500/10 text-purple-500 border-purple-500/20", tabActive: "bg-purple-600 text-white", counter: "bg-purple-700 text-white" },
  products: { label: "Our Products", icon: LayoutGrid, badge: "bg-blue-500/10 text-blue-500 border-blue-500/20", tabActive: "bg-blue-600 text-white", counter: "bg-blue-700 text-white" },
  news: { label: "Blog & News", icon: Newspaper, badge: "bg-brand-amber/10 text-brand-amber border-brand-amber/30", tabActive: "bg-brand-amber text-black", counter: "bg-yellow-600 text-white" },
  clients: { label: "Clients & Partners", icon: Users, badge: "bg-rose-500/10 text-rose-500 border-rose-500/20", tabActive: "bg-rose-600 text-white", counter: "bg-rose-700 text-white" },
  home: { label: "Home Page", icon: Home, badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", tabActive: "bg-emerald-600 text-white", counter: "bg-emerald-700 text-white" },
  about: { label: "About Strategy", icon: Info, badge: "bg-slate-500/10 text-slate-500 border-slate-500/20", tabActive: "bg-slate-600 text-white", counter: "bg-slate-700 text-white" }
};

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  
  const [visitorCount, setVisitorCount] = useState(0);
  const [countryLogs, setCountryLogs] = useState<[string, unknown][]>([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  const [cmsItems, setCmsItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); 
  
  const [hiddenSectionKey, setHiddenSectionKey] = useState('');
  
  const [targetPage, setTargetPage] = useState('services');
  const [formData, setFormData] = useState(() => {
	const cachedData = localStorage.getItem('operix_sudan_form_cache');
	return cachedData ? JSON.parse(cachedData) : {
	  title_en: '', title_ar: '', body_en: '', body_ar: '', media_url: ''
	};
  });

  useEffect(() => {
	if (!editingId) {
	  localStorage.setItem('operix_sudan_form_cache', JSON.stringify(formData));
	}
  }, [formData, editingId]);

  useEffect(() => {
	fetchAnalytics();
	fetchCmsContent();
  }, []);

  async function fetchAnalytics() {
	setLoadingMetrics(true);
	// Pointing to SUDAN specific visitor logs
	const { count } = await supabase.from('operix_sudan_visitor_logs').select('*', { count: 'exact', head: true });
	if (count) setVisitorCount(count);

	// Pointing to SUDAN specific visitor logs
	const { data } = await supabase.from('operix_sudan_visitor_logs').select('ip_country');
	if (data) {
	  const counts = data.reduce((acc: any, log: any) => {
		const code = log.ip_country ? log.ip_country.toUpperCase() : 'UNKNOWN';
		acc[code] = (acc[code] || 0) + 1;
		return acc;
	  }, {});
	  setCountryLogs(Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]));
	}
	setLoadingMetrics(false);
  }

  async function fetchCmsContent() {
	// Pointing to SUDAN specific CMS table
	const { data, error } = await supabase.from('operix_sudan_cms_content').select('*').order('updated_at', { ascending: false });
	if (!error && data) setCmsItems(data);
  }

  const handleSelectEdit = (item: any) => {
	setEditingId(item.id);
	setTargetPage(item.page);
	setHiddenSectionKey(item.section_key); 
	setFormData({
	  title_en: item.title_en || '', title_ar: item.title_ar || '',
	  body_en: item.body_en || '', body_ar: item.body_ar || '', media_url: item.media_url || ''
	});
  };

  const resetFormState = () => {
	setEditingId(null); setHiddenSectionKey('');
	setFormData({ title_en: '', title_ar: '', body_en: '', body_ar: '', media_url: '' });
	localStorage.removeItem('operix_sudan_form_cache');
  };

  const handleSaveItem = async (e: React.FormEvent) => {
	e.preventDefault();
	const generatedKey = editingId ? hiddenSectionKey : `${targetPage.toLowerCase()}_${Math.floor(Date.now() / 1000)}`;
	
	const payload = {
	  page: targetPage, section_key: generatedKey,
	  title_en: formData.title_en, title_ar: formData.title_ar,
	  body_en: formData.body_en, body_ar: formData.body_ar,
	  media_url: formData.media_url, updated_at: new Date().toISOString()
	};

	if (editingId) {
	  // Pointing to SUDAN specific CMS table
	  const { error } = await supabase.from('operix_sudan_cms_content').update(payload).eq('id', editingId);
	  if (error) alert(`Update failed: ${error.message}`);
	} else {
	  // Pointing to SUDAN specific CMS table
	  const { error } = await supabase.from('operix_sudan_cms_content').insert([payload]);
	  if (error) alert(`Creation failed: ${error.message}`);
	  setActiveTab(targetPage); 
	}
	resetFormState(); fetchCmsContent();
  };

  const handleDeleteItem = async (id: string) => {
	if (!window.confirm("Purge this record from the Sudan database?")) return;
	// Pointing to SUDAN specific CMS table
	const { error } = await supabase.from('operix_sudan_cms_content').delete().eq('id', id);
	if (!error) fetchCmsContent();
  };

  const filteredItems = activeTab === 'all' ? cmsItems : cmsItems.filter(item => item.page === activeTab);

  return (
	<div className="min-h-screen flex flex-col bg-vercel-bg text-vercel-base font-sans select-none transition-colors duration-500">
	  
	  <header className="bg-vercel-surface border-b border-vercel-border px-8 py-5 flex items-center justify-between sticky top-0 z-50">
		<div>
		  <h1 className="text-2xl font-black tracking-tight text-vercel-surface-text font-serif">SUDAN Branch CMS</h1>
		  <p className="text-xs text-vercel-muted font-medium mt-1">
			Logged in as <span className="text-brand-yellow font-bold">{user?.email || 'admin@operix.local'}</span> · {cmsItems.length} records
		  </p>
		</div>
		<button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-vercel-bg border border-vercel-border rounded-lg text-sm font-semibold text-vercel-surface-text hover:border-brand-yellow transition-colors">
		  <LogOut size={16} /> Sign Out
		</button>
	  </header>

	  <main className="p-8 max-w-[1600px] mx-auto space-y-8 flex-1 w-full pt-32">
		<div className="flex flex-col xl:flex-row gap-8 items-start">
		  
		  <div className="w-full xl:w-[400px] flex-shrink-0 bg-vercel-surface border border-vercel-border rounded-xl shadow-2xl overflow-hidden sticky top-32">
			<div className="px-6 py-4 border-b border-vercel-border flex items-center gap-2 bg-black/20">
			  <UploadCloud size={18} className="text-brand-yellow" />
			  <h2 className="text-sm font-bold text-vercel-surface-text tracking-wide uppercase">
				{editingId ? "Update Sudan Entry" : "New Sudan Entry"}
			  </h2>
			</div>
			
			<form onSubmit={handleSaveItem} className="p-6 space-y-5">
			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-vercel-muted uppercase tracking-wider">Target Page</label>
				<select value={targetPage} onChange={e => setTargetPage(e.target.value)} className="w-full px-4 py-2.5 bg-vercel-bg border border-vercel-border rounded-lg text-sm font-semibold text-vercel-surface-text outline-none cursor-pointer focus:border-brand-yellow transition-colors">
				  {Object.entries(CATEGORIES).map(([key, config]) => (
					<option key={key} value={key}>{config.label}</option>
				  ))}
				</select>
			  </div>

			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-vercel-muted uppercase tracking-wider">Title (EN) *</label>
				<input required type="text" value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} className="w-full px-4 py-2.5 bg-vercel-bg border border-vercel-border rounded-lg text-sm font-medium text-vercel-surface-text outline-none focus:border-brand-yellow transition-colors" />
			  </div>

			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-vercel-muted uppercase tracking-wider text-right block">العنوان (AR)</label>
				<input type="text" value={formData.title_ar} onChange={e => setFormData({...formData, title_ar: e.target.value})} className="w-full px-4 py-2.5 bg-vercel-bg border border-vercel-border rounded-lg text-sm font-medium text-vercel-surface-text outline-none focus:border-brand-yellow transition-colors text-right" dir="rtl" />
			  </div>

			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-vercel-muted uppercase tracking-wider">Content (EN)</label>
				<textarea rows={4} value={formData.body_en} onChange={e => setFormData({...formData, body_en: e.target.value})} className="w-full px-4 py-2.5 bg-vercel-bg border border-vercel-border rounded-lg text-sm font-medium text-vercel-surface-text outline-none focus:border-brand-yellow transition-colors resize-none" />
			  </div>

			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-vercel-muted uppercase tracking-wider text-right block">المحتوى (AR)</label>
				<textarea rows={4} value={formData.body_ar} onChange={e => setFormData({...formData, body_ar: e.target.value})} className="w-full px-4 py-2.5 bg-vercel-bg border border-vercel-border rounded-lg text-sm font-medium text-vercel-surface-text outline-none focus:border-brand-yellow transition-colors resize-none text-right" dir="rtl" />
			  </div>

			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-vercel-muted uppercase tracking-wider">Media URL (Drive/YouTube/Image)</label>
				<input type="url" value={formData.media_url} onChange={e => setFormData({...formData, media_url: e.target.value})} className="w-full px-4 py-2.5 bg-vercel-bg border border-vercel-border rounded-lg text-sm font-mono text-vercel-surface-text outline-none focus:border-brand-yellow transition-colors" placeholder="https://..." />
			  </div>

			  <div className="pt-4 flex flex-col gap-3">
				<button type="submit" className="w-full py-3.5 bg-brand-yellow hover:bg-brand-amber text-black rounded-xl text-sm font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md">
				  {editingId ? <CheckCircle size={18} /> : <UploadCloud size={18} />}
				  {editingId ? "Update Sudan Live Site" : "Deploy to Sudan Live Site"}
				</button>
				{editingId && (
				  <button type="button" onClick={resetFormState} className="w-full py-2.5 bg-vercel-bg border border-vercel-border text-vercel-surface-text rounded-xl text-sm font-semibold hover:border-red-500 hover:text-red-500 transition-colors">
					Cancel Edit
				  </button>
				)}
			  </div>
			</form>
		  </div>

		  <div className="flex-1 flex flex-col bg-vercel-surface border border-vercel-border rounded-xl shadow-2xl overflow-hidden">
			<div className="px-6 py-4 border-b border-vercel-border flex items-center justify-between bg-black/20">
			  <div className="flex items-center gap-2">
				<LayoutGrid size={18} className="text-brand-yellow" />
				<h2 className="text-sm font-bold text-vercel-surface-text tracking-wide uppercase">Sudan Content Database</h2>
			  </div>
			</div>

			<div className="overflow-x-auto">
			  <table className="w-full text-left text-sm border-collapse">
				<tbody className="divide-y divide-vercel-border">
				  {filteredItems.map((item) => (
					<tr key={item.id} className="hover:bg-vercel-bg/50 transition-colors group">
					  <td className="px-6 py-5">
						<span className="inline-block px-2 py-1 bg-vercel-bg border border-vercel-border rounded text-[10px] font-bold text-vercel-muted uppercase mb-2">
						  {item.page}
						</span>
						<div className="font-bold text-vercel-surface-text text-base mb-1">{item.title_en || 'Untitled Entry'}</div>
						<div className="text-xs font-semibold text-vercel-muted mt-2 text-right" dir="rtl">{item.title_ar}</div>
					  </td>
					  <td className="px-6 py-5 align-top text-right">
						<div className="flex items-center justify-end gap-2">
						  <button onClick={() => handleSelectEdit(item)} className="px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-vercel-surface-text bg-vercel-bg border border-vercel-border rounded-md hover:border-brand-yellow hover:text-brand-yellow transition-colors">
							<Edit3 size={12} /> Edit
						  </button>
						  <button onClick={() => handleDeleteItem(item.id)} className="px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-red-500 bg-vercel-bg border border-vercel-border rounded-md hover:border-red-500 transition-colors">
							<Trash2 size={12} /> Trash
						  </button>
						</div>
					  </td>
					</tr>
				  ))}
				  {filteredItems.length === 0 && (
					<tr>
					  <td colSpan={2} className="px-6 py-12 text-center text-vercel-muted font-medium">
						No records found in the Sudan database for this category.
					  </td>
					</tr>
				  )}
				</tbody>
			  </table>
			</div>
		  </div>

		</div>
	  </main>
	</div>
  );
}