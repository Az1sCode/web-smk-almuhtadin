import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkle, 
  CheckCircle, 
  Copy, 
  Palette, 
  TextT, 
  Square, 
  Stack 
} from '@phosphor-icons/react';

export const StyleGuideShowcasePage: React.FC = () => {
  const colorCategories = [
    {
      title: 'Primary - Deep Royal Navy',
      description: 'Warna identitas resmi sekolah, header, tombol utama',
      colors: [
        { name: 'Navy DEFAULT', var: '--color-primary', hex: '#103EA5', tw: 'bg-navy text-white' },
        { name: 'Navy Dark', var: '--color-primary-dark', hex: '#0A2668', tw: 'bg-navy-dark text-white' },
        { name: 'Navy Light', var: '--color-primary-light', hex: '#1B4FC9', tw: 'bg-navy-light text-white' },
      ],
    },
    {
      title: 'Secondary - Vibrant Azure',
      description: 'Warna interaktif, active tab, hover state, link',
      colors: [
        { name: 'Azure DEFAULT', var: '--color-secondary', hex: '#3D6BF5', tw: 'bg-azure text-white' },
        { name: 'Azure Light', var: '--color-secondary-light', hex: '#6187F7', tw: 'bg-azure-light text-white' },
        { name: 'Azure Soft', var: '--color-secondary-soft', hex: '#EEF2FF', tw: 'bg-azure-soft text-navy border border-azure/20' },
      ],
    },
    {
      title: 'Accent - Prestige Gold',
      description: 'Highlight prestasi, Akreditasi A, badge pengumuman',
      colors: [
        { name: 'Gold DEFAULT', var: '--color-gold', hex: '#E5B62A', tw: 'bg-gold text-slate-950' },
        { name: 'Gold Hover', var: '--color-gold-hover', hex: '#D4A31C', tw: 'bg-gold-hover text-slate-950' },
        { name: 'Gold Soft', var: '--color-gold-soft', hex: '#FEF9C3', tw: 'bg-gold-soft text-slate-900 border border-gold/30' },
      ],
    },
    {
      title: 'Surfaces & Backgrounds',
      description: 'Kanvas aplikasi, kartu bento, footer',
      colors: [
        { name: 'Canvas Background', var: '--color-canvas', hex: '#F8FAFC', tw: 'bg-canvas text-ink border border-slate-200' },
        { name: 'Surface White', var: '--color-surface', hex: '#FFFFFF', tw: 'bg-surface text-ink border border-slate-200' },
        { name: 'Midnight Navy', var: '--color-midnight', hex: '#0A1931', tw: 'bg-midnight text-white' },
      ],
    },
  ];

  const fontScales = [
    { label: 'Hero Display (clamp)', class: 'text-2xl sm:text-4xl font-extrabold', size: '32px - 60px', code: '--text-hero' },
    { label: 'Display 5XL', class: 'text-3xl font-extrabold', size: '48px', code: '--text-5xl' },
    { label: 'Heading 4XL', class: 'text-2xl font-bold', size: '36px', code: '--text-4xl' },
    { label: 'Heading 3XL', class: 'text-xl font-bold', size: '30px', code: '--text-3xl' },
    { label: 'Heading 2XL (Bento Header)', class: 'text-lg font-bold', size: '24px', code: '--text-2xl' },
    { label: 'Subheading XL', class: 'text-base font-semibold', size: '20px', code: '--text-xl' },
    { label: 'Body Text Base', class: 'text-sm font-normal', size: '16px', code: '--text-base' },
    { label: 'Small Text (Metadata)', class: 'text-xs font-normal', size: '14px', code: '--text-sm' },
    { label: 'Extra Small (Badge)', class: 'text-[11px] font-mono uppercase tracking-wider', size: '12px', code: '--text-xs' },
  ];

  const borderRadii = [
    { label: 'xs (4px)', class: 'rounded-xs', val: '0.25rem' },
    { label: 'sm (6px)', class: 'rounded-sm', val: '0.375rem' },
    { label: 'md (8px)', class: 'rounded-md', val: '0.5rem' },
    { label: 'lg (12px)', class: 'rounded-lg', val: '0.75rem' },
    { label: 'xl (16px)', class: 'rounded-xl', val: '1rem' },
    { label: '2xl (20px - Bento Card)', class: 'rounded-2xl', val: '1.25rem' },
    { label: '3xl (28px - Container Hero)', class: 'rounded-3xl', val: '1.75rem' },
    { label: '4xl (36px - Large Frame)', class: 'rounded-4xl', val: '2.25rem' },
    { label: 'Full (Pill Button)', class: 'rounded-full', val: '9999px' },
  ];

  return (
    <div className="min-h-[100dvh] bg-canvas text-ink py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-azure bg-azure-soft px-3 py-1.5 rounded-full border border-azure/20 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Beranda</span>
              </Link>
              <span className="text-[10px] font-mono uppercase tracking-wider bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full border border-amber-300">
                Internal Developer Preview
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-navy tracking-tight">
              SMK Al-Muhtadin Design Tokens & Style Guide
            </h1>
            <p className="text-ink-muted text-sm mt-1">
              Katalog visual interaktif untuk variabel CSS (`style-guide.css`) dan utility Tailwind.
            </p>
          </div>
          <div className="px-4 py-2 bg-surface rounded-xl border border-slate-200 shadow-sm text-xs font-mono text-ink-muted">
            Single Source of Truth: <span className="text-navy font-bold">src/styles/style-guide.css</span>
          </div>
        </div>

        {/* 1. PALET WARNA */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-bold text-ink">
            <Palette className="w-5 h-5 text-navy" />
            <h2>1. Palet Warna (Color Tokens)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {colorCategories.map((cat, idx) => (
              <div key={idx} className="bg-surface rounded-2xl p-6 border border-slate-200 shadow-whisper space-y-4">
                <div>
                  <h3 className="font-bold text-navy text-base">{cat.title}</h3>
                  <p className="text-xs text-ink-muted">{cat.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {cat.colors.map((c, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className={`h-16 rounded-xl p-2 font-mono text-[10px] flex flex-col justify-end shadow-sm ${c.tw}`}>
                        <span>{c.hex}</span>
                      </div>
                      <div className="text-[11px] font-medium text-ink truncate" title={c.name}>{c.name}</div>
                      <code className="text-[10px] font-mono text-slate-500 block truncate">{c.var}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. TIPOGRAFI & SKALA */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-bold text-ink">
            <TextT className="w-5 h-5 text-navy" />
            <h2>2. Tipografi & Skala Ukuran Font</h2>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-slate-200 shadow-whisper space-y-6">
            {/* Font Family showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-200">
              <div className="p-4 rounded-xl bg-canvas border border-slate-200">
                <span className="text-xs font-mono text-navy font-bold uppercase tracking-wider block mb-1">
                  Font Sans (Plus Jakarta Sans)
                </span>
                <p className="font-sans text-lg font-bold">
                  Membentuk Generasi Unggul & Berkarakter.
                </p>
                <code className="text-xs font-mono text-slate-500 mt-2 block">var(--font-sans)</code>
              </div>
              <div className="p-4 rounded-xl bg-canvas border border-slate-200">
                <span className="text-xs font-mono text-navy font-bold uppercase tracking-wider block mb-1">
                  Font Mono (JetBrains Mono)
                </span>
                <p className="font-mono text-lg font-bold">
                  NPSN: 20228833 • 1,200+ Siswa
                </p>
                <code className="text-xs font-mono text-slate-500 mt-2 block">var(--font-mono)</code>
              </div>
            </div>

            {/* Scale List */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-ink-muted uppercase tracking-wider">Skala Hirarki Teks</h3>
              <div className="space-y-3">
                {fontScales.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all gap-2">
                    <div className={item.class}>
                      {item.label} — SMK Al-Muhtadin
                    </div>
                    <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-slate-500">
                      <span>{item.size}</span>
                      <code className="bg-slate-100 px-2 py-0.5 rounded text-navy font-bold">{item.code}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. BORDER RADIUS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-bold text-ink">
            <Square className="w-5 h-5 text-navy" />
            <h2>3. Ukuran Sudut Melengkung (Border Radius Tokens)</h2>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-slate-200 shadow-whisper">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {borderRadii.map((r, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-3 rounded-xl bg-canvas border border-slate-200">
                  <div className={`w-16 h-16 bg-navy text-white flex items-center justify-center font-bold text-xs shadow-sm mb-2 ${r.class}`}>
                    {r.label.split(' ')[0]}
                  </div>
                  <span className="text-xs font-semibold text-ink">{r.label}</span>
                  <code className="text-[10px] font-mono text-slate-500 mt-0.5">{r.val}</code>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PRATINJAU KOMPONEN NYATA */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-bold text-ink">
            <Stack className="w-5 h-5 text-navy" />
            <h2>4. Pratinjau Komponen Nyata Menggunakan Token</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bento Card Demo */}
            <div className="bg-surface rounded-2xl p-6 border border-slate-200 shadow-whisper space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-gold-soft text-slate-900 border border-gold/30 text-xs font-bold font-mono">
                  TERAKREDITASI A
                </span>
                <span className="font-mono text-xs text-ink-muted">12 SEP 2026</span>
              </div>
              <h3 className="text-xl font-bold text-navy">
                Bento Card dengan Utility Tailwind & CSS Vars
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Kartu ini dibentuk menggunakan `bg-surface`, `border-slate-200`, `rounded-2xl`, dan `shadow-whisper`.
              </p>
              <div className="flex gap-3 pt-2">
                <button className="px-5 py-2.5 rounded-full bg-navy hover:bg-navy-light text-white font-semibold text-xs shadow-md transition-all">
                  Tombol Utama
                </button>
                <button className="px-5 py-2.5 rounded-full bg-azure-soft text-navy hover:bg-azure/20 font-semibold text-xs transition-all">
                  Tombol Sekunder
                </button>
              </div>
            </div>

            {/* Badge & Pill Collection */}
            <div className="bg-surface rounded-2xl p-6 border border-slate-200 shadow-whisper space-y-4">
              <h3 className="text-lg font-bold text-navy">Koleksi Badge & Pill</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-navy text-white text-xs font-semibold">Navy Badge</span>
                <span className="px-3 py-1 rounded-full bg-azure text-white text-xs font-semibold">Azure Badge</span>
                <span className="px-3 py-1 rounded-full bg-gold text-slate-950 text-xs font-bold">Gold Badge</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold">Status Success</span>
              </div>
              <div className="p-4 rounded-xl bg-midnight text-white space-y-2">
                <div className="text-xs font-mono text-azure-light uppercase tracking-wider">Midnight Footer Surface</div>
                <p className="text-xs text-slate-300">
                  Menggunakan token `--color-midnight` (`#0A1931`) untuk bagian footer dan kontras tinggi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
