import React, { useState } from 'react';
import { 
  Plus, 
  Trash, 
  PencilSimple, 
  MagnifyingGlass, 
  UsersThree, 
  X, 
  Check
} from '@phosphor-icons/react';
import { StaffMember, StaffCategory } from '../../../types';
import { contentServices } from '../../../services/contentServices';

export const StaffManager: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>(() => contentServices.getStaff());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<StaffMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [nipNuptk, setNipNuptk] = useState('');
  const [position, setPosition] = useState('');
  const [category, setCategory] = useState<StaffCategory>('guru-produktif');
  const [department, setDepartment] = useState('');
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [orderIndex, setOrderIndex] = useState(1);

  const categories: { label: string; value: string }[] = [
    { label: 'Semua GTK', value: 'all' },
    { label: 'Pimpinan', value: 'pimpinan' },
    { label: 'Guru Produktif', value: 'guru-produktif' },
    { label: 'Guru Normatif & Adaptif', value: 'guru-normatif-adaptif' },
    { label: 'Staf TU & Karyawan', value: 'staf-tu' }
  ];

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredStaff = staff.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.nipNuptk && s.nipNuptk.includes(searchQuery)) ||
      s.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName('');
    setNipNuptk('');
    setPosition('');
    setCategory('guru-produktif');
    setDepartment('Teknik Jaringan Komputer & Telekomunikasi');
    setPhoto('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400');
    setEmail('');
    setOrderIndex(staff.length + 1);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: StaffMember) => {
    setEditingItem(item);
    setName(item.name);
    setNipNuptk(item.nipNuptk || '');
    setPosition(item.position);
    setCategory(item.category);
    setDepartment(item.department || '');
    setPhoto(item.photo);
    setEmail(item.email || '');
    setOrderIndex(item.orderIndex);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !position.trim()) {
      alert('Nama dan Jabatan GTK wajib diisi.');
      return;
    }

    contentServices.saveStaff({
      id: editingItem ? editingItem.id : undefined,
      name,
      nipNuptk: nipNuptk.trim() || undefined,
      position,
      category,
      department: department.trim() || undefined,
      photo: photo.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      email: email.trim() || undefined,
      orderIndex: Number(orderIndex)
    });

    setStaff(contentServices.getStaff());
    setIsModalOpen(false);
    showToast(editingItem ? 'Data GTK berhasil diperbarui!' : 'GTK baru berhasil ditambahkan!');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Hapus data GTK ini?')) {
      contentServices.deleteStaff(id);
      setStaff(contentServices.getStaff());
      showToast('Data GTK berhasil dihapus.');
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
            <h2 className="text-lg font-bold text-ink">Direktori Guru & Tenaga Kependidikan (GTK)</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-azure-soft text-navy font-mono text-[10px] font-bold">
              {staff.length} Personel
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            Kelola profil kepala sekolah, wakil kepala, dewan guru produktif/normatif, dan staf tata usaha.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <Plus size={16} weight="bold" />
          <span>Tambah Guru / Staf</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-whisper flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau NIP..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
          />
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-slate-100 text-ink-muted hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-whisper">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3.5">Nama & Foto</th>
                <th className="p-3.5">Jabatan / Penugasan</th>
                <th className="p-3.5">Kategori</th>
                <th className="p-3.5">NIP / NUPTK</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
                        }}
                      />
                      <div>
                        <p className="font-bold text-ink">{member.name}</p>
                        {member.department && (
                          <p className="text-[10px] text-ink-muted">{member.department}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-ink font-medium">{member.position}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-navy font-mono text-[10px] font-bold uppercase">
                      {member.category}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-ink-muted">{member.nipNuptk || '-'}</td>
                  <td className="p-3.5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(member)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                        title="Edit Data"
                      >
                        <PencilSimple size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hapus Data"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-ink-muted">
                    Tidak ada data GTK yang sesuai dengan filter atau kata kunci.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-elevated border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
                  <UsersThree size={20} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">
                    {editingItem ? 'Edit Data GTK' : 'Tambah Guru / Staf Baru'}
                  </h3>
                  <p className="text-xs text-ink-muted">Struktur ketenagaan SMK Al-Muhtadin.</p>
                </div>
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
                <label className="block text-xs font-bold text-ink mb-1">
                  Nama Lengkap beserta Gelar <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Drs. H. Ahmad Dahlan, M.Pd."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink font-semibold focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Jabatan / Penugasan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Contoh: Guru Produktif TJKT"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Kategori GTK</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as StaffCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  >
                    <option value="pimpinan">Pimpinan</option>
                    <option value="guru-produktif">Guru Produktif</option>
                    <option value="guru-normatif-adaptif">Guru Normatif & Adaptif</option>
                    <option value="staf-tu">Staf TU & Karyawan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">NIP / NUPTK</label>
                  <input
                    type="text"
                    value={nipNuptk}
                    onChange={(e) => setNipNuptk(e.target.value)}
                    placeholder="Nomor identitas pendidik"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Departemen / Jurusan</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Contoh: TJKT / Manajemen"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">URL Foto Profil</label>
                <input
                  type="url"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-ink"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-ink-muted hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm"
                >
                  Simpan Data GTK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
