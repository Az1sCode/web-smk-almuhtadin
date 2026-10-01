import React, { useState } from 'react';
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

export const GalleryManager: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>(() => contentServices.getAlbums());
  const [images, setImages] = useState<GalleryImage[]>(() => contentServices.getGalleryImages());
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | 'all'>('all');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [notification, setNotification] = useState('');

  // Photo form
  const [photoUrl, setPhotoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [targetAlbumId, setTargetAlbumId] = useState<number>(albums[0]?.id || 1);

  // Album form
  const [albumName, setAlbumName] = useState('');
  const [albumDesc, setAlbumDesc] = useState('');
  const [albumCover, setAlbumCover] = useState('');

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
      alert('URL Foto dan Keterangan wajib diisi.');
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
      alert('Nama album wajib diisi.');
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
    if (window.confirm('Hapus foto ini dari galeri?')) {
      contentServices.deleteGalleryImage(id);
      setImages(contentServices.getGalleryImages());
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
            Kelola album kegiatan sekolah, sarana prasarana, dan dokumentasi momen siswa.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAlbumModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-ink text-xs font-bold transition-all"
          >
            <FolderPlus size={16} weight="bold" />
            <span>Buat Album</span>
          </button>
          <button
            onClick={() => setIsPhotoModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm"
          >
            <Plus size={16} weight="bold" />
            <span>Tambah Foto</span>
          </button>
        </div>
      </div>

      {/* Album Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedAlbumId('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedAlbumId === 'all'
              ? 'bg-navy text-white shadow-sm'
              : 'bg-white text-ink-muted hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          Semua Album ({images.length})
        </button>
        {albums.map((album) => (
          <button
            key={album.id}
            onClick={() => setSelectedAlbumId(album.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedAlbumId === album.id
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-ink-muted hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {album.name}
          </button>
        ))}
      </div>

      {/* Photos Masonry / Grid */}
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
                  className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition-colors"
                  title="Hapus Foto"
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Photo Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-elevated border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
                  <Images size={20} weight="duotone" />
                </div>
                <h3 className="text-base font-bold text-ink">Unggah Foto ke Galeri</h3>
              </div>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Pilih Album</label>
                <select
                  value={targetAlbumId}
                  onChange={(e) => setTargetAlbumId(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink"
                >
                  {albums.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">URL Gambar Foto</label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Keterangan Foto (Caption)</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Deskripsi momen atau kegiatan..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-ink-muted hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-elevated border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
                  <FolderPlus size={20} weight="duotone" />
                </div>
                <h3 className="text-base font-bold text-ink">Buat Album Baru</h3>
              </div>
              <button
                onClick={() => setIsAlbumModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAlbum} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Nama Album</label>
                <input
                  type="text"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                  placeholder="Contoh: MPLS 2025"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Deskripsi Album</label>
                <textarea
                  rows={2}
                  value={albumDesc}
                  onChange={(e) => setAlbumDesc(e.target.value)}
                  placeholder="Keterangan singkat kegiatan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">URL Cover Image Album</label>
                <input
                  type="url"
                  value={albumCover}
                  onChange={(e) => setAlbumCover(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAlbumModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-ink-muted hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold"
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
