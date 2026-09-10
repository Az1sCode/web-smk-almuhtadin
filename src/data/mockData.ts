import { Major, StaffMember, Achievement, VideoItem, NewsItem, Album, GalleryImage } from '../types';

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
    { label: "Program Keahlian", value: "3", note: "Terakreditasi A" },
    { label: "Siswa Aktif", value: "1,200+", note: "Tiga Angkatan" },
    { label: "Guru Tersertifikasi", value: "100%", note: "Kompetensi BNSP" },
    { label: "Mitra Industri (DUDI)", value: "38+", note: "MoU Resmi Aktif" },
  ]
};

export const majorsData: Major[] = [
  {
    id: 1,
    name: "Rekayasa Perangkat Lunak",
    abbreviation: "RPL",
    slug: "rekayasa-perangkat-lunak",
    shortDescription: "Mempelajari rancang bangun perangkat lunak modern, pengembangan web, aplikasi mobile, cloud system, dan kecerdasan buatan.",
    fullDescription: "Program Keahlian Rekayasa Perangkat Lunak (RPL) membekali peserta didik dengan kompetensi komprehensif di bidang rekayasa piranti lunak, algoritma pemrograman, database enterprise, hingga penerapan arsitektur modern web dan mobile. Kurikulum diselaraskan langsung dengan standar kebutuhan industri digital masa kini.",
    competencies: [
      "Front-End Engineering (React, Tailwind, Next.js)",
      "Back-End Architecture (Node.js, Laravel, REST & GraphQL API)",
      "Mobile App Development (Flutter & React Native)",
      "Database Modeling & Cloud Computing (PostgreSQL, Supabase, Docker)",
      "UI/UX Design Systems & Product Development"
    ],
    careerProspects: [
      "Fullstack Web Developer",
      "Mobile Application Specialist",
      "Frontend UI/UX Engineer",
      "Software Quality Assurance (QA) Tester",
      "Junior Database Administrator"
    ],
    industryPartners: [
      { name: "PT Telkom Indonesia" },
      { name: "Dicoding Indonesia" },
      { name: "Tokopedia Tech Academy" },
      { name: "PT Astra Graphia Information Technology" }
    ],
    headOfProgram: {
      name: "Ir. Fauzan Ramadhan, M.Kom.",
      title: "Kepala Program Keahlian RPL",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
    },
    featuredImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200",
    facilities: [
      { name: "Lab Software Engineering", description: "36 PC Core i7, 16GB RAM, dual display monitor, high-speed gigabit LAN", capacity: "36 Siswa" },
      { name: "Lab IoT & Mobile Computing", description: "Development board Arduino, ESP32, Raspberry Pi 4 kit, iMac workstation", capacity: "32 Siswa" },
      { name: "Creative Studio & UI/UX Lab", description: "Graphic tablet Wacom, ergonomic pod, smart projector interactive", capacity: "30 Siswa" }
    ],
    stats: {
      studentsCount: 420,
      labCount: 3,
      employmentRate: "94.2% Terserap Kerja / Wirausaha"
    }
  },
  {
    id: 2,
    name: "Teknik Komputer & Jaringan",
    abbreviation: "TKJ",
    slug: "teknik-komputer-dan-jaringan",
    shortDescription: "Fokus pada instalasi infrastruktur jaringan komputer, fiber optik, administrasi server Linux/Windows, mikrotik, dan cyber security.",
    fullDescription: "Kompetensi Keahlian Teknik Komputer dan Jaringan (TKJ) menyiapkan tenaga profesional muda yang handal dalam merancang, mengkonfigurasi, dan mengamankan jaringan komputer skala enterprise, infrastruktur fiber optik, virtualization, serta pemeliharaan hardware dan server.",
    competencies: [
      "Perancangan Arsitektur Jaringan LAN, WAN & Fiber Optic",
      "Sertifikasi Mikrotik MTCNA & Cisco CCNA Essentials",
      "Administrasi Server Enterprise (Linux Debian/Ubuntu Server)",
      "Network Security & Penetration Testing Dasar",
      "Virtualization & Cloud Infrastructure Management"
    ],
    careerProspects: [
      "Network Support Engineer",
      "System & Cloud Administrator",
      "Fiber Optic Specialist",
      "Cybersecurity Analyst Junior",
      "IT Infrastructure Support"
    ],
    industryPartners: [
      { name: "PT Telkom Akses" },
      { name: "Biznet Networks" },
      { name: "ID-Networkers" },
      { name: "PT Cyberindo Aditama (CBN)" }
    ],
    headOfProgram: {
      name: "Hendra Kusuma, S.T., M.T.",
      title: "Kepala Program Keahlian TKJ",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
    },
    featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    facilities: [
      { name: "Lab Cisco & Mikrotik Academy", description: "Mikrotik RouterBoard RB750/RB951, Cisco Catalyst Switch, patch panel rack 42U", capacity: "36 Siswa" },
      { name: "Lab Fiber Optic & Splicing", description: "Optical Fusion Splicer Fujikura, OTDR Anritsu, stripper, cleaver & test kit", capacity: "30 Siswa" },
      { name: "Lab Server Enterprise & Cloud", description: "Rackmount server Dell PowerEdge, UPS online, isolated subnet environment", capacity: "32 Siswa" }
    ],
    stats: {
      studentsCount: 450,
      labCount: 3,
      employmentRate: "91.8% Terserap Kerja / Wirausaha"
    }
  },
  {
    id: 3,
    name: "Akuntansi & Keuangan Lembaga",
    abbreviation: "AKL",
    slug: "akuntansi-dan-keuangan-lembaga",
    shortDescription: "Menguasai pembukuan keuangan modern, software akuntansi digital (Accurate & MYOB), perpajakan, dan operasional perbankan.",
    fullDescription: "Program Keahlian Akuntansi dan Keuangan Lembaga (AKL) membekali lulusan dengan kemahiran telaah siklus akuntansi perusahaan jasa, dagang, dan manufaktur, tata kelola keuangan perbankan, kepatuhan pajak digital, serta pengoperasian sistem informasi keuangan berbasis cloud.",
    competencies: [
      "Siklus Akuntansi Komprehensif & Pelaporan Keuangan",
      "Komputerisasi Akuntansi (Accurate, MYOB, & Excel Financial)",
      "Manajemen Pajak Perorangan & Badan (e-SPT)",
      "Operasional Perbankan & FinTech Dasar",
      "Audit Keuangan & Tata Kelola Administrasi Kas"
    ],
    careerProspects: [
      "Staff Akuntansi & Keuangan",
      "Junior Auditor Kantor Akuntan Publik (KAP)",
      "Teller & Customer Service Perbankan",
      "Tax Compliance Officer",
      "Wirausaha Mandiri & Analis Finansial"
    ],
    industryPartners: [
      { name: "Bank Syariah Indonesia (BSI)" },
      { name: "PT Pegadaian (Persero)" },
      { name: "Kantor Akuntan Publik Hadori Sugiarto" },
      { name: "PT Pos Indonesia Finansial" }
    ],
    headOfProgram: {
      name: "Dra. Siti Rahmawati, M.Ak.",
      title: "Kepala Program Keahlian AKL",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    featuredImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
    facilities: [
      { name: "Lab Mini Bank & FinTech", description: "Counter teller bank simulasi, mesin hitung uang, POS register terminal", capacity: "32 Siswa" },
      { name: "Lab Komputer Akuntansi Digital", description: "36 PC dengan lisensi resmi Accurate Accounting 5 & MYOB Premier v19", capacity: "36 Siswa" }
    ],
    stats: {
      studentsCount: 330,
      labCount: 2,
      employmentRate: "92.5% Terserap Kerja / Wirausaha"
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
