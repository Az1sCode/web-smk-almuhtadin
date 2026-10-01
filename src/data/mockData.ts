import { 
  Major, 
  StaffMember, 
  Achievement, 
  VideoItem, 
  NewsItem, 
  Album, 
  GalleryImage, 
  HeroSlide,
  SchoolAdvantage,
  SchoolVisionMissionData
} from '../types';

export const schoolMetadata = {
  name: "SMK Al-Muhtadin",
  tagline: "Membentuk Generasi Unggul, Berkarakter & Siap Kerja",
  npsn: "20214589",
  accreditation: "Akreditasi A (Unggul)",
  foundedYear: 1998,
  ownershipStatus: "Swasta / Yayasan Pendidikan Al-Muhtadin",
  address: "Jl. Raya Al-Muhtadin No. 45, Pancoran Mas, Kota Depok, Jawa Barat 16436",
  phone: "(021) 7788-9900",
  whatsappNumber: "+62 812-3456-7890",
  whatsappUrl: "https://wa.me/6281234567890?text=Halo%20Admin%20SMK%20Al-Muhtadin,%20saya%20ingin%20bertanya%20informasi%20pendaftaran%20sekolah%20(PPDB)",
  email: "info@smkalmuhtadin.sch.id",
  principal: {
    name: "Drs. H. Ahmad Dahlan, M.Pd.",
    title: "Kepala Sekolah SMK Al-Muhtadin",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    signatureUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AD&chars=1",
    quote: "Kami percaya bahwa pendidikan vokasi masa kini bukan sekadar transfer keterampilan teknis, melainkan pembentukan integritas, daya nalar kritis, dan kematangan karakter yang adaptif terhadap disrupsi global."
  },
  stats: [
    { label: "Program Keahlian", value: "4", note: "Terakreditasi A" },
    { label: "Siswa Aktif", value: "1,200+", note: "Tiga Angkatan" },
    { label: "Guru Tersertifikasi", value: "100%", note: "Kompetensi BNSP" },
    { label: "Mitra Industri (DUDI)", value: "38+", note: "MoU Resmi Aktif" },
  ]
};

export const heroSlidesData: HeroSlide[] = [
  {
    id: 1,
    badge: "SMK Al-Muhtadin • Terakreditasi A (Unggul)",
    headline: "Membentuk Generasi Unggul, Berkarakter & Siap Kerja.",
    description: "Pusat keunggulan vokasi di Kota Depok yang mengintegrasikan kurikulum berbasis industri teknologi terkini, kepemimpinan, dan nilai budi pekerti luhur.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600",
    imageAlt: "Gedung dan Lingkungan Kampus SMK Al-Muhtadin"
  },
  {
    id: 2,
    badge: "Pusat Keunggulan Teknologi & Vokasi",
    headline: "Kurikulum Selaras Kebutuhan Nyata Dunia Industri.",
    description: "Bekerja sama erat dengan 38+ mitra industri terkemuka untuk memastikan setiap peserta didik memiliki sertifikasi kompetensi standar nasional dan internasional.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1600",
    imageAlt: "Praktik Laboratorium Komputer dan Kejuruan Berstandar Industri"
  },
  {
    id: 3,
    badge: "Penerimaan Peserta Didik Baru (PPDB)",
    headline: "Wujudkan Cita-Cita & Masa Depan Sukses Bersama Kami.",
    description: "Fasilitas laboratorium modern, pembelajaran berbasis proyek riil terpadu, serta pembinaan akhlak mulia dan kedisiplinan kerja tinggi.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1600",
    imageAlt: "Aktivitas Siswa Berprestasi SMK Al-Muhtadin"
  }
];

