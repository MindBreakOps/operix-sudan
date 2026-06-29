import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../components/sections/Hero';
import TechMarquee from '../components/sections/TechMarquee';
import LiveDashboard from '../components/sections/LiveDashboard'; 

// Import the logo directly from the assets folder so Vite bundles it
import logoIcon from '../assets/logo.png';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
	// Hide the splash screen after 2.5 seconds
	const timer = setTimeout(() => setShowSplash(false), 2500);
	return () => clearTimeout(timer);
  }, []);

  return (
	<div className="w-full relative">
	  <AnimatePresence>
		{showSplash && (
		  <motion.div 
			initial={{ opacity: 1 }}
			exit={{ opacity: 0, scale: 1.05 }}
			transition={{ duration: 0.8, ease: "easeInOut" }}
			className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-vercel-bg"
		  >
			<motion.div
			  initial={{ opacity: 0, y: 20 }}
			  animate={{ opacity: 1, y: 0 }}
			  transition={{ delay: 0.2, duration: 0.8 }}
			  className="flex flex-col items-center"
			>
			  <img 
				src={logoIcon} 
				alt="OPERIX" 
				className="w-20 h-20 mb-6 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] object-contain" 
			  />
			  <h1 className="text-4xl font-black font-serif tracking-widest text-vercel-base">
				OPERIX <span className="text-brand-gold">249</span>
			  </h1>
			  <div className="mt-8 w-48 h-0.5 bg-vercel-border overflow-hidden rounded-full">
				<motion.div 
				  initial={{ x: "-100%" }}
				  animate={{ x: "100%" }}
				  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
				  className="w-full h-full bg-brand-gold"
				/>
			  </div>
			</motion.div>
		  </motion.div>
		)}
	  </AnimatePresence>

	  <HeroSection />
	  <TechMarquee />
	  <LiveDashboard /> 
	</div>
  );
}