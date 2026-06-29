import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageContextType = {
  isAr: boolean;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType>({ isAr: true, toggleLanguage: () => {} });

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAr, setIsAr] = useState(true); // Arabic is default

  useEffect(() => {
	document.documentElement.dir = isAr ? 'rtl' : 'ltr';
	document.documentElement.lang = isAr ? 'ar' : 'en';
  }, [isAr]);

  const toggleLanguage = () => setIsAr(!isAr);

  return (
	<LanguageContext.Provider value={{ isAr, toggleLanguage }}>
	  {children}
	</LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);