import React, { useState, useEffect } from 'react';
import { 
  Check, 
  PencilSimple, 
  GraduationCap, 
  X, 
  Cpu, 
  FilmSlate, 
  CookingPot, 
  Briefcase,
  Plus,
  Trash,
  Buildings
} from '@phosphor-icons/react';
import { Major } from '../../../types';
import { contentServices } from '../../../services/contentServices';
import { ConfirmDialog } from '../../../components/admin/ConfirmDialog';
import { ImageUploadField } from '../../../components/admin/ImageUploadField';

export const MajorsManager: React.FC = () => {
  const [majors, setMajors] = useState<Major[]>(() => contentServices.getMajors());
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string>('');
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [headName, setHeadName] = useState('');
  const [headTitle, setHeadTitle] = useState('');
  const [headPhoto, setHeadPhoto] = useState('');
  const [studentsCount, setStudentsCount] = useState(0);
  const [labCount, setLabCount] = useState(0);
  const [employmentRate, setEmploymentRate] = useState('');
  const [competenciesText, setCompetenciesText] = useState('');
  const [careerProspectsText, setCareerProspectsText] = useState('');
  const [logo, setLogo] = useState('');
  const [industryPartners, setIndustryPartners] = useState<{ name: string; logoUrl?: string }[]>([]);
  const [newPartnerName, setNewPartnerName] = useState('');

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleAddPartner = () => {
    const trimmed = newPartnerName.trim();
    if (!trimmed) return;
    if (industryPartners.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`Mitra "${trimmed}" sudah ada di dalam daftar.`);
      return;
    }
    setIndustryPartners([...industryPartners, { name: trimmed }]);
    setNewPartnerName('');
  };

  const handleRemovePartner = (indexToRemove: number) => {
    setIndustryPartners(industryPartners.filter((_, idx) => idx !== indexToRemove));
  };

  const renderMajorIcon = (abbr: string) => {
    switch (abbr?.toUpperCase()) {
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

  const handleOpenCreate = () => {
    setEditingMajor(null);
    setName('');
    setAbbreviation('');
    setShortDescription('');
    setHeadName('');
    setHeadTitle('Ketua Program Keahlian');
    setHeadPhoto('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300');
    setStudentsCount(100);
    setLabCount(2);
    setEmploymentRate('90% Terserap');
    setCompetenciesText('Kompetensi Dasar 1\nKompetensi Dasar 2\nKompetensi Dasar 3');
    setCareerProspectsText('Profesi & Karir 1\nProfesi & Karir 2\nTeknisi / Praktisi');
    setIndustryPartners([
      { name: 'PT Telkom Indonesia' },
      { name: 'PT Astra International' }
    ]);
    setLogo('');
    setNewPartnerName('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (major: Major) => {
    setEditingMajor(major);
    setName(major.name);
    setAbbreviation(major.abbreviation);
    setShortDescription(major.shortDescription);
    setHeadName(major.headOfProgram?.name || '');
    setHeadTitle(major.headOfProgram?.title || 'Ketua Program Keahlian');
    setHeadPhoto(major.headOfProgram?.photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300');
    setStudentsCount(major.stats?.studentsCount || 0);
    setLabCount(major.stats?.labCount || 0);
    setEmploymentRate(major.stats?.employmentRate || '85% Terserap');
    setCompetenciesText((major.competencies || []).join('\n'));
    setCareerProspectsText((major.careerProspects || []).join('\n'));
    setIndustryPartners(major.industryPartners && major.industryPartners.length > 0 ? [...major.industryPartners] : []);
    setLogo(major.logo || '');
    setNewPartnerName('');
    setIsModalOpen(true);
  };

  const handleDelete = (id: number, majorName: string) => {
    setDeleteTarget({ id, name: majorName });
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      contentServices.deleteMajor(deleteTarget.id);
      setMajors(contentServices.getMajors());
      showToast(`Program Keahlian "${deleteTarget.name}" berhasil dihapus!`);
      setDeleteTarget(null);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const majorPayload: Omit<Major, 'id'> & { id?: number } = {
      ...(editingMajor ? { id: editingMajor.id } : {}),
      name,
      abbreviation,
      slug: editingMajor?.slug || abbreviation.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      shortDescription,
      fullDescription: editingMajor?.fullDescription || shortDescription,
      featuredImage: editingMajor?.featuredImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
      logo: logo || undefined,
      headOfProgram: {
        name: headName,
        title: headTitle,
        photo: headPhoto
      },
      stats: {
        studentsCount: Number(studentsCount),
        labCount: Number(labCount),
        employmentRate
      },
      competencies: competenciesText.split('\n').map((s) => s.trim()).filter(Boolean),
      careerProspects: careerProspectsText.split('\n').map((s) => s.trim()).filter(Boolean),
      industryPartners: industryPartners.map((p) => ({ ...p, name: p.name.trim() })).filter((p) => p.name.length > 0)
    };

    contentServices.saveMajor(majorPayload);
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

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Hapus Program Keahlian?"
        message={`Apakah Anda yakin ingin menghapus program keahlian "${deleteTarget?.name}"? Tindakan ini akan menghapus jurusan dari daftar publik.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
            <GraduationCap size={22} weight="duotone" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink">Program Keahlian (Kurikulum Merdeka)</h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Kelola kompetensi kejuruan, profil kepala program, dan metrik keterserapan industri.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-slate-100 font-mono text-xs font-bold text-navy shrink-0">
            {majors.length} Jurusan Aktif
          </span>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-2xl bg-navy hover:bg-navy-light text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus size={16} weight="bold" />
            <span>Tambah Jurusan</span>
          </button>
        </div>
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
                  <div className="w-12 h-12 rounded-2xl bg-azure-soft flex items-center justify-center overflow-hidden border border-slate-100 shrink-0">
                    {major.logo ? (
                      <img src={major.logo} alt={major.name} className="w-full h-full object-contain p-1" />
                    ) : (
                      renderMajorIcon(major.abbreviation)
                    )}
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

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(major)}
                    className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                    title="Ubah Data Program"
                  >
                    <PencilSimple size={18} weight="duotone" />
                  </button>
                  <button
                    onClick={() => handleDelete(major.id, major.name)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Hapus Program"
                  >
                    <Trash size={18} weight="duotone" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-ink-muted line-clamp-3 leading-relaxed">
                {major.shortDescription}
              </p>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center font-mono">
                <div>
                  <span className="text-[10px] text-ink-muted uppercase block">Siswa</span>
                  <span className="text-sm font-bold text-navy">{major.stats?.studentsCount ?? 0}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted uppercase block">Lab</span>
                  <span className="text-sm font-bold text-navy">{major.stats?.labCount ?? 0}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted uppercase block">Keterserapan</span>
                  <span className="text-xs font-bold text-emerald-600 truncate block">
                    {major.stats?.employmentRate?.split(' ')[0] ?? '-'}
                  </span>
                </div>
              </div>

              {/* Kaprodi info */}
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={major.headOfProgram?.photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'}
                  alt={major.headOfProgram?.name || 'Kaprodi'}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div className="text-xs">
                  <p className="font-bold text-ink">{major.headOfProgram?.name || 'Belum Ditentukan'}</p>
                  <p className="text-[10px] text-ink-muted">{major.headOfProgram?.title || 'Kepala Program'}</p>
                </div>
              </div>
            </div>

            {/* Bottom edit trigger */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-ink-muted">
                {major.competencies?.length ?? 0} Kompetensi Dasar
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

      {/* Create / Edit Major Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy/70 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-elevated border border-slate-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6 pb-4 shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-azure-soft text-navy flex items-center justify-center">
                  <GraduationCap size={22} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">
                    {editingMajor ? 'Ubah Data Program Keahlian' : 'Tambah Program Keahlian Baru'}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {editingMajor ? editingMajor.name : 'Tambahkan jurusan baru ke dalam sistem dan halaman publik'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 overscroll-contain">
                <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-ink mb-1">Singkatan</label>
                  <input
                    type="text"
                    value={abbreviation}
                    onChange={(e) => setAbbreviation(e.target.value)}
                    required
                    placeholder="Contoh: TJKT"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-ink mb-1">Nama Lengkap Jurusan</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Contoh: Teknik Jaringan Komputer dan Telekomunikasi"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  required
                  placeholder="Ringkasan profil kompetensi dan tujuan kejuruan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-azure/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Nama Kepala Program (Kaprodi)</label>
                  <input
                    type="text"
                    value={headName}
                    onChange={(e) => setHeadName(e.target.value)}
                    required
                    placeholder="Nama Kaprodi lengkap dengan gelar"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Jabatan Kaprodi</label>
                  <input
                    type="text"
                    value={headTitle}
                    onChange={(e) => setHeadTitle(e.target.value)}
                    placeholder="Contoh: Ka. Kompetensi Keahlian TJKT"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Logo / Lambang Resmi Program Keahlian"
                value={logo}
                onChange={setLogo}
                recommendedDimensions="400 x 400 px"
                aspectRatioHint="1:1 Square"
                helperText="Logo resmi jurusan (disarankan format WebP / PNG transparan dengan rasio 1:1)."
              />

              <ImageUploadField
                label="Foto Kaprodi (Kepala Program Keahlian)"
                value={headPhoto}
                onChange={setHeadPhoto}
                recommendedDimensions="400 x 400 px"
                aspectRatioHint="1:1 Square"
                helperText="Foto formal Kepala Program Keahlian jurusan ini."
              />

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Jumlah Siswa</label>
                  <input
                    type="number"
                    value={studentsCount}
                    onChange={(e) => setStudentsCount(Number(e.target.value))}
                    min={0}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Jumlah Laboratorium</label>
                  <input
                    type="number"
                    value={labCount}
                    onChange={(e) => setLabCount(Number(e.target.value))}
                    min={0}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Tingkat Serapan</label>
                  <input
                    type="text"
                    value={employmentRate}
                    onChange={(e) => setEmploymentRate(e.target.value)}
                    placeholder="90% Terserap Kerja"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-azure/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Kompetensi Utama (Satu per baris)
                </label>
                <textarea
                  rows={3}
                  value={competenciesText}
                  onChange={(e) => setCompetenciesText(e.target.value)}
                  placeholder="Instalasi Jaringan Fiber Optik&#10;Administrasi Server Linux&#10;Cloud Computing"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-sans text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-azure/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Prospek Karir & Profesi (Satu per baris)
                </label>
                <textarea
                  rows={3}
                  value={careerProspectsText}
                  onChange={(e) => setCareerProspectsText(e.target.value)}
                  placeholder="Network Engineer&#10;System Administrator&#10;Cloud Specialist"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-sans text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-azure/20"
                />
              </div>

              {/* Industry Partners (DUDI) */}
              <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-ink flex items-center gap-1.5">
                    <Buildings size={16} className="text-azure" weight="duotone" />
                    <span>Mitra Industri & Tempat PKL ({industryPartners.length})</span>
                  </label>
                  <span className="text-[11px] font-mono text-ink-muted">Tekan Enter atau klik Tambah</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPartnerName}
                    onChange={(e) => setNewPartnerName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddPartner();
                      }
                    }}
                    placeholder="Contoh: PT Telkom Indonesia, PT Astra Honda Motor..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure"
                  />
                  <button
                    type="button"
                    onClick={handleAddPartner}
                    className="px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
                  >
                    <Plus size={14} weight="bold" />
                    <span>Tambah</span>
                  </button>
                </div>

                {/* Tag Pills List */}
                {industryPartners.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {industryPartners.map((partner, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-ink shadow-2xs group hover:border-azure/40 transition-colors"
                      >
                        <span>{partner.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePartner(pIdx)}
                          className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Hapus mitra"
                        >
                          <X size={12} weight="bold" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-ink-muted italic">
                    Belum ada mitra industri ditambahkan. Ketik nama perusahaan di atas untuk menambahkan.
                  </p>
                )}
              </div>

              </div>

              {/* Pinned Footer */}
              <div className="p-4 sm:p-5 flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-ink-muted hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  {editingMajor ? 'Simpan Perubahan' : 'Tambah Jurusan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
