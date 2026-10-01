import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash, 
  PencilSimple, 
  Trophy, 
  X, 
  Check, 
  MagnifyingGlass 
} from '@phosphor-icons/react';
import { Achievement } from '../../../types';
import { contentServices } from '../../../services/contentServices';
import { ImageUploadField } from '../../../components/admin/ImageUploadField';
import { ConfirmDialog } from '../../../components/admin/ConfirmDialog';
import { EmptyState } from '../../../components/common/EmptyState';

export const AchievementsManager: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(() => contentServices.getAchievements());
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

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

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

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
    setPhoto('');
    setDescription('');
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
    setDescription(item.description || '');
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
      isFeatured: false
    });

    setAchievements(contentServices.getAchievements());
    setIsModalOpen(false);
    showToast(editingItem ? 'Prestasi berhasil diperbarui!' : 'Prestasi baru berhasil dicatat!');
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId !== null) {
      contentServices.deleteAchievement(deleteTargetId);
      setAchievements(contentServices.getAchievements());
      setDeleteTargetId(null);
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

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Hapus Catatan Prestasi?"
        message="Tindakan ini akan menghapus data prestasi dari daftar publik secara permanen."
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-ink">Prestasi Civitas Sekolah</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-hover font-mono text-[10px] font-bold">
              {achievements.length} Terdaftar
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1">
            Data kejuaraan siswa dan guru yang otomatis disortir terbaru untuk tampil di beranda dan halaman publik.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold shadow-md hover:bg-navy-light transition-all active:scale-95 shrink-0"
        >
          <Plus size={16} weight="bold" />
          Catat Prestasi Baru
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

      {/* Table / Empty State */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="Tidak Ada Prestasi Ditemukan"
          message={achievements.length === 0 ? 'Belum ada data prestasi yang dicatat. Tambahkan prestasi baru melalui tombol di atas.' : 'Tidak ada prestasi yang cocok dengan pencarian atau filter yang dipilih.'}
          icon={<Trophy size={32} weight="duotone" className="text-gold" />}
          actionLabel={achievements.length === 0 ? 'Catat Prestasi Baru' : undefined}
          onActionClick={achievements.length === 0 ? handleOpenAdd : undefined}
        />
      ) : (
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
                          <p className="font-bold text-ink truncate">{item.title}</p>
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
                          onClick={() => setDeleteTargetId(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Prestasi"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy/70 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-elevated border border-slate-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6 pb-4 shrink-0 bg-white">
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
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 overscroll-contain">
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
                <label className="block text-xs font-bold text-ink mb-1">Deskripsi Singkat / Catatan Prestasi</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Ceritakan tentang pencapaian prestasi, jumlah peserta saingan, atau dampak kemenangan..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                />
              </div>

              <ImageUploadField
                label="Foto Dokumentasi Prestasi"
                value={photo}
                onChange={setPhoto}
                recommendedDimensions="800 x 600 px (4:3)"
                aspectRatioHint="4:3 Landscape"
                helperText="Unggah foto piala, piagam penghargaan, atau foto dokumentasi saat penyerahan gelar."
              />

              </div>

              {/* Pinned Footer */}
              <div className="p-4 sm:p-5 flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-ink-muted hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
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
