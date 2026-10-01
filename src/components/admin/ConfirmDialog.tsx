import React, { useEffect } from 'react';
import { Warning, Trash, Info, X } from '@phosphor-icons/react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Ya, Lanjutkan',
  cancelLabel = 'Batal',
  variant = 'danger',
  onConfirm,
  onCancel
}) => {
  // Prevent background scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // Close dialog on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          icon: <Warning size={28} weight="fill" className="text-amber-600" />,
          iconBg: 'bg-amber-100/70',
          btnConfirm: 'bg-amber-600 hover:bg-amber-700 text-white'
        };
      case 'info':
        return {
          icon: <Info size={28} weight="fill" className="text-azure" />,
          iconBg: 'bg-azure-soft',
          btnConfirm: 'bg-navy hover:bg-navy-light text-white'
        };
      case 'danger':
      default:
        return {
          icon: <Trash size={28} weight="duotone" className="text-rose-600" />,
          iconBg: 'bg-rose-100/80',
          btnConfirm: 'bg-rose-600 hover:bg-rose-700 text-white'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy/70 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-elevated border border-slate-200 space-y-5 transform transition-all animate-scale-up"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl ${styles.iconBg} flex items-center justify-center shrink-0`}>
            {styles.icon}
          </div>
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="text-base font-bold text-ink leading-snug">
              {title}
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
            aria-label="Tutup modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-ink-muted hover:bg-slate-100 hover:text-ink transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer ${styles.btnConfirm}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
