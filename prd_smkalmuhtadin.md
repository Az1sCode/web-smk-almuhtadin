# Product Requirements Document (PRD)
# SMK Al-Muhtadin — Official School Website

**Version**: 2.0  
**Date**: September 9, 2026  
**Status**: ✅ Approved — Ready for Development  
**Prepared by**: Antigravity AI  

---

## 1. Executive Summary

### Problem Statement
SMK Al-Muhtadin membutuhkan kehadiran digital resmi yang terpusat dan dinamis. Sebelumnya, sekolah belum memiliki portal terpadu untuk mendokumentasikan dan mempublikasikan data pengurus (Guru & Tenaga Kependidikan), capaian prestasi siswa/guru, program keahlian (jurusan), berita/pengumuman terkini, dokumentasi foto kegiatan, serta video kegiatan institusi dari kanal YouTube resmi. Hal ini menyulitkan calon peserta didik, wali murid, alumni, dan dunia usaha/industri (DUDI) untuk mengakses informasi resmi sekolah secara cepat, terverifikasi, dan mobile-friendly.

### Proposed Solution
Membangun portal website sekolah modern, cepat, dan dinamis yang bertindak sebagai *single source of truth* untuk seluruh informasi SMK Al-Muhtadin.
Sistem terdiri dari:
1. **Public Frontend (React Vite + Tailwind CSS + shadcn/ui)**: Antarmuka publik yang responsif, berestetika akademis premium (*Academic Sanctuary Editorial Bento*), aksesibilitas tinggi, dan optimal untuk berbagi tautan di media sosial (WhatsApp & Facebook Open Graph preview).
2. **Backend & REST API (Laravel 11 + PostgreSQL 16)**: Layanan API berkinerja tinggi, aman, dan modular dengan sistem manajemen konten (CMS) berbasis peran (*Role-Based Access Control*) untuk staf sekolah non-teknis.
3. **Integrasi Media Khusus**:
   - **Galeri Foto**: Pengelompokan album kegiatan dengan optimasi kompresi otomatis WebP.
   - **Galeri Video YouTube**: Mengintegrasikan kanal YouTube resmi sekolah menggunakan parser ID video otomatis dan pemutar modal interaktif, menjaga efisiensi bandwidth dan kapasitas penyimpanan server VPS sekolah.

### Success Criteria (KPIs)

| Metric | Target | Cara Pengukuran |
|---|---|---|
| **Page Load Time (LCP)** | ≤ 2.5 detik pada koneksi 4G standar | Google Lighthouse / PageSpeed Insights |
| **Lighthouse Performance** | ≥ 85 (Mobile), ≥ 95 (Desktop) | Chrome DevTools Lighthouse Audit |
| **Lighthouse Accessibility** | 100 | Zero A11y violations (WCAG 2.1 AA) |
| **Mobile Responsiveness** | 100% responsif pada layar ≥ 320px | Cross-browser & device testing |
| **Admin Publish Velocity** | ≤ 3 menit untuk posting berita / prestasi / video | Uji coba mandiri staf TU/Admin |
| **Social Share Rich Preview** | 100% tautan berita/prestasi menampilkan thumbnail, judul, & ringkasan di WhatsApp | Open Graph parser test (Facebook Sharing Debugger / WhatsApp link) |
| **Waktu Peluncuran MVP** | Maksimal 1 bulan dari awal pengerjaan | Milestone Tracking |

---

## 2. User Experience & Functionality

### User Personas

| Persona | Deskripsi | Kebutuhan & Tujuan Utama |
|---|---|---|
| **Calon Siswa & Orang Tua** | Keluarga yang mencari sekolah kejuruan berkualitas | Melihat profil sekolah, program keahlian/jurusan, fasilitas lab, daftar prestasi, pengurus/guru, dan info kontak/WhatsApp PPDB. |
| **Siswa Aktif & Alumni** | Siswa yang sedang menempuh studi dan lulusan | Membaca pengumuman resmi, agenda sekolah, berita kegiatan, dan dokumentasi foto/video kegiatan sekolah. |
| **Mitra Industri (DUDI) & Instansi** | Perusahaan dan dinas terkait | Memeriksa akreditasi, kompetensi jurusan kejuruan, profil pimpinan, dan rekam jejak capaian prestasi sekolah. |
| **Staf Admin / Humas (Editor)** | Guru atau tenaga kependidikan (non-teknis) | Mengunggah berita, merilis pengumuman, memperbarui data prestasi, menambahkan link video YouTube, dan mengunggah album foto secara mudah tanpa bantuan developer. |
| **Kepala Sekolah / Super Admin** | Pimpinan sekolah | Memantau statistik konten, mengelola akun admin, dan memperbarui data profil/visi-misi sekolah. |

---

### Pages & Functional User Stories

#### 2.1 — Beranda (Home Page)
> **Story**: Sebagai pengunjung website, saya ingin mengakses halaman utama yang informatif dan estetik agar saya dapat langsung mengetahui keunggulan, berita terbaru, prestasi, dan video kegiatan SMK Al-Muhtadin.

