import React, { useState } from 'react';
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

export const NewsManager: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>(() => contentServices.getNews());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');

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

    const saved = contentServices.saveNews({
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
    if (window.confirm('Hapus artikel berita ini secara permanen?')) {
      contentServices.deleteNews(id);
      setNews(contentServices.getNews());
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-elevated border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
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
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
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

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Isi Konten Berita (Markdown / Teks)
                </label>
                <textarea
                  rows={6}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Uraian lengkap berita..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">URL Gambar Utama</label>
                <input
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-ink"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <PushPin size={18} className="text-navy" />
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
