import React, { useState } from 'react';
import { LockKey, ShieldCheck, ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export const AdminRouteGuard: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi proteksi autentikasi sementara sebelum API Sanctum terhubung
    if (password === 'admin123' || password === 'almuhtadin') {
      localStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Password salah. Gunakan password sementara: admin123');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-canvas p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-azure-soft text-navy flex items-center justify-center shadow-sm">
            <LockKey className="w-6 h-6 text-azure" weight="duotone" />
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-navy transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali</span>
          </Link>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-ink">Area Administrasi Terbatas</h2>
            <ShieldCheck size={18} className="text-navy" weight="fill" />
          </div>
          <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">
            Halaman ini dilindungi. Masukkan password otorisasi untuk mengakses CMS dan manajemen konten SMK Al-Muhtadin.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">
              Password Akses Admin
            </label>
            <input
              type="password"
              placeholder="Masukkan password admin (cth: admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure transition-all"
              autoFocus
            />
            {error ? (
              <p className="text-xs text-rose-500 mt-1.5">{error}</p>
            ) : (
              <p className="text-[11px] text-ink-muted font-mono mt-1.5">
                Kredensial simulasi: <code className="bg-slate-100 px-1 py-0.5 rounded text-navy font-bold">admin123</code>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-navy text-white font-bold text-xs uppercase tracking-wider hover:bg-navy-dark transition-all shadow-md active:scale-[0.99]"
          >
            Buka Dashboard Admin
          </button>
        </form>
      </div>
    </div>
  );
};
