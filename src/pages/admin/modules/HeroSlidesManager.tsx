import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash, 
  PencilSimple, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  X, 
  Sliders, 
  Eye, 
  Info
} from '@phosphor-icons/react';
import { HeroSlide } from '../../../types';
import { contentServices } from '../../../services/contentServices';
import { ConfirmDialog } from '../../../components/admin/ConfirmDialog';
import { ImageUploadField } from '../../../components/admin/ImageUploadField';
import { EmptyState } from '../../../components/common/EmptyState';

export const HeroSlidesManager: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(() => contentServices.getHeroSlides());
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewSlide, setPreviewSlide] = useState<HeroSlide | null>(null);
  const [notification, setNotification] = useState<string>('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // Form states
  const [formBadge, setFormBadge] = useState('');
  const [formHeadline, setFormHeadline] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formImageAlt, setFormImageAlt] = useState('');

  // Scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen || previewSlide) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen, previewSlide]);

  // Escape key listener to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isModalOpen) setIsModalOpen(false);
        if (previewSlide) setPreviewSlide(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, previewSlide]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditingSlide(null);
    setFormBadge('SMK Al-Muhtadin • Terakreditasi A (Unggul)');
    setFormHeadline('');
    setFormDescription('');
    setFormImage('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600');
    setFormImageAlt('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormBadge(slide.badge);
    setFormHeadline(slide.headline);
    setFormDescription(slide.description);
    setFormImage(slide.image);
    setFormImageAlt(slide.imageAlt || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formHeadline.trim() || !formImage.trim()) {
      alert('Headline dan Gambar wajib diisi.');
      return;
    }

    contentServices.saveHeroSlide({
      id: editingSlide ? editingSlide.id : undefined,
      badge: formBadge,
      headline: formHeadline,
      description: formDescription,
      image: formImage,
      imageAlt: formImageAlt || formHeadline
    });

    const refreshed = contentServices.getHeroSlides();
    setSlides(refreshed);
    setIsModalOpen(false);
    showToast(editingSlide ? 'Slide berhasil diperbarui!' : 'Slide baru berhasil ditambahkan!');
  };

  const handleDelete = (id: number) => {
    if (slides.length <= 1) {
      alert('Minimal harus ada 1 slide hero aktif di halaman beranda.');
      return;
    }
    setDeleteTargetId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId !== null) {
      contentServices.deleteHeroSlide(deleteTargetId);
      setSlides(contentServices.getHeroSlides());
      setDeleteTargetId(null);
      showToast('Slide berhasil dihapus.');
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSlides.length) return;

    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;

    contentServices.reorderHeroSlides(newSlides);
    setSlides(newSlides);
    showToast('Urutan pergeseran slide berhasil diubah.');
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
        title="Hapus Slide Hero?"
        message="Slide ini tidak akan ditampilkan lagi pada tayangan banner utama halaman depan."
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Header Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-ink">Manajemen Slide Hero Beranda</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-azure-soft text-navy font-mono text-[10px] font-bold">
              {slides.length} Slide Aktif
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            Konten hero pada beranda akan otomatis bergulir bergantian sesuai urutan di bawah ini.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <Plus size={16} weight="bold" />
          <span>Tambah Slide Baru</span>
        </button>
      </div>

      {/* Info Tip */}
      <div className="p-4 rounded-2xl bg-azure-soft/40 border border-azure/20 flex items-start gap-3 text-xs text-navy">
        <Info size={20} weight="fill" className="shrink-0 text-azure mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Mekanisme Slider Otomatis:</p>
          <p className="text-[11px] text-ink-muted leading-relaxed">
            Karena hero dibuat dinamis tanpa tombol navigasi statis, slider beranda akan berganti setiap 6 detik secara berurutan. Gunakan tombol panah ke atas dan bawah untuk menyesuaikan urutan slide yang tampil pertama kali.
          </p>
        </div>
      </div>

      {/* Slides List Cards */}
      {slides.length === 0 ? (
        <EmptyState
          title="Belum Ada Slide Banner"
          message="Belum ada slide hero beranda yang terdaftar. Tambahkan slide pertama Anda."
          icon={<Sliders size={32} weight="duotone" className="text-azure" />}
          actionLabel="Tambah Slide Baru"
          onActionClick={handleOpenAdd}
        />
      ) : (
        <div className="space-y-4">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-whisper hover:border-azure/30 transition-all flex flex-col md:flex-row gap-5 items-start md:items-center"
            >
              {/* Position order badge */}
              <div className="flex md:flex-col items-center gap-1 shrink-0">
                <span className="w-8 h-8 rounded-xl bg-slate-100 text-navy font-mono font-bold text-xs flex items-center justify-center">
                  #{index + 1}
                </span>
                <div className="flex md:flex-col gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Pindah ke Atas"
                  >
                    <ArrowUp size={14} weight="bold" />
                  </button>
                  <button
                    disabled={index === slides.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Pindah ke Bawah"
                  >
                    <ArrowDown size={14} weight="bold" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Preview */}
              <div className="relative w-full sm:w-48 aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600';
                  }}
                />
                <div className="absolute inset-0 bg-navy/20" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono text-navy font-semibold">
                  {slide.badge}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-ink line-clamp-1">
                  {slide.headline}
                </h3>
                <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                  {slide.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => setPreviewSlide(slide)}
                  className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Lihat Pratinjau Visual"
                >
                  <Eye size={18} weight="duotone" />
                </button>
                <button
                  onClick={() => handleOpenEdit(slide)}
                  className="p-2 rounded-xl text-slate-400 hover:text-azure hover:bg-azure-soft/50 transition-colors cursor-pointer"
                  title="Ubah Konten"
                >
                  <PencilSimple size={18} weight="duotone" />
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Hapus Slide"
                >
                  <Trash size={18} weight="duotone" />
                </button>
              </div>
            </div>
          ))}
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
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-azure-soft text-navy flex items-center justify-center shrink-0">
                  <Sliders size={20} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">
                    {editingSlide ? 'Ubah Slide Hero' : 'Tambah Slide Hero Baru'}
                  </h3>
                  <p className="text-xs text-ink-muted">Konfigurasi teks dan gambar banner beranda.</p>
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

            {/* Scrollable Form Body */}
            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 overscroll-contain">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Label Badge Tag
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="Contoh: SMK Al-Muhtadin • Terakreditasi A"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Judul Utama (Headline) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formHeadline}
                    onChange={(e) => setFormHeadline(e.target.value)}
                    placeholder="Teks headline besar yang menarik perhatian..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Deskripsi / Paragraf Singkat
                  </label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Penjelasan ringkas tentang keunggulan atau ajakan..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  />
                </div>

                <ImageUploadField
                  label="Gambar Banner Hero"
                  value={formImage}
                  onChange={setFormImage}
                  recommendedDimensions="1920 x 1080 px"
                  aspectRatioHint="16:9 Landscape"
                  required
                  helperText="Format gambar landscape beresolusi tinggi untuk tampilan beranda utama."
                />

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Teks Alt Gambar (Aksesibilitas)
                  </label>
                  <input
                    type="text"
                    value={formImageAlt}
                    onChange={(e) => setFormImageAlt(e.target.value)}
                    placeholder="Deskripsi singkat gambar untuk screen reader"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
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
                  Simpan Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visual Live Preview Modal */}
      {previewSlide && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy/70 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewSlide(null);
          }}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-elevated border border-slate-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6 pb-4 shrink-0 bg-white">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Pratinjau Tampilan Slide pada Beranda
              </span>
              <button
                type="button"
                onClick={() => setPreviewSlide(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                aria-label="Tutup Pratinjau"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
              <div className="relative rounded-2xl overflow-hidden bg-navy text-white p-8 min-h-[300px] flex flex-col justify-end">
                <img
                  src={previewSlide.image}
                  alt={previewSlide.headline}
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />
                <div className="relative z-10 space-y-3 max-w-xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono text-gold font-bold">
                    {previewSlide.badge}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
                    {previewSlide.headline}
                  </h2>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {previewSlide.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center justify-end border-t border-slate-100 bg-slate-50/70 shrink-0">
              <button
                type="button"
                onClick={() => setPreviewSlide(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-ink-muted hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
