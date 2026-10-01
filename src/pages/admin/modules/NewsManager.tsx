import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash, 
  PencilSimple, 
  MagnifyingGlass, 
  Newspaper, 
  X, 
  Check, 
  PushPin
} from '@phosphor-icons/react';
import { NewsItem } from '../../../types';
import { contentServices } from '../../../services/contentServices';
import { ConfirmDialog } from '../../../components/admin/ConfirmDialog';
import { ImageUploadField } from '../../../components/admin/ImageUploadField';
import { EmptyState } from '../../../components/common/EmptyState';
import { MarkdownEditor } from '../../../components/admin/MarkdownEditor';

export const NewsManager: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>(() => contentServices.getNews());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // Scroll lock when modal is open
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

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Akademik');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [authorName, setAuthorName] = useState('Humas SMK Al-Muhtadin');
  const [readingTime, setReadingTime] = useState('3 menit baca');
  const [isPinned, setIsPinned] = useState(false);

  const categories = ['Semua Kategori', 'Akademik', 'Prestasi', 'Kegiatan Siswa', 'PPDB', 'Info'];

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Akademik');
    setExcerpt('');
    setBody('');
    setFeaturedImage('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800');
    setAuthorName('Humas SMK Al-Muhtadin');
    setReadingTime('3 menit baca');
    setIsPinned(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: NewsItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setExcerpt(item.excerpt);
    setBody(item.body);
    setFeaturedImage(item.featuredImage);
    setAuthorName(item.author.name);
    setReadingTime(item.readingTime);
    setIsPinned(!!item.isPinned);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Judul berita wajib diisi.');
      return;
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    contentServices.saveNews({
      id: editingItem ? editingItem.id : undefined,
      title,
      slug: editingItem?.slug || slug,
      category,
      excerpt,
      body,
      featuredImage,
      author: {
        name: authorName,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        role: 'Staf Publikasi'
      },
      publishedAt: editingItem?.publishedAt || new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      readingTime,
      isPinned,
      viewsCount: editingItem?.viewsCount || 10
    });

    setNews(contentServices.getNews());
    setIsModalOpen(false);
    showToast(editingItem ? 'Berita berhasil diperbarui!' : 'Berita baru berhasil dipublikasikan!');
  };

  const handleDelete = (id: number) => {
    setDeleteTargetId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId !== null) {
      contentServices.deleteNews(deleteTargetId);
      setNews(contentServices.getNews());
      setDeleteTargetId(null);
      showToast('Berita telah dihapus.');
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
        title="Hapus Artikel Berita?"
        message="Artikel berita ini akan dihapus secara permanen dari arsip berita sekolah."
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
            <h2 className="text-lg font-bold text-ink">Kelola Berita & Pengumuman</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-azure-soft text-navy font-mono text-[10px] font-bold">
              {news.length} Artikel
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            Publikasikan kabar capaian siswa, agenda sekolah, dan informasi PPDB resmi.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <Plus size={16} weight="bold" />
          <span>Tulis Berita Baru</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-whisper flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul berita..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
          />
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => {
            const val = cat === 'Semua Kategori' ? 'all' : cat;
            const isSelected = categoryFilter === val;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-slate-100 text-ink-muted hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-whisper">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3.5">Artikel</th>
                <th className="p-3.5">Kategori</th>
                <th className="p-3.5">Penulis</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.featuredImage}
                        alt={item.title}
                        className="w-12 h-10 rounded-lg object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0 max-w-xs sm:max-w-md">
                        <div className="flex items-center gap-1.5">
                          {item.isPinned && (
                            <PushPin size={12} weight="fill" className="text-gold shrink-0" />
                          )}
                          <p className="font-bold text-ink truncate">{item.title}</p>
                        </div>
                        <p className="text-[11px] text-ink-muted line-clamp-1 mt-0.5">{item.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-navy font-mono text-[10px] font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-ink-muted">{item.author.name}</td>
                  <td className="p-3.5 font-mono text-ink-muted whitespace-nowrap">{item.publishedAt}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      Published
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                        title="Edit Artikel"
                      >
                        <PencilSimple size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hapus Artikel"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredNews.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-ink-muted">
                    Tidak ada berita ditemukan untuk pencarian atau filter saat ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-elevated border border-slate-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6 pb-4 shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-azure-soft text-navy flex items-center justify-center shrink-0">
                  <Newspaper size={20} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">
                    {editingItem ? 'Edit Berita' : 'Tulis Berita Baru'}
                  </h3>
                  <p className="text-xs text-ink-muted">Publikasi informasi resmi sekolah.</p>
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
                    Judul Berita <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Judul kegiatan atau pengumuman..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink font-semibold focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Kategori</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                    >
                      <option value="Akademik">Akademik</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Kegiatan Siswa">Kegiatan Siswa</option>
                      <option value="PPDB">PPDB</option>
                      <option value="Info">Info</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">Penulis</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Kutipan Singkat (Excerpt) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Ringkasan 1-2 kalimat untuk kartu berita..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink"
                  />
                </div>

                {/* Markdown Editor for Content Body */}
                <MarkdownEditor
                  value={body}
                  onChange={setBody}
                  label="Isi Konten Berita (Markdown)"
                  placeholder="Tulis uraian lengkap berita di sini... Gunakan tombol toolbar di atas untuk menebalkan, membuat subjudul, poin daftar, dan lain-lain tanpa perlu tag HTML manual."
                  minHeight="260px"
                  required
                />

                <ImageUploadField
                  label="Gambar Utama Artikel"
                  value={featuredImage}
                  onChange={setFeaturedImage}
                  recommendedDimensions="1200 x 800 px"
                  aspectRatioHint="3:2 / 16:9 Landscape"
                  helperText="Unggah gambar headline yang relevan untuk kartu dan detail berita."
                />

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <PushPin size={18} className="text-navy" weight="duotone" />
                    <div>
                      <p className="text-xs font-bold text-ink">Sematkan di Teratas (Pinned Article)</p>
                      <p className="text-[10px] text-ink-muted">Tampil di urutan pertama pada halaman Berita</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="w-4 h-4 accent-navy rounded cursor-pointer"
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
                  Publikasikan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
