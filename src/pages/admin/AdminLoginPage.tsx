import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LockKey, 
  ShieldCheck, 
  ArrowLeft, 
  EnvelopeSimple, 
  Eye, 
  EyeSlash, 
  SignIn, 
  Key,
  Info
} from '@phosphor-icons/react';
import { useAuth } from '../../hooks/useAuth';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Destination route after login
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Harap isi alamat email dan kata sandi.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMessage(result.error || 'Autentikasi gagal.');
      }
    } catch {
      setErrorMessage('Terjadi kesalahan jaringan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center bg-canvas relative px-4 py-12 select-none overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-navy/5 via-azure/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Top Back navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-ink-muted hover:text-navy transition-colors bg-white/80 hover:bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-whisper"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Kembali ke Website</span>
          </Link>
          <span className="text-[11px] font-mono text-ink-muted font-semibold tracking-wider uppercase">
            CMS Panel v2.1
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-elevated">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-navy text-white flex items-center justify-center mx-auto mb-4 shadow-md ring-4 ring-navy/10">
              <LockKey size={28} weight="duotone" className="text-gold" />
            </div>
            <h1 className="text-xl font-extrabold text-ink tracking-tight font-sans">
              Admin CMS Cockpit
            </h1>
            <p className="text-xs text-ink-muted mt-1 leading-relaxed">
              Portal Manajemen Konten & Data Resmi SMK Al-Muhtadin
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-700">
              <Info size={18} weight="fill" className="shrink-0 text-rose-500 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5 font-sans">
                Email Administrator
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@smkalmuhtadin.sch.id"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure transition-all text-ink placeholder:text-slate-400"
                />
                <EnvelopeSimple
                  size={18}
                  weight="duotone"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1.5 font-sans">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure transition-all text-ink placeholder:text-slate-400"
                />
                <Key
                  size={18}
                  weight="duotone"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink transition-colors p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-navy hover:bg-navy-light active:bg-navy-dark text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <SignIn size={16} weight="bold" />
                  <span>Masuk ke Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Quick Switcher */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
              <ShieldCheck size={14} weight="fill" className="text-navy" />
              <span>Akses Cepat Pengujian:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                type="button"
                onClick={() => handleFillDemo('admin@smkalmuhtadin.sch.id', 'admin123')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-azure-soft/60 border border-slate-200 hover:border-azure/30 text-left transition-all group"
              >
                <span className="block text-[11px] font-bold text-navy group-hover:text-azure">
                  Super Admin
                </span>
                <span className="block text-[10px] font-mono text-slate-500 truncate">
                  admin@smkalmuhtadin...
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('editor@smkalmuhtadin.sch.id', 'editor123')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-azure-soft/60 border border-slate-200 hover:border-azure/30 text-left transition-all group"
              >
                <span className="block text-[11px] font-bold text-navy group-hover:text-azure">
                  Content Editor
                </span>
                <span className="block text-[10px] font-mono text-slate-500 truncate">
                  editor@smkalmuhtadin...
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-ink-muted mt-6 font-mono">
          SMK Al-Muhtadin Depok &bull; Sistem Terproteksi Sanctum
        </p>
      </div>
    </div>
  );
};