**Kriteria Penerimaan (Acceptance Criteria):**
- **Hero Banner**: Foto arsitektur/aktivitas kampus beresolusi tinggi dengan *scrim gradient*, lencana akreditasi ("SMK Al-Muhtadin • Terakreditasi A"), *headline* percaya diri, dan tombol CTA utama (*"Jelajahi Jurusan ↗"* & *"Kontak PPDB"*).
- **Statistik Cepat**: Bar metrik terstandar (Jumlah Siswa, Program Keahlian, Guru Tersertifikasi, Mitra Industri DUDI).
- **Sambutan Kepala Sekolah & Profil Singkat**: Cuplikan narasi institusi disertai foto formal Kepala Sekolah dan tombol menuju halaman profil lengkap.
- **Showcase Program Keahlian (Bento Jurusan)**: Kartu modular untuk setiap program keahlian (TKJ, RPL, Akuntansi) yang memuat ringkasan keahlian dan tautan detail.
- **Kabar Terkini (Berita & Pengumuman)**: Menampilkan 3 artikel berita terbaru dengan thumbnail, tanggal monospaced, kategori, dan tombol *"Lihat Semua Berita ↗"*.
- **Sorotan Prestasi Terbaru**: Menampilkan 3 prestasi paling bergengsi terbaru lengkap dengan piala/lencana medali.
- **Highlight Video Kegiatan (YouTube)**: Bagian pemutar video sorotan dari YouTube resmi sekolah dengan tombol play interaktif.
- **Floating WhatsApp CTA**: Tombol melayang di pojok kanan bawah dengan teks ajakan ramah ("Tanya Informasi Sekolah / PPDB") yang terhubung langsung ke WhatsApp resmi sekolah.
- **Footer Institusi**: Warna Midnight Navy (`#0A1931`), logo, info kontak lengkap, NPSN, peta/alamat, tautan media sosial (YouTube, Instagram, Facebook), dan hak cipta.

---

#### 2.2 — Berita & Pengumuman (`/berita` & `/berita/:slug`)
> **Story**: Sebagai pengunjung, saya ingin membaca berita kegiatan, artikel edukasi, dan pengumuman resmi dengan pencarian dan penyaringan kategori yang cepat.

**Kriteria Penerimaan:**
- Daftar berita dengan pagination (9-12 artikel per halaman).
- Penyaringan kategori via pill tab: *Semua*, *Pengumuman*, *Kegiatan*, *Prestasi*, *Artikel*.
- Pencarian kata kunci judul berita (Search bar instan).
- **Halaman Detail Berita (`/berita/:slug`)**:
  - Foto utama (*featured image*) dengan caption.
  - Metadata artikel: Penulis/Humas, tanggal rilis (*format Indonesia*), kategori, dan estimasi waktu baca.
  - Konten teks kaya (*Rich Text/TipTap HTML*) yang mendukung subjudul, kutipan (*blockquote*), bullet points, dan gambar di dalam isi teks.
  - Tombol bagikan ke WhatsApp, Facebook, dan salin tautan.
  - Rekomendasi 3 artikel terkait di bagian bawah.
- **Optimasi Prerender Open Graph**: Menghasilkan metadata `og:title`, `og:description`, `og:image`, dan `og:url` yang kompatibel dengan bot crawler WhatsApp/Facebook.

---

#### 2.3 — Profil Sekolah & Visi Misi (`/profil` & `/visi-misi`)
> **Story**: Sebagai calon wali murid dan mitra industri, saya ingin mempelajari sejarah, akreditasi, visi-misi, dan sarana prasarana sekolah untuk memverifikasi kredibilitas institusi.

**Kriteria Penerimaan:**
- Menampilkan identitas resmi: NPSN, Akreditasi, Tahun Berdiri, Status Kepemilikan.
- Sambutan resmi Kepala Sekolah lengkap dengan foto dan tanda tangan digital.
- Sejarah pendirian dan milestone perjalanan sekolah.
- Penjabaran terstruktur Visi, poin-poin Misi bernomor, dan nilai-nilai inti (*Core Values* / Motto).
- Ringkasan fasilitas unggulan (Laboratorium Komputer, Workshop Perakitan, Perpustakaan Digital, Lapangan Olahraga).
- Seluruh konten statis dapat diperbarui dari CMS Admin.

---

#### 2.4 — Program Keahlian / Jurusan (`/jurusan` & `/jurusan/:slug`)
> **Story**: Sebagai calon siswa, saya ingin menelaah program keahlian yang ada di SMK Al-Muhtadin agar saya dapat memilih jurusan yang sesuai dengan minat dan prospek masa depan.

**Kriteria Penerimaan:**
- Daftar seluruh program keahlian aktif (misal: Rekayasa Perangkat Lunak, Teknik Komputer & Jaringan, Akuntansi Keuangan Lembaga).
- Halaman detail setiap jurusan mencakup:
  - Deskripsi dan fokus pembelajaran.
  - Daftar kompetensi keahlian yang dipelajari.
  - Peluang kerja dan prospek karir lulusan.
  - Fasilitas lab kejuruan spesifik.
  - Daftar logo/nama Mitra Dunia Usaha & Dunia Industri (DUDI) tempat Praktik Kerja Lapangan (PKL) dan penyaluran kerja.
  - Nama & foto Kepala Program Keahlian (Kaprog).
- Data jurusan tersimpan secara terstruktur di database dan dapat dikelola melalui CMS.

---

