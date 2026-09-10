import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Calendar, 
  IdentificationCard, 
  MapPin, 
  CheckCircle, 
  ArrowUpRight,
  Buildings 
} from '@phosphor-icons/react';
import { schoolMetadata } from '../data/mockData';

export const ProfilePage: React.FC = () => {
  const milestones = [
    { year: 1998, title: 'Pendirian Sekolah', desc: 'SMK Al-Muhtadin didirikan sebagai wujud dedikasi terhadap pengembangan kejuruan berbasis teknologi dan nilai islami di Kota Depok.' },
    { year: 2008, title: 'Akreditasi A & Perluasan Lab', desc: 'Meraih predikat Akreditasi A untuk seluruh jurusan dan membangun fasilitas laboratorium komputer multimedia mutakhir.' },
    { year: 2018, title: 'Kemitraan Industri Berskala Nasional', desc: 'Menjalin kerjasama kurikulum resmi dengan PT Telkom Indonesia, Biznet, dan asosiasi industri perbankan syariah.' },
    { year: 2024, title: 'Penetapan SMK Pusat Keunggulan (SMK PK)', desc: 'Terpilih oleh Kemendikbudristek sebagai SMK Pusat Keunggulan Skema Reguler Baru bidang Teknologi Informasi.' },
  ];

  const facilities = [
    { title: 'Lab Rekayasa Perangkat Lunak', desc: 'Dilengkapi workstation Intel Core i7, dual monitor, dan server cloud staging lokal.', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600' },
    { title: 'Lab Jaringan & Fiber Optik', desc: 'Rack server enterprise, fusion splicer fiber optic, OTDR tester, dan switch manageable Cisco.', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600' },
    { title: 'Bank Mini & Lab Akuntansi', desc: 'Simulasi operasional perbankan nyata dan software akuntansi komersial Accurate Cloud.', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600' },
    { title: 'Perpustakaan Digital & Auditorium', desc: 'Ribuan referensi e-book kejuruan, ruang baca ber-AC, dan aula seminar berkapasitas 500 orang.', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      {/* Header Banner */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
          Profil Institusi
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
          Mengenal Lebih Dekat SMK Al-Muhtadin
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
          Dedikasi lebih dari 28 tahun mendidik generasi berakhlak mulia, berkeahlian tinggi, dan berdaya saing global.
        </p>
      </div>

      {/* Official Credentials Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-whisper flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-azure-soft text-navy flex items-center justify-center shrink-0">
            <IdentificationCard size={26} weight="duotone" />
          </div>
          <div>
            <span className="text-xs font-mono text-ink-muted block">NPSN Resmi</span>
            <span className="text-base font-extrabold font-mono text-ink">{schoolMetadata.npsn}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-whisper flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold-hover flex items-center justify-center shrink-0">
            <ShieldCheck size={26} weight="duotone" />
          </div>
          <div>
            <span className="text-xs font-mono text-ink-muted block">Status Akreditasi</span>
            <span className="text-base font-extrabold font-mono text-ink">{schoolMetadata.accreditation}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-whisper flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Calendar size={26} weight="duotone" />
          </div>
          <div>
            <span className="text-xs font-mono text-ink-muted block">Tahun Berdiri</span>
            <span className="text-base font-extrabold font-mono text-ink">Tahun {schoolMetadata.foundedYear}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-whisper flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Buildings size={26} weight="duotone" />
          </div>
          <div>
            <span className="text-xs font-mono text-ink-muted block">Status Kepemilikan</span>
            <span className="text-xs sm:text-sm font-bold text-ink">Swasta / Yayasan Al-Muhtadin</span>
          </div>
        </div>
      </div>

      {/* Principal Welcome Section (Split Layout) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-whisper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] w-full max-w-xs shadow-md border border-slate-200">
              <img
                src={schoolMetadata.principal.photo}
                alt={schoolMetadata.principal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pt-2">
              <h3 className="font-extrabold text-base sm:text-lg text-ink">
                {schoolMetadata.principal.name}
              </h3>
              <p className="text-xs text-ink-muted font-mono">
                {schoolMetadata.principal.title}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
              Kata Pengantar Pimpinan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              Membangun Fondasi Kompetensi dan Moralitas Siswa
            </h2>
            <div className="space-y-4 text-ink-muted text-sm sm:text-base leading-relaxed">
              <p>
                Assalamu’alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi SMK Al-Muhtadin Kota Depok.
              </p>
              <p>
                Dunia industri berkembang dengan kecepatan yang eksponensial. Kehadiran teknologi komputasi awan, kecerdasan buatan, otomasi jaringan, serta transaksi finansial digital menuntut institusi pendidikan vokasi untuk bergerak responsif. Di SMK Al-Muhtadin, kami tidak hanya membekali peserta didik dengan hard skills teruji, melainkan juga menanamkan karakter jujur, disiplin, dan bertanggung jawab.
              </p>
              <p>
                Dengan kurikulum yang terhubung erat bersama mitra industri terkemuka serta didukung guru tersertifikasi BNSP, kami bangga dapat mengantarkan para lulusan kami langsung terserap kerja di perusahaan nasional maupun merintis usaha mandiri.
              </p>
            </div>

            {/* Digital Signature */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">Tanda Tangan Digital Resmi</p>
                <p className="font-bold text-ink text-sm">{schoolMetadata.principal.name}</p>
                <p className="text-2xs font-mono text-ink-muted">NIP. 196803151993031004</p>
              </div>
              <div className="px-3 py-1.5 border border-emerald-200 rounded-xl bg-emerald-50/50 flex items-center gap-2 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider">Tervalidasi Digital</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones & History Timeline */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
            Jejak Langkah
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">
            Sejarah & Perjalanan Sekolah
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-whisper space-y-3"
            >
              <span className="font-mono text-2xl font-extrabold text-navy">
                {item.year}
              </span>
              <h3 className="font-bold text-base text-ink">
                {item.title}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities Showcase */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
            Sarana & Prasarana
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">
            Fasilitas Pembelajaran Berstandar Industri
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, fIdx) => (
            <div
              key={fIdx}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-whisper hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={fac.img}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-sm text-ink group-hover:text-navy transition-colors">
                  {fac.title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
