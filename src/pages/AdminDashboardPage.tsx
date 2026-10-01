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
    <div className="min-h-[100dvh] bg-canvas flex flex-col font-sans selection:bg-navy selection:text-white">
      {/* Top Admin Bar */}
      <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-navy hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <List size={20} />}
          </button>

          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-azure bg-azure-soft px-3 py-1.5 rounded-full border border-azure/20 transition-all group"
          >
            <ArrowLeft size={13} weight="bold" />
            <span className="hidden sm:inline">Web Publik</span>
            <Eye size={13} className="text-azure sm:hidden" />
          </Link>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-ink uppercase tracking-wider hidden md:inline">
              SMK Al-Muhtadin
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold border border-slate-200">
              CMS v2.1
            </span>
          </div>
        </div>

        {/* User Pill & Quick Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
              alt={user?.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-300"
            />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-ink line-clamp-1 leading-tight">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-[10px] text-ink-muted font-mono leading-tight">
                {user?.role === 'superadmin' ? 'Super Administrator' : 'Content Editor'}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
            title="Keluar Sesi"
          >
            <SignOut size={18} weight="bold" />
          </button>
        </div>
      </header>

      {/* Main Cockpit Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6 lg:gap-8 items-start">
        {/* Left Sidebar */}
        <aside
          className={`
            fixed md:static inset-y-0 left-0 z-50 md:z-auto w-72 bg-white rounded-none md:rounded-3xl border-r md:border border-slate-200/80 p-5 shadow-elevated md:shadow-whisper flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            overflow-y-auto max-h-[100dvh] md:max-h-[calc(100vh-120px)] md:sticky md:top-24
          `}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between md:hidden pb-3 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-navy uppercase">Navigasi Modul</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

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
                            ? 'bg-navy text-white shadow-sm'
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

          {/* Bottom user action */}
          <div className="pt-4 border-t border-slate-100 mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors"
            >
              <SignOut size={16} />
              <span>Keluar Sesi Admin</span>
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

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
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
