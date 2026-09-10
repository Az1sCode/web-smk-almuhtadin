import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  CalendarBlank, 
  Star, 
  CheckCircle,
  Funnel
} from '@phosphor-icons/react';
import { achievementsData } from '../data/mockData';

export const AchievementsPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('Semua');
  const [selectedYear, setSelectedYear] = useState<string>('Semua');

  const levels = ['Semua', 'Nasional', 'Provinsi', 'Kota'];
  const years = ['Semua', '2026', '2025', '2024'];

  const filteredAchievements = achievementsData.filter((item) => {
    const matchesLevel =
      selectedLevel === 'Semua' || item.level.toLowerCase() === selectedLevel.toLowerCase();
    const matchesYear =
      selectedYear === 'Semua' || item.year.toString() === selectedYear;
    return matchesLevel && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header Banner */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
          Etalase Prestasi & Prestise
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
          Rekam Jejak Prestasi & Penghargaan
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
          Bukti nyata dedikasi dan keunggulan kompetensi siswa serta tenaga pendidik SMK Al-Muhtadin di berbagai ajang kejuruan, sains, seni, dan olahraga.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="bg-gradient-to-r from-navy to-navy-dark rounded-3xl p-6 sm:p-8 text-white shadow-elevated grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-gold">45+</span>
          <p className="text-xs text-slate-200 mt-1 font-medium">Penghargaan Resmi</p>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-gold">14</span>
          <p className="text-xs text-slate-200 mt-1 font-medium">Medali Emas LKS</p>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-gold">100%</span>
          <p className="text-xs text-slate-200 mt-1 font-medium">Siswa Terbimbing</p>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-gold">SMK PK</span>
          <p className="text-xs text-slate-200 mt-1 font-medium">Pusat Keunggulan</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
        {/* Level Selector */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <span className="text-xs font-mono text-ink-muted font-bold mr-1 flex items-center gap-1">
            <Funnel size={14} /> Tingkat:
          </span>
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedLevel === lvl
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-ink-muted border border-slate-200 hover:text-navy'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Year Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono text-ink-muted font-bold">Tahun:</span>
          {years.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                selectedYear === yr
                  ? 'bg-gold text-slate-950 font-bold'
                  : 'bg-slate-100 text-ink-muted hover:bg-slate-200'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Achievement Grid */}
      {filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-whisper hover:shadow-elevated transition-all flex flex-col justify-between hover:-translate-y-1 duration-300"
            >
              <div>
                {/* Photo with Gold Rank Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3.5 py-1.5 rounded-full bg-gold text-slate-950 font-bold text-xs font-mono shadow-md flex items-center gap-1.5">
                      <Medal size={14} weight="fill" />
                      <span>{item.rankTitle}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white font-mono text-[11px] uppercase">
                      Tingkat {item.level}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-ink-muted">
                    <span className="font-bold text-azure uppercase">{item.competitionName}</span>
                    <span>Tahun {item.year}</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-ink group-hover:text-navy transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                    <span className="text-[11px] font-mono text-ink-muted uppercase block">
                      Penerima Penghargaan:
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-ink flex items-center gap-1.5">
                      <Trophy size={16} className="text-gold shrink-0" />
                      <span>{item.recipientName}</span>
                    </p>
                  </div>

                  <p className="text-xs text-ink-muted leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-ink-muted text-base">Tidak ada data prestasi yang cocok dengan filter yang dipilih.</p>
        </div>
      )}
    </div>
  );
};
