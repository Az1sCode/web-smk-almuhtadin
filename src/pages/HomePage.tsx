import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Sparkle, 
  Play, 
  Trophy, 
  CalendarBlank, 
  CaretRight, 
  CheckCircle,
  Briefcase,
  Cpu,
  GlobeHemisphereWest,
  Calculator
} from '@phosphor-icons/react';
import { 
  schoolMetadata, 
  majorsData, 
  achievementsData, 
  videosData, 
  newsData 
} from '../data/mockData';
import { VideoModal } from '../components/VideoModal';

export const HomePage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);

  const featuredAchievements = achievementsData.slice(0, 3);
  const latestNews = newsData.slice(0, 3);
  const heroVideo = videosData[0];

  const getMajorIcon = (abbr: string) => {
    switch (abbr) {
      case 'RPL':
        return <Cpu size={28} weight="duotone" className="text-azure" />;
      case 'TKJ':
        return <GlobeHemisphereWest size={28} weight="duotone" className="text-azure" />;
      case 'AKL':
        return <Calculator size={28} weight="duotone" className="text-azure" />;
      default:
        return <Briefcase size={28} weight="duotone" className="text-azure" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-4xl overflow-hidden bg-slate-900 min-h-[540px] md:min-h-[580px] flex items-end p-6 sm:p-10 lg:p-14 shadow-2xl border border-slate-800">
          {/* Hero Background Image & Scrim Overlay */}
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600"
            alt="Kampus SMK Al-Muhtadin"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>SMK Al-Muhtadin • Terakreditasi A (Unggul)</span>
            </div>

            {/* Confident Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Membentuk Generasi Unggul, Berkarakter & Siap Kerja.
            </h1>

            {/* Subtext (concise, high clarity) */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Pusat keunggulan vokasi di Kota Depok yang mengintegrasikan kurikulum berbasis industri teknologi terkini, kepemimpinan, dan nilai budi pekerti luhur.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/jurusan"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-navy hover:bg-navy-light text-white font-semibold text-sm tracking-tight shadow-lg shadow-navy/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Jelajahi Jurusan</span>
                <ArrowUpRight size={18} weight="bold" />
              </Link>

              <a
                href={schoolMetadata.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-ink font-semibold text-sm tracking-tight shadow-md hover:shadow transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <Sparkle size={18} weight="fill" className="text-gold" />
                <span>Pendaftaran PPDB</span>
              </a>
            </div>
          </div>
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

      {/* 3. ABOUT & PRINCIPAL SNIPPET (BENTO 2-COL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Principal Message & Institutional Credo */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-whisper flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-azure bg-azure-soft px-3 py-1 rounded-full inline-block">
                Sambutan Kepala Sekolah
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                Mempersiapkan Generasi Muda Menghadapi Masa Depan Digital
              </h2>
              <blockquote className="text-ink-muted italic text-sm sm:text-base leading-relaxed border-l-4 border-azure pl-4 py-1">
                "{schoolMetadata.principal.quote}"
              </blockquote>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3.5">
                <img
                  src={schoolMetadata.principal.photo}
                  alt={schoolMetadata.principal.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-azure/20 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-ink text-sm sm:text-base">
                    {schoolMetadata.principal.name}
                  </h4>
                  <p className="text-xs text-ink-muted font-mono">
                    {schoolMetadata.principal.title}
                  </p>
                </div>
              </div>

              <Link
                to="/profil"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-azure transition-colors"
              >
                <span>Profil Selengkapnya</span>
                <CaretRight size={14} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Right Column: Key Pillars & Culture Bento */}
          <div className="lg:col-span-5 bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-8 sm:p-10 text-white shadow-elevated flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold bg-white/10 px-3 py-1 rounded-full inline-block">
                Keunggulan Kampus
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Mengapa Memilih SMK Al-Muhtadin?
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle size={18} weight="fill" className="text-gold shrink-0 mt-0.5" />
                  <span>Sertifikasi resmi BNSP dan vendor global (Mikrotik & Cisco).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle size={18} weight="fill" className="text-gold shrink-0 mt-0.5" />
                  <span>Laboratorium komputasi awan, coding suite, dan bengkel fiber optik.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle size={18} weight="fill" className="text-gold shrink-0 mt-0.5" />
                  <span>Jalur penyaluran kerja Bursa Kerja Khusus (BKK) terakreditasi A.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle size={18} weight="fill" className="text-gold shrink-0 mt-0.5" />
                  <span>Pembiasaan salat dhuha, tadarus Al-Qur'an, dan pembinaan adab santun.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs font-mono text-white/70">
                NPSN: <span className="text-white font-bold">{schoolMetadata.npsn}</span>
              </div>
              <Link
                to="/visi-misi"
                className="text-xs font-semibold text-gold hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>Visi & Misi</span>
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PROGRAM KEAHLIAN / JURUSAN (BENTO CARDS) */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {majorsData.map((major) => (
            <div
              key={major.id}
              className="group bg-white rounded-3xl border border-slate-200/80 p-7 shadow-whisper hover:shadow-elevated transition-all flex flex-col justify-between hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-azure-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getMajorIcon(major.abbreviation)}
                  </div>
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-ink-muted">
                    {major.abbreviation}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-ink group-hover:text-navy transition-colors mb-2.5">
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

      {/* 5. KABAR TERKINI / BERITA & PENGUMUMAN */}
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

      {/* 6. SOROTAN PRESTASI SISWA & GURU */}
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

      {/* 7. HIGHLIGHT VIDEO KEGIATAN YOUTUBE */}
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
