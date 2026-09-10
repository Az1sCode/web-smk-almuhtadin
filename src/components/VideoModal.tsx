import React, { useEffect } from 'react';
import { X } from '@phosphor-icons/react';

interface VideoModalProps {
  youtubeId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ youtubeId, title, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-white/10 text-white">
          <h3 className="text-sm font-medium line-clamp-1 pr-4 text-slate-200">
            {title}
          </h3>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup video"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* 16:9 Responsive Video Container */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