#### 2.5 — Pengurus & Direktori Guru/Staf (`/pengurus` atau `/gtk`)
> **Story**: Sebagai siswa, orang tua, dan masyarakat, saya ingin melihat struktur pimpinan serta daftar guru dan staf sekolah untuk mengenal tenaga pendidik di SMK Al-Muhtadin.

**Kriteria Penerimaan:**
- Pengelompokan struktur berdasarkan kategori:
  1. **Pimpinan Sekolah**: Kepala Sekolah & Wakil Kepala Sekolah (Kurikulum, Kesiswaan, Hubin/Humas, Sarpras).
  2. **Tenaga Pendidik (Guru)**: Guru Produktif per Jurusan, Guru Normatif, dan Guru Adaptif.
  3. **Tenaga Kependidikan (Staf TU & Pendukung)**: Tata Usaha, Kepala Laboratorium, Pustakawan, Teknisi.
- Filter interaktif berdasarkan kategori/divisi.
- Kartu Staf memuat: Foto formal, Nama Lengkap beserta Gelar, Jabatan / Mata Pelajaran yang diampu, dan NIP/NUPTK (opsional).
- Sorting urutan jabatan dari level pimpinan hingga staf.
- Manajemen CRUD foto dan data pengurus di CMS Admin.

---

#### 2.6 — Prestasi Sekolah, Guru & Siswa (`/prestasi`)
> **Story**: Sebagai pengunjung, saya ingin melihat rekam jejak capaian prestasi sekolah, guru, dan siswa agar saya yakin terhadap kualitas pembinaan di SMK Al-Muhtadin.

**Kriteria Penerimaan:**
- Tampilan kartu prestasi yang menonjolkan:
  - Lencana Peringkat (*Badge Prestige Gold*: misal "Juara 1", "Medali Emas", "Finalis").
  - Tingkat Kejuaraan (*Kecamatan, Kota/Kabupaten, Provinsi, Nasional, Internasional*).
  - Nama Pemenang / Tim dan Cabang Lomba (misal "LKS Web Technologies 2026").
  - Kategori Penerima: *Siswa*, *Guru*, atau *Institusi Sekolah*.
  - Tahun perolehan prestasi.
  - Foto dokumentasi penyerahan piala/medali atau piagam penghargaan.
  - Deskripsi singkat pencapaian.
- Filter pencarian berdasarkan: **Tingkat** (*Nasional/Provinsi/Kota*) dan **Tahun**.
- Manajemen data prestasi di CMS Admin.

---

#### 2.7 — Galeri Media (Foto & Video YouTube) (`/galeri`)
> **Story**: Sebagai pengunjung, saya ingin melihat dokumentasi foto kegiatan sekolah dan menonton rekaman video resmi sekolah tanpa harus membuka aplikasi lain atau mengalami buffering lama.

**Kriteria Penerimaan:**
- **Switcher Tab Utama**: Pengunjung dapat beralih antara tab **"Foto Kegiatan"** dan **"Video YouTube"**.
- **Tab Galeri Foto**:
  - Filter album kegiatan (misal: "MPLS", "Uji Kompetensi Keahlian", "Pentas Seni", "Peringatan Hari Guru").
  - Tampilan grid bento foto responsif dengan efek zoom halus saat hover.
  - Klik foto membuka **Lightbox Modal** beresolusi penuh dengan tombol navigasi *Previous / Next* dan caption foto.
- **Tab Galeri Video YouTube**:
  - Grid kartu video kegiatan sekolah.
  - Setiap kartu menampilkan thumbnail resmi YouTube berkualitas tinggi (`hqdefault.jpg`), judul video, tanggal upload, durasi/deskripsi singkat, dan tombol Play overlay.
  - Klik kartu video membuka **Responsive Modal Video Player** yang memutar video YouTube (iframe embed) tanpa iklan popup yang mengganggu.
  - Admin di CMS **hanya perlu memasukkan URL YouTube** (misal `https://www.youtube.com/watch?v=ABC123xyz` atau `https://youtu.be/ABC123xyz`); sistem otomatis mem-parse YouTube ID dan menyajikan thumbnail.

---

#### 2.8 — Admin CMS Dashboard (`/admin/*`)
> **Story**: Sebagai Staf Humas / Administrator Sekolah, saya ingin memiliki panel pengelolaan konten yang bersih, aman, dan mudah digunakan untuk memperbarui data website tanpa memerlukan keahlian koding.

**Kriteria Penerimaan:**
- **Autentikasi & Otorisasi**:
  - Login menggunakan email dan password yang terenkripsi.
  - Token Sanctum SPA aman dengan proteksi CSRF & rate-limiting login (max 5 percobaan gagal per menit).
  - Peran Pengguna: `Super Admin` (akses penuh termasuk kelola user) dan `Editor / Staf Humas` (kelola konten).
