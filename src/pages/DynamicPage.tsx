import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';

export default function DynamicPage({ pageType }: { pageType: string }) {
  const { isAr } = useLanguage();
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	async function fetchContent() {
	  setLoading(true);
	  const { data } = await supabaseClient
		.from('operix_sudan_cms_content')
		.select('*')
		.eq('page', pageType)
		.order('created_at', { ascending: true });
	  
	  if (data) setContent(data);
	  setLoading(false);
	}
	fetchContent();
  }, [pageType]);

  if (loading) {
	return <div className="min-h-screen bg-vercel-bg flex items-center justify-center text-brand-yellow font-bold animate-pulse">Loading {pageType}...</div>;
  }

  return (
	<main className="min-h-screen bg-vercel-bg px-6 py-32 transition-colors duration-500">
	  <div className="mx-auto max-w-6xl space-y-16">
		
		{/* Dynamic Page Header */}
		<div className="text-center mb-20">
		  <h1 className="text-4xl md:text-6xl font-black text-vercel-base uppercase tracking-tight">
			{pageType}
		  </h1>
		  <div className="w-24 h-1 bg-brand-yellow mx-auto mt-6 rounded-full" />
		</div>

		{/* Dynamic Content Mapping */}
		{content.length === 0 ? (
		  <p className="text-center text-vercel-muted">No content published for this section yet.</p>
		) : (
		  content.map((item) => (
			<div key={item.id} className="bg-vercel-surface border border-vercel-border rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-10 items-center transition-colors duration-500">
			  
			  {/* Text Block */}
			  <div className="flex-1 space-y-6">
				<h2 className="text-3xl font-bold text-vercel-surface-text">
				  {isAr ? item.title_ar : item.title_en}
				</h2>
				<p className="text-vercel-surface-text/80 text-lg leading-relaxed whitespace-pre-line">
				  {isAr ? item.body_ar : item.body_en}
				</p>
			  </div>

			  {/* Dynamic Media Handling (Images or Drive Videos) */}
			  {item.media_url && (
				<div className="flex-1 w-full relative rounded-2xl overflow-hidden border border-vercel-border bg-black/50 aspect-video">
				  {item.media_url.includes('youtube.com') || item.media_url.includes('drive.google.com/file') ? (
					<iframe 
					  src={item.media_url} 
					  className="absolute inset-0 w-full h-full"
					  allow="autoplay; encrypted-media" 
					  allowFullScreen 
					/>
				  ) : (
					<img 
					  src={item.media_url} 
					  alt={item.title_en} 
					  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
					/>
				  )}
				</div>
			  )}

			</div>
		  ))
		)}

	  </div>
	</main>
  );
}