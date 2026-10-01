import React, { useState } from 'react';
import { 
  Check, 
  PencilSimple, 
  ShieldCheck, 
  X, 
  Info
} from '@phosphor-icons/react';
import { SchoolAdvantage } from '../../../types';
import { contentServices } from '../../../services/contentServices';
import { SmkPkLogo, AdiwiyataLogo, LspP1Logo } from '../../../components/AdvantageLogos';

export const AdvantagesManager: React.FC = () => {
  const [advantages, setAdvantages] = useState<SchoolAdvantage[]>(() => contentServices.getAdvantages());
  const [editingItem, setEditingItem] = useState<SchoolAdvantage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string>('');

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formHighlight, setFormHighlight] = useState('');
  const [formDescription, setFormDescription] = useState('');

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    contentServices.saveAdvantage({
      ...editingItem,
      title: formTitle,
      subtitle: formSubtitle,
      category: formCategory,
      badge: formBadge,
      highlightMetric: formHighlight,
      description: formDescription
    });

    setAdvantages(contentServices.getAdvantages());
    setIsModalOpen(false);
    showToast(`Pilar "${formTitle}" berhasil diperbarui!`);
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
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-hover flex items-center justify-center">
            <ShieldCheck size={22} weight="duotone" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink">3 Pilar Keunggulan Institusi</h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Kelola entitas keunggulan utama sekolah (SMK PK, Sekolah Adiwiyata, dan LSP-P1 BNSP).
            </p>
          </div>
        </div>
      </div>

      {/* Info Notice about UI Synchronization */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <Info size={18} weight="fill" className="shrink-0 text-amber-600 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Kesesuaian Tampilan Beranda:</strong> Sesuai desain terbaru pada section Keunggulan Beranda, setiap kartu ditampilkan dengan <em>background</em> putih elegan, logo resmi berada tepat di tengah, dan teks judul serta subtitle terpusat rapi tanpa deskripsi panjang.
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
              {/* Category pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-slate-100 font-mono text-[10px] text-navy font-bold">
                  {item.badge || item.category}
                </span>
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                  title="Ubah Rincian"
                >
                  <PencilSimple size={18} weight="duotone" />
                </button>
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

      {/* Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-elevated border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-hover flex items-center justify-center">
                  <ShieldCheck size={22} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">Ubah Pilar Keunggulan</h3>
                  <p className="text-xs text-ink-muted">Entitas #{editingItem.id}</p>
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
                  Nama Keunggulan (Judul Utama) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Sub-Judul / Keterangan Singkat
                </label>
                <input
                  type="text"
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Label Badge Pill
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    Highlight Metric
                  </label>
                  <input
                    type="text"
                    value={formHighlight}
                    onChange={(e) => setFormHighlight(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Deskripsi Lengkap (Profil Keunggulan)
                </label>
                <textarea
                  rows={4}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
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
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