- **Modul Pengelolaan Konten (CRUD Lengkap)**:
  1. **Kelola Berita & Pengumuman**: Pembuatan draft, publikasi, editor teks kaya (TipTap), upload cover berita, penentuan kategori.
  2. **Kelola Pengurus & GTK**: Tambah/edit nama guru, jabatan, kategori (pimpinan/guru/staf), upload foto, dan urutan ranking tampil.
  3. **Kelola Prestasi**: Form isian prestasi lengkap dengan tingkat kejuaraan, tahun perolehan, nama peraih, dan foto dokumentasi.
  4. **Kelola Program Keahlian (Jurusan)**: Form edit profil jurusan, peluang kerja, kaprog, dan daftar mitra industri.
  5. **Kelola Galeri Foto**: Buat album, multi-upload gambar kegiatan, hapus foto.
  6. **Kelola Galeri Video YouTube**: Cukup input URL YouTube, judul, dan deskripsi ringkas.
  7. **Kelola Halaman Statis & Kontak**: Edit profil, visi-misi, nomor WhatsApp admin/PPDB, email, dan alamat.
- **Dasbor Metrik & Ringkasan**:
  - Menampilkan ringkasan: Total Berita, Draft Tersimpan, Total Guru/Pengurus, Total Prestasi, Jumlah Video, dan Total Foto.
- **Audit Logging Ringkas**: Menyimpan riwayat siapa yang melakukan perubahan konten dan waktu pembaruan.

---

### Non-Goals (Out of Scope for MVP)
Fitur berikut secara eksplisit **dikeluarkan dari lingkup MVP** demi menjamin peluncuran tepat waktu dalam 1 bulan:
- ❌ Sistem PPDB Online Full / Pembayaran Formulir (hanya disediakan tombol kontak informasi PPDB via WhatsApp).
- ❌ Learning Management System (LMS) / Pengumpulan Tugas / Rapor Online Siswa.
- ❌ Portal Login Khusus Siswa & Orang Tua (Portal Akademik/SIAKAD).
- ❌ Chatbot AI otomatis atau live chat widget pihak ketiga yang berbayar.
- ❌ Aplikasi Mobile (Android/iOS) native.
- ❌ Hosting file video mentah (.mp4) di server VPS (wajib menggunakan YouTube embed).

---

## 3. Technical Specifications

### 3.1 Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                 CLIENT LAYER                                     │
│                     React 18+ (Vite) — Tailwind CSS + shadcn/ui                  │
│                                                                                  │
│   Public Portal:                                  Admin CMS Dashboard:           │
│   ├── Beranda (Hero, Bento, Highlights)           ├── Auth & Role Guard          │
│   ├── Berita & Detail (SEO / OG Meta)             ├── Berita & Pengumuman CRUD   │
│   ├── Profil & Visi Misi                          ├── Pengurus & GTK CRUD        │
│   ├── Program Keahlian (Jurusan)                  ├── Prestasi Siswa & Guru CRUD │
│   ├── Direktori Pengurus & Guru                   ├── Video YouTube CRUD         │
│   ├── Prestasi Siswa & Sekolah                    ├── Galeri Foto & Album CRUD   │
│   ├── Galeri (Foto Lightbox + YouTube Player)     └── Pengaturan Kontak & Web    │
│   └── Floating WhatsApp Action Button                                            │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │ HTTPS / REST JSON (Sanctum SPA Auth)
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                BACKEND LAYER                                     │
│                             Laravel 11 REST API                                  │
│                                                                                  │
│   ├── Routing & Middleware (Sanctum, RoleCheck, RateLimiting, Cors)              │
│   ├── Controllers (News, Staff, Achievements, Videos, Majors, Galleries, Pages)   │
│   ├── Services & Utilities:                                                      │
│   │   ├── YouTubeUrlParser (Ekstrak ID & Fallback Thumbnail)                     │
│   │   ├── ImageOptimizationService (Intervention Image v3 → Auto WebP)          │
│   │   └── OpenGraphCrawlerMiddleware (Layanan Meta Preview untuk Bot WhatsApp)   │
│   └── Eloquent ORM & Database Migrations                                         │
└───────────────────┬──────────────────────────────────────────────┬───────────────┘
                    │ PDO Connection                               │ Public Stream
                    ▼                                              ▼
