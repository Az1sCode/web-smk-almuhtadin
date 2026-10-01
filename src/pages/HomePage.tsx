import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Play, 
  Trophy, 
  CalendarBlank, 
  CaretRight, 
  CheckCircle,
  Quotes,
  Certificate,
  Desktop,
  Briefcase,
  Heart,
  Target,
  Sparkle,
  Leaf
} from '@phosphor-icons/react';
import { 
  schoolMetadata, 
  majorsData, 
  achievementsData, 
  videosData, 
  newsData,
  heroSlidesData,
  schoolAdvantagesData,
  schoolVisionMissionData
} from '../data/mockData';
import { VideoModal } from '../components/VideoModal';
import { getMajorIcon } from '../utils/majorIcons';
import { SmkPkLogo, AdiwiyataLogo, LspP1Logo } from '../components/AdvantageLogos';

export const HomePage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = heroSlidesData;
  const hasMultipleSlides = heroSlides.length > 1;

  // Auto-slide jika terdapat lebih dari 1 konten hero
  useEffect(() => {
    if (!hasMultipleSlides || isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [hasMultipleSlides, isPaused, heroSlides.length]);

  const currentSlide = heroSlides[currentSlideIndex] || heroSlides[0];

  const featuredAchievements = achievementsData.slice(0, 3);
  const latestNews = newsData.slice(0, 3);
  const heroVideo = videosData[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION (DINAMIS DENGAN TRANSISI HALUS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div 
          className="relative rounded-4xl overflow-hidden bg-slate-900 min-h-[500px] md:min-h-[560px] flex items-end p-6 sm:p-10 lg:p-14 shadow-2xl border border-slate-800"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Dynamic Hero Background Image with Smooth Crossfade */}
          <AnimatePresence mode="sync">
            <motion.img
              key={currentSlide.id}
              src={currentSlide.image}
              alt={currentSlide.imageAlt || currentSlide.headline}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.45, scale: 1.02 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-transparent pointer-events-none" />

          {/* Dynamic Hero Content (Bergeser saat konten > 1) */}
          <div className="relative z-10 max-w-3xl min-h-[200px] flex flex-col justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100, 
                  damping: 20 
                }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 text-xs font-semibold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <span>{currentSlide.badge}</span>
                </div>

                {/* Confident Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                  {currentSlide.headline}
                </h1>

                {/* Subtext */}
                <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light">
                  {currentSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimalist Progress Indicators jika memiliki lebih dari 1 konten */}
          {hasMultipleSlides && (
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20 flex items-center gap-2">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  aria-label={`Lihat slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlideIndex
                      ? 'w-8 bg-gold'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. STATS COUNTER STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-whisper">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {schoolMetadata.stats.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center text-center p-4 ${
                  idx === 0 ? 'pt-0 md:pt-4' : ''
                }`}
              >
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-ink mt-1">
                  {item.label}
                </span>
                <span className="text-2xs font-mono text-ink-muted">
                  {item.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SAMBUTAN KEPALA SEKOLAH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-whisper">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Foto & Identitas Pimpinan */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full max-w-xs shadow-md border-2 border-azure/20">
                <img
                  src={schoolMetadata.principal.photo}
                  alt={schoolMetadata.principal.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold px-2.5 py-1 rounded bg-black/40 backdrop-blur-sm inline-block">
                    Pimpinan Sekolah
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-ink text-base sm:text-lg">
                  {schoolMetadata.principal.name}
                </h4>
                <p className="text-xs text-ink-muted font-mono mt-0.5">
                  {schoolMetadata.principal.title}
                </p>
              </div>
            </div>

            {/* Konten Sambutan & Kredensial */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-azure-soft text-navy text-xs font-mono font-bold tracking-wide">
                  <Sparkle size={14} weight="fill" className="text-azure" />
                  <span>Sambutan Kepala Sekolah</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
                  Mempersiapkan Generasi Muda Menghadapi Masa Depan Digital
                </h2>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-4 border-azure py-1">
                <Quotes size={32} weight="fill" className="text-azure/20 absolute -top-2 left-2 pointer-events-none" />
                <blockquote className="text-slate-700 italic text-base sm:text-lg leading-relaxed">
                  "{schoolMetadata.principal.quote}"
                </blockquote>
              </div>

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Di SMK Al-Muhtadin, kami berkomitmen menghadirkan kurikulum vokasi adaptif yang terhubung langsung dengan kebutuhan riil dunia usaha dan dunia industri (DUDI), membekali peserta didik dengan sertifikasi resmi berdaya saing global, serta membina akhlak dan adab budi pekerti islami.
              </p>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>NPSN: <strong className="text-ink font-bold">{schoolMetadata.npsn}</strong></span>
                  <span className="text-slate-300">•</span>
                  <span>{schoolMetadata.accreditation}</span>
                </div>

                <Link
                  to="/profil"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-navy hover:text-azure transition-colors group"
                >
                  <span>Baca Profil Sekolah Selengkapnya</span>
                  <CaretRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. VISI & MISI SEKOLAH (DEDICATED SHOWCASE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
                Komitmen & Arah Pendidikan
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">
                Visi & Misi SMK Al-Muhtadin
              </h2>
            </div>
            <Link
              to="/visi-misi"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-azure transition-colors"
            >
              <span>Buka Halaman Visi & Misi Lengkap</span>
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Visi Resmi Institusi */}
            <div className="lg:col-span-6 bg-gradient-to-br from-navy via-navy to-navy-dark rounded-3xl p-8 sm:p-10 text-white shadow-elevated flex flex-col justify-between space-y-6 relative overflow-hidden border border-navy/20">
              <div className="absolute right-6 -bottom-6 text-white/5 pointer-events-none">
                <Quotes size={160} weight="fill" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 text-xs font-mono font-bold tracking-wide">
                  <Target size={14} weight="bold" />
                  <span>Visi Resmi Institusi</span>
                </div>
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug text-white">
                  "{schoolVisionMissionData.vision}"
                </blockquote>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light pt-2">
                  {schoolVisionMissionData.visionExplanation}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300">
                  Pedoman Vokasi 2024 - 2029
                </span>
                <Link
                  to="/visi-misi"
                  className="text-xs font-semibold text-gold hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Detail Nilai Inti</span>
                  <ArrowUpRight size={14} weight="bold" />
                </Link>
              </div>
            </div>

            {/* Right Column: 3 Pilar Misi Utama */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-4">
              {schoolVisionMissionData.missions.slice(0, 3).map((mission) => (
                <div
                  key={mission.number}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-whisper hover:shadow-md transition-all flex items-start gap-4 hover:-translate-y-0.5 duration-200"
                >
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-azure bg-azure-soft px-3 py-1.5 rounded-xl shrink-0 mt-0.5">
                    {mission.number}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-ink">
                      {mission.title}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {mission.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. KEUNGGULAN SEKOLAH (3 PILAR UTAMA KEUNGGULAN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
                Keunggulan Institusi
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Tiga Pilar Keunggulan SMK Al-Muhtadin
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Reputasi kejuruan terdepan yang ditopang oleh status SMK Pusat Keunggulan, budaya pelestarian lingkungan hidup Adiwiyata, dan kepemilikan lisensi resmi LSP-P1 BNSP.
              </p>
            </div>
            <Link
              to="/profil"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-azure transition-colors shrink-0"
            >
              <span>Profil Sekolah</span>
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>

          {/* 3 Pillars Grid - Clean White Surface, Centered Logo, No Description, No Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Card 1: SMK Pusat Keunggulan (SMK PK) */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-whisper hover:shadow-elevated transition-all flex flex-col items-center justify-center text-center hover:-translate-y-1 duration-300 group">
              <div className="space-y-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold-hover border border-gold/30 text-xs font-mono font-bold tracking-wide">
                  <Sparkle size={12} weight="fill" className="text-gold" />
                  <span>Kemendikbudristek RI</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                  SMK Pusat Keunggulan (SMK PK)
                </h3>
              </div>

              {/* Centered Logo */}
              <div className="my-8 flex items-center justify-center">
                <SmkPkLogo className="w-36 h-36 sm:w-40 sm:h-40 group-hover:scale-105 transition-transform duration-300" />
              </div>
            </div>

            {/* Card 2: Sekolah Adiwiyata */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-whisper hover:shadow-elevated transition-all flex flex-col items-center justify-center text-center hover:-translate-y-1 duration-300 group">
              <div className="space-y-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-xs font-mono font-bold tracking-wide">
                  <Leaf size={13} weight="fill" className="text-emerald-600" />
                  <span>Kampus Hijau & Berkelanjutan</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                  Sekolah Adiwiyata
                </h3>
              </div>

              {/* Centered Logo */}
              <div className="my-8 flex items-center justify-center">
                <AdiwiyataLogo className="w-36 h-36 sm:w-40 sm:h-40 group-hover:scale-105 transition-transform duration-300" />
              </div>
            </div>

            {/* Card 3: Memiliki LSP-P1 Berlisensi BNSP */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-whisper hover:shadow-elevated transition-all flex flex-col items-center justify-center text-center hover:-translate-y-1 duration-300 group">
              <div className="space-y-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-navy border border-blue-200/70 text-xs font-mono font-bold tracking-wide">
                  <Certificate size={13} weight="fill" className="text-navy" />
                  <span>Lisensi Resmi BNSP</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                  Memiliki LSP-P1 (BNSP)
                </h3>
              </div>

              {/* Centered Logo */}
              <div className="my-8 flex items-center justify-center">
                <LspP1Logo className="w-36 h-36 sm:w-40 sm:h-40 group-hover:scale-105 transition-transform duration-300" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. PROGRAM KEAHLIAN / JURUSAN (BENTO CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
              Program Unggulan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">
              Pilihan Program Keahlian (Jurusan)
            </h2>
          </div>
          <Link
            to="/jurusan"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-azure transition-colors"
          >
            <span>Lihat Semua Program</span>
            <ArrowUpRight size={16} weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {majorsData.map((major) => (
            <div
              key={major.id}
              className="group bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-whisper hover:shadow-elevated transition-all flex flex-col justify-between hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-azure-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getMajorIcon(major.abbreviation, "w-6 h-6 text-azure")}
                  </div>
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-ink-muted">
                    {major.abbreviation}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-ink group-hover:text-navy transition-colors mb-2.5 leading-snug line-clamp-2 min-h-[56px]">
                  {major.name}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3 mb-6">
                  {major.shortDescription}
                </p>

                {/* Core Competencies preview */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted font-bold block">
                    Fokus Pembelajaran:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {major.competencies.slice(0, 2).map((comp, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/60"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-ink-muted">
                  {major.stats.employmentRate.split(' ')[0]} Lulusan Bekerja
                </span>
                <Link
                  to={`/jurusan/${major.slug}`}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-navy hover:text-white text-ink flex items-center justify-center transition-all shadow-sm group-hover:bg-navy group-hover:text-white"
                  aria-label={`Detail ${major.name}`}
                >
                  <ArrowUpRight size={16} weight="bold" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. KABAR TERKINI / BERITA & PENGUMUMAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
              Informasi Resmi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">
              Kabar Terkini & Pengumuman
            </h2>
          </div>
          <Link
            to="/berita"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-azure transition-colors"
          >
            <span>Semua Berita</span>
            <ArrowUpRight size={16} weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-whisper hover:shadow-elevated transition-all flex flex-col justify-between hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-navy font-semibold text-xs shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
                    <CalendarBlank size={14} />
                    <span>{item.publishedAt}</span>
                    <span>•</span>
                    <span>{item.readingTime}</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-ink group-hover:text-navy transition-colors line-clamp-2 leading-snug">
                    <Link to={`/berita/${item.slug}`}>{item.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-muted line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  to={`/berita/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-azure transition-colors"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowUpRight size={14} weight="bold" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. SOROTAN PRESTASI SISWA & GURU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-900 to-midnight rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold bg-gold/10 px-3 py-1 rounded-full inline-block">
                Etalase Juara
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-white">
                Prestasi Membanggakan Al-Muhtadin
              </h2>
            </div>
            <Link
              to="/prestasi"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-white transition-colors"
            >
              <span>Lihat Semua Prestasi</span>
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAchievements.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all p-5 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-800">
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-3 py-1 rounded-full bg-gold text-slate-950 font-bold text-xs font-mono shadow">
                        {item.rankTitle}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-gold uppercase tracking-wider block">
                      Tingkat {item.level} • {item.year}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-white mt-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-mono mt-2 flex items-center gap-1.5">
                      <Trophy size={14} className="text-gold shrink-0" />
                      <span>{item.recipientName}</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. HIGHLIGHT VIDEO KEGIATAN YOUTUBE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-whisper">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
                Kanal YouTube Resmi
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">
                Sorotan Video Kegiatan Sekolah
              </h2>
            </div>
            <Link
              to="/galeri"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-azure transition-colors"
            >
              <span>Galeri & Video Lengkap</span>
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>

          <div
            onClick={() => setSelectedVideo({ id: heroVideo.youtubeId, title: heroVideo.title })}
            className="group relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-950 cursor-pointer shadow-lg border border-slate-200"
          >
            {/* Thumbnail Poster */}
            <img
              src={`https://img.youtube.com/vi/${heroVideo.youtubeId}/maxresdefault.jpg`}
              alt={heroVideo.title}
              onError={(e) => {
                // Fallback to high quality default if maxres is unavailable
                e.currentTarget.src = `https://img.youtube.com/vi/${heroVideo.youtubeId}/hqdefault.jpg`;
              }}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            {/* Tactile Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white text-navy flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-azure group-hover:text-white transition-all duration-300">
                <Play size={28} weight="fill" className="translate-x-0.5" />
              </div>
            </div>

            {/* Video Caption Bar */}
            <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
              <div className="flex items-center gap-2.5 text-xs font-mono text-gold mb-1.5">
                <span>Durasi: {heroVideo.duration}</span>
                <span>•</span>
                <span>Rilis: {heroVideo.publishedDate}</span>
              </div>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold line-clamp-1">
                {heroVideo.title}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {selectedVideo && (
        <VideoModal
          youtubeId={selectedVideo.id}
          title={selectedVideo.title}
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};
