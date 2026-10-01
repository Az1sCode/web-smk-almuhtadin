import React from 'react';
import { Tray, Plus } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  message?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Belum Ada Data',
  message,
  description,
  icon,
  actionLabel,
  actionHref,
  onActionClick,
  onAction,
  className = ''
}) => {
  const displayMessage = description || message || 'Data untuk bagian ini belum tersedia atau belum ditambahkan oleh administrator.';
  const handleAction = onAction || onActionClick;

  return (
    <div className={`w-full py-16 px-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 flex flex-col items-center justify-center text-center ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-white shadow-soft border border-slate-100 flex items-center justify-center text-slate-400 mb-4 text-3xl">
        {icon || <Tray size={32} weight="duotone" className="text-slate-400" />}
      </div>
      
      <h3 className="text-base sm:text-lg font-bold text-ink mb-1.5 font-display">
        {title}
      </h3>
      
      <p className="text-xs sm:text-sm text-ink-muted max-w-md mb-6 leading-relaxed">
        {displayMessage}
      </p>

      {actionLabel && (
        actionHref ? (
          <Link
            to={actionHref}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold shadow-md hover:bg-navy-light transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={16} weight="bold" />
            {actionLabel}
          </Link>
        ) : handleAction ? (
          <button
            type="button"
            onClick={handleAction}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold shadow-md hover:bg-navy-light transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={16} weight="bold" />
            {actionLabel}
          </button>
        ) : null
      )}
    </div>
  );
};
