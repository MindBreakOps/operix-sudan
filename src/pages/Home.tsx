import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../components/sections/Hero';
import TechMarquee from '../components/sections/TechMarquee';
import LiveDashboard from '../components/sections/LiveDashboard';
import Services from '../components/sections/Services';
import Portfolio from '../components/sections/Portfolio';

import logoIcon from '../assets/logo.png';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
	const timer = setTimeout(() => setShowSplash(false), 2800);
	return () => clearTimeout(timer);
  }, []);

  return (
	<div className="w-full relative">
	  <AnimatePresence>
		{showSplash && (
		  <motion.div
			initial={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.7, ease: 'easeInOut' }}
			className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
			style={{ background: 'var(--bg)' }}
		  >
			<motion.div
			  initial={{ opacity: 0, scale: 0.9 }}
			  animate={{ opacity: 1, scale: 1 }}
			  transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
			  className="flex flex-col items-center"
			>
			  {/* Glow ring */}
			  <div className="relative w-24 h-24 flex items-center justify-center mb-7">
				<div
				  className="absolute inset-0 rounded-full opacity-30 blur-xl animate-pulse"
				  style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
				/>
				<img
				  src={logoIcon}
				  alt="OPERIX Logo"
				  className="relative w-20 h-20 object-contain"
				  style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.5))' }}
				/>
			  </div>

			  {/* Wordmark - Forced LTR */}
			  <div
				className="flex items-center gap-2 mb-2"
				style={{ fontFamily: 'var(--font-display)' }}
				dir="ltr"
			  >
				<span
				  className="text-4xl font-bold tracking-wide"
				  style={{ color: 'var(--text)' }}
				>
				  OPERIX
				</span>
				<span className="text-4xl font-bold shimmer-text">
				  249
				</span>
			  </div>

			  <p
				className="text-xs font-semibold tracking-[0.25em] uppercase mb-10"
				style={{ color: 'var(--text-muted)' }}
			  >
				Enterprise Solutions
			  </p>

			  {/* Progress bar */}
			  <div
				className="w-48 h-[2px] overflow-hidden rounded-full"
				style={{ background: 'var(--border)' }}
			  >
				<motion.div
				  initial={{ x: '-100%' }}
				  animate={{ x: '100%' }}
				  transition={{
					repeat: Infinity,
					duration: 1.4,
					ease: 'easeInOut',
				  }}
				  className="w-full h-full"
				  style={{
					background: 'linear-gradient(90deg, transparent, #D4AF37, #F5A623, transparent)',
				  }}
				/>
			  </div>
			</motion.div>
		  </motion.div>
		)}
	  </AnimatePresence>

	  <HeroSection />
	  <TechMarquee />
	  <LiveDashboard />
	  <Services />
	  <Portfolio />
	</div>
  );
}