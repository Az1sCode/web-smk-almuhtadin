import React, { useState, useRef, useMemo } from 'react';
import { 
  TextB, 
  TextItalic, 
  TextHTwo, 
  TextHThree, 
  ListBullets, 
  ListNumbers, 
  Quotes, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Code, 
  Minus, 
  Eye, 
  PencilSimple,
  Info
} from '@phosphor-icons/react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  label?: string;
  required?: boolean;
  helperText?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = 'Tulis konten berita atau pengumuman di sini menggunakan format Markdown...',
  minHeight = '320px',
  label = 'Isi Konten Berita (Markdown)',
  required = false,
  helperText = 'Gunakan tombol toolbar untuk memformat teks dengan cepat tanpa perlu tag HTML manual.'
}) => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Synchronously parse and sanitize markdown to HTML for preview
  const renderedHtml = useMemo(() => {
    if (!value.trim()) return '';
    try {
      const raw = marked.parse(value, { async: false }) as string;
      return DOMPurify.sanitize(raw);
    } catch {
      return DOMPurify.sanitize(value);
    }
  }, [value]);

  const insertFormat = (prefix: string, suffix: string = '', defaultPlaceholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultPlaceholder;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length;
      textarea.setSelectionRange(
        selectedText ? newCursorPos : start + prefix.length,
        selectedText ? newCursorPos : start + prefix.length + defaultPlaceholder.length
      );
    }, 0);
  };

  const wordCount = useMemo(() => {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [value]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="text-xs font-bold text-ink flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-rose-500">*</span>}
        </label>

        {/* View Mode Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'write'
                ? 'bg-white text-navy shadow-xs font-bold'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <PencilSimple size={14} weight="bold" />
            <span>Tulis</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-white text-navy shadow-xs font-bold'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Eye size={14} weight="bold" />
            <span>Pratinjau</span>
          </button>
        </div>
      </div>

      {/* Editor Box */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs focus-within:border-azure focus-within:ring-2 focus-within:ring-azure/20 transition-all">
        {/* Formatting Toolbar */}
        <div className="flex items-center flex-wrap gap-1 p-2 bg-slate-50 border-b border-slate-200/80 text-ink-muted">
          <button
            type="button"
            onClick={() => insertFormat('**', '**', 'teks tebal')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy hover:shadow-2xs transition-all cursor-pointer"
            title="Tebal (Bold) - **teks**"
          >
            <TextB size={16} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('*', '*', 'teks miring')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy hover:shadow-2xs transition-all cursor-pointer"
            title="Miring (Italic) - *teks*"
          >
            <TextItalic size={16} weight="bold" />
          </button>

          <span className="w-px h-4 bg-slate-200 mx-1" />

          <button
            type="button"
            onClick={() => insertFormat('\n## ', '', 'Judul Bagian')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy hover:shadow-2xs transition-all cursor-pointer"
            title="Heading 2 - ## Judul"
          >
            <TextHTwo size={16} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('\n### ', '', 'Subjudul')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy hover:shadow-2xs transition-all cursor-pointer"
            title="Heading 3 - ### Subjudul"
          >
            <TextHThree size={16} weight="bold" />
          </button>

          <span className="w-px h-4 bg-slate-200 mx-1" />

          <button
            type="button"
            onClick={() => insertFormat('\n- ', '', 'Poin daftar')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy hover:shadow-2xs transition-all cursor-pointer"
            title="Daftar Poin (Bullet List)"
          >
            <ListBullets size={16} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('\n1. ', '', 'Langkah pertama')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy hover:shadow-2xs transition-all cursor-pointer"
            title="Daftar Nomor (Numbered List)"
          >
            <ListNumbers size={16} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('\n> ', '', 'Kutipan penting...')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy hover:shadow-2xs transition-all cursor-pointer"
            title="Kutipan (Blockquote)"
          >
            <Quotes size={16} weight="bold" />
          </button>

          <span className="w-px h-4 bg-slate-200 mx-1" />

          <button
            type="button"
            onClick={() => insertFormat('[', '](https://example.com)', 'Nama Link')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy hover:shadow-2xs transition-all cursor-pointer"
            title="Tautan (Hyperlink)"
          >
            <LinkIcon size={16} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('![Deskripsi foto](', ')', 'https://images.unsplash.com/...')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy hover:shadow-2xs transition-all cursor-pointer"
            title="Sisipkan Gambar"
          >
            <ImageIcon size={16} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('`', '`', 'kode')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy hover:shadow-2xs transition-all cursor-pointer"
            title="Kode / Text Monospace"
          >
            <Code size={16} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('\n---\n', '', '')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy hover:shadow-2xs transition-all cursor-pointer"
            title="Garis Pembatas (Horizontal Rule)"
          >
            <Minus size={16} weight="bold" />
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'write' ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ minHeight }}
            className="w-full p-4 text-xs sm:text-sm text-ink font-sans leading-relaxed focus:outline-none resize-y bg-white"
          />
        ) : (
          <div
            style={{ minHeight }}
            className="p-5 overflow-y-auto max-h-[450px] bg-slate-50/50"
          >
            {renderedHtml ? (
              <div 
                className="prose prose-slate prose-sm sm:prose max-w-none text-ink leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center text-ink-muted">
                <Info size={24} className="mb-2 text-slate-300" />
                <p className="text-xs font-medium">Belum ada konten untuk dipratinjau.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Beralih ke tab "Tulis" untuk mulai menyusun teks berita.</p>
              </div>
            )}
          </div>
        )}

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 border-t border-slate-100 text-[11px] font-mono text-ink-muted">
          <span>Mode: Markdown Bebas HTML</span>
          <div className="flex items-center gap-3">
            <span>{wordCount} Kata</span>
            <span>•</span>
            <span>{value.length} Karakter</span>
          </div>
        </div>
      </div>

      {helperText && (
        <p className="text-[11px] text-ink-muted">{helperText}</p>
      )}
    </div>
  );
};
