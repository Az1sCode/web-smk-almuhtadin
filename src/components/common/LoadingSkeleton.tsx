import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'hero' | 'table';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'card',
  count = 3,
  className = ''
}) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'hero') {
    return (
      <div className={`w-full h-80 sm:h-96 rounded-3xl bg-slate-200/70 animate-pulse flex flex-col justify-end p-8 space-y-4 ${className}`}>
        <div className="h-6 w-32 bg-slate-300 rounded-lg" />
        <div className="h-10 w-2/3 bg-slate-300 rounded-xl" />
        <div className="h-4 w-1/2 bg-slate-300 rounded-lg" />
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {items.map((i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center gap-4 animate-pulse"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-3 bg-slate-100 rounded w-2/3" />
            </div>
            <div className="w-16 h-8 bg-slate-200 rounded-lg shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={`space-y-2.5 ${className}`}>
        {items.map((i) => (
          <div
            key={i}
            className="h-14 rounded-xl bg-slate-100 animate-pulse border border-slate-200/60"
          />
        ))}
      </div>
    );
  }

  // Default: 'card'
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((i) => (
        <div
          key={i}
          className="rounded-3xl bg-white border border-slate-100 shadow-soft overflow-hidden animate-pulse flex flex-col"
        >
          <div className="w-full aspect-video bg-slate-200" />
          <div className="p-6 space-y-3 flex-1">
            <div className="h-3 bg-slate-200 rounded w-1/4" />
            <div className="h-5 bg-slate-200 rounded w-4/5" />
            <div className="space-y-1.5 pt-2">
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