export const majorsData: Major[] = [
  {
    id: 1,
    name: "Teknik Jaringan Komputer & Telekomunikasi",
    abbreviation: "TJKT",
    slug: "teknik-jaringan-komputer-dan-telekomunikasi",
    shortDescription: "Fokus pada perancangan infrastruktur jaringan komputer, fiber optik, administrasi server Linux/Windows, mikrotik, cisco, dan cyber security.",
    fullDescription: "Program Keahlian Teknik Jaringan Komputer dan Telekomunikasi (TJKT) menyiapkan tenaga ahli muda yang terampil dalam merancang, mengonfigurasi, dan mengamankan jaringan enterprise, infrastruktur serat optik, cloud virtualization, serta sistem telekomunikasi digital modern.",
    competencies: [
      "Perancangan Jaringan LAN, WAN, Wireless & Fiber Optik",
      "Sertifikasi Mikrotik MTCNA & Cisco Networking Academy",
      "Administrasi Server Enterprise (Linux & Windows Server)",
      "Network Security & Cyber Defense Dasar",
      "Cloud Infrastructure & Virtualization Staging"
    ],
    careerProspects: [
      "Network Support Specialist",
      "Cloud & System Administrator",
      "Fiber Optic Technician",
      "Cybersecurity Support Analyst",
      "IT Infrastructure Engineer"
    ],
    industryPartners: [
      { name: "PT Telkom Indonesia" },
      { name: "Biznet Networks" },
      { name: "ID-Networkers" },
      { name: "PT Telkom Akses" }
    ],
    headOfProgram: {
      name: "Hendra Kusuma, S.T., M.T.",
      title: "Kepala Program Keahlian TJKT",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
    },
    featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    facilities: [
      { name: "Lab Cisco & Mikrotik Academy", description: "Mikrotik RouterBoard RB750/RB951, Cisco Catalyst Switch, patch panel rack 42U", capacity: "36 Siswa" },
      { name: "Lab Fiber Optik & Splicing", description: "Optical Fusion Splicer Fujikura, OTDR Anritsu, stripper, cleaver & test kit", capacity: "32 Siswa" },
      { name: "Lab Server Enterprise & Cloud", description: "Rackmount server Dell PowerEdge, UPS online, isolated subnet environment", capacity: "32 Siswa" }
    ],
    stats: {
      studentsCount: 380,
      labCount: 3,
      employmentRate: "93.4% Terserap Kerja / Wirausaha"
    }
  },
  {
    id: 2,
    name: "Manajemen Perkantoran & Layanan Bisnis",
    abbreviation: "MPLB",
    slug: "manajemen-perkantoran-dan-layanan-bisnis",
    shortDescription: "Mempelajari tata kelola administrasi perkantoran digital, otomatisasi arsip elektronik, komunikasi bisnis profesional, dan customer relations.",
    fullDescription: "Program Keahlian Manajemen Perkantoran dan Layanan Bisnis (MPLB) mencetak tenaga administrasi profesional yang cakap mengelola perkantoran modern, otomatisasi dokumen berbasis cloud, pelayanan prima (service excellence), keprotokoleran, serta operasional bisnis digital.",
    competencies: [
      "Otomatisasi Tata Kelola Perkantoran Digital (Cloud Office Suite)",
      "Manajemen Kearsipan Elektronik & Digital Filing System",
      "Komunikasi Bisnis, Public Relations & Layanan Humas",
      "Pengelolaan Kas Kecil & Administrasi Transaksi Bisnis",
      "Customer Relationship Management (CRM) & Protokoler"
    ],
    careerProspects: [
      "Staff Administrasi Perkantoran Modern",
      "Executive Administrative Assistant",
      "Customer Service Specialist",
      "Public Relations Assistant",
      "Electronic Document Controller"
    ],
    industryPartners: [
      { name: "PT Astra International" },
      { name: "Bank Syariah Indonesia (BSI)" },
      { name: "Asosiasi Profesi Administrasi Perkantoran" },
      { name: "PT Pos Indonesia (Persero)" }
    ],
    headOfProgram: {
      name: "Dra. Hj. Nurjanah, M.M.",
      title: "Kepala Program Keahlian MPLB",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    featuredImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    facilities: [
      { name: "Lab Simulasi Perkantoran Modern", description: "Workstation PC kantor modern, scanner ADF berkecepatan tinggi, sistem intercom", capacity: "36 Siswa" },
      { name: "Digital Conference & Meeting Room", description: "Smart interactive display board, audio conference system, ergonomic office pods", capacity: "30 Siswa" },
      { name: "Lab Kearsipan Digital & Mini Bank", description: "Software sistem arsip elektronik, cash counter machine, customer handling suite", capacity: "32 Siswa" }
    ],
    stats: {
      studentsCount: 320,
      labCount: 3,
      employmentRate: "92.5% Terserap Kerja / Wirausaha"
    }
  },
  {
    id: 3,
    name: "Animasi",
    abbreviation: "ANIMASI",
    slug: "animasi",
    shortDescription: "Menguasai rancang bangun animasi 2D & 3D, character design, digital sculpting, motion graphics, serta visual effects berstandar studio profesional.",
    fullDescription: "Program Keahlian Animasi membekali peserta didik dengan kecakapan seni visual dan teknologi kreatif, mulai dari pra-produksi (storyboard & concept art), produksi animasi 2D/3D (modeling, rigging, animating), hingga pasca-produksi (lighting, VFX, compositing, & sound editing).",
    competencies: [
      "Concept Art, Character Design & Storyboarding",
      "Pemodelan 3D, Texturing & Rigging (Blender & Maya)",
      "Animasi 2D & Digital Drawing (Clip Studio Paint & Toon Boom)",
      "Motion Graphics & Visual Effects (After Effects)",
      "Compositing, Lighting & Rendering Pipeline"
    ],
    careerProspects: [
      "2D & 3D Animator",
      "Character & Concept Artist",
      "3D Modeler & Rigging Specialist",
      "Motion Graphic Designer",
      "Storyboard & Layout Artist"
    ],
    industryPartners: [
      { name: "Studio Animasi Enspire (ESDA)" },
      { name: "Kumata Animation Studio" },
      { name: "Asosiasi Industri Animasi Indonesia (AINAKI)" },
      { name: "Infinite Studios" }
    ],
    headOfProgram: {
      name: "Ir. Fauzan Ramadhan, M.Kom.",
      title: "Kepala Program Keahlian Animasi",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
    },
    featuredImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    facilities: [
      { name: "Lab Animasi & Digital Painting", description: "Display drawing tablet Wacom Cintiq, PC workstation Intel Core i7 GPU RTX", capacity: "32 Siswa" },
      { name: "Studio Foley Sound & Audio Suite", description: "Microphone condenser Rode, audio interface studio, soundproof recording booth", capacity: "24 Siswa" },
      { name: "Render Farm & Mini Theater Preview", description: "Server render node paralel, 4K projection display, color calibrated monitors", capacity: "30 Siswa" }
    ],
    stats: {
      studentsCount: 260,
      labCount: 3,
      employmentRate: "90.2% Terserap Kerja / Wirausaha"
    }
  },
  {
    id: 4,
    name: "Kuliner",
    abbreviation: "KULINER",
    slug: "kuliner",
    shortDescription: "Menguasai seni pengolahan makanan nusantara & internasional, pastry bakery, food styling, table manner, serta culinary entrepreneurship.",
    fullDescription: "Program Keahlian Kuliner membina calon juru masak dan technopreneur tata boga profesional dengan standar mutu kebersihan, keamanan pangan (HACCP), teknik olah kuliner kontinental dan nusantara, pembuatan roti & kue pastry modern, serta manajemen food & beverage komersial.",
    competencies: [
      "Pengolahan Masakan Kontinental & Masakan Tradisional Nusantara",
      "Pastry, Bakery, Cake Decorating & Artisan Bread",
      "Tata Hidang, Barista & Food and Beverage Service",
      "Sanitasi, Keamanan Pangan & Standar Higiene HACCP",
      "Food Costing, Menu Engineering & Wirausaha Kuliner"
    ],
    careerProspects: [
      "Commis Chef & Cook Hotel / Restoran",
      "Pastry & Bakery Chef",
      "Food Stylist & Culinary Content Specialist",
      "F&B Service Specialist & Barista",
      "Technopreneur Kuliner & Catering Owner"
    ],
    industryPartners: [
      { name: "Indonesian Chef Association (ICA)" },
      { name: "Hotel Santika Premiere" },
      { name: "Aston Hotel & Resort" },
      { name: "PT Nippon Indosari Corpindo" }
    ],
    headOfProgram: {
      name: "Chef Rahmat Hidayat, S.Pd., C.C.",
      title: "Kepala Program Keahlian Kuliner",
      photo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400"
    },
    featuredImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200",
    facilities: [
      { name: "Dapur Komersial Standar Industri", description: "Stainless steel commercial range, convection oven, salamander grill, stainless prep table", capacity: "32 Siswa" },
      { name: "Lab Pastry & Bakery Terpadu", description: "Spiral mixer heavy-duty, proofing box proofer, stone hearth oven deck", capacity: "30 Siswa" },
      { name: "Restoran Praktek & Banquet Simulation", description: "Dining table banquet setup, espresso machine commercial, POS billing system", capacity: "36 Siswa" }
    ],
    stats: {
      studentsCount: 240,
      labCount: 3,
      employmentRate: "93.8% Terserap Kerja / Wirausaha"
    }
  }
];

export const staffData: StaffMember[] = [
  {
    id: 1,
    name: "Drs. H. Ahmad Dahlan, M.Pd.",
    nipNuptk: "196803151993031004",
    position: "Kepala Sekolah",
    category: "pimpinan",
    department: "Manajemen Sekolah",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    email: "kepsek@smkalmuhtadin.sch.id",
    orderIndex: 1
  },
  {
    id: 2,
    name: "Dr. Irwan Setiawan, M.Pd.",
    nipNuptk: "197405122000031002",
    position: "Wakil Kepala Sekolah Bidang Kurikulum",
    category: "pimpinan",
    department: "Kurikulum & Akademik",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
    email: "kurikulum@smkalmuhtadin.sch.id",
    orderIndex: 2
  },
  {
    id: 3,
    name: "Budi Santoso, S.Pd.",
    nipNuptk: "198008102005011008",
    position: "Wakil Kepala Sekolah Bidang Kesiswaan",
    category: "pimpinan",
    department: "Kesiswaan & Karakter",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    email: "kesiswaan@smkalmuhtadin.sch.id",
    orderIndex: 3
  },
  {
    id: 4,
    name: "Raden Arief Wibowo, S.T.",
    nipNuptk: "198302192008011011",
    position: "Wakasek Hubungan Industri & Masyarakat (Hubin)",
    category: "pimpinan",
    department: "Kemitraan DUDI & PKL",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    email: "hubin@smkalmuhtadin.sch.id",
    orderIndex: 4
  },
  {
    id: 5,
    name: "Hj. Nurul Hidayati, M.Pd.",
    nipNuptk: "197611042002122003",
    position: "Wakasek Sarana & Prasarana",
    category: "pimpinan",
    department: "Sarpras & Laboratorium",
    photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=600",
    email: "sarpras@smkalmuhtadin.sch.id",
    orderIndex: 5
  },
  {
    id: 6,
    name: "Ir. Fauzan Ramadhan, M.Kom.",
    position: "Guru Produktif RPL / Kepala Program RPL",
    category: "guru-produktif",
    department: "Rekayasa Perangkat Lunak",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    email: "fauzan.rpl@smkalmuhtadin.sch.id",
    orderIndex: 6
  },
  {
    id: 7,
    name: "Hendra Kusuma, S.T., M.T.",
    position: "Guru Produktif TKJ / Kepala Program TKJ",
    category: "guru-produktif",
    department: "Teknik Komputer & Jaringan",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    email: "hendra.tkj@smkalmuhtadin.sch.id",
    orderIndex: 7
  },
  {
    id: 8,
    name: "Dra. Siti Rahmawati, M.Ak.",
    position: "Guru Produktif AKL / Kepala Program AKL",
    category: "guru-produktif",
    department: "Akuntansi & Keuangan",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    email: "siti.akl@smkalmuhtadin.sch.id",
    orderIndex: 8
  },
  {
    id: 9,
    name: "Muhammad Rizky, S.Kom.",
    position: "Guru Produktif Mobile & Cloud Computing",
    category: "guru-produktif",
    department: "Rekayasa Perangkat Lunak",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=600",
    orderIndex: 9
  },
  {
    id: 10,
    name: "Dimas Prasetyo, S.Kom.",
    position: "Guru Produktif Cyber Security & Server",
    category: "guru-produktif",
    department: "Teknik Komputer & Jaringan",
    photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=600",
    orderIndex: 10
  },
  {
    id: 11,
    name: "Endang Purwanti, M.Pd.",
    position: "Guru Pengampu Bahasa Inggris & TOEIC",
    category: "guru-normatif-adaptif",
    department: "Normatif & Adaptif",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    orderIndex: 11
  },
  {
    id: 12,
    name: "Slamet Riyadi, A.Md.",
    position: "Kepala Bagian Tata Usaha (TU)",
    category: "staf-tu",
    department: "Administrasi & Kepegawaian",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    orderIndex: 12
  },
  {
    id: 13,
    name: "Arif Gunawan",
    position: "Kepala Laboran Komputer & Teknisi",
    category: "staf-tu",
    department: "Laboratorium & Jaringan",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
    orderIndex: 13
  }
];

export const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "Juara 1 Lomba Kompetensi Siswa (LKS) Web Technologies Tingkat Nasional",
    recipientName: "Fikri Ramadhan (Siswa XII RPL)",
    recipientType: "siswa",
    competitionName: "LKS SMK Tingkat Nasional XXXIV Kemendikbudristek",
    level: "nasional",
    rankTitle: "Juara 1 Nasional",
    year: 2026,
    photo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    description: "Meraih medali emas setelah menuntaskan perancangan fullstack cloud-native software dan keamanan API dalam kompetisi ketat 3 hari di Yogyakarta.",
    isFeatured: true
  },
  {
    id: 2,
    title: "Medali Emas O2SN Cabang Olahraga Pencak Silat Tanding Putra",
    recipientName: "Zaki Pratama (Siswa XI TKJ)",
    recipientType: "siswa",
    competitionName: "Olimpiade Olahraga Siswa Nasional (O2SN) Provinsi Jawa Barat",
    level: "provinsi",
    rankTitle: "Medali Emas",
    year: 2026,
    photo: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800",
    description: "Tampil gemilang dalam kategori kelas C putra dan berhasil membawa pulang medali emas mewakili Kota Depok ke tingkat nasional.",
    isFeatured: true
  },
  {
    id: 3,
    title: "Juara 2 National Cyber Security & Network Defense Challenge",
    recipientName: "Tim Cyber Defense Al-Muhtadin (XII TKJ)",
    recipientType: "siswa",
    competitionName: "National Polytechnic Cyber Competition 2025",
    level: "nasional",
    rankTitle: "Juara 2 Nasional",
    year: 2025,
    photo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    description: "Berhasil mengamankan server institusi simulasi dari serangan DDoS dan membongkar kerentanan jaringan dalam durasi 4 jam non-stop.",
    isFeatured: true
  },
  {
    id: 4,
    title: "Juara 1 Olimpiade Akuntansi & FinTech Digital Se-Jabodetabek",
    recipientName: "Putri Nabila, Salsabila & Tim (XII AKL)",
    recipientType: "siswa",
    competitionName: "Accounting Challenge Universitas Indonesia 2025",
    level: "provinsi",
    rankTitle: "Juara 1",
    year: 2025,
    photo: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    description: "Meraih nilai sempurna dalam studi kasus komputerisasi akuntansi accurate cloud dan audit keuangan komersial.",
    isFeatured: false
  },
  {
    id: 5,
    title: "Anugerah SMK Pusat Keunggulan (SMK PK) Terbaik Bidang Teknologi Informasi",
    recipientName: "SMK Al-Muhtadin Depok",
    recipientType: "sekolah",
    competitionName: "Apresiasi Vokasi Direktorat Jenderal Pendidikan Vokasi",
    level: "nasional",
    rankTitle: "Penghargaan Unggulan",
    year: 2025,
    photo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    description: "Apresiasi atas keberhasilan penyerapan lulusan ke dunia kerja di atas 90% dan integrasi kurikulum digital bersama industri terkemuka.",
    isFeatured: false
  },
  {
    id: 6,
    title: "Guru Penggerak & Pembimbing LKS Berprestasi Tingkat Kota Depok",
    recipientName: "Ir. Fauzan Ramadhan, M.Kom.",
    recipientType: "guru",
    competitionName: "Hari Guru Nasional Tingkat Kota Depok",
    level: "kota",
    rankTitle: "Pendidik Terbaik 1",
    year: 2024,
    photo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    description: "Dedikasi tinggi dalam membimbing 5 generasi juara kejuruan teknologi dan merintis inkubator startup siswa di sekolah.",
    isFeatured: false
  }
];

