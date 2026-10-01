import React, { useState } from 'react';
import { 
  Check, 
  FloppyDisk, 
  UserCircle, 
  WhatsappLogo, 
  InstagramLogo, 
  YoutubeLogo, 
  FacebookLogo, 
  TiktokLogo, 
  Buildings
} from '@phosphor-icons/react';
import { SchoolSettings } from '../../../types';
import { contentServices } from '../../../services/contentServices';

export const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<SchoolSettings>(() => contentServices.getSchoolSettings());
  const [notification, setNotification] = useState('');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    contentServices.updateSchoolSettings(settings);
    showToast('Pengaturan identitas sekolah berhasil disimpan!');
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
            <h2 className="text-lg font-bold text-ink">Pengaturan Identitas & Kontak Sekolah</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-azure-soft text-navy font-mono text-[10px] font-bold">
              Konfigurasi Global
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            Data ini sinkron ke Navbar, Footer, Sambutan Kepala Sekolah Beranda, dan widget WhatsApp PPDB.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <FloppyDisk size={16} weight="bold" />
          <span>Simpan Semua Pengaturan</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Identitas Lembaga */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
              <Buildings size={20} weight="duotone" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Identitas Satuan Pendidikan</h3>
              <p className="text-xs text-ink-muted">Data legalitas resmi sekolah.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Nama Resmi Sekolah</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">Motto / Tagline Sekolah</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">Nomor Pokok Sekolah Nasional (NPSN)</label>
              <input
                type="text"
                value={settings.npsn}
                onChange={(e) => setSettings({ ...settings, npsn: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">Status Akreditasi</label>
              <input
                type="text"
                value={settings.accreditation}
                onChange={(e) => setSettings({ ...settings, accreditation: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-ink font-semibold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-ink mb-1">Alamat Kampus</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">Nomor Telepon Kantor</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">Email Resmi Sekolah</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Sambutan Kepala Sekolah */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
              <UserCircle size={20} weight="duotone" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Sambutan & Profil Kepala Sekolah</h3>
              <p className="text-xs text-ink-muted">Tampil di Section 3 Beranda dan Halaman Profil.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Nama Kepala Sekolah & Gelar</label>
              <input
                type="text"
                value={settings.principal.name}
                onChange={(e) => setSettings({
                  ...settings,
                  principal: { ...settings.principal, name: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">Sebutan Jabatan</label>
              <input
                type="text"
                value={settings.principal.title}
                onChange={(e) => setSettings({
                  ...settings,
                  principal: { ...settings.principal, title: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-ink"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-ink mb-1">URL Foto Resmi Kepala Sekolah</label>
              <input
                type="url"
                value={settings.principal.photo}
                onChange={(e) => setSettings({
                  ...settings,
                  principal: { ...settings.principal, photo: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-ink mb-1">Kutipan Sambutan (Quote Utama)</label>
              <textarea
                rows={3}
                value={settings.principal.quote}
                onChange={(e) => setSettings({
                  ...settings,
                  principal: { ...settings.principal, quote: e.target.value }
                })}
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs text-ink leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 3: WhatsApp PPDB & Sosmed */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <WhatsappLogo size={20} weight="duotone" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Kontak WhatsApp PPDB & Media Sosial</h3>
              <p className="text-xs text-ink-muted">Tautan komunikasi langsung bagi calon siswa dan orang tua.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Nomor WhatsApp CS PPDB</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">URL Direct Chat WhatsApp (wa.me)</label>
              <input
                type="url"
                value={settings.whatsappUrl}
                onChange={(e) => setSettings({ ...settings, whatsappUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">URL Akun Instagram</label>
              <input
                type="url"
                value={settings.socialMedia.instagram}
                onChange={(e) => setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, instagram: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">URL Kanal YouTube</label>
              <input
                type="url"
                value={settings.socialMedia.youtube}
                onChange={(e) => setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, youtube: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">URL Halaman Facebook</label>
              <input
                type="url"
                value={settings.socialMedia.facebook}
                onChange={(e) => setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, facebook: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">URL Akun TikTok</label>
              <input
                type="url"
                value={settings.socialMedia.tiktok}
                onChange={(e) => setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, tiktok: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono text-ink"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-md"
          >
            Simpan Seluruh Pengaturan
          </button>
        </div>
      </form>
    </div>
  );
};
