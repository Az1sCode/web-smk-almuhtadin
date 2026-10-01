import React, { useState } from 'react';
import { 
  Plus, 
  Trash, 
  UserGear, 
  X, 
  Check
} from '@phosphor-icons/react';
import { AdminUser } from '../../../types';
import { contentServices } from '../../../services/contentServices';

export const UsersManager: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>(() => contentServices.getAdminUsers());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'superadmin' | 'editor'>('editor');
  const [avatar, setAvatar] = useState('');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleOpenAdd = () => {
    setName('');
    setEmail('');
    setRole('editor');
    setAvatar('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('Nama dan email wajib diisi.');
      return;
    }

    contentServices.saveAdminUser({
      name,
      email,
      role,
      avatar: avatar.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      lastLogin: 'Belum pernah login'
    });

    setUsers(contentServices.getAdminUsers());
    setIsModalOpen(false);
    showToast('Akun pengelola CMS berhasil ditambahkan!');
  };

  const handleDelete = (id: number) => {
    if (users.length <= 1) {
      alert('Minimal harus ada 1 akun administrator aktif.');
      return;
    }
    if (window.confirm('Hapus hak akses akun ini?')) {
      contentServices.deleteAdminUser(id);
      setUsers(contentServices.getAdminUsers());
      showToast('Akun berhasil dihapus.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy text-white px-5 py-3 rounded-2xl shadow-elevated flex items-center gap-3 text-xs font-bold border border-white/20 animate-fade-in">
          <Check size={18} className="text-gold" weight="bold" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-ink">Manajemen Hak Akses & Pengguna CMS</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-azure-soft text-navy font-mono text-[10px] font-bold">
              {users.length} Akun Terdaftar
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            Atur staf pengelola portal web sekolah berdasarkan peran Super Administrator atau Content Editor.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <Plus size={16} weight="bold" />
          <span>Tambah Admin Baru</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-whisper">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3.5">Pengguna</th>
                <th className="p-3.5">Email Akses</th>
                <th className="p-3.5">Peran Otoritas</th>
                <th className="p-3.5">Aktivitas Terakhir</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
                        }}
                      />
                      <div>
                        <p className="font-bold text-ink">{u.name}</p>
                        <p className="text-[10px] text-ink-muted font-mono">ID #{u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-ink-muted">{u.email}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase ${
                        u.role === 'superadmin'
                          ? 'bg-navy text-white'
                          : 'bg-azure-soft text-navy'
                      }`}
                    >
                      {u.role === 'superadmin' ? 'Super Admin' : 'Editor Konten'}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-ink-muted">{u.lastLogin || '-'}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Hapus Pengguna"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-elevated border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
                  <UserGear size={20} weight="duotone" />
                </div>
                <h3 className="text-base font-bold text-ink">Tambah Pengguna Baru</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama pengelola..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Email Sekolah</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staf@smkalmuhtadin.sch.id"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Peran Otoritas</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'superadmin' | 'editor')}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink"
                >
                  <option value="editor">Content Editor (Kelola Konten Berita & Prestasi)</option>
                  <option value="superadmin">Super Administrator (Akses Penuh)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">URL Avatar Foto</label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-ink-muted hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold"
                >
                  Buat Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
