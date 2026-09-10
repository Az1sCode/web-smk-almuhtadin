import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlass, 
  CalendarBlank, 
  ArrowUpRight, 
  Clock, 
  PushPin 
} from '@phosphor-icons/react';
import { newsData } from '../data/mockData';

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Semua', 'Pengumuman', 'Kegiatan', 'Prestasi'];

  const filteredNews = newsData.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Semua' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header Banner */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
          Pusat Informasi & Berita
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
          Kabar Terkini Al-Muhtadin
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
          Temukan pengumuman akademik, kegiatan kesiswaan, prestasi kompetisi, dan artikel inspiratif dari SMK Al-Muhtadin.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              type="button"
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-ink-muted border border-slate-200 hover:text-navy hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <MagnifyingGlass size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul berita..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure transition-all"
          />
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-whisper hover:shadow-elevated transition-all flex flex-col justify-between hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-navy font-semibold text-xs shadow-sm">
                      {item.category}
                    </span>
                    {item.isPinned && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold text-slate-950 font-bold text-xs shadow-sm">
                        <PushPin size={12} weight="fill" />
                        <span>Sematkan</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-ink-muted">
                    <span className="flex items-center gap-1">
                      <CalendarBlank size={14} />
                      {item.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {item.readingTime}
                    </span>
                  </div>

                  <h2 className="font-bold text-lg text-ink group-hover:text-navy transition-colors line-clamp-2 leading-snug">
                    <Link to={`/berita/${item.slug}`}>{item.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-ink-muted line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-ink-muted">
                  {item.viewsCount} kali dibaca
                </span>
                <Link
                  to={`/berita/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-azure transition-colors"
                >
                  <span>Baca Artikel</span>
                  <ArrowUpRight size={14} weight="bold" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-ink-muted text-base">Tidak ada berita atau pengumuman yang sesuai dengan pencarian Anda.</p>
        </div>
      )}
    </div>
  );
};
