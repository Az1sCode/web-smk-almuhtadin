import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash, 
  Images, 
  X, 
  Check, 
  FolderPlus
} from '@phosphor-icons/react';
import { Album, GalleryImage } from '../../../types';
import { contentServices } from '../../../services/contentServices';
import { ConfirmDialog } from '../../../components/admin/ConfirmDialog';
import { ImageUploadField } from '../../../components/admin/ImageUploadField';
import { EmptyState } from '../../../components/common/EmptyState';

export const GalleryManager: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>(() => contentServices.getAlbums());
  const [images, setImages] = useState<GalleryImage[]>(() => contentServices.getGalleryImages());
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | 'all'>('all');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // Photo form
  const [photoUrl, setPhotoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [targetAlbumId, setTargetAlbumId] = useState<number>(albums[0]?.id || 1);

  // Album form
  const [albumName, setAlbumName] = useState('');
  const [albumDesc, setAlbumDesc] = useState('');
  const [albumCover, setAlbumCover] = useState('');

  // Prevent background scroll when any modal is open
  useEffect(() => {
    if (isPhotoModalOpen || isAlbumModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isPhotoModalOpen, isAlbumModalOpen]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isPhotoModalOpen) setIsPhotoModalOpen(false);
        if (isAlbumModalOpen) setIsAlbumModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPhotoModalOpen, isAlbumModalOpen]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredImages = selectedAlbumId === 'all'
    ? images
    : images.filter((img) => img.albumId === selectedAlbumId);

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim() || !caption.trim()) {
      showToast('Foto dan Keterangan wajib diisi.');
      return;
    }

    contentServices.saveGalleryImage({
      albumId: Number(targetAlbumId),
      imagePath: photoUrl,
      caption,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    });

    setImages(contentServices.getGalleryImages());
    setIsPhotoModalOpen(false);
    setPhotoUrl('');
    setCaption('');
    showToast('Foto baru berhasil diunggah ke galeri!');
  };

  const handleSaveAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumName.trim()) {
      showToast('Nama album wajib diisi.');
      return;
    }

    const slug = albumName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    contentServices.saveAlbum({
      name: albumName,
      slug,
      description: albumDesc,
      coverImage: albumCover || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      imagesCount: 0,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    });

    setAlbums(contentServices.getAlbums());
    setIsAlbumModalOpen(false);
    setAlbumName('');
    setAlbumDesc('');
    setAlbumCover('');
    showToast('Album baru berhasil dibuat!');
  };

  const handleDeleteImage = (id: number) => {
    setDeleteTargetId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId !== null) {
      contentServices.deleteGalleryImage(deleteTargetId);
      setImages(contentServices.getGalleryImages());
      setDeleteTargetId(null);
      showToast('Foto telah dihapus.');
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
        title="Hapus Foto Galeri?"
        message="Foto ini akan dihapus dari album dan galeri publik sekolah."
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
            <h2 className="text-lg font-bold text-ink">Galeri Foto & Album Dokumentasi</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-azure-soft text-navy font-mono text-[10px] font-bold">
              {images.length} Foto &bull; {albums.length} Album
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            Dokumentasi visual kegiatan sekolah, praktikum lab kejuruan, dan perayaan hari besar.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAlbumModalOpen(true)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-ink hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <FolderPlus size={16} weight="duotone" className="text-azure" />
            <span>Buat Album</span>
          </button>
          <button
            onClick={() => setIsPhotoModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Plus size={16} weight="bold" />
            <span>Unggah Foto</span>
          </button>
        </div>
      </div>

      {/* Album Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedAlbumId('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedAlbumId === 'all'
              ? 'bg-navy text-white shadow-xs'
              : 'bg-white border border-slate-200 text-ink-muted hover:border-slate-300'
          }`}
        >
          Semua Album ({images.length})
        </button>
        {albums.map((album) => {
          const count = images.filter((img) => img.albumId === album.id).length;
          const isSelected = selectedAlbumId === album.id;
          return (
            <button
              key={album.id}
              onClick={() => setSelectedAlbumId(album.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-navy text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-ink-muted hover:border-slate-300'
              }`}
            >
              {album.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Photos Masonry / Grid */}
      {filteredImages.length === 0 ? (
        <EmptyState
          title="Belum Ada Foto"
          message={images.length === 0 ? 'Galeri foto sekolah masih kosong. Mulai unggah dokumentasi foto pertama Anda.' : 'Belum ada foto dalam album yang dipilih ini.'}
          icon={<Images size={32} weight="duotone" className="text-azure" />}
          actionLabel="Unggah Foto"
          onActionClick={() => setIsPhotoModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-whisper hover:shadow-card transition-all"
            >
              <div className="aspect-square w-full bg-slate-100 overflow-hidden">
                <img
                  src={img.imagePath}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-white space-y-1">
                <p className="text-xs font-bold text-ink line-clamp-1">{img.caption}</p>
                <div className="flex items-center justify-between text-[10px] text-ink-muted font-mono pt-1">
                  <span>{img.date}</span>
                  <button
                    onClick={() => handleDeleteImage(img.id)}
                    className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition-colors cursor-pointer"
                    title="Hapus Foto"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Photo Modal */}
      {isPhotoModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy/70 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPhotoModalOpen(false);
          }}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-elevated border border-slate-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6 pb-4 shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
                  <Images size={20} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">Unggah Foto ke Galeri</h3>
                  <p className="text-xs text-ink-muted">Dokumentasikan aktivitas dan momen civitas sekolah.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 overscroll-contain">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Pilih Album</label>
                  <select
                    value={targetAlbumId}
                    onChange={(e) => setTargetAlbumId(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                  >
                    {albums.map((a) => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <ImageUploadField
                  label="Berkas Foto Galeri"
                  value={photoUrl}
                  onChange={setPhotoUrl}
                  recommendedDimensions="1200 x 900 px"
                  aspectRatioHint="4:3 / 16:9 Landscape"
                  required
                  helperText="Pilih atau seret foto dokumentasi beresolusi tajam."
                />

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Keterangan Foto (Caption) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Deskripsi momen atau kegiatan..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>
              </div>

              {/* Pinned Footer */}
              <div className="p-4 sm:p-5 flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-ink-muted hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!photoUrl}
                  className="px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Album Modal */}
      {isAlbumModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy/70 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAlbumModalOpen(false);
          }}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-elevated border border-slate-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6 pb-4 shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
                  <FolderPlus size={20} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">Buat Album Baru</h3>
                  <p className="text-xs text-ink-muted">Kelompokkan foto dokumentasi berdasarkan acara atau kategori.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAlbumModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <form onSubmit={handleSaveAlbum} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 overscroll-contain">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Nama Album <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    placeholder="Contoh: MPLS 2025"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Deskripsi Album</label>
                  <textarea
                    rows={2}
                    value={albumDesc}
                    onChange={(e) => setAlbumDesc(e.target.value)}
                    placeholder="Keterangan singkat kegiatan..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>

                <ImageUploadField
                  label="Cover Image Album"
                  value={albumCover}
                  onChange={setAlbumCover}
                  recommendedDimensions="800 x 600 px"
                  aspectRatioHint="4:3 Landscape"
                  helperText="Foto sampul depan album dokumentasi."
                />
              </div>

              {/* Pinned Footer */}
              <div className="p-4 sm:p-5 flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAlbumModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-ink-muted hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Buat Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