┌──────────────────────────────────────┐       ┌───────────────────────────────────┐
│           DATABASE LAYER             │       │         EXTERNAL SERVICES         │
│            PostgreSQL 16             │       │                                   │
│  users, staff_members, news,         │       │  • YouTube API / oEmbed           │
│  categories, achievements, videos,   │       │  • WhatsApp Click-to-Chat API     │
│  majors, albums, gallery_images      │       │  • Local Storage (Storage Link)   │
└──────────────────────────────────────┘       └───────────────────────────────────┘
```

---

### 3.2 Tech Stack

| Layer | Teknologi | Versi | Alasan Pemilihan |
|---|---|---|---|
| **Frontend Framework** | React (Vite) | 18.x / 19 | Performa build secepat kilat, SPA responsif, ekosistem UI melimpah. |
| **Styling & Design System** | Tailwind CSS + shadcn/ui | v3.4+ / Radix | Konsisten dengan *DESIGN.md*, fleksibel, bento grid modern, ringan. |
| **Font Institusi** | Plus Jakarta Sans & JetBrains Mono | Google Fonts | Sans-serif profesional berkarakter dan monospaced untuk kode/NPSN/angka. |
| **Backend Framework** | Laravel | 11.x | Robust RESTful API, arsitektur MVC rapi, validasi data kuat, ekosistem Eloquent terbaik. |
| **Authentication** | Laravel Sanctum | Built-in | Keamanan autentikasi SPA dengan HTTP-only cookies / Bearer token. |
| **Database** | PostgreSQL | 16.x | RDBMS enterprise, handal, performa query relasional dan indexing teks tinggi. |
| **Media Processing** | Intervention Image | v3.x | Konversi otomatis gambar unggahan ke format WebP terkompresi. |
| **Video Integration** | YouTube Embed Player | Iframe API | Zero VPS storage cost, streaming lancar di semua perangkat. |
| **Rich Text Editor** | TipTap | v2.x | Headless WYSIWYG editor modern, output HTML bersih untuk artikel berita. |
| **Deployment Target** | VPS Ubuntu 22.04 LTS | Nginx + PHP 8.3 FPM | Kontrol penuh, biaya terukur, performa stabil untuk website sekolah. |

---

### 3.3 Database Schema (PostgreSQL 16)

#### 1. `users` (Admin & Editor)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PK | Identitas unik user |
| `name` | VARCHAR(255) | NOT NULL | Nama staf admin |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Alamat email login |
| `password` | VARCHAR(255) | NOT NULL | Hash Bcrypt (cost factor ≥ 12) |
| `role` | VARCHAR(50) | DEFAULT 'editor' | `super_admin`, `editor` |
| `is_active` | BOOLEAN | DEFAULT TRUE | Status akun aktif |
| `created_at` | TIMESTAMP | | Waktu pembuatan |
| `updated_at` | TIMESTAMP | | Waktu pembaruan |

#### 2. `categories` (Kategori Berita)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PK | Identitas kategori |
| `name` | VARCHAR(100) | NOT NULL | Nama kategori (contoh: "Pengumuman", "Kegiatan") |
| `slug` | VARCHAR(100) | UNIQUE, NOT NULL | URL slug ramah SEO |
| `created_at` | TIMESTAMP | | Waktu pembuatan |

#### 3. `news` (Berita & Artikel)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PK | Identitas artikel |
| `title` | VARCHAR(255) | NOT NULL | Judul berita |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL slug artikel |
| `excerpt` | VARCHAR(300) | NOT NULL | Ringkasan teks pendek (maks 300 kar) |
| `body` | TEXT | NOT NULL | Konten lengkap (HTML dari TipTap) |
| `featured_image` | VARCHAR(500) | NOT NULL | Lokasi file gambar sampul (WebP) |
| `status` | VARCHAR(50) | DEFAULT 'draft' | `draft`, `published` |
| `is_pinned` | BOOLEAN | DEFAULT FALSE | Apakah disematkan di beranda |
| `views_count` | INT | DEFAULT 0 | Jumlah pembaca artikel |
| `category_id` | BIGINT | FK → `categories.id` | Relasi kategori berita |
| `author_id` | BIGINT | FK → `users.id` | Relasi penulis/admin pengunggah |
| `published_at` | TIMESTAMP | NULLABLE | Waktu rilis publikasi |
| `created_at` | TIMESTAMP | | Waktu pembuatan |
| `updated_at` | TIMESTAMP | | Waktu pembaruan |

#### 4. `majors` (Program Keahlian / Jurusan SMK)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PK | Identitas jurusan |
| `name` | VARCHAR(255) | NOT NULL | Nama jurusan (contoh: "Rekayasa Perangkat Lunak") |
| `abbreviation` | VARCHAR(50) | NOT NULL | Singkatan (contoh: "RPL", "TKJ") |
| `slug` | VARCHAR(100) | UNIQUE, NOT NULL | Slug URL jurusan |
| `short_description` | VARCHAR(500) | NOT NULL | Penjelasan ringkas untuk kartu bento |
| `full_description` | TEXT | NOT NULL | Deskripsi lengkap, kurikulum, fasilitas |
| `career_prospects` | JSONB | NULLABLE | Array daftar prospek kerja lulusan |
| `industry_partners` | JSONB | NULLABLE | Array nama/logo mitra industri DUDI |
| `featured_image` | VARCHAR(500) | NOT NULL | Foto kegiatan lab/jurusan |
| `order_index` | INT | DEFAULT 0 | Urutan tampilan di beranda/halaman |
| `is_active` | BOOLEAN | DEFAULT TRUE | Status ketersediaan jurusan |
| `created_at` | TIMESTAMP | | Waktu pembuatan |
| `updated_at` | TIMESTAMP | | Waktu pembaruan |

#### 5. `staff_members` (Pengurus, Guru & Tenaga Kependidikan)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PK | Identitas staf/guru |
| `name` | VARCHAR(255) | NOT NULL | Nama lengkap beserta gelar (contoh: "Drs. H. Ahmad Dahlan, M.Pd.") |
| `nip_nuptk` | VARCHAR(50) | NULLABLE | Nomor identitas resmi guru (opsional) |
| `position` | VARCHAR(255) | NOT NULL | Jabatan / Mata Pelajaran (contoh: "Kepala Sekolah", "Guru Produktif RPL") |
| `category` | VARCHAR(50) | NOT NULL | `pimpinan`, `guru`, `staf` |
| `major_id` | BIGINT | FK → `majors.id` (NULLABLE) | Relasi jika guru kejuruan tertentu |
| `photo` | VARCHAR(500) | NULLABLE | Lokasi file foto formal portrait |
| `email` | VARCHAR(255) | NULLABLE | Email resmi (opsional) |
| `order_index` | INT | DEFAULT 0 | Urutan penomoran untuk sorting pimpinan/staf |
| `is_active` | BOOLEAN | DEFAULT TRUE | Status guru aktif |
| `created_at` | TIMESTAMP | | Waktu pembuatan |
| `updated_at` | TIMESTAMP | | Waktu pembaruan |

#### 6. `achievements` (Prestasi Siswa, Guru & Sekolah)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PK | Identitas prestasi |
| `title` | VARCHAR(255) | NOT NULL | Nama capaian (contoh: "Juara 1 LKS Web Technologies 2026") |
| `recipient_name` | VARCHAR(255) | NOT NULL | Nama siswa/tim/guru peraih prestasi |
| `recipient_type` | VARCHAR(50) | DEFAULT 'siswa' | `siswa`, `guru`, `sekolah` |
| `competition_name` | VARCHAR(255) | NOT NULL | Nama event/kejuaraan |
| `level` | VARCHAR(50) | NOT NULL | `kecamatan`, `kota`, `provinsi`, `nasional`, `internasional` |
| `rank_title` | VARCHAR(100) | NOT NULL | Gelar juara (contoh: "Juara 1", "Medali Emas", "Harapan 1") |
| `year` | INT | NOT NULL | Tahun perolehan (contoh: 2026) |
| `photo` | VARCHAR(500) | NULLABLE | Foto dokumentasi piala/penyerahan |
| `description` | TEXT | NULLABLE | Keterangan tambahan mengenai perlombaan |
| `is_featured` | BOOLEAN | DEFAULT FALSE | Apakah ditampilkan di beranda (*highlight*) |
| `created_at` | TIMESTAMP | | Waktu pembuatan |
| `updated_at` | TIMESTAMP | | Waktu pembaruan |

#### 7. `videos` (Galeri Video YouTube)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PK | Identitas video |
| `title` | VARCHAR(255) | NOT NULL | Judul video kegiatan |
| `youtube_url` | VARCHAR(500) | NOT NULL | URL asli yang dimasukkan admin |
| `youtube_id` | VARCHAR(50) | NOT NULL | ID 11-karakter video YouTube (otomatis diekstrak) |
| `custom_thumbnail` | VARCHAR(500) | NULLABLE | Foto thumbnail alternatif (opsional) |
| `description` | TEXT | NULLABLE | Ringkasan isi video |
| `published_date` | DATE | NULLABLE | Tanggal kegiatan/rilis video |
| `order_index` | INT | DEFAULT 0 | Urutan tampil |
| `is_featured` | BOOLEAN | DEFAULT FALSE | Video utama yang disorot di beranda |
| `is_active` | BOOLEAN | DEFAULT TRUE | Status video aktif |
| `created_at` | TIMESTAMP | | Waktu pembuatan |
| `updated_at` | TIMESTAMP | | Waktu pembaruan |

#### 8. `albums` (Album Galeri Foto)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PK | Identitas album |
| `name` | VARCHAR(255) | NOT NULL | Nama album (contoh: "PPDB & MPLS 2026") |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | Slug URL album |
| `description` | TEXT | NULLABLE | Deskripsi album foto |
| `cover_image` | VARCHAR(500) | NULLABLE | Foto sampul album |
| `created_at` | TIMESTAMP | | Waktu pembuatan |
| `updated_at` | TIMESTAMP | | Waktu pembaruan |

#### 9. `gallery_images` (Foto di Dalam Album)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PK | Identitas gambar |
| `album_id` | BIGINT | FK → `albums.id` (CASCADE) | Relasi ke album |
| `image_path` | VARCHAR(500) | NOT NULL | Lokasi file foto WebP |
| `caption` | VARCHAR(255) | NULLABLE | Keterangan foto |
| `order_index` | INT | DEFAULT 0 | Urutan foto dalam album |
| `created_at` | TIMESTAMP | | Waktu pembuatan |

#### 10. `pages` (Konten Halaman Statis)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PK | Identitas halaman |
| `key` | VARCHAR(100) | UNIQUE, NOT NULL | Kunci unik (`profile`, `vision_mission`, `history`, `facilities`) |
| `title` | VARCHAR(255) | NOT NULL | Judul bagian |
| `content` | JSONB | NOT NULL | Payload terstruktur (HTML/JSON konten) |
| `updated_by` | BIGINT | FK → `users.id` | User terakhir yang mengedit |
| `updated_at` | TIMESTAMP | | Waktu pembaruan |

#### 11. `settings` (Konfigurasi Global Website)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PK | Identitas setting |
| `key` | VARCHAR(100) | UNIQUE, NOT NULL | Misal: `school_phone`, `whatsapp_number`, `school_email`, `address`, `npsn`, `social_links` |
| `value` | TEXT | NOT NULL | Nilai pengaturan |
| `updated_at` | TIMESTAMP | | Waktu pembaruan |

---

### 3.4 API Endpoints Specification

#### Public API Endpoints (Tanpa Autentikasi — Read-Only)
| Method | Endpoint | Deskripsi & Parameter |
|---|---|---|
| `GET` | `/api/news` | Daftar berita publik (`?page=1&category=slug&search=keyword&limit=9`) |
| `GET` | `/api/news/{slug}` | Detail berita tunggal beserta 3 berita terkait |
| `GET` | `/api/categories` | Daftar semua kategori berita aktif |
| `GET` | `/api/majors` | Daftar seluruh program keahlian |
| `GET` | `/api/majors/{slug}` | Detail program keahlian, kurikulum, dan mitra industri |
| `GET` | `/api/staff` | Daftar pengurus & guru (`?category=pimpinan/guru/staf&major=id`) |
| `GET` | `/api/achievements` | Daftar prestasi (`?level=nasional&year=2026&recipient_type=siswa`) |
| `GET` | `/api/achievements/featured` | 3 prestasi unggulan untuk beranda |
| `GET` | `/api/videos` | Daftar video kegiatan YouTube (`?page=1&limit=6`) |
| `GET` | `/api/videos/featured` | Video YouTube sorotan utama beranda |
| `GET` | `/api/albums` | Daftar album foto beserta jumlah foto & cover |
| `GET` | `/api/albums/{slug}/images` | Daftar seluruh foto dalam satu album |
| `GET` | `/api/pages/{key}` | Mendapatkan konten statis (profil, visi-misi) |
| `GET` | `/api/settings` | Pengaturan publik (NPSN, alamat, WhatsApp, sosmed) |

#### Admin API Endpoints (Wajib Autentikasi Sanctum Bearer Token)
| Method | Endpoint | Peran Akses | Deskripsi |
|---|---|---|---|
| `POST` | `/api/auth/login` | Publik (Rate-limited) | Login admin & perolehan token |
| `POST` | `/api/auth/logout` | All Admin | Logout & revocasi token |
| `GET` | `/api/auth/me` | All Admin | Cek profil user login & peran |
| `GET` | `/api/admin/dashboard-stats` | All Admin | KPI counter berita, prestasi, guru, video, foto |
| `GET/POST` | `/api/admin/news` | All Admin | List kelola / Tambah berita baru |
| `GET/PUT/DELETE` | `/api/admin/news/{id}` | All Admin | Detail / Update / Hapus berita |
| `GET/POST` | `/api/admin/staff` | All Admin | List kelola / Tambah pengurus & guru |
| `GET/PUT/DELETE` | `/api/admin/staff/{id}` | All Admin | Detail / Update / Hapus pengurus |
| `GET/POST` | `/api/admin/achievements` | All Admin | List kelola / Tambah prestasi baru |
| `GET/PUT/DELETE` | `/api/admin/achievements/{id}` | All Admin | Detail / Update / Hapus prestasi |
| `GET/POST` | `/api/admin/videos` | All Admin | List kelola / Tambah video YouTube |
| `GET/PUT/DELETE` | `/api/admin/videos/{id}` | All Admin | Detail / Update / Hapus video YouTube |
| `GET/POST` | `/api/admin/majors` | Super Admin | Kelola dan update data jurusan |
| `GET/PUT/DELETE` | `/api/admin/majors/{id}` | Super Admin | Detail / Update / Hapus jurusan |
| `GET/POST` | `/api/admin/albums` | All Admin | Kelola album galeri foto |
| `POST` | `/api/admin/albums/{id}/images` | All Admin | Multi-upload foto ke dalam album |
| `DELETE` | `/api/admin/images/{id}` | All Admin | Hapus foto tertentu |
| `PUT` | `/api/admin/pages/{key}` | Super Admin | Update teks profil / visi-misi |
| `PUT` | `/api/admin/settings` | Super Admin | Update nomor WhatsApp, medsos, alamat |
| `GET/POST` | `/api/admin/users` | Super Admin | Kelola akun staf editor CMS |

---

### 3.5 Security, SEO & Media Handling

1. **YouTube URL Parser Logic**:
   - Sistem backend Laravel menyediakan helper function yang mampu menerima berbagai variasi link YouTube:
     - `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
     - `https://youtu.be/dQw4w9WgXcQ`
     - `https://www.youtube.com/shorts/dQw4w9WgXcQ`
   - Regex mengekstrak ID video 11 karakter (`dQw4w9WgXcQ`).
   - Default thumbnail otomatis menggunakan CDN resmi YouTube: `https://img.youtube.com/vi/{id}/hqdefault.jpg`.

