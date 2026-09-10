import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  Briefcase, 
  GraduationCap, 
  Flask, 
  Users, 
  ArrowUpRight, 
  Sparkle 
} from '@phosphor-icons/react';
import { majorsData, schoolMetadata } from '../data/mockData';

export const MajorDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const major = majorsData.find((item) => item.slug === slug);

  if (!major) {
    return <Navigate to="/jurusan" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Back to Majors */}
      <div>
        <Link
          to="/jurusan"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink-muted hover:text-navy transition-colors"
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Kembali ke Semua Jurusan</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 p-8 sm:p-12 text-white shadow-elevated">
        <img
          src={major.featuredImage}
          alt={major.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold text-slate-950 text-xs font-mono font-bold">
            Program Keahlian: {major.abbreviation}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {major.name}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            {major.shortDescription}
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5">
              <Users size={16} className="text-gold" />
              {major.stats.studentsCount} Siswa Aktif
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Flask size={16} className="text-gold" />
              {major.stats.labCount} Laboratorium Khusus
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              {major.stats.employmentRate}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Overview, Competencies, Careers */}
        <div className="lg:col-span-8 space-y-8">
          {/* Detailed Narrative */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-whisper space-y-4">
            <h2 className="text-xl font-bold text-ink tracking-tight">
              Deskripsi & Orientasi Kejuruan
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              {major.fullDescription}
            </p>
          </div>

          {/* Core Competencies */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-whisper space-y-4">
            <h3 className="text-lg font-bold text-ink tracking-tight">
              Kompetensi Keahlian yang Dikuasai
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {major.competencies.map((comp, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs sm:text-sm text-ink">
                  <CheckCircle size={18} weight="fill" className="text-azure shrink-0 mt-0.5" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Prospects */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-whisper space-y-4">
            <h3 className="text-lg font-bold text-ink tracking-tight flex items-center gap-2">
              <Briefcase size={22} className="text-navy" />
              <span>Prospek Karir & Peluang Kerja Lulusan</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {major.careerProspects.map((career, cIdx) => (
                <div key={cIdx} className="flex items-center gap-2.5 p-3 rounded-xl bg-azure-soft border border-azure/20 text-xs sm:text-sm font-semibold text-navy">
                  <span className="w-2 h-2 rounded-full bg-azure shrink-0" />
                  <span>{career}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Partners */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-whisper space-y-4">
            <h3 className="text-lg font-bold text-ink tracking-tight">
              Mitra Industri & Tempat Praktik Kerja Lapangan (PKL)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {major.industryPartners.map((partner, pIdx) => (
                <div
                  key={pIdx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-center font-bold text-xs text-ink shadow-sm"
                >
                  {partner.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Head of Program & Fast Apply */}
        <div className="lg:col-span-4 space-y-6">
          {/* Head of Program Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-azure font-bold">
              Kepala Program Keahlian
            </span>
            <div className="relative rounded-2xl overflow-hidden aspect-square max-w-[180px] mx-auto shadow-md border border-slate-200">
              <img
                src={major.headOfProgram.photo}
                alt={major.headOfProgram.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-base text-ink">
                {major.headOfProgram.name}
              </h4>
              <p className="text-xs text-ink-muted font-mono mt-0.5">
                {major.headOfProgram.title}
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-navy rounded-3xl p-6 text-white shadow-elevated space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-gold font-bold">
              Pendaftaran Siswa Baru
            </span>
            <h4 className="text-lg font-bold">
              Tertarik Bergabung di Jurusan {major.abbreviation}?
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              Kuota siswa terbatas demi menjamin rasio ideal 1 siswa 1 workstation komputer saat praktikum laboratorium.
            </p>
            <a
              href={schoolMetadata.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gold hover:bg-gold-hover text-slate-950 font-bold text-xs transition-all shadow"
            >
              <Sparkle size={16} weight="fill" />
              <span>Daftar / Konsultasi PPDB</span>
              <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
