import React from 'react';
import { WarningCircle, ArrowsClockwise, ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  backHref?: string;
  backLabel?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Terjadi Kesalahan',
  message = 'Gagal memuat data dari server atau penyimpanan lokal. Silakan coba kembali beberapa saat lagi.',
  onRetry,
  backHref,
  backLabel = 'Kembali ke Beranda',
  className = ''
}) => {
  return (
    <div className={`w-full py-16 px-6 rounded-3xl border border-rose-200/60 bg-rose-50/40 flex flex-col items-center justify-center text-center ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-white shadow-soft border border-rose-100 flex items-center justify-center text-rose-500 mb-4">
        <WarningCircle size={36} weight="duotone" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-ink mb-1.5 font-display">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-ink-muted max-w-md mb-6 leading-relaxed">
        {message}
      </p>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold shadow-md hover:bg-navy-light transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowsClockwise size={16} weight="bold" />
            Coba Lagi
          </button>
        )}

        {backHref && (
          <Link
            to={backHref}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-ink text-xs font-bold shadow-xs hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft size={16} weight="bold" />
            {backLabel}
          </Link>
        )}
      </div>
    </div>
  );
};
