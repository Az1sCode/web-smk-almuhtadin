import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Gauge, 
  Newspaper, 
  UsersThree, 
  Trophy, 
  VideoCamera, 
  Images, 
  Gear, 
  SignOut, 
  ArrowLeft,
  Sliders,
  Compass,
  ShieldCheck,
  GraduationCap,
  UserGear,
  List,
  X,
  Eye
} from '@phosphor-icons/react';
import { useAuth } from '../hooks/useAuth';

// CMS Modules
import { OverviewCockpit } from './admin/modules/OverviewCockpit';
import { HeroSlidesManager } from './admin/modules/HeroSlidesManager';
import { VisionMissionManager } from './admin/modules/VisionMissionManager';
import { AdvantagesManager } from './admin/modules/AdvantagesManager';
import { MajorsManager } from './admin/modules/MajorsManager';
import { NewsManager } from './admin/modules/NewsManager';
import { StaffManager } from './admin/modules/StaffManager';
import { AchievementsManager } from './admin/modules/AchievementsManager';
import { VideosManager } from './admin/modules/VideosManager';
import { GalleryManager } from './admin/modules/GalleryManager';
import { SettingsManager } from './admin/modules/SettingsManager';
import { UsersManager } from './admin/modules/UsersManager';

type CmsTab = 
  | 'overview' 
  | 'hero-slides' 
  | 'vision-mission' 
  | 'advantages' 
  | 'majors' 
  | 'news' 
  | 'staff' 
  | 'achievements' 
  | 'videos' 
  | 'gallery' 
  | 'settings' 
  | 'users';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CmsTab>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navSections = [
    {
      label: 'IKHTISAR',
      items: [
        { id: 'overview' as CmsTab, label: 'Dashboard', icon: Gauge }
      ]
    },
    {
      label: 'HALAMAN BERANDA & PROFIL',
      items: [
        { id: 'hero-slides' as CmsTab, label: 'Slide Hero Beranda', icon: Sliders, badge: 'Dinamis' },
        { id: 'vision-mission' as CmsTab, label: 'Visi, Misi & Budaya', icon: Compass },
        { id: 'advantages' as CmsTab, label: '3 Pilar Keunggulan', icon: ShieldCheck, badge: '3 Pilar' },
        { id: 'majors' as CmsTab, label: '4 Program Keahlian', icon: GraduationCap, badge: 'Kurikulum' }
      ]
    },
    {
      label: 'KONTEN PUBLIKASI',
      items: [
        { id: 'news' as CmsTab, label: 'Berita & Pengumuman', icon: Newspaper },
        { id: 'staff' as CmsTab, label: 'Dewan Guru & GTK', icon: UsersThree },
        { id: 'achievements' as CmsTab, label: 'Prestasi Civitas', icon: Trophy },
        { id: 'videos' as CmsTab, label: 'Video YouTube', icon: VideoCamera },
        { id: 'gallery' as CmsTab, label: 'Galeri & Album Foto', icon: Images }
      ]
    },
    {
      label: 'SISTEM & KONFIGURASI',
      items: [
        { id: 'settings' as CmsTab, label: 'Pengaturan Identitas', icon: Gear },
        { id: 'users' as CmsTab, label: 'Pengguna & Akses CMS', icon: UserGear }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-canvas flex font-sans selection:bg-navy selection:text-white">
      {/* Left Sidebar - Fixed & Full Height on the Left */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Sidebar Brand Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center text-white font-mono font-bold text-sm shadow-xs shrink-0">
              M
            </div>
            <div className="min-w-0">
              <span className="text-xs font-mono font-bold text-ink uppercase tracking-wider block truncate">
                SMK Al-Muhtadin
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400 font-semibold block">
                  CMS Cockpit v2.1
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors"
            aria-label="Tutup menu navigasi"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {navSections.map((sec, sIdx) => (
            <div key={sIdx}>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold px-3">
                {sec.label}
              </span>
              <nav className="mt-2 space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-navy text-white shadow-xs'
                          : 'text-ink-muted hover:bg-slate-100 hover:text-navy'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon size={17} weight="duotone" className="shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                            isActive ? 'bg-white/20 text-white' : 'bg-azure-soft text-navy'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Sidebar Footer User & Quick Action */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2.5 mb-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-ink truncate leading-tight">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-[10px] text-ink-muted font-mono truncate leading-tight capitalize">
                {user?.role || 'Admin'}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-2 rounded-xl bg-white border border-rose-100 hover:bg-rose-50 transition-colors shadow-2xs"
          >
            <SignOut size={15} weight="bold" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-navy/40 backdrop-blur-2xs z-40 md:hidden"
        />
      )}

      {/* Main Content Wrapper (offset by sidebar width on desktop) */}
      <div className="flex-1 md:pl-72 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-500 hover:text-navy hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <List size={20} />}
            </button>

            {/* Current Tab Breadcrumb */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400 hidden sm:inline">CMS</span>
              <span className="text-xs text-slate-300 hidden sm:inline">/</span>
              <span className="text-xs font-bold text-navy uppercase tracking-wide">
                {navSections.flatMap(s => s.items).find(i => i.id === activeTab)?.label || 'Cockpit'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-azure bg-azure-soft px-3 py-1.5 rounded-full border border-azure/20 transition-all group"
            >
              <ArrowLeft size={13} weight="bold" />
              <span className="hidden sm:inline">Lihat Web Publik</span>
              <Eye size={13} className="text-azure sm:hidden" />
            </Link>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold border border-slate-200">
                Mode: {user?.role === 'superadmin' ? 'Super Admin' : 'Editor'}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <OverviewCockpit onNavigateTab={(tab) => setActiveTab(tab as CmsTab)} />
          )}

          {activeTab === 'hero-slides' && <HeroSlidesManager />}

          {activeTab === 'vision-mission' && <VisionMissionManager />}

          {activeTab === 'advantages' && <AdvantagesManager />}

          {activeTab === 'majors' && <MajorsManager />}

          {activeTab === 'news' && <NewsManager />}

          {activeTab === 'staff' && <StaffManager />}

          {activeTab === 'achievements' && <AchievementsManager />}

          {activeTab === 'videos' && <VideosManager />}

          {activeTab === 'gallery' && <GalleryManager />}

          {activeTab === 'settings' && <SettingsManager />}

          {activeTab === 'users' && <UsersManager />}
        </main>
      </div>
    </div>
  );
};
