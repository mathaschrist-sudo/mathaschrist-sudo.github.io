// app/sections/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: 'https://mathaschrist.vercel.app/' },
    { name: 'Projets', href: '#projects' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-lg border-b border-[#404040]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* LOGO */}
          <a
            href="https://mathaschrist.vercel.app/"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="text-xl lg:text-2xl font-bold text-[#f1f5fb] hover:text-[#c5fb67] transition-colors duration-300"
          >
            Portfolio
          </a>

          {/* NAVIGATION DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="relative text-[#cccccc] hover:text-[#c5fb67] transition-colors duration-300 text-sm lg:text-base group"
              >
                {link.name}
                <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[#c5fb67] transition-all duration-250 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* BOUTON CTA - Télécharger CV (DESKTOP) */}
          <div className="hidden md:block">
            <a
              href="/cv.pdf"
              download="CV_MVOUALA_Desire.pdf"
              className="px-4 py-2 bg-transparent border-2 border-[#c5fb67] text-[#c5fb67] rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-[#c5fb67] hover:text-[#050505] hover:scale-105 flex items-center gap-2"
            >
              <Download size={16} />
              CV
            </a>
          </div>

          {/* BOUTON MENU MOBILE */}
          <button
            className="md:hidden text-[#f1f5fb] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-lg border-b border-[#404040] transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="block text-[#cccccc] hover:text-[#c5fb67] transition-colors duration-300 py-2"
            >
              {link.name}
            </a>
          ))}
          {/* BOUTON CV MOBILE */}
          <a
            href="/cv.pdf"
            download="CV_MVOUALA_Desire.pdf"
            className="w-full mt-4 px-4 py-3 bg-transparent border-2 border-[#c5fb67] text-[#c5fb67] rounded-lg font-semibold transition-all duration-300 hover:bg-[#c5fb67] hover:text-[#050505] flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Télécharger CV
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;