2. **Optimasi Gambar Otomatis (Intervention Image v3)**:
   - Setiap foto berita, pengurus, atau galeri yang diunggah oleh admin dikonversi ke format **WebP** dengan batas resolusi maksimum 1920px (lebar) dan kualitas kompresi 82%.
   - Mengurangi ukuran file hingga 70-80% tanpa mengurangi ketajaman visual, menghemat kapasitas disk VPS secara signifikan.

3. **Open Graph & WhatsApp Link Preview Handling**:
   - Masalah: Bot WhatsApp/Facebook tidak mengeksekusi JavaScript React SPA.
   - Solusi: Endpoint backend Laravel menyediakan middleware route `/share/news/{slug}` atau Nginx mapping khusus untuk bot crawler (`facebookexternalhit`, `WhatsApp`, `Twitterbot`).
   - Saat bot mengakses tautan berita/prestasi, server langsung menyajikan tag HTML Open Graph statis (`og:title`, `og:image`, `og:description`), lalu segera me-redirect user manusia ke antarmuka React SPA.

4. **Keamanan Autentikasi**:
   - Password di-hash menggunakan algoritma Bcrypt.
   - Endpoint login dibatasi (*rate-limited*) maksimal 5 percobaan per menit per alamat IP untuk mencegah serangan *brute force*.
   - CORS dan Content Security Policy (CSP) dikonfigurasi ketat agar hanya domain resmi sekolah yang dapat melakukan request ke API admin.

