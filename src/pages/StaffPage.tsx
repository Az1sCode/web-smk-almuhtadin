import React, { useState } from 'react';
import { 
  EnvelopeSimple, 
  IdentificationCard, 
  ChalkboardTeacher, 
  UsersThree, 
  Sparkle 
} from '@phosphor-icons/react';
import { staffData } from '../data/mockData';

export const StaffPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    { label: 'Semua', value: 'Semua' },
    { label: 'Pimpinan Sekolah', value: 'pimpinan' },
    { label: 'Tenaga Pendidik (Guru)', value: 'guru' },
    { label: 'Tata Usaha & Staf', value: 'staf' },
  ];

  const filteredStaff = staffData.filter((member) => {
    if (selectedCategory === 'Semua') return true;
    return member.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header Banner */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
          Struktur & Direktori
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
          Pimpinan, Pendidik & Tenaga Kependidikan
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
          Didukung oleh tenaga pendidik profesional berkualifikasi sarjana & magister serta tersertifikasi kompetensi resmi BNSP.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            type="button"
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.value
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-ink-muted border border-slate-200 hover:text-navy hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStaff.map((member) => (
          <div
            key={member.id}
            className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-whisper hover:shadow-elevated transition-all flex flex-col justify-between hover:-translate-y-1 duration-300"
          >
            <div>
              {/* Formal Portrait Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {member.department && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-mono text-[11px] font-medium block truncate text-center">
                      {member.department}
                    </span>
                  </div>
                )}
              </div>

              {/* Information */}
              <div className="p-5 space-y-1.5">
                <h3 className="font-extrabold text-sm sm:text-base text-ink group-hover:text-navy transition-colors line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed font-medium line-clamp-2">
                  {member.position}
                </p>
                {member.nipNuptk && (
                  <p className="text-[11px] font-mono text-ink-subtle pt-1">
                    NIP: {member.nipNuptk}
                  </p>
                )}
              </div>
            </div>

            {/* Contact row (if available) */}
            {member.email && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-100">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-1.5 text-xs text-navy hover:text-azure transition-colors font-mono"
                >
                  <EnvelopeSimple size={14} />
                  <span className="truncate">{member.email}</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
