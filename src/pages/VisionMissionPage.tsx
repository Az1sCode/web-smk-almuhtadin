import React from 'react';
import { 
  Quotes, 
  Target, 
  Heart, 
  ShieldCheck, 
  LightbulbFilament, 
  Handshake 
} from '@phosphor-icons/react';

export const VisionMissionPage: React.FC = () => {
  const missions = [
    {
      number: "01",
      title: "Pembentukan Karakter & Akhlak Mulia",
      description: "Menanamkan nilai-nilai keimanan, ketakwaan, kejujuran, dan kedisiplinan berbasis pembinaan adab santun dalam seluruh aktivitas keseharian siswa."
    },
    {
      number: "02",
      title: "Pendidikan Kejuruan Adaptif & Berstandar Industri",
      description: "Menyelenggarakan proses pembelajaran vokasi yang selaras dengan perkembangan teknologi terdepan (link and match) dan standar kompetensi nasional (BNSP) serta internasional."
    },
    {
      number: "03",
      title: "Penguatan Budaya Kerja & Kewirausahaan",
      description: "Membiasakan budaya kerja industri (5R/5S) sejak dini serta menumbuhkembangkan jiwa technopreneurship yang mandiri dan solutif."
    },
    {
      number: "04",
      title: "Pengembangan Kemitraan Strategis DUDI",
      description: "Memperluas jejaring kerjasama kemitraan dengan dunia usaha, industri, dan perguruan tinggi untuk optimalisasi Praktik Kerja Lapangan (PKL) dan penyaluran lulusan."
    },
    {
      number: "05",
      title: "Sarana Prasarana Ramah Lingkungan & Berkelanjutan",
      description: "Menyediakan sarana dan prasarana laboratorium berteknologi modern, aman, inklusif, dan berwawasan lingkungan."
    }
  ];

  const coreValues = [
    {
      title: "Integritas",
      desc: "Menjunjung tinggi kejujuran, komitmen, dan pertanggungjawaban moral.",
      icon: <ShieldCheck size={28} weight="duotone" className="text-azure" />
    },
    {
      title: "Profesional",
      desc: "Bekerja tuntas dengan standar mutu keahlian dan etika kerja tinggi.",
      icon: <Target size={28} weight="duotone" className="text-azure" />
    },
    {
      title: "Religius",
      desc: "Berpijak pada nilai-nilai ketakwaan, adab mulia, dan toleransi santun.",
      icon: <Heart size={28} weight="duotone" className="text-azure" />
    },
    {
      title: "Inovatif",
      desc: "Kreatif, terbuka pada pembaruan teknologi, dan berorientasi solusi.",
      icon: <LightbulbFilament size={28} weight="duotone" className="text-azure" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      {/* Header Banner */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
          Komitmen & Cita-Cita
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
          Visi, Misi & Nilai Inti
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
          Pedoman fundamental dalam setiap langkah pembinaan akademis dan pembentukan kepribadian di SMK Al-Muhtadin.
        </p>
      </div>

      {/* Vision Hero Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-8 sm:p-14 text-white shadow-elevated border border-navy/20">
        <div className="absolute right-8 top-8 text-white/10">
          <Quotes size={120} weight="fill" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 text-xs font-mono font-bold tracking-wide">
            Visi Resmi Institusi
          </div>

          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
            "Menjadi SMK Unggul yang Menghasilkan Lulusan Berakhlak Mulia, Kompeten di Bidang Teknologi, dan Berdaya Saing Global."
          </blockquote>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-light">
            Visi ini menjadi kompas bagi seluruh tenaga pendidik dan kependidikan dalam mengarahkan potensi siswa agar siap diserap industri maupun melanjutkan studi ke jenjang yang lebih tinggi.
          </p>
        </div>
      </div>

      {/* Mission Section (Numbered Grid) */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
            Rencana Aksi Strategis
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">
            Misi SMK Al-Muhtadin
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-whisper hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="font-mono text-3xl font-extrabold text-azure bg-azure-soft px-3 py-1 rounded-xl inline-block">
                  {mission.number}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-ink">
                  {mission.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {mission.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values / Motto Strip */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
            Pilar Pembentukan Karakter
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">
            Nilai-Nilai Inti (Core Values)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, vIdx) => (
            <div
              key={vIdx}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-whisper flex flex-col justify-between space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-azure-soft flex items-center justify-center">
                {val.icon}
              </div>
              <div>
                <h3 className="font-bold text-base text-ink mb-1.5">
                  {val.title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
