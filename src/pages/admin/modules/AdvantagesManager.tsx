import React, { useState, useEffect } from 'react';
import { 
  Check, 
  PencilSimple, 
  ShieldCheck, 
  X, 
  Info,
  Plus,
  Trash
} from '@phosphor-icons/react';
import { SchoolAdvantage } from '../../../types';
import { contentServices } from '../../../services/contentServices';
import { SmkPkLogo, AdiwiyataLogo, LspP1Logo } from '../../../components/AdvantageLogos';
import { ConfirmDialog } from '../../../components/admin/ConfirmDialog';

export const AdvantagesManager: React.FC = () => {
  const [advantages, setAdvantages] = useState<SchoolAdvantage[]>(() => contentServices.getAdvantages());
  const [editingItem, setEditingItem] = useState<SchoolAdvantage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string>('');
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formHighlight, setFormHighlight] = useState('');
  const [formDescription, setFormDescription] = useState('');

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

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const renderLogo = (id: number) => {
    switch (id) {
      case 1:
        return <SmkPkLogo className="w-24 h-24" />;
      case 2:
        return <AdiwiyataLogo className="w-24 h-24" />;
      case 3:
        return <LspP1Logo className="w-24 h-24" />;
      default:
        return <ShieldCheck size={48} className="text-navy" weight="duotone" />;
    }
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormCategory('Keunggulan Mutu');
    setFormBadge('Akreditasi / Sertifikasi');
    setFormHighlight('Standar Nasional');
    setFormDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: SchoolAdvantage) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormSubtitle(item.subtitle);
    setFormCategory(item.category);
    setFormBadge(item.badge || '');
    setFormHighlight(item.highlightMetric || '');
    setFormDescription(item.description);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number, title: string) => {
    setDeleteTarget({ id, title });
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      contentServices.deleteAdvantage(deleteTarget.id);
      setAdvantages(contentServices.getAdvantages());
      showToast(`Pilar "${deleteTarget.title}" berhasil dihapus!`);
      setDeleteTarget(null);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      contentServices.saveAdvantage({
        ...editingItem,
        title: formTitle,
        subtitle: formSubtitle,
        category: formCategory,
        badge: formBadge,
        highlightMetric: formHighlight,
        description: formDescription
      });
      showToast(`Pilar "${formTitle}" berhasil diperbarui!`);
    } else {
      contentServices.saveAdvantage({
        title: formTitle,
        subtitle: formSubtitle,
        category: formCategory,
        badge: formBadge,
        highlightMetric: formHighlight,
        description: formDescription,
        icon: 'ShieldCheck',
        isFeatured: true
      });
      showToast(`Pilar keunggulan baru berhasil ditambahkan!`);
    }

    setAdvantages(contentServices.getAdvantages());
    setIsModalOpen(false);
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
        isOpen={deleteTarget !== null}
        title="Hapus Pilar Keunggulan?"
        message={`Apakah Anda yakin ingin menghapus pilar keunggulan "${deleteTarget?.title}"?`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-hover flex items-center justify-center">
            <ShieldCheck size={22} weight="duotone" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink">Pilar Keunggulan Institusi</h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Kelola entitas keunggulan utama sekolah (SMK PK, Sekolah Adiwiyata, dan LSP-P1 BNSP).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-slate-100 font-mono text-xs font-bold text-navy shrink-0">
            {advantages.length} Keunggulan
          </span>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-2xl bg-navy hover:bg-navy-light text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus size={16} weight="bold" />
            <span>Tambah Keunggulan</span>
          </button>
        </div>
      </div>

      {/* Info Notice about UI Synchronization */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <Info size={18} weight="fill" className="shrink-0 text-amber-600 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Kesesuaian Tampilan Beranda:</strong> Sesuai desain terbaru pada section Keunggulan Beranda, setiap kartu ditampilkan dengan <em>background</em> putih elegan, logo resmi berada tepat di tengah, dan teks judul serta subtitle terpusat rapi.
        </p>
      </div>

      {/* Advantages Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {advantages.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper flex flex-col justify-between hover:shadow-card hover:border-azure/40 transition-all group"
          >
            <div>
              {/* Category pill & actions */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-slate-100 font-mono text-[10px] text-navy font-bold">
                  {item.badge || item.category}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                    title="Ubah Rincian"
                  >
                    <PencilSimple size={17} weight="duotone" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Hapus Keunggulan"
                  >
                    <Trash size={17} weight="duotone" />
                  </button>
                </div>
              </div>

              {/* Centered Logo Preview */}
              <div className="py-4 flex items-center justify-center">
                {renderLogo(item.id)}
              </div>

              {/* Titles */}
              <div className="text-center mt-3 space-y-1">
                <h3 className="text-base font-bold text-ink group-hover:text-navy transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-muted">
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom details & action */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-600 font-semibold truncate">
                {item.highlightMetric}
              </span>
              <button
                onClick={() => handleOpenEdit(item)}
                className="text-xs font-bold text-navy hover:text-azure flex items-center gap-1 transition-colors"
              >
                <span>Edit Data</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy/70 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-elevated border border-slate-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6 pb-4 shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-hover flex items-center justify-center">
                  <ShieldCheck size={22} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">
                    {editingItem ? 'Ubah Data Keunggulan' : 'Tambah Keunggulan Baru'}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {editingItem ? editingItem.title : 'Tambahkan entitas pilar mutu keunggulan institusi'}
                  </p>
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
                <label className="block text-xs font-bold text-ink mb-1">Judul Keunggulan</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                  placeholder="Contoh: SMK PK (Pusat Keunggulan)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Sub Judul (Subtitle)</label>
                <input
                  type="text"
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  required
                  placeholder="Contoh: Skema Penguatan Link & Match Industri Kemendikbudristek"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Label / Badge</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="Contoh: STANDAR NASIONAL"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Metrik / Capaian</label>
                  <input
                    type="text"
                    value={formHighlight}
                    onChange={(e) => setFormHighlight(e.target.value)}
                    placeholder="Contoh: Sertifikasi ISO 9001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Kategori</label>
                <input
                  type="text"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  placeholder="Contoh: Akreditasi & Standarisasi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Deskripsi Tambahan</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Penjelasan teknis atau dasar hukum..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-azure/20"
                />
              </div>

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
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Keunggulan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