export const videosData: VideoItem[] = [
  {
    id: 1,
    title: "Profil Resmi SMK Al-Muhtadin: Membentuk Generasi Berkarakter & Siap Kerja",
    youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    youtubeId: "ScMzIvxBSi4",
    description: "Video profil menyeluruh fasilitas kampus, laboratorium berstandar industri, lingkungan belajar islami dan budaya kerja profesional di SMK Al-Muhtadin.",
    publishedDate: "2026-08-15",
    duration: "4:32",
    isFeatured: true
  },
  {
    id: 2,
    title: "Gelar Karya Vokasi & Inovasi Teknologi Siswa RPL & TKJ 2026",
    youtubeUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    youtubeId: "fJ9rUzIMcZQ",
    description: "Pameran proyek piranti lunak, prototype IoT, smart hydroponics, dan server cloud hasil karya siswa SMK Al-Muhtadin yang diuji langsung oleh pimpinan industri.",
    publishedDate: "2026-07-20",
    duration: "6:15",
    isFeatured: false
  },
  {
    id: 3,
    title: "Dokumentasi MPLS & Pembinaan Karakter Taruna Vokasi 2026",
    youtubeUrl: "https://www.youtube.com/watch?v=L_LUpnjgPso",
    youtubeId: "L_LUpnjgPso",
    description: "Rangkaian masa pengenalan lingkungan sekolah (MPLS) yang ramah, mendidik, serta sarat penguatan kedisiplinan dan akhlakul karimah.",
    publishedDate: "2026-07-12",
    duration: "5:08",
    isFeatured: false
  },
  {
    id: 4,
    title: "Pelepasan Siswa Prakerin (PKL) Mandiri ke Industri Mitra PT Telkom & BSI",
    youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    youtubeId: "kJQP7kiw5Fk",
    description: "Seremoni pembekalan dan pelepasan 240 siswa kelas XI untuk menjalani magang praktik kerja lapangan selama 6 bulan di berbagai perusahaan terkemuka.",
    publishedDate: "2026-06-02",
    duration: "3:45",
    isFeatured: false
  }
];

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "SMK Al-Muhtadin Resmi Membuka Pendaftaran Siswa Baru (PPDB) Tahun Ajaran 2026/2027",
    slug: "resmi-buka-ppdb-2026-2027",
    category: "Pengumuman",
    excerpt: "Penerimaan Peserta Didik Baru (PPDB) untuk Program Keahlian RPL, TKJ, dan AKL telah dibuka dengan kuota terbatas dan beasiswa prestasi.",
    body: `
      <p>SMK Al-Muhtadin secara resmi mengumumkan pembukaan proses Penerimaan Peserta Didik Baru (PPDB) untuk Tahun Ajaran 2026/2027. Sekolah membuka kuota penerimaan untuk tiga program keahlian unggulan: <strong>Rekayasa Perangkat Lunak (RPL)</strong>, <strong>Teknik Komputer & Jaringan (TKJ)</strong>, dan <strong>Akuntansi & Keuangan Lembaga (AKL)</strong>.</p>
      
      <h2>Jalur Pendaftaran & Beasiswa</h2>
      <p>Tahun ini, sekolah menyediakan tiga jalur seleksi utama yang dapat dipilih oleh calon peserta didik:</p>
      <ul>
        <li><strong>Jalur Prestasi Akademik & Non-Akademik:</strong> Pembebasan biaya formulir dan potongan biaya pengembangan bagi peraih juara minimal tingkat kota/kabupaten.</li>
        <li><strong>Jalur Tahfidz Al-Qur'an:</strong> Beasiswa pendidikan penuh untuk penghafal minimal 3 Juz Al-Qur'an.</li>
        <li><strong>Jalur Reguler Vokasi:</strong> Seleksi peminatan dan wawancara potensi kejuruan.</li>
      </ul>

      <blockquote>"Komitmen kami adalah memberikan akses pendidikan kejuruan yang bermutu tinggi dan selaras dengan industri tanpa mengesampingkan pembinaan karakter islami siswa." — Drs. H. Ahmad Dahlan, M.Pd. (Kepala Sekolah)</blockquote>

      <h2>Tahapan & Jadwal Pendaftaran</h2>
      <p>Pendaftaran gelombang pertama dibuka mulai 1 September hingga 30 November 2026. Calon pendaftar dapat berkonsultasi langsung melalui layanan WhatsApp resmi panitia PPDB atau mengunjungi sekretariat pendaftaran di kampus SMK Al-Muhtadin.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Tim Humas & PPDB",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      role: "Panitia PPDB"
    },
    publishedAt: "2026-09-01",
    readingTime: "3 menit",
    isPinned: true,
    viewsCount: 1420
  },
  {
    id: 2,
    title: "Siswa SMK Al-Muhtadin Sukses Raih Medali Emas LKS Web Technologies Tingkat Nasional 2026",
    slug: "raih-medali-emas-lks-nasional-2026",
    category: "Prestasi",
    excerpt: "Fikri Ramadhan, siswa kelas XII Jurusan RPL, berhasil mengharumkan nama sekolah dan daerah dengan meraih Juara 1 pada LKS Nasional di Yogyakarta.",
    body: `
      <p>Prestasi membanggakan kembali diukir oleh civitas akademika SMK Al-Muhtadin. Dalam ajang bergengsi Lomba Kompetensi Siswa (LKS) SMK Tingkat Nasional ke-34 yang berlangsung di Yogyakarta, kontingen SMK Al-Muhtadin berhasil meraih <strong>Medali Emas (Juara 1)</strong> pada bidang lomba <em>Web Technologies</em>.</p>
      <p>Lomba yang berlangsung ketat selama tiga hari ini menguji kemampuan rancang bangun fullstack platform, optimasi database, keamanan cloud, dan responsiveness antarmuka pengguna.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Humas Al-Muhtadin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      role: "Humas & Publikasi"
    },
    publishedAt: "2026-08-28",
    readingTime: "4 menit",
    isPinned: false,
    viewsCount: 980
  },
  {
    id: 3,
    title: "SMK Al-Muhtadin Gandeng 12 Perusahaan Baru dalam MoU Penyaluran Kerja & Magang Industri",
    slug: "mou-kemitraan-industri-2026",
    category: "Kegiatan",
    excerpt: "Penandatanganan nota kesepahaman (MoU) kemitraan industri guna memastikan 100% siswa kelas XI dan alumni terserap dalam dunia kerja nyata.",
    body: `
      <p>Dalam rangka memperkuat ekosistem *link and match* antara sekolah vokasi dan dunia usaha dunia industri (DUDI), SMK Al-Muhtadin menyelenggarakan acara seremoni Penandatanganan MoU Bersama 12 Perusahaan Teknologi, Manufaktur, dan Finansial.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Raden Arief Wibowo, S.T.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      role: "Wakasek Hubin"
    },
    publishedAt: "2026-08-14",
    readingTime: "3 menit",
    isPinned: false,
    viewsCount: 750
  },
  {
    id: 4,
    title: "Pelaksanaan Uji Kompetensi Keahlian (UKK) Mandiri Berstandar Asosiasi Profesi & BNSP",
    slug: "pelaksanaan-ukk-bnsp-2026",
    category: "Pengumuman",
    excerpt: "Seluruh siswa kelas XII menjalani uji sertifikasi keahlian profesional yang diuji langsung oleh asesor eksternal bersertifikat BNSP.",
    body: `
      <p>Sebagai syarat kelulusan dan penjaminan mutu kompetensi siswa, SMK Al-Muhtadin menggelar Uji Kompetensi Keahlian (UKK) Mandiri bekerja sama dengan Lembaga Sertifikasi Profesi (LSP) P1 dan asosiasi industri.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Dr. Irwan Setiawan, M.Pd.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
      role: "Wakasek Kurikulum"
    },
    publishedAt: "2026-07-22",
    readingTime: "2 menit",
    viewsCount: 630
  }
];

