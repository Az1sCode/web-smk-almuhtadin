import React, { useState } from 'react';
import { 
  Check, 
  PencilSimple, 
  GraduationCap, 
  X, 
  Cpu, 
  FilmSlate, 
  CookingPot, 
  Briefcase
} from '@phosphor-icons/react';
import { Major } from '../../../types';
import { contentServices } from '../../../services/contentServices';

export const MajorsManager: React.FC = () => {
  const [majors, setMajors] = useState<Major[]>(() => contentServices.getMajors());
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string>('');

  // Form states
  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [headName, setHeadName] = useState('');
  const [headTitle, setHeadTitle] = useState('');
  const [studentsCount, setStudentsCount] = useState(0);
  const [labCount, setLabCount] = useState(0);
  const [employmentRate, setEmploymentRate] = useState('');
  const [competenciesText, setCompetenciesText] = useState('');
  const [careerProspectsText, setCareerProspectsText] = useState('');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const renderMajorIcon = (abbr: string) => {
    switch (abbr.toUpperCase()) {
      case 'TJKT':
        return <Cpu size={24} weight="duotone" className="text-azure" />;
      case 'MPLB':
        return <Briefcase size={24} weight="duotone" className="text-azure" />;
      case 'ANIMASI':
        return <FilmSlate size={24} weight="duotone" className="text-azure" />;
      case 'KULINER':
        return <CookingPot size={24} weight="duotone" className="text-azure" />;
      default:
        return <GraduationCap size={24} weight="duotone" className="text-azure" />;
    }
  };

  const handleOpenEdit = (major: Major) => {
    setEditingMajor(major);
    setName(major.name);
    setAbbreviation(major.abbreviation);
    setShortDescription(major.shortDescription);
    setHeadName(major.headOfProgram.name);
    setHeadTitle(major.headOfProgram.title);
    setStudentsCount(major.stats.studentsCount);
    setLabCount(major.stats.labCount);
    setEmploymentRate(major.stats.employmentRate);
    setCompetenciesText(major.competencies.join('\n'));
    setCareerProspectsText(major.careerProspects.join('\n'));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMajor) return;

    const updated: Major = {
      ...editingMajor,
      name,
      abbreviation,
      shortDescription,
      headOfProgram: {
        ...editingMajor.headOfProgram,
        name: headName,
        title: headTitle
      },
      stats: {
        studentsCount: Number(studentsCount),
        labCount: Number(labCount),
        employmentRate
      },
      competencies: competenciesText.split('\n').map((s) => s.trim()).filter(Boolean),
      careerProspects: careerProspectsText.split('\n').map((s) => s.trim()).filter(Boolean)
    };

    contentServices.updateMajor(updated);
    setMajors(contentServices.getMajors());
    setIsModalOpen(false);
    showToast(`Data Program Keahlian "${abbreviation}" berhasil disimpan!`);
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
            <GraduationCap size={22} weight="duotone" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink">4 Program Keahlian (Kurikulum Merdeka)</h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Kelola kompetensi kejuruan, profil kepala program, dan metrik keterserapan industri.
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-slate-100 font-mono text-xs font-bold text-navy shrink-0">
          4 Jurusan Aktif
        </span>
      </div>

      {/* Majors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {majors.map((major) => (
          <div
            key={major.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-5 hover:border-azure/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header card */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-azure-soft flex items-center justify-center">
                    {renderMajorIcon(major.abbreviation)}
                  </div>
                  <div>
                    <span className="font-mono text-xs font-extrabold text-navy px-2 py-0.5 rounded bg-slate-100">
                      {major.abbreviation}
                    </span>
                    <h3 className="text-base font-bold text-ink mt-1">
                      {major.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenEdit(major)}
                  className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                  title="Ubah Data Program"
                >
                  <PencilSimple size={18} weight="duotone" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-ink-muted line-clamp-3 leading-relaxed">
                {major.shortDescription}
              </p>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center font-mono">
                <div>
                  <span className="text-[10px] text-ink-muted uppercase block">Siswa</span>
                  <span className="text-sm font-bold text-navy">{major.stats.studentsCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted uppercase block">Lab</span>
                  <span className="text-sm font-bold text-navy">{major.stats.labCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted uppercase block">Keterserapan</span>
                  <span className="text-xs font-bold text-emerald-600 truncate block">
                    {major.stats.employmentRate.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Kaprodi info */}
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={major.headOfProgram.photo}
                  alt={major.headOfProgram.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div className="text-xs">
                  <p className="font-bold text-ink">{major.headOfProgram.name}</p>
                  <p className="text-[10px] text-ink-muted">{major.headOfProgram.title}</p>
                </div>
              </div>
            </div>

            {/* Bottom edit trigger */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-ink-muted">
                {major.competencies.length} Kompetensi Dasar
              </span>
              <button
                onClick={() => handleOpenEdit(major)}
                className="text-xs font-bold text-azure hover:underline"
              >
                Edit Rincian Program &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Major Modal */}
      {isModalOpen && editingMajor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-elevated border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
                  <GraduationCap size={22} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">Ubah Data Jurusan</h3>
                  <p className="text-xs text-ink-muted">{editingMajor.name}</p>
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
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-ink mb-1">Singkatan</label>
                  <input
                    type="text"
                    value={abbreviation}
                    onChange={(e) => setAbbreviation(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-ink"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-ink mb-1">Nama Lengkap Jurusan</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Nama Kepala Program (Kaprodi)</label>
                  <input
                    type="text"
                    value={headName}
                    onChange={(e) => setHeadName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Jabatan Kaprodi</label>
                  <input
                    type="text"
                    value={headTitle}
                    onChange={(e) => setHeadTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Jumlah Siswa</label>
                  <input
                    type="number"
                    value={studentsCount}
                    onChange={(e) => setStudentsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Jumlah Laboratorium</label>
                  <input
                    type="number"
                    value={labCount}
                    onChange={(e) => setLabCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Tingkat Serapan</label>
                  <input
                    type="text"
                    value={employmentRate}
                    onChange={(e) => setEmploymentRate(e.target.value)}
                    placeholder="90% Terserap Kerja"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Kompetensi Utama (Satu per baris)
                </label>
                <textarea
                  rows={4}
                  value={competenciesText}
                  onChange={(e) => setCompetenciesText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-sans text-ink leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Prospek Karir & Profesi (Satu per baris)
                </label>
                <textarea
                  rows={4}
                  value={careerProspectsText}
                  onChange={(e) => setCareerProspectsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-sans text-ink leading-relaxed"
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
