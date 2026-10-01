import React, { useState } from 'react';
import { 
  Plus, 
  Trash, 
  PencilSimple, 
  VideoCamera, 
  X, 
  Check, 
  CheckCircle,
  Play,
  Star
} from '@phosphor-icons/react';
import { VideoItem } from '../../../types';
import { contentServices } from '../../../services/contentServices';

export const VideosManager: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>(() => contentServices.getVideos());
  const [editingItem, setEditingItem] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [extractedId, setExtractedId] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('03:45');
  const [isFeatured, setIsFeatured] = useState(false);

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
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: VideoItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setYoutubeUrl(item.youtubeUrl);
    setExtractedId(item.youtubeId);
    setDescription(item.description);
    setDuration(item.duration);
    setIsFeatured(!!item.isFeatured);
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
      isFeatured
    });

    setVideos(contentServices.getVideos());
    setIsModalOpen(false);
    showToast(editingItem ? 'Tautan video berhasil diperbarui!' : 'Video YouTube baru berhasil ditambahkan!');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Hapus video ini dari galeri?')) {
      contentServices.deleteVideo(id);
      setVideos(contentServices.getVideos());
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

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-ink">Galeri Video YouTube Resmi</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-mono text-[10px] font-bold">
              {videos.length} Video Terpasang
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            Sistem otomatis mengekstrak ID video 11 karakter dan mengambil thumbnail resmi langsung dari CDN YouTube.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <Plus size={16} weight="bold" />
          <span>Tambah Tautan Video</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-whisper">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3.5">Pratinjau Thumbnail</th>
                <th className="p-3.5">Judul Video Dokumentasi</th>
                <th className="p-3.5">YouTube ID</th>
                <th className="p-3.5">Durasi</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {videos.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5">
                    <div className="relative w-24 aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 group">
                      <img
                        src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-navy/30 flex items-center justify-center">
                        <Play size={16} weight="fill" className="text-white drop-shadow-md" />
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="max-w-xs sm:max-w-md">
                      <div className="flex items-center gap-1.5">
                        {item.isFeatured && (
                          <Star size={13} weight="fill" className="text-gold shrink-0" />
                        )}
                        <p className="font-bold text-ink truncate">{item.title}</p>
                      </div>
                      <p className="text-[11px] text-ink-muted line-clamp-1 mt-0.5">{item.description}</p>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <code className="px-2 py-0.5 rounded bg-azure-soft font-mono text-azure text-[11px] font-bold">
                      {item.youtubeId}
                    </code>
                  </td>
                  <td className="p-3.5 font-mono text-ink-muted">{item.duration}</td>
                  <td className="p-3.5 font-mono text-ink-muted whitespace-nowrap">{item.publishedDate}</td>
                  <td className="p-3.5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                        title="Edit Video"
                      >
                        <PencilSimple size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hapus Video"
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

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-elevated border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <VideoCamera size={20} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">
                    {editingItem ? 'Edit Video YouTube' : 'Tambah Video YouTube'}
                  </h3>
                  <p className="text-xs text-ink-muted">Penyimpanan hemat disk server melalui YouTube CDN.</p>
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
                  URL Video YouTube <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={handleUrlChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                />
              </div>

              {/* Extraction Preview */}
              {extractedId ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-4 text-xs">
                  <img
                    src={`https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`}
                    alt="Preview"
                    className="w-24 aspect-video rounded-lg object-cover border border-emerald-300"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle size={16} weight="fill" className="text-emerald-600" />
                      ID Terdeteksi: <code className="font-mono text-emerald-950 font-bold">{extractedId}</code>
                    </p>
                    <p className="text-[11px] text-emerald-700">Thumbnail valid dan siap disematkan.</p>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-ink-muted font-mono">
                  Tempel URL YouTube (cth: <code>youtube.com/watch?v=ScMzIvxBSi4</code>)
                </p>
              )}

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Judul Video Dokumentasi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Profil SMK Al-Muhtadin 2025"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink font-semibold focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Perkiraan Durasi</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="04:15"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-ink"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featVid"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 accent-navy rounded cursor-pointer"
                  />
                  <label htmlFor="featVid" className="text-xs font-bold text-ink cursor-pointer">
                    Video Utama (Featured)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Deskripsi Singkat Video</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ringkasan liputan atau acara..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink leading-relaxed"
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
                  disabled={!extractedId}
                  className="px-5 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
