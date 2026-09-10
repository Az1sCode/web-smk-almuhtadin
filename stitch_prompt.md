# Stitch Generation Prompts: SMK Al-Muhtadin Official School Website

> **Compilation of Screen Prompts for Google Stitch**. Aligned with [`DESIGN.md`](file:///C:/Users/USER/Documents/Azis/Web/web-smkalmuhtadin/DESIGN.md) and [`prd_smkalmuhtadin.md`](file:///C:/Users/USER/Documents/Azis/Web/web-smkalmuhtadin/prd_smkalmuhtadin.md) (v2.0).

---

## 1. Home Page (`/`)

```markdown
A prestigious, minimalist official school homepage for "SMK Al-Muhtadin" featuring an architectural hero container, asymmetric bento showcases for majors, achievements, news, YouTube video highlight, and floating WhatsApp contact button.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (responsive single-column collapse < 768px)
- Theme: Light, Minimalist Academic Sanctuary
- Background: Canvas Slate (#F8FAFC)
- Card Surfaces: Pure Surface (#FFFFFF) with 1px border (rgba(226, 232, 240, 0.8)), 24px rounded corners, and soft diffused whisper shadow
- Primary Accent: Deep Royal Navy (#103EA5) for dominant headers, primary CTA buttons, and active tabs
- Interactive Variant: Vibrant Azure (#3D6BF5) for hover states, category pills, and focus rings
- Secondary Accent: Prestige Gold (#E5B62A) for "Akreditasi A" badge and achievement medals
- Text Primary: Charcoal Ink (#0F172A), Text Secondary: Muted Slate (#64748B)
- Typography: Plus Jakarta Sans (Display & Body), JetBrains Mono (Dates, NPSN, Stats)
- Anti-Patterns: No emojis, no Inter font, no pure black (#000000), no neon gradients, no 3-equal card rows

**Page Structure:**
1. **Header Navigation:** Sticky frosted glass navbar (backdrop-blur-md bg-white/70 border-b border-slate-200/80) with school logo & text brand "SMK Al-Muhtadin" in bold Deep Royal Navy (#103EA5) on the left; navigation links (Beranda, Profil, Jurusan, Pengurus, Prestasi, Berita, Galeri) in the center with "Beranda" marked as active with a bottom accent dot; and a Prestige Gold (#E5B62A) "Info PPDB" pill button (text-slate-950 px-5 py-2 font-bold hover:scale-105 transition-all) on the right. Collapses to mobile drawer < 768px.
2. **Hero Section:** Large rounded container (rounded-3xl) framing school architecture photo with subtle bottom gradient scrim, floating frosted pill badge ("SMK Al-Muhtadin • Terakreditasi A"), bold headline ("Membentuk Generasi Unggul, Berkarakter & Siap Kerja"), and primary CTA buttons ("Jelajahi Jurusan ↗" and "Kontak PPDB").
3. **Stats Counter Strip:** Minimalist horizontal metrics bar with vertical 1px divider lines (3 Program Keahlian, 1,200+ Siswa Aktif, 100% Guru Tersertifikasi, A Terakreditasi).
4. **About & Principal Snippet (Bento 2-Column):** Left column with institutional narrative and Principal quote with photo avatar; Right column featuring a 2-tier stacked image bento of modern computer labs and student workshop activities.
5. **Major Programs (Jurusan):** 3 asymmetric bento cards for TKJ (Teknik Komputer & Jaringan), RPL (Rekayasa Perangkat Lunak), and Akuntansi with curriculum chips and interactive (↗) action pills.
6. **Latest News (Kabar Terkini):** Asymmetric header ("Kabar Terkini Al-Muhtadin") with a 3-card editorial news grid showing JetBrains Mono timestamps, category chips, headline clamp, and "Lihat Semua Berita ↗" button.
7. **Featured Achievements (Sorotan Prestasi):** Bento grid showcasing 3 top awards with Prestige Gold rank badges ("Juara 1 LKS Web Technologies 2026", "Medali Emas O2SN"), winner attributions in monospace, and "Lihat Semua Prestasi ↗" button.
8. **YouTube Video Highlight:** 16:9 widescreen featured video banner of school profile with centered circular white play pill button, monospace duration, and interactive modal player on click.
9. **Floating WhatsApp Pill:** Fixed bottom-right Emerald pill (#25D366) with WhatsApp icon and text "Tanya PPDB / Informasi" with subtle status ping indicator.
10. **Footer:** Midnight Navy (#0A1931) contrast footer featuring: (1) School logo, title "SMK Al-Muhtadin", contact info (Jl. Raya Al-Muhtadin, Depok, Telp: (021) 12345678, Email: info@smkalmuhtadin.sch.id), and NPSN: 20214589 in JetBrains Mono font. (2) Quick links in white/80 with Azure (#3D6BF5) hovers. (3) "Ikuti Kami" social link row (Facebook, Instagram, YouTube, X). (4) Centered copyright bar "© 2026 SMK Al-Muhtadin. Hak Cipta Dilindungi Undang-Undang".
```

---

## 2. News Index & Category Filter Page (`/berita`)

```markdown
A clean, editorial news and announcements catalog for "SMK Al-Muhtadin" with search, category filtering, and a paginated bento article grid.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (responsive single-column collapse < 768px)
- Theme: Light, Minimalist Editorial
- Background: Canvas Slate (#F8FAFC)
- Card Surfaces: Pure Surface (#FFFFFF) with 1px border (rgba(226, 232, 240, 0.8)) and 20px rounded corners
- Primary Accent: Deep Royal Navy (#103EA5) for active category pill and card title hovers
- Interactive Variant: Vibrant Azure (#3D6BF5) for search focus ring and link hovers
- Secondary Accent: Prestige Gold (#E5B62A) for featured announcement badges
- Text Primary: Charcoal Ink (#0F172A), Text Secondary: Muted Slate (#64748B)
- Typography: Plus Jakarta Sans (Headings & Body), JetBrains Mono (Dates, Badges, Pagination)

**Page Structure:**
1. **Header Navigation:** Active link "Berita".
2. **Page Header & Search Bar:** Clean left-aligned display heading ("Berita & Pengumuman") with subtitle and integrated search input field.
3. **Category Filter Tabs:** Horizontal scrollable pill filters ("Semua", "Pengumuman", "Kegiatan", "Prestasi", "Artikel").
4. **Featured Hero Article:** 2-column asymmetric featured card with large landscape cover photo, category badge, and read button.
5. **Article Grid (9 Items):** 3-column responsive grid with aspect-[16/10] thumbnails, monospace date, 2-line title clamp, and excerpt.
6. **Numeric Pagination:** Centered pagination controls with JetBrains Mono numbers and arrow navigation.
7. **Floating WhatsApp Pill & Footer.**
```

---

## 3. News Detail Page (`/berita/:slug`)

```markdown
A distraction-free, long-form editorial article reading page for "SMK Al-Muhtadin" with rich typography, author metadata, social share buttons, and related news cards.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (max-w-4xl reading container)
- Theme: Light, Distraction-Free Editorial
- Background: Canvas Slate (#F8FAFC)
- Surface: Pure Surface (#FFFFFF)
- Primary Accent: Deep Royal Navy (#103EA5)
- Text Primary: Charcoal Ink (#0F172A, relaxed 1.75 line-height, max 65ch width)
- Typography: Plus Jakarta Sans (Display & Body), JetBrains Mono (Date, Author tag)

**Page Structure:**
1. **Header Navigation & Breadcrumbs:** ("Beranda / Berita / Pengumuman / Judul Berita").
2. **Article Header:** Category pill badge, large headline, and author metadata row (Author avatar, name "Humas Al-Muhtadin", publication date in JetBrains Mono, and reading time).
3. **Featured Image Container:** High-res hero image with optional photo caption below.
4. **Article Body (Rich Text):** TipTap-styled typography layout (H2, H3, blockquote with 4px Azure left border, styled lists, and embedded callouts).
5. **Share & Back Row:** "← Kembali ke Semua Berita" outline pill button and social share action icons (WhatsApp, Facebook, Copy Link).
6. **Related Articles Section:** 3-column compact card row titled "Berita Terkait Lainnya".
7. **Footer.**
```

---

## 4. Profile & Vision-Mission Page (`/profil` & `/visi-misi`)

```markdown
An institutional school profile page for "SMK Al-Muhtadin" featuring school credentials, principal welcome letter, history timeline, vision-mission, and core pillars.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (responsive collapse < 768px)
- Theme: Light, Minimalist Institutional
- Background: Canvas Slate (#F8FAFC)
- Card Surfaces: Pure Surface (#FFFFFF) with 24px rounded corners
- Primary Accent: Deep Royal Navy (#103EA5)
- Secondary Accent: Prestige Gold (#E5B62A) for official accreditation emblem & NPSN banner
- Typography: Plus Jakarta Sans (Headings & Body), JetBrains Mono (NPSN: 20214589, metrics)

**Page Structure:**
1. **Header Navigation:** Active link "Profil".
2. **Page Hero Banner:** Centered credentials bar (NPSN: 20214589, Akreditasi A, Berdiri sejak 1998).
3. **Principal's Welcome:** Split layout with formal portrait of Principal ("Drs. H. Ahmad Dahlan, M.Pd.") on left and signed welcome letter on right.
4. **Vision & Mission Bento:** Hero vision statement card in subtle navy tint paired with a 2-column numbered mission grid ("01", "02", "03" in JetBrains Mono).
5. **Core Values Pill Strip:** 4 pillars (Integritas, Profesional, Religius, Inovatif).
6. **School History & Milestones Timeline.**
7. **Footer.**
```

---

## 5. Major Programs Page (`/jurusan`)

```markdown
A comprehensive showcase of SMK Al-Muhtadin's vocational majors (TKJ, RPL, Akuntansi) detailing core competencies, lab facilities, career pathways, and industry partners (Mitra DUDI).

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: High-Agency Technical Showcase
- Background: Canvas Slate (#F8FAFC)
- Card Surfaces: Pure Surface (#FFFFFF) with 24px rounded corners
- Typography: Plus Jakarta Sans, JetBrains Mono (Competency codes)

**Page Structure:**
1. **Header Navigation:** Active link "Jurusan".
2. **Page Header:** Title "Program Keahlian Unggulan" with introductory text on industry-aligned vocational education.
3. **Major Selector Tabs:** Pill tabs for "Semua Jurusan", "Rekayasa Perangkat Lunak (RPL)", "Teknik Komputer & Jaringan (TKJ)", "Akuntansi Keuangan Lembaga (AKL)".
4. **Major Bento Deep Dive:**
   - Left 60%: High-res lab photo, major overview, head of program (Kaprog) avatar with name, and key learning modules.
   - Right 40%: Graduate career tracks checklist and "Mitra Industri (DUDI)" partner company logo row.
5. **Call-To-Action Card:** "Tertarik dengan Jurusan Ini? Konsultasikan di WhatsApp PPDB ↗" in Deep Royal Navy.
6. **Footer.**
```

---

## 6. Faculty & Leadership Directory Page (`/pengurus`)

```markdown
An elegant, organized directory of school leadership, educators, and staff for "SMK Al-Muhtadin" with category filters and formal portrait cards.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (grid 4 cols desktop, 2 tablet, 1 mobile)
- Theme: Prestigious Academic Directory
- Background: Canvas Slate (#F8FAFC)
- Card Surfaces: Pure Surface (#FFFFFF) with 1px border and 20px rounded corners
- Typography: Plus Jakarta Sans (Teacher names), JetBrains Mono (NUPTK, Position tags)

**Page Structure:**
1. **Header Navigation:** Active link "Pengurus".
2. **Page Header:** Display title ("Pimpinan, Guru & Tenaga Kependidikan") with subtitle emphasizing certified professional faculty.
3. **Category Filter Tabs:** Pill switcher ("Semua", "Pimpinan Sekolah", "Guru Produktif Kejuruan", "Guru Normatif & Adaptif", "Staf Tata Usaha").
4. **Leadership Spotlight Row (Pimpinan):** Larger portrait cards for Kepala Sekolah and Wakil Kepala Sekolah with official titles.
5. **Faculty & Staff Grid:** 4-column responsive grid where each card features:
   - Aspect 3:4 formal portrait photo with subtle rounded corner.
   - Department badge in JetBrains Mono (e.g. `PRODUKTIF RPL`, `BAHASA INGGRIS`).
   - Full Name with formal academic degrees in bold Plus Jakarta Sans.
   - Position / assignment caption in Muted Slate.
6. **Footer.**
```

---

## 7. Achievements Showcase Page (`/prestasi`)

```markdown
A celebratory, verified awards and achievements catalog for "SMK Al-Muhtadin" students and teachers, featuring level and year filters and Prestige Gold medal badges.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (3-column responsive card grid)
- Theme: Prestigious Achievement Archive
- Background: Canvas Slate (#F8FAFC)
- Card Surfaces: Pure Surface (#FFFFFF) with 20px rounded corners
- Accent: Prestige Gold (#E5B62A) for badges and medals
- Typography: Plus Jakarta Sans (Headings), JetBrains Mono (Years, Ranks, Levels)

**Page Structure:**
1. **Header Navigation:** Active link "Prestasi".
2. **Page Header & Summary Metrics:** Title ("Prestasi & Penghargaan") with 3 quick metric pills: "45+ Penghargaan Nasional", "12 Medali LKS", "100% Peserta Terbimbing".
3. **Filter Control Bar:**
   - Level pills: "Semua Tingkat", "Nasional", "Provinsi", "Kota/Kabupaten".
   - Year dropdown selector: "2026", "2025", "2024".
4. **Featured Grand Champion Card:** Full-width asymmetric card for the most prestigious recent achievement (e.g. Juara 1 LKS Nasional) with photo, trophy highlight, and recipient team quotes.
5. **Achievement Cards Grid (3 Columns):**
   - Aspect 16:10 documentation image.
   - Prestige Gold Rank Badge: ("Juara 1 Tingkat Provinsi").
   - Title of Competition.
   - Winner Attribution: Monospace text with student/teacher name and major.
   - Competition Year in JetBrains Mono.
6. **Numeric Pagination & Footer.**
```

---

## 8. Media Gallery: Photos & YouTube Videos (`/galeri`)

```markdown
A dynamic dual-media gallery for "SMK Al-Muhtadin" with a fluid switcher between Photo Albums (with full-screen Lightbox) and YouTube Video Highlights (with responsive 16:9 Modal Player).

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (responsive masonry & 16:9 video grid)
- Theme: Light, Media Showcase
- Background: Canvas Slate (#F8FAFC)
- Card Surfaces: Pure Surface (#FFFFFF)
- Typography: Plus Jakarta Sans, JetBrains Mono

**Page Structure:**
1. **Header Navigation:** Active link "Galeri".
2. **Media Mode Toggle (Segmented Pill Bar):** Centered high-contrast switcher with icons: `[📷 Foto Kegiatan]` | `[🎬 Video YouTube]`.
3. **View State A — Foto Kegiatan:**
   - Album collection chips ("Semua", "PPDB & MPLS", "Praktikum Lab", "Ekstrakurikuler").
   - Asymmetric Bento Photo Grid with hover scale-105 zoom.
   - Click opens Lightbox Modal with high-res photo, caption, photo counter, and prev/next controls.
4. **View State B — Video YouTube:**
   - 3-column video grid with high-res YouTube thumbnails (`hqdefault.jpg`).
   - Tactile centered circular white play button on each card with hover scale effect.
   - Video title, publication date in JetBrains Mono, and duration badge.
   - Click opens Responsive Modal Video Player embedding the YouTube iframe (16:9) with close button.
5. **Footer.**
```

---

## 9. Admin CMS Dashboard (`/admin/*`)

```markdown
A clean, high-density Admin Content Management Cockpit for "SMK Al-Muhtadin" staff to manage News, Faculty/Staff, Achievements, YouTube Videos, Photo Albums, and General Settings.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop Dashboard (Fixed 260px Sidebar + Main Cockpit)
- Theme: Light, Minimalist Cockpit (Density 7/10)
- Background: Canvas Slate (#F8FAFC)
- Sidebar Surface: Pure Surface (#FFFFFF) with 1px right border
- Primary Accent: Deep Royal Navy (#103EA5)
- Typography: Plus Jakarta Sans (Labels), JetBrains Mono (IDs, Dates, Counters)

**Dashboard Modules & Pages:**
1. **Sidebar Navigation Menu:**
   - Dashboard (Overview KPIs)
   - Berita & Pengumuman
   - Pengurus & Direktori Guru
   - Prestasi Siswa & Guru
   - Program Keahlian (Jurusan)
   - Galeri Foto & Album
   - Video YouTube
   - Pengaturan & Kontak Website
2. **Dashboard Overview (`/admin/dashboard`):**
   - KPI Cards: Total Berita, Total Guru/Staf, Total Prestasi, Total Video YouTube, Total Foto.
   - Quick Action bar: "+ Berita Baru", "+ Guru/Staf", "+ Prestasi", "+ Link Video".
   - Recent Activities & Draft table.
3. **News Management (`/admin/berita`):** Table with search, category filter, draft toggle, and TipTap Rich Text modal editor with image upload.
4. **Staff Management (`/admin/pengurus`):** Form with Name, Title, Category (Pimpinan/Guru/Staf), Photo uploader, and order index sorting.
5. **Achievement Management (`/admin/prestasi`):** Form with Title, Winner Name, Competition Level, Rank/Juara, Year, and Certificate/Trophy photo uploader.
6. **YouTube Video Management (`/admin/videos`):** Form with YouTube URL input (with automatic ID extraction and live thumbnail preview), Title, and Description.
7. **Photo Album Management (`/admin/galeri`):** Album creation and multi-image dropzone with automatic WebP conversion indicator.
```
