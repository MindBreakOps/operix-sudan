import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { ExternalLink, Sun, Moon, Lock } from 'lucide-react';

// Import the logo directly from your assets folder
import logoIcon from '../../assets/logo.png';

export default function Header() {
  const { isAr, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
	<header className="fixed top-0 w-full z-50 bg-vercel-surface/95 backdrop-blur-md border-b border-vercel-border px-6 py-4 transition-colors duration-500 shadow-xl">
	  <div className="max-w-7xl mx-auto flex justify-between items-center">
		
		{/* Updated Logo Area */}
		<Link to="/" className="text-xl font-black tracking-tighter flex items-center gap-2 group">
		  <img 
			src={logoIcon} 
			alt="OPERIX 249 Logo" 
			className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
		  />
		  <div className="flex items-center gap-1">
			<span className="text-vercel-surface-text">OPERIX</span> 
			<span className="text-brand-yellow drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">249</span>
		  </div>
		</Link>
		
		<div className="flex gap-5 items-center text-sm font-semibold text-gray-300">
		  <Link to="/" className="hover:text-brand-yellow transition-colors hidden lg:block">{isAr ? "الرئيسية" : "Home"}</Link>
		  <Link to="/about" className="hover:text-brand-yellow transition-colors hidden lg:block">{isAr ? "من نحن" : "About"}</Link>
		  <Link to="/services" className="hover:text-brand-yellow transition-colors hidden lg:block">{isAr ? "خدماتنا" : "Services"}</Link>
		  <Link to="/products" className="hover:text-brand-yellow transition-colors hidden lg:block">{isAr ? "منتجاتنا" : "Products"}</Link>
		  <Link to="/contact" className="hover:text-brand-yellow transition-colors">{isAr ? "تواصل" : "Contact"}</Link>
		  
		  <div className="flex items-center gap-2 border-l border-vercel-border pl-4 ml-2">
			<Link to="/login" className="p-1.5 rounded-md text-gray-400 hover:text-brand-yellow transition-colors" title="CMS Admin">
			  <Lock size={16} />
			</Link>
			<button onClick={toggleTheme} className="p-1.5 rounded-md border border-vercel-border text-gray-400 hover:border-brand-yellow hover:text-brand-yellow transition-all">
			  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
			</button>
			<button onClick={toggleLanguage} className="bg-black/50 px-3 py-1.5 rounded-md border border-vercel-border text-xs text-white hover:border-brand-yellow hover:text-brand-yellow transition-all">
			  {isAr ? "EN" : "عربي"}
			</button>
		  </div>
		</div>
	  </div>
	</header>
  );
}