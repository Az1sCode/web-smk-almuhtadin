import React from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { schoolMetadata } from '../data/mockData';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Layanan WhatsApp Sekolah" className="fixed bottom-6 right-6 z-50">
      <a
        href={schoolMetadata.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-xs sm:text-sm shadow-xl shadow-whatsapp/25 transition-all transform hover:scale-105 active:scale-95"
      >
        {/* Pulsing notification dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>

        <WhatsappLogo size={22} weight="fill" />
        
        <span className="hidden sm:inline">Tanya PPDB / Info Sekolah</span>
        <span className="sm:hidden">PPDB</span>
      </a>
    </aside>
  );
};
