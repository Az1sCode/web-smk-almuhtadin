import React, { useState } from 'react';
import { 
  Plus, 
  Trash, 
  PencilSimple, 
  Trophy, 
  X, 
  Check, 
  Star,
  MagnifyingGlass
} from '@phosphor-icons/react';
import { Achievement } from '../../../types';
import { contentServices } from '../../../services/contentServices';

export const AchievementsManager: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(() => contentServices.getAchievements());
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientType, setRecipientType] = useState<'siswa' | 'guru' | 'sekolah'>('siswa');
  const [competitionName, setCompetitionName] = useState('');
  const [level, setLevel] = useState<'kecamatan' | 'kota' | 'provinsi' | 'nasional' | 'internasional'>('nasional');
  const [rankTitle, setRankTitle] = useState('Juara 1');
  const [year, setYear] = useState(new Date().getFullYear());
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const levels = [
    { label: 'Semua Tingkat', value: 'all' },
    { label: 'Internasional', value: 'internasional' },
    { label: 'Nasional', value: 'nasional' },
    { label: 'Provinsi', value: 'provinsi' },
    { label: 'Kota', value: 'kota' }
  ];

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredItems = achievements.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.competitionName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || item.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setRecipientName('');
    setRecipientType('siswa');
    setCompetitionName('');
    setLevel('nasional');
    setRankTitle('Juara 1');
    setYear(new Date().getFullYear());
    setPhoto('https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800');
    setDescription('');
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Achievement) => {
    setEditingItem(item);
    setTitle(item.title);
    setRecipientName(item.recipientName);
    setRecipientType(item.recipientType);
    setCompetitionName(item.competitionName);
    setLevel(item.level);
    setRankTitle(item.rankTitle);
    setYear(item.year);
    setPhoto(item.photo);
    setDescription(item.description);
    setIsFeatured(!!item.isFeatured);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !recipientName.trim()) {
      alert('Nama prestasi dan nama peraih wajib diisi.');
      return;
    }

    contentServices.saveAchievement({
      id: editingItem ? editingItem.id : undefined,
      title,
      recipientName,
      recipientType,
      competitionName,
      level,
      rankTitle,
      year: Number(year),
      photo: photo.trim() || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
      description,
      isFeatured
    });

    setAchievements(contentServices.getAchievements());
    setIsModalOpen(false);
    showToast(editingItem ? 'Prestasi berhasil diperbarui!' : 'Prestasi baru berhasil dicatat!');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Hapus catatan prestasi ini?')) {
      contentServices.deleteAchievement(id);
      setAchievements(contentServices.getAchievements());
      showToast('Data prestasi telah dihapus.');
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
            <h2 className="text-lg font-bold text-ink">Rekam Prestasi Sekolah & Siswa</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-hover font-mono text-[10px] font-bold">
              {achievements.length} Medali & Kejuaraan
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            Daftar perolehan kejuaraan LKS, olimpiade vokasi, dan kejuaraan ekstrakurikuler.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <Plus size={16} weight="bold" />
          <span>Tambah Prestasi Baru</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-whisper flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari prestasi, nama pemenang..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
          />
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {levels.map((lvl) => {
            const isSelected = levelFilter === lvl.value;
            return (
              <button
                key={lvl.value}
                type="button"
                onClick={() => setLevelFilter(lvl.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-slate-100 text-ink-muted hover:bg-slate-200'
                }`}
              >
                {lvl.label}
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
                <th className="p-3.5">Prestasi & Kompetisi</th>
                <th className="p-3.5">Penerima</th>
                <th className="p-3.5">Tingkat</th>
                <th className="p-3.5">Tahun</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.photo}
                        alt={item.title}
                        className="w-12 h-10 rounded-lg object-cover shrink-0 border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=400';
                        }}
                      />
                      <div className="min-w-0 max-w-xs sm:max-w-md">
                        <div className="flex items-center gap-1.5">
                          {item.isFeatured && (
                            <Star size={13} weight="fill" className="text-gold shrink-0" />
                          )}
                          <p className="font-bold text-ink truncate">{item.title}</p>
                        </div>
                        <p className="text-[11px] text-ink-muted line-clamp-1 mt-0.5">{item.competitionName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-medium text-ink">{item.recipientName}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-hover font-mono text-[10px] font-bold uppercase">
                      {item.level}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-ink-muted">{item.year}</td>
                  <td className="p-3.5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                        title="Edit Prestasi"
                      >
                        <PencilSimple size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hapus Prestasi"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-ink-muted">
                    Tidak ada catatan prestasi ditemukan.
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
                <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-hover flex items-center justify-center">
                  <Trophy size={20} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">
                    {editingItem ? 'Edit Prestasi' : 'Catat Prestasi Baru'}
                  </h3>
                  <p className="text-xs text-ink-muted">Dokumentasi kejuaraan civitas sekolah.</p>
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
                  Nama Prestasi / Gelar <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Juara 1 LKS Network System Administration"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink font-semibold focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Nama Penerima / Pemenang <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Nama siswa atau tim"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Kategori Penerima</label>
                  <select
                    value={recipientType}
                    onChange={(e) => setRecipientType(e.target.value as 'siswa' | 'guru' | 'sekolah')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  >
                    <option value="siswa">Siswa</option>
                    <option value="guru">Guru / Pendidik</option>
                    <option value="sekolah">Institusi Sekolah</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-ink mb-1">Nama Ajang / Kompetisi</label>
                  <input
                    type="text"
                    value={competitionName}
                    onChange={(e) => setCompetitionName(e.target.value)}
                    placeholder="LKS SMK Nasional 2024"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Tingkat</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as Achievement['level'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  >
                    <option value="kecamatan">Kecamatan</option>
                    <option value="kota">Kota</option>
                    <option value="provinsi">Provinsi</option>
                    <option value="nasional">Nasional</option>
                    <option value="internasional">Internasional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Tahun Perolehan</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Sebutan Peringkat</label>
                  <input
                    type="text"
                    value={rankTitle}
                    onChange={(e) => setRankTitle(e.target.value)}
                    placeholder="Juara 1 / Medali Emas"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">URL Foto Dokumentasi</label>
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
                  Simpan Prestasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
