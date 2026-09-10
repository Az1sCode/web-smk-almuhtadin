import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Gauge, 
  Newspaper, 
  UsersThree, 
  Trophy, 
  VideoCamera, 
  Image, 
  Gear, 
  SignOut, 
  Plus, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Sparkle,
  Trash,
  PencilSimple
} from '@phosphor-icons/react';
import { 
  newsData, 
  staffData, 
  achievementsData, 
  videosData, 
  galleryImagesData, 
  schoolMetadata 
} from '../data/mockData';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'staff' | 'achievements' | 'videos'>('news');
  const [showAddModal, setShowAddModal] = useState(false);
  const [youtubeInput, setYoutubeInput] = useState('');
  const [videoTitleInput, setVideoTitleInput] = useState('');
  const [extractedId, setExtractedId] = useState('');

  // Auto extract YouTube ID from pasted URL
  const handleYoutubeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setYoutubeInput(val);
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = val.match(regExp);
    if (match && match[2].length === 11) {
      setExtractedId(match[2]);
    } else {
      setExtractedId('');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-canvas flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-bold text-navy hover:text-azure bg-azure-soft px-3 py-1.5 rounded-full border border-azure/20 transition-all"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Kembali ke Website Publik</span>
          </Link>
          <div className="h-4 w-px bg-slate-200" />
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            SMK Al-Muhtadin Admin Cockpit (v2.0)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xs">
            SA
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-ink">Super Administrator</p>
            <p className="text-[10px] text-ink-muted font-mono">admin@smkalmuhtadin.sch.id</p>
          </div>
        </div>
      </header>

      {/* Cockpit Main Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-8">
        {/* Left Sidebar (260px) */}
        <aside className="w-64 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-whisper hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold px-3">
                Manajemen Konten
              </span>
              <nav className="mt-2 space-y-1">
                <button
                  onClick={() => setActiveTab('news')}
                  type="button"
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'news'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-ink-muted hover:bg-slate-100 hover:text-navy'
                  }`}
                >
                  <Newspaper size={18} weight="duotone" />
                  <span>Berita & Pengumuman</span>
                </button>

                <button
                  onClick={() => setActiveTab('staff')}
                  type="button"
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'staff'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-ink-muted hover:bg-slate-100 hover:text-navy'
                  }`}
                >
                  <UsersThree size={18} weight="duotone" />
                  <span>Pengurus & Guru (GTK)</span>
                </button>

                <button
                  onClick={() => setActiveTab('achievements')}
                  type="button"
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'achievements'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-ink-muted hover:bg-slate-100 hover:text-navy'
                  }`}
                >
                  <Trophy size={18} weight="duotone" />
                  <span>Prestasi Sekolah & Siswa</span>
                </button>

                <button
                  onClick={() => setActiveTab('videos')}
                  type="button"
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'videos'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-ink-muted hover:bg-slate-100 hover:text-navy'
                  }`}
                >
                  <VideoCamera size={18} weight="duotone" />
                  <span>Video YouTube</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors"
            >
              <SignOut size={16} />
              <span>Keluar Sesi</span>
            </Link>
          </div>
        </aside>

        {/* Right Cockpit Content */}
        <main className="flex-1 space-y-6">
          {/* KPI Summary Cards Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-whisper">
              <span className="text-[11px] font-mono text-ink-muted uppercase block">Total Berita</span>
              <span className="text-2xl font-extrabold font-mono text-navy mt-1 block">{newsData.length}</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-whisper">
              <span className="text-[11px] font-mono text-ink-muted uppercase block">Pengurus & Guru</span>
              <span className="text-2xl font-extrabold font-mono text-navy mt-1 block">{staffData.length}</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-whisper">
              <span className="text-[11px] font-mono text-ink-muted uppercase block">Prestasi Tercatat</span>
              <span className="text-2xl font-extrabold font-mono text-gold-hover mt-1 block">{achievementsData.length}</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-whisper">
              <span className="text-[11px] font-mono text-ink-muted uppercase block">Video YouTube</span>
              <span className="text-2xl font-extrabold font-mono text-azure mt-1 block">{videosData.length}</span>
            </div>
          </div>

          {/* Module Panel: NEWS */}
          {activeTab === 'news' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-ink">Kelola Berita & Pengumuman</h2>
                  <p className="text-xs text-ink-muted">Publikasikan informasi akademik dan kegiatan sekolah.</p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Plus size={16} weight="bold" />
                  <span>Tambah Berita Baru</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Judul Berita</th>
                      <th className="p-3">Kategori</th>
                      <th className="p-3">Penulis</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Tanggal</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {newsData.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-semibold text-ink line-clamp-1 max-w-xs">{item.title}</td>
                        <td className="p-3 font-mono">{item.category}</td>
                        <td className="p-3 text-ink-muted">{item.author.name}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                            Published
                          </span>
                        </td>
                        <td className="p-3 font-mono text-ink-muted">{item.publishedAt}</td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button className="p-1 text-slate-400 hover:text-navy"><PencilSimple size={16} /></button>
                            <button className="p-1 text-slate-400 hover:text-rose-600"><Trash size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Module Panel: STAFF */}
          {activeTab === 'staff' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-ink">Direktori Guru & Staf (GTK)</h2>
                  <p className="text-xs text-ink-muted">Kelola struktur kepemimpinan dan data dewan guru.</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Plus size={16} weight="bold" />
                  <span>Tambah Guru / Staf</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Nama & Gelar</th>
                      <th className="p-3">Jabatan / Mapel</th>
                      <th className="p-3">Kategori</th>
                      <th className="p-3">NIP / NUPTK</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {staffData.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-semibold text-ink flex items-center gap-2.5">
                          <img src={member.photo} alt={member.name} className="w-7 h-7 rounded-full object-cover" />
                          <span>{member.name}</span>
                        </td>
                        <td className="p-3 text-ink-muted">{member.position}</td>
                        <td className="p-3 font-mono uppercase text-[10px]">{member.category}</td>
                        <td className="p-3 font-mono text-ink-muted">{member.nipNuptk || '-'}</td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button className="p-1 text-slate-400 hover:text-navy"><PencilSimple size={16} /></button>
                            <button className="p-1 text-slate-400 hover:text-rose-600"><Trash size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Module Panel: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-ink">Rekam Prestasi Sekolah & Siswa</h2>
                  <p className="text-xs text-ink-muted">Pencatatan perolehan medali dan apresiasi kompetisi.</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Plus size={16} weight="bold" />
                  <span>Tambah Prestasi</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Prestasi</th>
                      <th className="p-3">Pemenang</th>
                      <th className="p-3">Tingkat</th>
                      <th className="p-3">Tahun</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {achievementsData.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-semibold text-ink max-w-xs truncate">{item.title}</td>
                        <td className="p-3 text-ink-muted">{item.recipientName}</td>
                        <td className="p-3 font-mono uppercase text-[10px]">
                          <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold-hover font-bold">
                            {item.level}
                          </span>
                        </td>
                        <td className="p-3 font-mono">{item.year}</td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button className="p-1 text-slate-400 hover:text-navy"><PencilSimple size={16} /></button>
                            <button className="p-1 text-slate-400 hover:text-rose-600"><Trash size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Module Panel: VIDEOS (YouTube Integration) */}
          {activeTab === 'videos' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-ink">Galeri Video YouTube Resmi</h2>
                  <p className="text-xs text-ink-muted">Cukup tempel link YouTube, thumbnail dan ID video diekstrak otomatis.</p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Plus size={16} weight="bold" />
                  <span>Tambah Tautan Video</span>
                </button>
              </div>

              {/* Quick Add Video YouTube Simulation */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-navy">
                  Uji Integrasi Parser YouTube Cepat:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-ink-muted block mb-1">
                      URL Video YouTube:
                    </label>
                    <input
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=ScMzIvxBSi4"
                      value={youtubeInput}
                      onChange={handleYoutubeChange}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-azure/20"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-ink-muted block mb-1">
                      Judul Kegiatan:
                    </label>
                    <input
                      type="text"
                      placeholder="Judul dokumentasi video..."
                      value={videoTitleInput}
                      onChange={(e) => setVideoTitleInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-azure/20"
                    />
                  </div>
                </div>

                {extractedId && (
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <img
                      src={`https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`}
                      alt="Thumbnail Preview"
                      className="w-20 aspect-video rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle size={16} weight="fill" className="text-emerald-600" />
                        Video ID Terdeteksi: <code className="bg-emerald-100 px-1.5 py-0.5 rounded font-mono text-emerald-900">{extractedId}</code>
                      </p>
                      <p className="text-[11px] text-emerald-600">Thumbnail otomatis diambil dari CDN resmi YouTube tanpa membebani disk VPS.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Videos Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Thumbnail</th>
                      <th className="p-3">Judul Video</th>
                      <th className="p-3">YouTube ID</th>
                      <th className="p-3">Durasi</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {videosData.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3">
                          <img
                            src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                            alt={v.title}
                            className="w-16 aspect-video rounded object-cover"
                          />
                        </td>
                        <td className="p-3 font-semibold text-ink max-w-xs line-clamp-1">{v.title}</td>
                        <td className="p-3 font-mono text-azure">{v.youtubeId}</td>
                        <td className="p-3 font-mono text-ink-muted">{v.duration}</td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button className="p-1 text-slate-400 hover:text-navy"><PencilSimple size={16} /></button>
                            <button className="p-1 text-slate-400 hover:text-rose-600"><Trash size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
