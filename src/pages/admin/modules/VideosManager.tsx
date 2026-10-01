import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash, 
  PencilSimple, 
  VideoCamera, 
  X, 
  Check, 
  CheckCircle,
  Play
} from '@phosphor-icons/react';
import { VideoItem } from '../../../types';
import { contentServices } from '../../../services/contentServices';
import { ConfirmDialog } from '../../../components/admin/ConfirmDialog';
import { EmptyState } from '../../../components/common/EmptyState';

export const VideosManager: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>(() => contentServices.getVideos());
  const [editingItem, setEditingItem] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [extractedId, setExtractedId] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('03:45');

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

  const parseYoutubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setYoutubeUrl(val);
    const parsed = parseYoutubeId(val);
    setExtractedId(parsed);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setYoutubeUrl('');
    setExtractedId('');
    setDescription('');
    setDuration('04:30');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: VideoItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setYoutubeUrl(item.youtubeUrl);
    setExtractedId(item.youtubeId);
    setDescription(item.description);
    setDuration(item.duration);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !extractedId) {
      alert('Judul video dan tautan YouTube valid dengan ID 11 karakter wajib diisi.');
      return;
    }

    contentServices.saveVideo({
      id: editingItem ? editingItem.id : undefined,
      title,
      youtubeUrl,
      youtubeId: extractedId,
      description,
      duration,
      publishedDate: editingItem?.publishedDate || new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      isFeatured: false
    });

    setVideos(contentServices.getVideos());
    setIsModalOpen(false);
    showToast(editingItem ? 'Tautan video berhasil diperbarui!' : 'Video YouTube baru berhasil ditambahkan!');
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId !== null) {
      contentServices.deleteVideo(deleteTargetId);
      setVideos(contentServices.getVideos());
      setDeleteTargetId(null);
      showToast('Video telah dihapus.');
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
        title="Hapus Video Galeri?"
        message="Video ini akan dihapus dari daftar putar dan galeri publik sekolah."
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
            <h2 className="text-lg font-bold text-ink">Galeri Video YouTube Resmi</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-mono text-[10px] font-bold">
              {videos.length} Video
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1">
            Embed video resmi sekolah dari YouTube. Video paling baru akan otomatis dimunculkan di halaman Beranda.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold shadow-md hover:bg-navy-light transition-all active:scale-95 shrink-0"
        >
          <Plus size={16} weight="bold" />
          Tambah Tautan Video
        </button>
      </div>

      {/* Video Cards Grid / Empty State */}
      {videos.length === 0 ? (
        <EmptyState
          title="Belum Ada Video"
          message="Galeri video YouTube sekolah masih kosong. Tambahkan tautan video YouTube pertama Anda sekarang."
          icon={<VideoCamera size={32} weight="duotone" className="text-rose-500" />}
          actionLabel="Tambah Video YouTube"
          onActionClick={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-whisper flex flex-col justify-between group hover:shadow-md transition-all"
            >
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-navy/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={20} weight="fill" className="ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/70 text-white font-mono text-[10px]">
                  {vid.duration}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm text-ink line-clamp-2 leading-snug group-hover:text-azure transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 pt-1">
                    ID: {vid.youtubeId} • {vid.publishedDate}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={vid.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-azure hover:underline inline-flex items-center gap-1"
                  >
                    Buka YouTube
                  </a>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(vid)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                      title="Edit Detail"
                    >
                      <PencilSimple size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(vid.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Hapus Video"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
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
            className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-elevated border border-slate-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header (Pinned) */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6 pb-4 shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <VideoCamera size={20} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">
                    {editingItem ? 'Edit Video YouTube' : 'Tambah Video Baru'}
                  </h3>
                  <p className="text-xs text-ink-muted">Sematkan konten dari saluran YouTube SMK Al-Muhtadin.</p>
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
                    Judul Video <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Profil Sekolah & Fasilitas Lab TKJ"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink font-semibold focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Tautan YouTube (URL) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={handleUrlChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  />
                  {extractedId ? (
                    <p className="text-[11px] text-emerald-600 font-mono mt-1.5 flex items-center gap-1">
                      <CheckCircle size={14} weight="fill" /> YouTube ID Valid: {extractedId}
                    </p>
                  ) : (
                    <p className="text-[11px] text-ink-muted mt-1.5">
                      Tempelkan tautan video YouTube lengkap atau tautan pendek (youtu.be).
                    </p>
                  )}
                </div>

                {extractedId && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-black aspect-video relative max-h-48 w-full mx-auto">
                    <img
                      src={`https://img.youtube.com/vi/${extractedId}/mqdefault.jpg`}
                      alt="Preview Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold gap-2">
                      <Play size={20} weight="fill" className="text-rose-500" />
                      Preview Berhasil Terhubung
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Durasi Video</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="04:20"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">ID Video (Otomatis)</label>
                    <input
                      type="text"
                      readOnly
                      value={extractedId}
                      placeholder="Auto extract"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Deskripsi Singkat</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Keterangan singkat mengenai isi rekaman video..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure resize-none"
                  />
                </div>
              </div>

              {/* Footer (Pinned) */}
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
                  disabled={!extractedId}
                  className="px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Simpan Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