---

## 4. Risks & Phased Roadmap

### 4.1 Analisis Risiko & Mitigasi

| Risiko | Tingkat Risiko | Dampak | Strategi Mitigasi |
|---|---|---|---|
| **Staf admin mengunggah foto kamera berukuran besar (10-20MB)** | Tinggi | Sedang | Kompresi otomatis di backend menggunakan Intervention Image (WebP) dan limit upload 5MB di frontend. |
| **Link video YouTube salah ketik atau private** | Sedang | Rendah | Validasi pola URL regex YouTube pada form CMS dan preview thumbnail instan sebelum disimpan. |
| **Penyimpanan disk VPS penuh** | Sedang | Tinggi | Video tidak disimpan di VPS (via YouTube). Foto dikompresi WebP. Sediakan cron job pembersihan file temporary. |
| **Koneksi internet lambat saat akses galeri foto** | Rendah | Sedang | Implementasi *Lazy Loading* (`loading="lazy"`) dan thumbnail resolusi adaptif. |

---

### 4.2 Phased Roadmap

#### 🚀 MVP (Bulan 1) — Portal Informasi Dinamis Lengkap
- [ ] **Setup & Infrastruktur**: Setup project React (Vite) + Tailwind + shadcn/ui dan Laravel 11 API + PostgreSQL 16.
- [ ] **Sistem Autentikasi & CMS**: Login aman, proteksi rute, dasbor ringkasan staf admin.
- [ ] **Modul Berita**: CRUD berita, kategori, rich-text TipTap, halaman list, halaman detail, WhatsApp share card.
- [ ] **Modul Pengurus & GTK**: CRUD data staf, kategori pimpinan/guru/staf, foto formal, halaman direktori pengurus.
- [ ] **Modul Prestasi**: CRUD prestasi, filter tingkat/tahun, lencana medali, showcase di beranda & halaman prestasi.
- [ ] **Modul Video YouTube**: CRUD link video, parser otomatis ID YouTube, galeri video, responsive modal player.
- [ ] **Modul Galeri Foto**: CRUD album, multi-upload gambar, lightbox interaktif.
- [ ] **Modul Program Keahlian (Jurusan)**: Tampilan bento jurusan, detail kompetensi & mitra DUDI.
- [ ] **Halaman Profil & Visi Misi**: Teks sambutan, sejarah, fasilitas, dan visi-misi sekolah.
- [ ] **Floating WhatsApp CTA**: Integrasi tombol chat konsultasi/PPDB langsung ke petugas sekolah.
- [ ] **Deployment**: Konfigurasi Nginx, Certbot SSL Let's Encrypt, Supervisor, dan migrasi database ke VPS.