export const albumsData: Album[] = [
  {
    id: 1,
    name: "Praktikum Laboratorium Komputer & Jaringan",
    slug: "praktikum-laboratorium",
    description: "Dokumentasi kegiatan siswa di Laboratorium Software RPL, Fiber Optik TKJ, dan Bank Mini Akuntansi.",
    coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    imagesCount: 8,
    createdAt: "2026-08-20"
  },
  {
    id: 2,
    name: "Penyambutan Siswa Baru & MPLS Berkarakter",
    slug: "mpls-siswa-baru",
    description: "Rangkaian masa orientasi siswa baru dengan fokus pengenalan kurikulum dan pembinaan budi pekerti.",
    coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    imagesCount: 12,
    createdAt: "2026-07-15"
  },
  {
    id: 3,
    name: "Pentas Seni & Gelar Kreativitas Vokasi",
    slug: "pentas-seni-kreativitas",
    description: "Ajang apresiasi bakat seni musik, teater islami, robotika, dan bazar kewirausahaan siswa.",
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    imagesCount: 10,
    createdAt: "2026-06-18"
  },
  {
    id: 4,
    name: "Penyerahan Medali & Penganugerahan Prestasi",
    slug: "penganugerahan-prestasi",
    description: "Momen bersejarah penganugerahan piala dan apresiasi beasiswa bagi para siswa juara.",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    imagesCount: 6,
    createdAt: "2026-05-30"
  }
];

