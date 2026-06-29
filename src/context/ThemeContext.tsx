import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
	const savedTheme = localStorage.getItem('operix-theme') as 'light' | 'dark' | null;
	if (savedTheme) {
	  setTheme(savedTheme);
	}
  }, []);

  useEffect(() => {
	const root = document.documentElement;
	if (theme === 'dark') {
	  root.classList.add('dark');
	  root.classList.remove('light');
	} else {
	  root.classList.add('light');
	  root.classList.remove('dark');
	}
	localStorage.setItem('operix-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
	<ThemeContext.Provider value={{ theme, toggleTheme }}>
	  {children}
	</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);