#### 📈 v1.1 (Bulan 2–3) — Pengayaan & Interaktivitas
- [ ] Fitur unduhan publik (*Download Center*) untuk brosur PPDB dan kalender akademik (PDF).
- [ ] Fitur pencarian menyeluruh (*Global Search*) pada seluruh konten website.
- [ ] Tracking analitik pengunjung (Google Analytics 4 / Umami Analytics terintegrasi di dasbor CMS).
- [ ] Filter direktori guru berdasarkan mata pelajaran dan jurusan.

#### 🌟 v2.0 (Bulan 4–6) — Layanan Sekolah Digital
- [ ] Formulir Pendaftaran Siswa Baru (PPDB Online) dengan upload berkas dan verifikasi data calon siswa.
- [ ] Integrasi kalender agenda kegiatan akademik interaktif.
- [ ] Fitur Kotak Saran / Pengaduan daring dengan notifikasi ke tim Humas.

---

## 5. Resolved Decisions

| # | Parameter | Keputusan Final |
|---|---|---|
| 1 | **Server & Infrastruktur** | VPS sekolah yang sudah ada (Ubuntu 22.04 LTS, Nginx, PHP 8.3 FPM, PostgreSQL 16). |
| 2 | **Penyimpanan Video** | **100% YouTube Embed**. Server VPS tidak melayani streaming file video langsung. |
| 3 | **Penyimpanan Gambar** | Local Disk VPS terproteksi di folder `storage/app/public` dengan konversi otomatis ke WebP. |
| 4 | **Peran Pengurus** | Dibagi menjadi 3 kategori: *Pimpinan Sekolah*, *Guru*, dan *Tenaga Kependidikan (Staf TU)*. |
| 5 | **Saluran Komunikasi Cepat** | Menggunakan tombol WhatsApp Click-to-Chat langsung ke nomor resmi sekolah. |
| 6 | **Domain & SSL** | Menggunakan domain resmi sekolah (`smkalmuhtadin.sch.id`) dengan SSL gratis Let's Encrypt. |

---

*Dokumen PRD Versi 2.0 ini telah disetujui dan menjadi acuan utama pengembangan teknis rekayasa perangkat lunak.*
