import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CalendarBlank, 
  Clock, 
  WhatsappLogo, 
  FacebookLogo, 
  LinkSimple, 
  Check, 
  ArrowUpRight 
} from '@phosphor-icons/react';
import { newsData } from '../data/mockData';
import { formatIndonesianDate } from '../utils/formatters';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const article = newsData.find((item) => item.slug === slug);

  if (!article) {
    return <Navigate to="/berita" replace />;
  }

  const relatedNews = newsData
    .filter((item) => item.id !== article.id)
    .slice(0, 3);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
      {/* Back button & Category */}
      <div className="flex items-center justify-between">
        <Link
          to="/berita"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink-muted hover:text-navy transition-colors"
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Kembali ke Semua Berita</span>
        </Link>
        <span className="px-3.5 py-1 rounded-full bg-azure-soft text-navy font-semibold text-xs border border-azure/20">
          {article.category}
        </span>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-slate-200 pb-6 text-xs sm:text-sm text-ink-muted">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <p className="font-bold text-ink">{article.author.name}</p>
              <p className="text-xs text-ink-muted font-mono">{article.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <CalendarBlank size={16} />
              {formatIndonesianDate(article.publishedAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} />
              {article.readingTime}
            </span>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <figure className="space-y-2.5">
        <div className="rounded-3xl overflow-hidden aspect-[16/9] shadow-lg border border-slate-200">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <figcaption className="text-center text-xs text-ink-muted italic font-mono">
          Foto: {article.title} — Dokumentasi Resmi SMK Al-Muhtadin
        </figcaption>
      </figure>

      {/* Article Body */}
      <div 
        className="prose prose-slate max-w-none text-ink leading-relaxed space-y-4 font-normal text-base sm:text-lg"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />

      {/* Share Buttons */}
      <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted">
          Bagikan Artikel Ini:
        </span>
        <div className="flex items-center gap-2.5">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${article.title} - ${currentUrl}`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-whatsapp text-white text-xs font-bold hover:bg-whatsapp-hover transition-all shadow-sm"
          >
            <WhatsappLogo size={16} weight="fill" />
            <span>WhatsApp</span>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-facebook text-white text-xs font-bold hover:opacity-90 transition-all shadow-sm"
          >
            <FacebookLogo size={16} weight="fill" />
            <span>Facebook</span>
          </a>
          <button
            onClick={handleCopyLink}
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-ink text-xs font-bold transition-all"
          >
            {copied ? <Check size={16} className="text-emerald-600" /> : <LinkSimple size={16} />}
            <span>{copied ? 'Tersalin!' : 'Salin Tautan'}</span>
          </button>
        </div>
      </div>

      {/* Related News */}
      <div className="pt-12 space-y-6">
        <h3 className="text-xl font-bold text-ink tracking-tight">
          Berita Terkait Lainnya
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-sm text-ink line-clamp-2 hover:text-navy transition-colors">
                <Link to={`/berita/${item.slug}`}>{item.title}</Link>
              </h4>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-ink-muted">
                <span className="font-mono">{item.publishedAt}</span>
                <Link to={`/berita/${item.slug}`} className="font-bold text-navy flex items-center gap-0.5">
                  <span>Baca</span>
                  <ArrowUpRight size={12} weight="bold" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
