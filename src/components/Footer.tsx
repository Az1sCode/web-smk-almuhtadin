import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  EnvelopeSimple, 
  InstagramLogo, 
  YoutubeLogo, 
  FacebookLogo, 
  WhatsappLogo,
  ShieldCheck,
  LockKey
} from '@phosphor-icons/react';
import { schoolMetadata } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-midnight text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Col 1 & 2: School Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-gold border border-white/15">
                <GraduationCap size={24} weight="duotone" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  SMK Al-Muhtadin
                </span>
                <span className="text-xs text-white/60 font-mono tracking-wider">
                  NPSN: {schoolMetadata.npsn} • {schoolMetadata.accreditation}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md pt-2">
              Sekolah Menengah Kejuruan berkarakter unggul yang berdedikasi melahirkan talenta digital, teknisi jaringan, dan ahli akuntansi yang kompeten, berakhlak mulia, dan siap bersaing di kancah global.
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-azure text-white/80 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram SMK Al-Muhtadin"
              >
                <InstagramLogo size={18} weight="bold" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-600 text-white/80 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube SMK Al-Muhtadin"
              >
                <YoutubeLogo size={18} weight="bold" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-facebook text-white/80 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook SMK Al-Muhtadin"
              >
                <FacebookLogo size={18} weight="bold" />
              </a>
              <a
                href={schoolMetadata.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-whatsapp text-white/80 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp Resmi SMK Al-Muhtadin"
              >
                <WhatsappLogo size={18} weight="bold" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold font-bold">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/" className="hover:text-azure transition-colors">Beranda</Link></li>
              <li><Link to="/profil" className="hover:text-azure transition-colors">Profil Sekolah</Link></li>
              <li><Link to="/visi-misi" className="hover:text-azure transition-colors">Visi & Misi</Link></li>
              <li><Link to="/jurusan" className="hover:text-azure transition-colors">Program Keahlian</Link></li>
              <li><Link to="/pengurus" className="hover:text-azure transition-colors">Pimpinan & Guru</Link></li>
              <li><Link to="/prestasi" className="hover:text-azure transition-colors">Prestasi Sekolah</Link></li>
              <li><Link to="/galeri" className="hover:text-azure transition-colors">Galeri & Video</Link></li>
            </ul>
          </div>

          {/* Col 4: Program Keahlian */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold font-bold">
              Program Keahlian
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/jurusan/rekayasa-perangkat-lunak" className="hover:text-azure transition-colors block">
                  Rekayasa Perangkat Lunak (RPL)
                </Link>
              </li>
              <li>
                <Link to="/jurusan/teknik-komputer-dan-jaringan" className="hover:text-azure transition-colors block">
                  Teknik Komputer & Jaringan (TKJ)
                </Link>
              </li>
              <li>
                <Link to="/jurusan/akuntansi-dan-keuangan-lembaga" className="hover:text-azure transition-colors block">
                  Akuntansi & Keuangan (AKL)
                </Link>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-slate-300 font-mono">
                  <ShieldCheck size={14} className="text-gold" />
                  Pusat Keunggulan (SMK PK)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Kontak & Alamat */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold font-bold">
              Hubungi Kami
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{schoolMetadata.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0" />
                <span className="text-xs font-mono">{schoolMetadata.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <EnvelopeSimple size={16} className="shrink-0" />
                <span className="text-xs font-mono">{schoolMetadata.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsappLogo size={16} className="shrink-0" />
                <span className="text-xs font-mono">{schoolMetadata.whatsappNumber}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Staff Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SMK Al-Muhtadin. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            {/* <Link to="/admin" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
              <LockKey size={14} />
              <span>Portal Staf / CMS</span>
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
