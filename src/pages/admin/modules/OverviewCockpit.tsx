import React from 'react';
import { 
  Newspaper, 
  UsersThree, 
  Trophy, 
  VideoCamera, 
  Sliders, 
  GraduationCap, 
  ShieldCheck, 
  ArrowUpRight, 
  Plus,
  Clock,
  Sparkle,
  CheckCircle,
  Eye
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useSchoolData } from '../../../hooks/useSchoolData';

interface Props {
  onNavigateTab: (tab: string) => void;
}

export const OverviewCockpit: React.FC<Props> = ({ onNavigateTab }) => {
  const {
    news,
    staff,
    achievements,
    videos,
    heroSlides,
    majors,
    settings
  } = useSchoolData();

  const kpis = [
    {
      title: 'Total Berita',
      count: news.length,
      note: 'Publikasi aktif',
      icon: Newspaper,
      color: 'text-azure bg-azure-soft',
      tab: 'news'
    },
    {
      title: 'Dewan Guru & GTK',
      count: staff.length,
      note: 'Pimpinan & Guru',
      icon: UsersThree,
      color: 'text-navy bg-navy/10',
      tab: 'staff'
    },
    {
      title: 'Prestasi Tercatat',
      count: achievements.length,
      note: 'Nasional & Provinsi',
      icon: Trophy,
      color: 'text-gold-hover bg-gold/15',
      tab: 'achievements'
    },
    {
      title: 'Galeri Video',
      count: videos.length,
      note: 'Embed YouTube resmi',
      icon: VideoCamera,
      color: 'text-rose-600 bg-rose-50',
      tab: 'videos'
    },
    {
      title: 'Slide Hero Slider',
      count: heroSlides.length,
      note: 'Beranda dinamis',
      icon: Sliders,
      color: 'text-indigo-600 bg-indigo-50',
      tab: 'hero-slides'
    },
    {
      title: 'Program Keahlian',
      count: majors.length,
      note: 'Jurusan resmi terpadu',
      icon: GraduationCap,
      color: 'text-emerald-600 bg-emerald-50',
      tab: 'majors'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-navy text-white p-6 sm:p-8 shadow-elevated">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-azure/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-gold font-mono font-semibold">
              <Sparkle size={14} weight="fill" />
              <span>Sistem Manajemen Konten Terpadu</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
              Selamat Datang di Admin Cockpit
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Kelola seluruh aset informasi sekolah, modul slide beranda, kurikulum jurusan, serta berita kegiatan SMK Al-Muhtadin Depok secara mudah dan terintegrasi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
            >
              <Eye size={16} />
              <span>Lihat Web Publik</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-ink-muted">
            Ikhtisar Data & Konten
          </h2>
          <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1.5">
            <CheckCircle size={14} weight="fill" />
            Semua Modul Terhubung
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigateTab(kpi.tab)}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-whisper hover:shadow-card hover:border-azure/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.color}`}>
                    <Icon size={20} weight="duotone" />
                  </div>
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-azure transition-colors" />
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-extrabold font-mono text-ink tracking-tight block">
                    {kpi.count}
                  </span>
                  <p className="text-xs font-bold text-ink mt-0.5 line-clamp-1">{kpi.title}</p>
                  <p className="text-[10px] text-ink-muted mt-0.5 font-mono truncate">{kpi.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Launch & School Info Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-4">
          <h3 className="text-sm font-bold text-ink flex items-center gap-2">
            <Sparkle size={18} className="text-navy" weight="fill" />
            <span>Aksi Cepat Kelola Konten</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => onNavigateTab('hero-slides')}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-azure/50 hover:bg-azure-soft/40 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
                  <Sliders size={18} weight="bold" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink group-hover:text-navy">Kelola Slide Hero Beranda</h4>
                  <p className="text-[11px] text-ink-muted">Ubah banner bergulir dan teks headline</p>
                </div>
              </div>
              <Plus size={16} className="text-slate-400 group-hover:text-navy" />
            </button>

            <button
              onClick={() => onNavigateTab('news')}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-azure/50 hover:bg-azure-soft/40 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
                  <Newspaper size={18} weight="bold" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink group-hover:text-navy">Tulis Berita Baru</h4>
                  <p className="text-[11px] text-ink-muted">Publikasi info kegiatan & artikel sekolah</p>
                </div>
              </div>
              <Plus size={16} className="text-slate-400 group-hover:text-navy" />
            </button>

            <button
              onClick={() => onNavigateTab('advantages')}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-azure/50 hover:bg-azure-soft/40 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold-hover flex items-center justify-center">
                  <ShieldCheck size={18} weight="bold" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink group-hover:text-navy">3 Pilar Keunggulan</h4>
                  <p className="text-[11px] text-ink-muted">SMK PK, Sekolah Adiwiyata & LSP-P1</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-slate-400 group-hover:text-navy" />
            </button>

            <button
              onClick={() => onNavigateTab('videos')}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-azure/50 hover:bg-azure-soft/40 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <VideoCamera size={18} weight="bold" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink group-hover:text-navy">Tambah Tautan Video</h4>
                  <p className="text-[11px] text-ink-muted">Cukup tempel URL YouTube resmi</p>
                </div>
              </div>
              <Plus size={16} className="text-slate-400 group-hover:text-navy" />
            </button>
          </div>

          {/* Recent News Strip */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-ink">Publikasi Berita Terbaru</span>
              <button
                onClick={() => onNavigateTab('news')}
                className="text-xs font-semibold text-azure hover:underline"
              >
                Lihat Semua
              </button>
            </div>
            <div className="space-y-2">
              {news.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-mono text-[10px] text-navy font-bold shrink-0">
                      {item.category}
                    </span>
                    <span className="font-semibold text-ink truncate">{item.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-ink-muted shrink-0 flex items-center gap-1">
                    <Clock size={12} />
                    {item.publishedAt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Identity & Status Card (1 Col) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400">
                Profil Satuan Pendidikan
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
                Online
              </span>
            </div>

            <div>
              <h4 className="text-base font-extrabold text-ink">{settings.name}</h4>
              <p className="text-xs text-ink-muted mt-0.5">{settings.tagline}</p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50 font-mono">
                <span className="text-ink-muted">NPSN</span>
                <span className="font-bold text-navy">{settings.npsn}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50 font-mono">
                <span className="text-ink-muted">Akreditasi</span>
                <span className="font-bold text-emerald-600">{settings.accreditation}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50 font-mono">
                <span className="text-ink-muted">Tahun Berdiri</span>
                <span className="font-bold text-ink">{settings.foundedYear}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 font-mono">
                <span className="text-ink-muted">Kepala Sekolah</span>
                <span className="font-bold text-ink text-right">{settings.principal.name}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('settings')}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-ink font-bold text-xs transition-all text-center"
          >
            Kelola Pengaturan Sekolah
          </button>
        </div>
      </div>
    </div>
  );
};