export const galleryImagesData: GalleryImage[] = [
  {
    id: 1,
    albumId: 1,
    imagePath: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200",
    caption: "Siswa RPL melakukan kolaborasi coding web application menggunakan React dan Git",
    date: "2026-08-18"
  },
  {
    id: 2,
    albumId: 1,
    imagePath: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    caption: "Instalasi dan pengujian rack server Linux di Lab Jaringan TKJ",
    date: "2026-08-16"
  },
  {
    id: 3,
    albumId: 1,
    imagePath: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
    caption: "Simulasi pembukuan keuangan akuntansi berbasis sistem Accurate di Lab AKL",
    date: "2026-08-12"
  },
  {
    id: 4,
    albumId: 1,
    imagePath: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    caption: "Praktik penyambungan kabel fiber optik menggunakan Fusion Splicer",
    date: "2026-08-10"
  },
  {
    id: 5,
    albumId: 2,
    imagePath: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200",
    caption: "Upacara pembukaan Masa Pengenalan Lingkungan Sekolah (MPLS) 2026",
    date: "2026-07-15"
  },
  {
    id: 6,
    albumId: 2,
    imagePath: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200",
    caption: "Pemberian motivasi industri oleh alumni yang telah sukses bekerja di perusahaan multinasional",
    date: "2026-07-16"
  },
  {
    id: 7,
    albumId: 3,
    imagePath: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
    caption: "Penampilan kreasi musik seni akustik siswa pada Muhtadin Fest 2026",
    date: "2026-06-18"
  },
  {
    id: 8,
    albumId: 4,
    imagePath: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
    caption: "Penganugerahan piala juara umum LKS oleh Kepala Sekolah di depan seluruh siswa",
    date: "2026-05-30"
  }
];

