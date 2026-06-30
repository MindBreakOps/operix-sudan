import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Lock, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logoIcon from '../../assets/logo.png';

const navLinks = [
  { path: "/",         labelEn: "Home",     labelAr: "الرئيسية" },
  { path: "/about",    labelEn: "About",    labelAr: "من نحن"   },
  { path: "/services", labelEn: "Services", labelAr: "خدماتنا" },
  { path: "/products", labelEn: "Products", labelAr: "منتجاتنا"},
  { path: "/contact",  labelEn: "Contact",  labelAr: "تواصل"    },
];

export default function Header() {
  const { isAr, toggleLanguage } = useLanguage();
  const { theme, toggleTheme }   = useTheme();
  const location                 = useLocation();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled]               = useState(false);

  useEffect(() => {
	const onScroll = () => setScrolled(window.scrollY > 20);
	window.addEventListener('scroll', onScroll, { passive: true });
	return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on route change
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  const isActive = (path: string) =>
	path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
	<header
	  className={`fixed top-0 w-full z-50 transition-all duration-500 ${
		scrolled
		  ? 'bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
		  : 'bg-transparent border-b border-transparent'
	  }`}
	>
	  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

		{/* ── Logo ── */}
		<Link
		  to="/"
		  className="relative z-50 flex items-center gap-2.5 group select-none"
		  dir="ltr"
		  aria-label="OPERIX 249 — Home"
		>
		  <div className="relative">
			<img
			  src={logoIcon}
			  alt="OPERIX Logo"
			  className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
			/>
			{/* Subtle gold glow behind logo on hover */}
			<span className="absolute inset-0 rounded-full bg-brand-gold/20 blur-md scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />
		  </div>
		  {/* Forced LTR direction to prevent "249 OPERIX" flip in Arabic mode */}
		  <div className="flex items-center gap-1.5 leading-none" dir="ltr">
			<span
			  className="text-xl font-bold tracking-wide"
			  style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
			>
			  OPERIX
			</span>
			<span
			  className="text-xl font-bold"
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
		  </div>
		</Link>

		{/* ── Desktop Nav ── */}
		<nav className="hidden lg:flex items-center gap-1">
		  {navLinks.map((link) => {
			const active = isActive(link.path);
			return (
			  <Link
				key={link.path}
				to={link.path}
				className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
				  isAr ? 'text-[15px] font-bold tracking-wide' : 'text-sm font-semibold'
				} ${
				  active
					? 'text-brand-gold'
					: isAr
					  ? 'text-[var(--text)] hover:text-brand-gold'
					  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
				}`}
			  >
				{isAr ? link.labelAr : link.labelEn}
				{active && (
				  <motion.span
					layoutId="nav-pill"
					className="absolute inset-0 rounded-lg bg-brand-gold/10 border border-brand-gold/20"
					transition={{ type: 'spring', stiffness: 380, damping: 30 }}
				  />
				)}
			  </Link>
			);
		  })}
		</nav>

		{/* ── Action Controls ── */}
		<div className="flex items-center gap-2 relative z-50">
		  {/* CMS Admin */}
		  <Link
			to="/login"
			title="CMS Admin"
			className="p-2 rounded-lg text-[var(--text-muted)] hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-200"
		  >
			<Lock size={16} />
		  </Link>

		  {/* Theme toggle */}
		  <button
			onClick={toggleTheme}
			title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
			className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/05 transition-all duration-200"
		  >
			<AnimatePresence mode="wait">
			  <motion.span
				key={theme}
				initial={{ rotate: -90, opacity: 0 }}
				animate={{ rotate: 0, opacity: 1 }}
				exit={{ rotate: 90, opacity: 0 }}
				transition={{ duration: 0.2 }}
			  >
				{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
			  </motion.span>
			</AnimatePresence>
		  </button>

		  {/* Language toggle */}
		  <button
			onClick={toggleLanguage}
			className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-bold tracking-wider text-[var(--text-muted)] hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/05 transition-all duration-200 select-none"
		  >
			{isAr ? 'EN' : 'عربي'}
		  </button>

		  {/* Mobile hamburger */}
		  <button
			onClick={() => setMobileMenuOpen((v) => !v)}
			aria-label="Toggle menu"
			className="lg:hidden p-2 ml-1 rounded-lg text-[var(--text-muted)] hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-200"
		  >
			<AnimatePresence mode="wait">
			  <motion.span
				key={isMobileMenuOpen ? 'x' : 'menu'}
				initial={{ rotate: -45, opacity: 0 }}
				animate={{ rotate: 0, opacity: 1 }}
				exit={{ rotate: 45, opacity: 0 }}
				transition={{ duration: 0.15 }}
			  >
				{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
			  </motion.span>
			</AnimatePresence>
		  </button>
		</div>
	  </div>

	  {/* ── Mobile Menu ── */}
	  <AnimatePresence>
		{isMobileMenuOpen && (
		  <motion.div
			initial={{ opacity: 0, y: -8 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -8 }}
			transition={{ duration: 0.2, ease: 'easeOut' }}
			className="lg:hidden absolute top-full left-0 w-full bg-[var(--surface)] border-b border-[var(--border)] shadow-2xl"
			style={{ backdropFilter: 'blur(20px)' }}
		  >
			<nav className="flex flex-col px-6 py-5 gap-1">
			  {navLinks.map((link, i) => {
				const active = isActive(link.path);
				return (
				  <motion.div
					key={link.path}
					initial={{ opacity: 0, x: -16 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: i * 0.05 }}
				  >
					<Link
					  to={link.path}
					  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
						isAr ? 'text-lg font-bold' : 'text-base font-semibold'
					  } ${
						active
						  ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
						  : isAr
							? 'text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-brand-gold'
							: 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
					  }`}
					>
					  {active && (
						<span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
					  )}
					  {isAr ? link.labelAr : link.labelEn}
					</Link>
				  </motion.div>
				);
			  })}

			  {/* Divider + extra actions */}
			  <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between">
				<Link
				  to="/login"
				  className={`flex items-center gap-2 px-4 py-2 transition-colors ${
					isAr ? 'text-base font-bold text-[var(--text)] hover:text-brand-gold' : 'text-sm font-semibold text-[var(--text-muted)] hover:text-brand-gold'
				  }`}
				>
				  <Lock size={14} />
				  {isAr ? 'لوحة التحكم' : 'Admin Panel'}
				</Link>
				<div className="flex gap-2">
				  <button
					onClick={toggleTheme}
					className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-brand-gold transition-colors"
				  >
					{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
				  </button>
				  <button
					onClick={toggleLanguage}
					className="px-3 py-2 rounded-lg border border-[var(--border)] text-xs font-bold text-[var(--text-muted)] hover:text-brand-gold transition-colors"
				  >
					{isAr ? 'EN' : 'عربي'}
				  </button>
				</div>
			  </div>
			</nav>
		  </motion.div>
		)}
	  </AnimatePresence>
	</header>
  );
}