# Stitch Generation Prompts: SMK Al-Muhtadin Official School Website

> **Compilation of Screen Prompts for Google Stitch**. Generated using `/enhance-prompt` and aligned with [`DESIGN.md`](file:///C:/Users/USER/Documents/Azis/Web/web-smkalmuhtadin/DESIGN.md) and [`prd_smkalmuhtadin.md`](file:///C:/Users/USER/Documents/Azis/Web/web-smkalmuhtadin/prd_smkalmuhtadin.md).

---

## 1. Home Page (`/`)

```markdown
A prestigious, minimalist official school homepage for "SMK Al-Muhtadin" featuring an architectural hero container, asymmetric bento showcases, and clean academic typography.

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
1. **Header Navigation:** Sticky frosted glass navbar (backdrop-blur-md bg-white/70 border-b border-slate-200/80) with school logo & text brand "SMK Al-Muhtadin" in bold Deep Royal Navy (#103EA5) on the left; navigation links (Beranda, Profil, Visi & Misi, Berita, Galeri) in the center with "Beranda" marked as active in Deep Royal Navy (#103EA5) with a bottom accent dot (other links in Muted Slate #64748B); and a Prestige Gold (#E5B62A) "Info PPDB" pill button (text-slate-950 px-5 py-2 font-bold hover:scale-105 transition-all) on the right. Collapses to a mobile burger menu below 768px.
2. **Hero Section:** Large rounded container (rounded-3xl) framing school architecture photo with subtle bottom gradient scrim, floating frosted pill badge ("SMK Al-Muhtadin • Terakreditasi A"), bold headline ("Membentuk Generasi Unggul, Berkarakter & Siap Kerja"), and primary CTA button ("Lihat Profil Sekolah ↗").
3. **Stats Counter Strip:** Minimalist horizontal metrics bar with vertical 1px divider lines (3 Program Keahlian, 1,200+ Siswa Aktif, 100% Guru Tersertifikasi, A Terakreditasi).
4. **About & Principal Snippet (Bento 2-Column):** Left column with institutional narrative and Principal quote with photo avatar; Right column featuring a 2-tier stacked image bento of modern computer labs and student workshop activities.
5. **Major Programs (Jurusan):** 3 asymmetric bento cards for TKJ (Teknik Komputer & Jaringan), RPL (Rekayasa Perangkat Lunak), and Akuntansi with curriculum chips and interactive (↗) action pills.
6. **Latest News (Kabar Terkini):** Asymmetric header ("Kabar Terkini Al-Muhtadin") with a 3-card editorial news grid showing JetBrains Mono timestamps, category chips, headline clamp, and "Lihat Semua Berita ↗" button.
7. **Footer:** Midnight Navy (#0A1931) contrast footer featuring: (1) School logo, title "SMK Al-Muhtadin", contact info (Jl. Raya Al-Muhtadin, Depok, Telp: (021) 12345678, Email: info@smkalmuhtadin.sch.id), and NPSN: 20214589 in JetBrains Mono font. (2) Quick links (Beranda, Profil, Visi & Misi, Berita, Galeri) in white/80 with Azure (#3D6BF5) hovers. (3) "Ikuti Kami" social link row (Facebook, Instagram, YouTube, X). (4) Centered copyright bar "© 2026 SMK Al-Muhtadin. Hak Cipta Dilindungi Undang-Undang" at the bottom separated by a 1px border-white/10 divider.
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
- Anti-Patterns: No emojis, no Inter font, no pure black (#000000)

**Page Structure:**
1. **Header Navigation:** Sticky frosted glass navbar (backdrop-blur-md bg-white/70 border-b border-slate-200/80) with school logo & text brand "SMK Al-Muhtadin" in bold Deep Royal Navy (#103EA5) on the left; navigation links (Beranda, Profil, Visi & Misi, Berita, Galeri) in the center with "Berita" marked as active in Deep Royal Navy (#103EA5) with a bottom accent dot (other links in Muted Slate #64748B); and a Prestige Gold (#E5B62A) "Info PPDB" pill button (text-slate-950 px-5 py-2 font-bold hover:scale-105 transition-all) on the right. Collapses to a mobile burger menu below 768px.
2. **Page Header & Search Bar:** Clean left-aligned display heading ("Berita & Pengumuman") with subtitle, paired with an integrated search input field (with search icon and placeholder "Cari judul berita atau pengumuman...").
3. **Category Filter Tabs:** Horizontal scrollable pill filters ("Semua", "Pengumuman", "Kegiatan", "Prestasi"). Active pill has Deep Royal Navy (#103EA5) fill with white text; inactive pills have white fill with slate border.
4. **Featured Hero Article:** 2-column asymmetric featured card with large landscape cover photo on the left, and category tag, JetBrains Mono date, big headline, 3-line excerpt, and read button on the right.
5. **Article Grid (9 Items):** 3-column responsive grid where each card features an aspect-ratio thumbnail (aspect-[16/10]), category tag pill, date timestamp, bold title, 2-line excerpt (max 150ch), and top-right (↗) circular hover pill.
6. **Numeric Pagination:** Centered pagination controls with JetBrains Mono numbers (1, 2, 3 ... 8) with active navy circular indicator and arrow navigation.
7. **Footer:** Midnight Navy (#0A1931) contrast footer featuring: (1) School logo, title "SMK Al-Muhtadin", contact info (Jl. Raya Al-Muhtadin, Depok, Telp: (021) 12345678, Email: info@smkalmuhtadin.sch.id), and NPSN: 20214589 in JetBrains Mono font. (2) Quick links (Beranda, Profil, Visi & Misi, Berita, Galeri) in white/80 with Azure (#3D6BF5) hovers. (3) "Ikuti Kami" social link row (Facebook, Instagram, YouTube, X). (4) Centered copyright bar "© 2026 SMK Al-Muhtadin. Hak Cipta Dilindungi Undang-Undang" at the bottom separated by a 1px border-white/10 divider.
```

---

## 3. News Detail Page (`/berita/:slug`)

```markdown
A distraction-free, long-form editorial article reading page for "SMK Al-Muhtadin" with rich typography, author metadata, and related news cards.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (max-w-4xl reading container)
- Theme: Light, Distraction-Free Editorial
- Background: Canvas Slate (#F8FAFC)
- Surface: Pure Surface (#FFFFFF) for main article canvas and related cards
- Primary Accent: Deep Royal Navy (#103EA5) for headings and breadcrumb active link
- Interactive Variant: Vibrant Azure (#3D6BF5) for hyperlinks and quote border accents
- Secondary Accent: Prestige Gold (#E5B62A) for category highlights
- Text Primary: Charcoal Ink (#0F172A, relaxed 1.75 line-height, max 65ch width), Text Secondary: Muted Slate (#64748B)
- Typography: Plus Jakarta Sans (Display & Body), JetBrains Mono (Date, Author tag, Share count)
- Anti-Patterns: No emojis, no Inter font, no ads or floating intrusive popups

**Page Structure:**
1. **Header Navigation:** Sticky frosted glass navbar (backdrop-blur-md bg-white/70 border-b border-slate-200/80) with school logo & text brand "SMK Al-Muhtadin" in bold Deep Royal Navy (#103EA5) on the left; navigation links (Beranda, Profil, Visi & Misi, Berita, Galeri) in the center with "Berita" marked as active in Deep Royal Navy (#103EA5) with a bottom accent dot (other links in Muted Slate #64748B); and a Prestige Gold (#E5B62A) "Info PPDB" pill button (text-slate-950 px-5 py-2 font-bold hover:scale-105 transition-all) on the right. Collapses to a mobile burger menu below 768px.
2. **Breadcrumb Navigation:** Minimal path ("Beranda / Berita / Pengumuman / PPDB 2026").
3. **Article Header:** Category pill badge ("Pengumuman"), large headline ("SMK Al-Muhtadin Resmi Membuka Pendaftaran Siswa Baru Tahun Ajaran 2026/2027"), and author metadata row (Author avatar, name "Humas Al-Muhtadin", JetBrains Mono publication date "24 Agustus 2026", and 3-min read pill).
4. **Featured Image Container:** Generously rounded (rounded-2xl) high-res hero image with optional photo caption below.
5. **Article Body (Rich Text):** TipTap-styled typography layout including styled subheadings (H2, H3), blockquote with a 4px Vibrant Azure (#3D6BF5) left border, styled bullet lists, and embedded callout boxes.
6. **Share & Back Row:** "← Kembali ke Semua Berita" outline pill button and social share action icons.
7. **Related Articles Section:** 3-column compact card row titled "Berita Terkait Lainnya".
8. **Footer:** Midnight Navy (#0A1931) contrast footer featuring: (1) School logo, title "SMK Al-Muhtadin", contact info (Jl. Raya Al-Muhtadin, Depok, Telp: (021) 12345678, Email: info@smkalmuhtadin.sch.id), and NPSN: 20214589 in JetBrains Mono font. (2) Quick links (Beranda, Profil, Visi & Misi, Berita, Galeri) in white/80 with Azure (#3D6BF5) hovers. (3) "Ikuti Kami" social link row (Facebook, Instagram, YouTube, X). (4) Centered copyright bar "© 2026 SMK Al-Muhtadin. Hak Cipta Dilindungi Undang-Undang" at the bottom separated by a 1px border-white/10 divider.
```

---

## 4. Profile Page (`/profil`)

```markdown
An institutional school profile page for "SMK Al-Muhtadin" featuring school history, accreditation credentials, principal welcome letter, academic departments, and faculty directory.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (responsive single-column collapse < 768px)
- Theme: Light, Minimalist Institutional
- Background: Canvas Slate (#F8FAFC)
- Card Surfaces: Pure Surface (#FFFFFF) with 1px border (rgba(226, 232, 240, 0.8)) and 24px rounded corners
- Primary Accent: Deep Royal Navy (#103EA5) for section titles and key badges
- Interactive Variant: Vibrant Azure (#3D6BF5) for program tabs
- Secondary Accent: Prestige Gold (#E5B62A) for official accreditation emblem & NPSN banner
- Text Primary: Charcoal Ink (#0F172A), Text Secondary: Muted Slate (#64748B)
- Typography: Plus Jakarta Sans (Headings & Body), JetBrains Mono (NPSN: 202xxxxx, founding year 1998, metrics)
- Anti-Patterns: No emojis, no Inter font, no generic clip-art icons

**Page Structure:**
1. **Header Navigation:** Sticky frosted glass navbar (backdrop-blur-md bg-white/70 border-b border-slate-200/80) with school logo & text brand "SMK Al-Muhtadin" in bold Deep Royal Navy (#103EA5) on the left; navigation links (Beranda, Profil, Visi & Misi, Berita, Galeri) in the center with "Profil" marked as active in Deep Royal Navy (#103EA5) with a bottom accent dot (other links in Muted Slate #64748B); and a Prestige Gold (#E5B62A) "Info PPDB" pill button (text-slate-950 px-5 py-2 font-bold hover:scale-105 transition-all) on the right. Collapses to a mobile burger menu below 768px.
2. **Page Hero Banner:** Clean centered banner with kicker ("TENTANG KAMI"), large title ("Mengenal Lebih Dekat SMK Al-Muhtadin"), and quick credentials bar (NPSN: 20214589, Akreditasi A, Berdiri sejak 1998).
3. **Principal's Welcome (Sambutan Kepala Sekolah):** Split layout featuring a formal portrait of the Principal with name & title ("Drs. H. Ahmad Dahlan, M.Pd.") on the left, and an inspiring signed welcome message on the right.
4. **School History & Milestones:** Asymmetric 2-column layout with school founding story and a vertical timeline of key achievements.
5. **Major Programs Overview (Jurusan):** 3 detailed cards for TKJ, RPL, and Akuntansi detailing competencies, lab equipment, and graduate career tracks.
6. **Faculty & Staff Directory Preview:** Clean grid of teacher/staff cards with portrait photo, name, subject taught, and educational credential.
7. **Footer:** Midnight Navy (#0A1931) contrast footer featuring: (1) School logo, title "SMK Al-Muhtadin", contact info (Jl. Raya Al-Muhtadin, Depok, Telp: (021) 12345678, Email: info@smkalmuhtadin.sch.id), and NPSN: 20214589 in JetBrains Mono font. (2) Quick links (Beranda, Profil, Visi & Misi, Berita, Galeri) in white/80 with Azure (#3D6BF5) hovers. (3) "Ikuti Kami" social link row (Facebook, Instagram, YouTube, X). (4) Centered copyright bar "© 2026 SMK Al-Muhtadin. Hak Cipta Dilindungi Undang-Undang" at the bottom separated by a 1px border-white/10 divider.
```

---

## 5. Vision & Mission Page (`/visi-misi`)

```markdown
An inspiring Vision & Mission page for "SMK Al-Muhtadin" with high typographic elegance, structured value cards, and institutional goals.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (responsive single-column collapse < 768px)
- Theme: Light, Minimalist Academic Credo
- Background: Canvas Slate (#F8FAFC)
- Card Surfaces: Pure Surface (#FFFFFF) with 1px border (rgba(226, 232, 240, 0.8)) and 24px rounded corners
- Primary Accent: Deep Royal Navy (#103EA5) for Vision headline banner
- Interactive Variant: Vibrant Azure (#3D6BF5) for mission bullet numeral badges
- Secondary Accent: Prestige Gold (#E5B62A) for core value icons and motto banner
- Text Primary: Charcoal Ink (#0F172A), Text Secondary: Muted Slate (#64748B)
- Typography: Plus Jakarta Sans (Display & Body), JetBrains Mono (Numbered badges: "01", "02", "03")
- Anti-Patterns: No emojis, no Inter font, no center-aligned long paragraphs

**Page Structure:**
1. **Header Navigation:** Sticky frosted glass navbar (backdrop-blur-md bg-white/70 border-b border-slate-200/80) with school logo & text brand "SMK Al-Muhtadin" in bold Deep Royal Navy (#103EA5) on the left; navigation links (Beranda, Profil, Visi & Misi, Berita, Galeri) in the center with "Visi & Misi" marked as active in Deep Royal Navy (#103EA5) with a bottom accent dot (other links in Muted Slate #64748B); and a Prestige Gold (#E5B62A) "Info PPDB" pill button (text-slate-950 px-5 py-2 font-bold hover:scale-105 transition-all) on the right. Collapses to a mobile burger menu below 768px.
2. **Page Header:** Minimal category kicker ("NILAI & TUJUAN") and headline ("Visi & Misi Sekolah").
3. **Vision Card (Visi Utama):** Prominent hero card with Deep Royal Navy (#103EA5) subtle tint background, featuring a bold quote mark and the official vision statement ("Menjadi SMK Unggul yang Menghasilkan Lulusan Berakhlak Mulia, Kompeten di Bidang Teknologi, dan Berdaya Saing Global").
4. **Mission Section (Misi Sekolah):** 2-column asymmetric grid of 5 mission points, each card equipped with a monospace numeral badge ("01", "02", "03" in JetBrains Mono with Vibrant Azure tint) and crisp explanatory text.
5. **Core Values / Motto Banner:** 4-column pill strip highlighting the school's core pillars: Integritas, Profesional, Religius, Inovatif.
6. **Footer:** Midnight Navy (#0A1931) contrast footer featuring: (1) School logo, title "SMK Al-Muhtadin", contact info (Jl. Raya Al-Muhtadin, Depok, Telp: (021) 12345678, Email: info@smkalmuhtadin.sch.id), and NPSN: 20214589 in JetBrains Mono font. (2) Quick links (Beranda, Profil, Visi & Misi, Berita, Galeri) in white/80 with Azure (#3D6BF5) hovers. (3) "Ikuti Kami" social link row (Facebook, Instagram, YouTube, X). (4) Centered copyright bar "© 2026 SMK Al-Muhtadin. Hak Cipta Dilindungi Undang-Undang" at the bottom separated by a 1px border-white/10 divider.
```

---

## 6. Gallery & Album Page (`/galeri`)

```markdown
A dynamic visual media gallery for "SMK Al-Muhtadin" featuring album filtering, an asymmetric bento photo masonry, and an interactive full-screen lightbox.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (responsive masonry collapse < 768px)
- Theme: Light, Photography Showcase
- Background: Canvas Slate (#F8FAFC)
- Card Surfaces: Pure Surface (#FFFFFF) and full-bleed image containers with 20px rounded corners
- Primary Accent: Deep Royal Navy (#103EA5) for active album tab
- Interactive Variant: Vibrant Azure (#3D6BF5) for hover overlays and image zoom triggers
- Secondary Accent: Prestige Gold (#E5B62A) for album count badges
- Text Primary: Charcoal Ink (#0F172A), Text Secondary: Muted Slate (#64748B)
- Lightbox Backdrop: Deep Midnight Slate (#020617) with 95% opacity and blur
- Typography: Plus Jakarta Sans (Headings), JetBrains Mono (Photo counts, album dates)
- Anti-Patterns: No emojis, no Inter font, no broken image ratios

**Page Structure:**
1. **Header Navigation:** Sticky frosted glass navbar (backdrop-blur-md bg-white/70 border-b border-slate-200/80) with school logo & text brand "SMK Al-Muhtadin" in bold Deep Royal Navy (#103EA5) on the left; navigation links (Beranda, Profil, Visi & Misi, Berita, Galeri) in the center with "Galeri" marked as active in Deep Royal Navy (#103EA5) with a bottom accent dot (other links in Muted Slate #64748B); and a Prestige Gold (#E5B62A) "Info PPDB" pill button (text-slate-950 px-5 py-2 font-bold hover:scale-105 transition-all) on the right. Collapses to a mobile burger menu below 768px.
2. **Page Header:** Left-aligned title ("Galeri Kegiatan & Fasilitas") with subtitle describing campus life.
3. **Album Filter Pill Bar:** Horizontal pill buttons for album collections ("Semua Foto", "PPDB & MPLS", "Praktikum Laboratorium", "Ekstrakurikuler", "Prestasi Siswa") with photo count badges in JetBrains Mono.
4. **Asymmetric Bento Photo Grid:** Mixed aspect-ratio image grid (spanning 1-col and 2-col cards) with subtle hover zoom effect (`scale-105`), dark bottom gradient scrim revealing image caption, and a circular plus/expand icon (+) on top-right.
5. **Lightbox Modal (Interactive State):** Full-screen dark modal overlay displaying the clicked high-res photo, caption, photo counter ("4 dari 24"), close button (✕), and previous/next chevron arrows.
6. **Footer:** Midnight Navy (#0A1931) contrast footer featuring: (1) School logo, title "SMK Al-Muhtadin", contact info (Jl. Raya Al-Muhtadin, Depok, Telp: (021) 12345678, Email: info@smkalmuhtadin.sch.id), and NPSN: 20214589 in JetBrains Mono font. (2) Quick links (Beranda, Profil, Visi & Misi, Berita, Galeri) in white/80 with Azure (#3D6BF5) hovers. (3) "Ikuti Kami" social link row (Facebook, Instagram, YouTube, X). (4) Centered copyright bar "© 2026 SMK Al-Muhtadin. Hak Cipta Dilindungi Undang-Undang" at the bottom separated by a 1px border-white/10 divider.
```

---

## 7. Admin CMS Dashboard (`/admin/dashboard` & `/admin/berita`)

```markdown
A clean, high-density Admin Content Management Dashboard for "SMK Al-Muhtadin" staff to manage news articles, gallery albums, and page content.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop Dashboard (Sidebar + Main Content architecture)
- Theme: Light, Minimalist Cockpit (Density 7/10)
- Background: Canvas Slate (#F8FAFC)
- Sidebar Surface: Pure Surface (#FFFFFF) with 1px right border (#E2E8F0)
- Primary Accent: Deep Royal Navy (#103EA5) for active sidebar item and primary "Tambah Berita" action button
- Interactive Variant: Vibrant Azure (#3D6BF5) for form focus states and table row hovers
- Status Badges: Emerald Green (#059669) for "Published", Amber Gold (#D97706) for "Draft"
- Typography: Plus Jakarta Sans (UI labels), JetBrains Mono (Article IDs, Dates, Status counters)
- Anti-Patterns: No emojis, no Inter font, no complex bloated charts, no raw pure black

**Page Structure:**
1. **Sidebar Navigation:** Fixed left sidebar (260px) with SMK Al-Muhtadin Admin logo, navigation menu items (Dashboard, Berita & Artikel, Galeri Foto, Halaman Statis, Pengaturan), user profile pill (Admin Name, Role: "Super Admin"), and Logout button.
2. **Top Bar:** Page title breadcrumb, quick search input, and "+ Buat Berita Baru" Navy action button.
3. **Summary KPI Metrics (4 Cards):** Metric cards showing Total Berita, Draft Tersimpan, Total Foto Galeri, and Pengunjung Minggu Ini with JetBrains Mono numbers.
4. **News Management Data Table:** Clean white table with columns: Checkbox, Thumbnail + Judul Berita, Kategori, Penulis, Status Chip (Published/Draft), Tanggal Publikasi, and Action buttons (Edit, View, Delete).
5. **Quick TipTap Editor Drawer / Modal:** Clean slide-over form for creating/editing articles with fields for Title, Slug, Category Dropdown, Featured Image Upload Dropzone, and TipTap Rich Text Editor toolbar (Bold, Italic, H2, H3, List, Link, Quote).
```
