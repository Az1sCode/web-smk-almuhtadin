import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  CheckCircle, 
  Users, 
  ChalkboardTeacher, 
  Buildings 
} from '@phosphor-icons/react';
import { majorsData, schoolMetadata } from '../data/mockData';
import { getMajorIcon } from '../utils/majorIcons';

export const MajorsPage: React.FC = () => {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      {/* Header Banner */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
          Kompetensi Keahlian
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
          Program Keahlian Unggulan
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
          Tiga jurusan vokasi masa depan yang terintegrasi dengan kebutuhan industri riil, didukung laboratorium berteknologi tinggi dan sertifikasi profesi.
        </p>
      </div>

      {/* Majors Deep Dive List */}
      <div className="space-y-12">
        {majorsData.map((major) => (
          <div
            key={major.id}
            id={major.slug}
            className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-whisper hover:shadow-elevated transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Image & Quick Stats */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-900">
                <img
                  src={major.featuredImage}
                  alt={major.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent lg:hidden" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 lg:hidden">
                  <span className="px-3 py-1 rounded-full bg-gold text-slate-950 font-bold text-xs font-mono">
                    {major.abbreviation}
                  </span>
                  <h3 className="text-xl font-bold">{major.name}</h3>
                </div>
              </div>

              {/* Right Column: Information & Details */}
              <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="hidden lg:flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-azure-soft flex items-center justify-center">
                        {getMajorIcon(major.abbreviation)}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-azure uppercase tracking-wider">
                          Kode: {major.abbreviation}
                        </span>
                        <h2 className="text-2xl font-extrabold text-ink tracking-tight">
                          {major.name}
                        </h2>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-xs font-bold">
                      Terakreditasi A
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                    {major.fullDescription}
                  </p>

                  {/* Competencies Grid */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-ink font-bold">
                      Kompetensi Inti yang Dipelajari:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {major.competencies.map((comp, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-2 text-xs text-ink-muted">
                          <CheckCircle size={16} weight="fill" className="text-azure shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Industry Partners */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    <span className="text-xs font-mono uppercase tracking-wider text-ink-muted font-bold block">
                      Mitra Industri (DUDI & Tempat PKL):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {major.industryPartners.map((partner, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-ink"
                        >
                          {partner.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Kaprog & CTA */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={major.headOfProgram.photo}
                      alt={major.headOfProgram.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-ink">{major.headOfProgram.name}</p>
                      <p className="text-[11px] text-ink-muted font-mono">{major.headOfProgram.title}</p>
                    </div>
                  </div>

                  <Link
                    to={`/jurusan/${major.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Detail Lengkap & Karir</span>
                    <ArrowUpRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PPDB Callout Banner */}
      <div className="bg-gradient-to-r from-navy to-navy-dark rounded-3xl p-8 sm:p-12 text-white shadow-elevated flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Bingung Menentukan Pilihan Jurusan?
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
            Konsultasikan minat dan potensi Anda bersama tim konseling dan panitia PPDB resmi SMK Al-Muhtadin secara gratis via WhatsApp.
          </p>
        </div>
        <a
          href={schoolMetadata.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3.5 rounded-full bg-gold hover:bg-gold-hover text-slate-950 font-bold text-xs sm:text-sm whitespace-nowrap shadow transition-all transform hover:-translate-y-0.5 active:scale-95"
        >
          Konsultasi Jurusan Sekarang ↗
        </a>
      </div>
    </div>
  );
};
