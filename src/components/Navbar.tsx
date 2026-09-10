import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  List, 
  X, 
  ArrowUpRight,
  Sparkle,
  CaretDown,
  Buildings,
  Briefcase,
  UsersThree
} from '@phosphor-icons/react';
import { schoolMetadata } from '../data/mockData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(true);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const profileSubItems = [
    { 
      name: 'Tentang Sekolah', 
      path: '/profil', 
      desc: 'Profil, sejarah & fasilitas',
      icon: Buildings 
    },
    { 
      name: 'Jurusan', 
      path: '/jurusan', 
      desc: 'Program keahlian unggulan',
      icon: Briefcase 
    },
    { 
      name: 'Pengurus', 
      path: '/pengurus', 
      desc: 'Pimpinan & dewan guru',
      icon: UsersThree 
    },
  ];

  const otherNavLinks = [
    { name: 'Prestasi', path: '/prestasi' },
    { name: 'Berita', path: '/berita' },
    { name: 'Galeri', path: '/galeri' },
  ];

  const isProfileActive = [
    '/profil',
    '/jurusan',
    '/pengurus',
    '/visi-misi',
  ].some((path) => location.pathname.startsWith(path));

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center text-white shadow-md shadow-navy/20 group-hover:scale-105 transition-transform">
              <GraduationCap size={26} weight="duotone" className="text-gold" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-navy tracking-tight leading-tight group-hover:text-azure transition-colors">
                SMK Al-Muhtadin
              </span>
              <span className="text-2xs font-mono uppercase tracking-widest text-ink-muted">
                Kota Depok • Terakreditasi A
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Beranda */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-medium transition-all relative ${
                  isActive
                    ? 'text-navy font-semibold bg-azure-soft shadow-sm'
                    : 'text-ink-muted hover:text-navy hover:bg-slate-100/70'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Beranda</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-navy" />
                  )}
                </>
              )}
            </NavLink>

            {/* Profil with Submenu */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setProfileDropdownOpen(true)}
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all relative flex items-center gap-1.5 cursor-pointer ${
                  isProfileActive
                    ? 'text-navy font-semibold bg-azure-soft shadow-sm'
                    : 'text-ink-muted hover:text-navy hover:bg-slate-100/70'
                }`}
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
              >
                <span>Profil</span>
                <CaretDown
                  size={13}
                  weight="bold"
                  className={`transition-transform duration-200 ${
                    profileDropdownOpen ? 'rotate-180 text-navy' : 'text-ink-muted'
                  }`}
                />
                {isProfileActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-navy" />
                )}
              </button>

              {/* Submenu Dropdown Panel */}
              <div
                className={`absolute top-full -left-1/2 pt-2 w-64 z-50 transition-all duration-200 ${
                  profileDropdownOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-elevated">
                  {profileSubItems.map((item) => {
                    const IconComponent = item.icon;
                    const isItemActive =
                      location.pathname === item.path ||
                      (item.path !== '/' && location.pathname.startsWith(item.path));
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setProfileDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                          isItemActive
                            ? 'bg-azure-soft text-navy'
                            : 'text-ink hover:bg-slate-50 hover:text-navy'
                        }`}
                      >
                        {/* <div
                          className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                            isItemActive
                              ? 'bg-navy text-white'
                              : 'bg-slate-100 text-ink-muted'
                          }`}
                        >
                          <IconComponent size={18} weight={isItemActive ? 'fill' : 'duotone'} />
                        </div> */}
                        <div>
                          <div
                            className={`text-sm font-semibold leading-snug ${
                              isItemActive ? 'text-navy' : 'text-ink'
                            }`}
                          >
                            {item.name}
                          </div>
                          {/* <p className="text-[11px] text-ink-muted mt-0.5 leading-tight">
                            {item.desc}
                          </p> */}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Other links: Prestasi, Berita, Galeri */}
            {otherNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-navy font-semibold bg-blue-50/80 shadow-sm'
                      : 'text-ink-muted hover:text-navy hover:bg-slate-100/70'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-navy" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action: PPDB & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={schoolMetadata.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gold hover:bg-gold-hover text-slate-950 font-bold text-xs md:text-sm tracking-tight shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <Sparkle size={16} weight="fill" className="text-navy" />
              <span>Info PPDB 2026</span>
              <ArrowUpRight size={15} weight="bold" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-xl text-ink-muted hover:text-navy hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-1.5 animate-fadeIn">
          {/* Beranda */}
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                isActive
                  ? 'bg-navy text-white font-semibold'
                  : 'text-ink hover:bg-slate-100'
              }`
            }
          >
            Beranda
          </NavLink>

          {/* Profil Accordion */}
          <div className="rounded-xl overflow-hidden bg-slate-50/80 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-base font-medium transition-colors ${
                isProfileActive ? 'text-navy font-bold' : 'text-ink'
              }`}
            >
              <span>Profil</span>
              <CaretDown
                size={16}
                weight="bold"
                className={`transition-transform duration-200 ${
                  mobileProfileOpen ? 'rotate-180 text-navy' : 'text-ink-muted'
                }`}
              />
            </button>

            {mobileProfileOpen && (
              <div className="px-2 pb-2 pt-1 space-y-1 border-t border-slate-200/60 bg-white/70">
                {profileSubItems.map((item) => {
                  const IconComponent = item.icon;
                  const isItemActive =
                    location.pathname === item.path ||
                    (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        isItemActive
                          ? 'bg-navy text-white font-semibold'
                          : 'text-ink hover:bg-slate-100'
                      }`}
                    >
                      <IconComponent size={18} weight={isItemActive ? 'fill' : 'duotone'} />
                      <div>
                        <span className="block font-medium leading-none">{item.name}</span>
                        <span
                          className={`text-[11px] block mt-1 leading-none ${
                            isItemActive ? 'text-white/80' : 'text-ink-muted'
                          }`}
                        >
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Other links */}
          {otherNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-navy text-white font-semibold'
                    : 'text-ink hover:bg-slate-100'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-3">
            <a
              href={schoolMetadata.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gold text-slate-950 font-bold text-sm shadow"
            >
              <Sparkle size={18} weight="fill" />
              <span>Info PPDB 2026/2027</span>
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
