import React, { useState } from 'react';
import { 
  Check, 
  FloppyDisk, 
  Plus, 
  Trash, 
  Compass, 
  ListNumbers, 
  Star,
  Info
} from '@phosphor-icons/react';
import { SchoolVisionMissionData, MissionItem, CoreValueItem } from '../../../types';
import { contentServices } from '../../../services/contentServices';

export const VisionMissionManager: React.FC = () => {
  const [data, setData] = useState<SchoolVisionMissionData>(() => contentServices.getVisionMission());
  const [notification, setNotification] = useState<string>('');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    contentServices.updateVisionMission(data);
    showToast('Data Visi, Misi, dan Core Values berhasil disimpan!');
  };

  // Mission handlers
  const handleMissionChange = (index: number, field: keyof MissionItem, value: string) => {
    const updatedMissions = [...data.missions];
    updatedMissions[index] = {
      ...updatedMissions[index],
      [field]: value
    };
    setData({ ...data, missions: updatedMissions });
  };

  const handleAddMission = () => {
    const nextNum = (data.missions.length + 1).toString().padStart(2, '0');
    const newMission: MissionItem = {
      number: nextNum,
      title: 'Judul Pilar Misi Baru',
      description: 'Deskripsi rencana aksi dan implementasi misi sekolah...'
    };
    setData({ ...data, missions: [...data.missions, newMission] });
  };

  const handleDeleteMission = (index: number) => {
    if (data.missions.length <= 1) {
      alert('Minimal harus ada 1 butir misi.');
      return;
    }
    const updated = data.missions.filter((_, idx) => idx !== index);
    setData({ ...data, missions: updated });
  };

  // Core Value handlers
  const handleCoreValueChange = (index: number, field: keyof CoreValueItem, value: string) => {
    const updatedValues = [...data.coreValues];
    updatedValues[index] = {
      ...updatedValues[index],
      [field]: value
    };
    setData({ ...data, coreValues: updatedValues });
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
            <h2 className="text-lg font-bold text-ink">Manajemen Visi, Misi & Budaya Sekolah</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-azure-soft text-navy font-mono text-[10px] font-bold">
              {data.missions.length} Misi &bull; {data.coreValues.length} Nilai
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            Data ini ditampilkan pada section Visi-Misi di Beranda dan halaman mandiri <code className="bg-slate-100 px-1 py-0.5 rounded text-navy">/visi-misi</code>.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <FloppyDisk size={16} weight="bold" />
          <span>Simpan Seluruh Perubahan</span>
        </button>
      </div>

      {/* Section 1: VISI SEKOLAH */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
            <Compass size={20} weight="duotone" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink">Visi Institusi</h3>
            <p className="text-xs text-ink-muted">Pernyataan visi utama dan penjabaran makna filosofis.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink mb-1.5 font-sans">
              Pernyataan Visi Utama
            </label>
            <textarea
              rows={3}
              value={data.vision}
              onChange={(e) => setData({ ...data, vision: e.target.value })}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure text-ink"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1.5 font-sans">
              Penjelasan & Makna Visi (Narasi Pendukung)
            </label>
            <textarea
              rows={4}
              value={data.visionExplanation}
              onChange={(e) => setData({ ...data, visionExplanation: e.target.value })}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure text-ink leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Section 2: MISI SEKOLAH */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
              <ListNumbers size={20} weight="duotone" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Butir-Butir Misi Strategis</h3>
              <p className="text-xs text-ink-muted">Pilar langkah operasional pencapaian visi sekolah.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddMission}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy font-bold text-xs transition-all"
          >
            <Plus size={14} weight="bold" />
            <span>Tambah Misi</span>
          </button>
        </div>

        <div className="space-y-3">
          {data.missions.map((mission, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row gap-4 items-start"
            >
              <div className="w-12 h-10 rounded-xl bg-white border border-slate-200 font-mono font-bold text-xs text-navy flex items-center justify-center shrink-0">
                {mission.number}
              </div>

              <div className="flex-1 w-full space-y-2">
                <input
                  type="text"
                  value={mission.title}
                  onChange={(e) => handleMissionChange(idx, 'title', e.target.value)}
                  placeholder="Judul Pilar Misi"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-ink focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                />
                <textarea
                  rows={2}
                  value={mission.description}
                  onChange={(e) => handleMissionChange(idx, 'description', e.target.value)}
                  placeholder="Uraian penjelasan misi..."
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                />
              </div>

              <button
                type="button"
                onClick={() => handleDeleteMission(idx)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0 self-end sm:self-start"
                title="Hapus butir misi"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: CORE VALUES */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold-hover flex items-center justify-center">
            <Star size={20} weight="duotone" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink">Nilai Karakter Inti (Core Values)</h3>
            <p className="text-xs text-ink-muted">Budaya kerja dan integritas yang ditanamkan pada seluruh civitas.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.coreValues.map((val, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 hover:border-azure/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-ink-muted uppercase font-semibold">
                  Nilai #{idx + 1}
                </span>
                <span className="text-xs font-mono text-navy font-bold bg-azure-soft px-2 py-0.5 rounded">
                  {val.iconName}
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Nama Nilai
                </label>
                <input
                  type="text"
                  value={val.title}
                  onChange={(e) => handleCoreValueChange(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-ink"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Deskripsi Nilai
                </label>
                <textarea
                  rows={2}
                  value={val.desc}
                  onChange={(e) => handleCoreValueChange(idx, 'desc', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-ink"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