export const schoolVisionMissionData: SchoolVisionMissionData = {
  vision: "Menjadi SMK Unggul yang Menghasilkan Lulusan Berakhlak Mulia, Kompeten di Bidang Teknologi, dan Berdaya Saing Global.",
  visionExplanation: "Visi ini menjadi kompas bagi seluruh tenaga pendidik dan kependidikan dalam mengarahkan potensi siswa agar siap diserap industri maupun melanjutkan studi ke jenjang yang lebih tinggi.",
  missions: [
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
  ],
  coreValues: [
    {
      title: "Integritas",
      desc: "Menjunjung tinggi kejujuran, komitmen, dan pertanggungjawaban moral.",
      iconName: "ShieldCheck"
    },
    {
      title: "Profesional",
      desc: "Bekerja tuntas dengan standar mutu keahlian dan etika kerja tinggi.",
      iconName: "Target"
    },
    {
      title: "Religius",
      desc: "Berpijak pada nilai-nilai ketakwaan, adab mulia, dan toleransi santun.",
      iconName: "Heart"
    },
    {
      title: "Inovatif",
      desc: "Kreatif, terbuka pada pembaruan teknologi, dan berorientasi solusi.",
      iconName: "LightbulbFilament"
    }
  ]
};

export const schoolAdvantagesData: SchoolAdvantage[] = [
  {
    id: 1,
    title: "SMK Pusat Keunggulan (SMK PK)",
    subtitle: "Program Unggulan Kemendikbudristek RI",
    description: "Ditetapkan secara resmi oleh Kemendikbudristek sebagai SMK Pusat Keunggulan (SMK PK) skema reguler baru. Menghadirkan ekosistem pembelajaran berbasis industri modern, teaching factory terpadu, dan keselarasan kurikulum bersama puluhan mitra DUDI nasional.",
    category: "Status & Prestasi Institusi",
    badge: "SMK PK Kemendikbudristek",
    highlightMetric: "Terakreditasi A (Unggul)",
    icon: "Trophy",
    isFeatured: true
  },
  {
    id: 2,
    title: "Sekolah Adiwiyata",
    subtitle: "Kampus Hijau & Budaya Peduli Lingkungan Hidup",
    description: "Meraih predikat resmi Sekolah Adiwiyata atas dedikasi mewujudkan lingkungan pendidikan berbudaya lingkungan hidup, program zero-waste, efisiensi energi hijau, serta pembiasaan karakter peduli kelestarian alam yang asri dan sehat.",
    category: "Pelestarian Lingkungan",
    badge: "Kampus Hijau & Asri",
    highlightMetric: "Sekolah Berbudaya Lingkungan",
    icon: "Leaf",
    isFeatured: false
  },
  {
    id: 3,
    title: "Memiliki LSP-P1 Berlisensi BNSP",
    subtitle: "Uji Kompetensi Mandiri Standar Nasional",
    description: "Memiliki lisensi resmi Lembaga Sertifikasi Profesi Pihak Pertama (LSP-P1) dari Badan Nasional Sertifikasi Profesi (BNSP) untuk menyelenggarakan asesmen keahlian mandiri dan menerbitkan sertifikasi profesi resmi berlogo Garuda Emas bagi seluruh lulusan.",
    category: "Standarisasi Kompetensi",
    badge: "Lisensi Resmi BNSP",
    highlightMetric: "Sertifikat Garuda Emas",
    icon: "Certificate",
    isFeatured: false
  }
];
