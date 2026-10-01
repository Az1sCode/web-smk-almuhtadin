import React, { useRef, useState } from 'react';
import { UploadSimple, Image as ImageIcon, Trash, ArrowsClockwise, WarningCircle } from '@phosphor-icons/react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  recommendedDimensions: string;
  maxSizeMB?: number;
  aspectRatioHint?: string;
  required?: boolean;
  helperText?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  recommendedDimensions,
  maxSizeMB = 5,
  aspectRatioHint,
  required = false,
  helperText
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const processFile = (file: File) => {
    setErrorMessage(null);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Format berkas harus berupa gambar (JPG, PNG, WebP).');
      return;
    }

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMessage(`Ukuran berkas melebihi batas maksimum ${maxSizeMB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Gagal membaca file gambar.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between flex-wrap gap-1">
        <label className="text-xs font-bold text-ink">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono font-medium text-slate-600 border border-slate-200">
          📐 {recommendedDimensions}
          {aspectRatioHint && ` (${aspectRatioHint})`}
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 transition-all hover:border-azure">
          <div className="relative aspect-video max-h-56 w-full flex items-center justify-center bg-slate-900/5">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0 text-xs text-ink-muted">
              <ImageIcon size={16} className="text-azure shrink-0" />
              <span className="truncate">Gambar berhasil diunggah</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-ink-muted hover:text-azure hover:bg-azure-soft transition-colors flex items-center gap-1.5"
              >
                <ArrowsClockwise size={14} /> Ganti
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-2.5 py-1.5 rounded-lg border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1.5"
              >
                <Trash size={14} /> Hapus
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all flex flex-col items-center justify-center gap-3 ${
            isDragging
              ? 'border-azure bg-azure-soft/40 scale-[1.01]'
              : 'border-slate-300 hover:border-azure hover:bg-slate-50/80 bg-white shadow-2xs'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-azure-soft text-azure flex items-center justify-center shadow-xs">
            <UploadSimple size={24} weight="bold" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-ink">
              Klik untuk memilih berkas foto atau seret ke sini
            </p>
            <p className="text-[11px] text-ink-muted">
              Format WebP, JPG, atau PNG (Maksimal {maxSizeMB}MB)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
              📐 Ukuran ideal: {recommendedDimensions}
            </span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-1">
          <WarningCircle size={14} weight="fill" className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {helperText && !errorMessage && (
        <p className="text-[11px] text-ink-muted mt-1">{helperText}</p>
      )}
    </div>
  );
};
