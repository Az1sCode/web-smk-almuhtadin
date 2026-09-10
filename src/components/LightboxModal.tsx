import React, { useEffect } from 'react';
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { GalleryImage } from '../types';

interface LightboxModalProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fadeIn">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Close button */}
      <button
        onClick={onClose}
        type="button"
        className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Tutup foto"
      >
        <X size={22} weight="bold" />
      </button>

      {/* Prev / Next controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            type="button"
            className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Foto sebelumnya"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            type="button"
            className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Foto selanjutnya"
          >
            <CaretRight size={24} weight="bold" />
          </button>
        </>
      )}

      {/* Content Container */}
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center z-10 select-none">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[75vh]">
          <img
            src={currentImage.imagePath}
            alt={currentImage.caption}
            className="max-h-[75vh] w-auto object-contain mx-auto"
          />
        </div>

        {/* Caption & Counter */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <p className="text-white text-sm sm:text-base font-medium">
            {currentImage.caption}
          </p>
          <div className="mt-1 flex items-center justify-center gap-3 text-xs font-mono text-slate-400">
            <span>{currentImage.date}</span>
            <span>•</span>
            <span>{currentIndex + 1} dari {images.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
