// app/sections/Footer.tsx
import { Heart } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-[#404040]">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-[#cccccc] text-sm">
            <span>© {currentYear} Portfolio.</span>
            <span className="hidden sm:inline">Tous droits réservés.</span>
          </div>

          {/* Fait avec amour */}
          <div className="flex items-center gap-2 text-[#cccccc] text-sm">
            <span>Fait avec</span>
            <Heart size={14} className="text-[#c5fb67] fill-[#c5fb67] animate-pulse" />
            <span>et React-Next.js</span>
          </div>

          {/* Liens - Utilisation de Link de Next.js */}
          <div className="flex items-center gap-6">
            <Link
              href="/mentions-legales"
              className="text-[#cccccc] hover:text-[#c5fb67] transition-colors duration-300 text-sm"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="text-[#cccccc] hover:text-[#c5fb67] transition-colors duration-300 text-sm"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;