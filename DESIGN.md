# Design System: SMK Al-Muhtadin Official School Website

> **Single Source of Truth** for Google Stitch & Frontend Engineering. Enforces a minimalist, premium academic editorial aesthetic synthesized from curated references (`/design_references`) and aligned with the project PRD ([`prd_smkalmuhtadin.md`](file:///C:/Users/USER/Documents/Azis/Web/web-smkalmuhtadin/prd_smkalmuhtadin.md)).

---

## 1. Visual Theme & Atmosphere

* **Atmosphere:** Contemporary Academic Sanctuary — clean, structured, and prestigious. Merges high-agency editorial architecture (inspired by contemporary European and Swiss educational portfolios) with Bento-grid modularity and spacious breathing room.
* **Density:** `4 / 10` — *Daily App Balanced*. Generous white space, uncluttered typography, clear section margins, and comfortable reading bounds (max 65ch body).
* **Variance:** `7 / 10` — *Offset Asymmetric Bento*. High visual interest via mixed card proportions, asymmetric split-screen feature rows, and staggered editorial layouts instead of rigid 3-column repeats.
* **Motion:** `5 / 10` — *Fluid Micro-Spring*. Natural tactile feedback (`stiffness: 100, damping: 20`), smooth image reveals, staggered list transitions, and subtle perpetual status pulses.

---

## 2. Color Palette & Roles

Precise, calibrated palette centered on the institution's heritage blue, vibrant digital azure, and prestige gold accent, supported by a crisp Slate/Zinc neutral continuum.

| Token Name | Hex / RGBA | Role & Application |
|---|---|---|
| **Deep Royal Navy** *(Primary)* | `#103EA5` | Core brand identity, primary navbar surface, dominant headings, primary buttons, active states, key structural headers. |
| **Vibrant Azure** *(Light Primary)* | `#3D6BF5` | Interactive hover states, active category tabs, focus rings, link hovers, energetic badge indicators, secondary hero accents. |
| **Prestige Gold** *(Secondary / Accent)* | `#E5B62A` | Highlight badges (e.g. "Akreditasi A", "Pusat Keunggulan"), achievement medals, featured tag accents, bookmark badges. |
| **Canvas Slate** *(Background)* | `#F8FAFC` | Primary page background, light section alternating bands. Calibrated cool-neutral backdrop. |
| **Pure Surface** *(Card Base)* | `#FFFFFF` | Bento card containers, modal backdrops, dropdowns, input fields, white-card highlights. |
| **Charcoal Ink** *(Primary Text)* | `#0F172A` | High-contrast readable typography (Zinc-900 depth). Never pure `#000000`. |
| **Muted Slate** *(Secondary Text)* | `#64748B` | Subheadings, article excerpts, publication dates, metadata, author attributions. |
| **Structural Border** *(Dividers)* | `rgba(226, 232, 240, 0.8)` | 1px clean container outlines, table row dividers, card borders (`border-slate-200/80`). |
| **Dark Scrim Overlay** *(Media Cards)* | `rgba(15, 23, 42, 0.75)` | Gradient overlay on photo bento cards for white text contrast. |
| **Midnight Navy** *(Footer / Contrast)* | `#0A1931` | Deep contrast section background for Footer and high-impact CTA banners. |

> [!IMPORTANT]
> **Color Rules:**
> - Strictly **NO neon glows**, cyan outer halos, or purple "AI gradient" fills.
> - Maximum 1 secondary accent (`#E5B62A`) used purposefully for prestige tags and focal callouts.
> - All dark cards and footers use tinted deep navy (`#0A1931` / `#0F172A`), never raw `#000000`.

---

## 3. Typography Rules

A clean, modern sans-serif display pairing that communicates educational credibility, high clarity, and modern technical prowess.

* **Display & Headline Font:** `Plus Jakarta Sans` / `Cabinet Grotesk`
  * *Characteristics:* Geometric, track-tight (`letter-spacing: -0.025em`), weighted hierarchy (`font-semibold` to `font-bold`).
  * *Scale:* Controlled `clamp()` scaling for headings (`clamp(2rem, 4vw, 3.75rem)` for H1). Not shouting; confident weight.
* **Body Font:** `Plus Jakarta Sans`
  * *Characteristics:* Highly legible Indonesian & English typography, relaxed line height (`leading-relaxed`), max reading measure `65ch`.
* **Monospace & Metric Font:** `JetBrains Mono` / `Geist Mono`
  * *Characteristics:* Used exclusively for NPSN numbers, timestamps (`12 Sep 2026`), statistics counters (`1,200+ Siswa`), category tags, and CMS data tables.
* **Banned Fonts:** `Inter` (banned for generic AI feel), generic system serifs (`Times New Roman`, `Georgia`, `Garamond`). Serifs strictly banned across the entire portal.

---

## 4. Hero Section Architecture

*Inspired by Reference 1 (`1.jfif`) & Reference 4 (`4.jfif`)*

* **Hero Container:** Large-radius soft container (`rounded-3xl` or `rounded-[2rem]`) framing high-resolution campus architecture / active student photography.
* **Layout Structure:** Left-aligned or balanced split-screen with comfortable negative space. Full-bleed background with subtle bottom-up dark gradient scrim (`from-slate-950/85 via-slate-900/40 to-transparent`).
* **Headline & Subtitle:**
  * Pill Badge: Floating pill badge (`bg-white/20 backdrop-blur-md text-white border border-white/20`) reading `"SMK Al-Muhtadin • Terakreditasi A"`.
  * Headline: Confident title: *"Membentuk Generasi Unggul, Berkarakter & Siap Kerja."*
  * Supporting copy: Clear 2-line institutional description with high contrast.
* **Action Row:**
  * Primary Button: Solid Navy `#103EA5` or Vibrant Azure `#3D6BF5` with arrow icon (`Lihat Program Keahlian ↗`).
  * Secondary Badge / Quick Stats: Floating student avatar cluster (`+1,200 Siswa Aktif`) or Quick Action pill.
* **Hero Anti-Patterns:**
  * ❌ No centered generic hero with floating abstract 3D spheres.
  * ❌ No filler text like "Scroll down to explore" or bouncing chevron arrows.
  * ❌ No text overlapping faces without a protective scrim.

---

## 5. Component Stylings & Interaction Rules

### 5.1 Buttons & Interactive Elements
* **Primary Button:** Deep Royal Navy `#103EA5`, `text-white`, `rounded-full` or `rounded-xl`, `px-6 py-3`, font-semibold. Hover: transitions to `#3D6BF5` with tactile `-1px` Y-axis translate. Active: `scale-98`.
* **Accent Button:** Warm Gold `#E5B62A`, `text-slate-950`, font-bold. Used for high-priority actions (e.g., PPDB announcement / Info Pendaftaran).
* **Ghost / Outline Button:** `border border-slate-200 bg-white/80 hover:bg-slate-100 text-slate-800 rounded-full px-5 py-2.5`.
* **Circular Action Pills (`↗`):** White circular button (`w-10 h-10 rounded-full bg-white text-slate-900 shadow-md hover:bg-primary hover:text-white transition-all flex items-center justify-center`) anchored to the top-right of interactive news/gallery cards.

### 5.2 Bento Cards & Containers
*Inspired by Reference 1 (`1.jfif`), Reference 3 (`3.jfif`), and Reference 4 (`4.jfif`)*
* **Standard Bento Card:** `bg-white`, `border border-slate-200/80`, `rounded-2xl` (`1.25rem` to `1.75rem`), `p-6` or `p-8`, soft diffused whisper shadow (`shadow-[0_4px_20px_rgba(0,0,0,0.03)]`).
* **Photo Bento Card:** Full card image background (`object-cover w-full h-full rounded-2xl`), rich gradient scrim, white typography on dark bottom anchor, floating date/tag pill on top-left, arrow button on top-right.
* **Interactive Hover:** Card images gently scale (`scale-105`) over `400ms ease-out` inside `overflow-hidden` containers on hover.

### 5.3 News & Article Showcase
*Inspired by Reference 1 (`1.jfif`) & Reference 2 (`2.jfif`)*
* **Section Header:** Asymmetric layout with small uppercase category kicker (`BERITA & AGENDA`) and bold display heading (`Kabar Terkini Al-Muhtadin`), paired with a right-aligned "Lihat Semua Berita ↗" button.
* **Card Anatomy:**
  1. Aspect ratio container (`aspect-[16/10]` or `aspect-[4/3]`) with crisp image.
  2. Category Badge: Rounded pill with subtle background (`bg-blue-50 text-blue-700 border border-blue-200/60`).
  3. Date Stamp: Monospace timestamp (`JetBrains Mono`, `text-xs text-slate-500`).
  4. Title: 2-line clamp, `font-bold text-slate-900 hover:text-primary transition-colors`.
  5. Excerpt: Max 150 characters, `text-slate-600 leading-relaxed text-sm`.

### 5.4 Stats Counter Strip
*Inspired by Reference 4 (`4.jfif`)*
* **Layout:** Clean horizontal strip with vertical structural dividers (`divide-x divide-slate-200`).
* **Anatomy:** Big numerical figure (`text-3xl md:text-5xl font-bold text-slate-900 font-mono tracking-tight`), paired with a two-word descriptive label (`text-xs md:text-sm text-slate-500 font-medium`).
* **Metrics:** e.g., `3 Program Keahlian`, `1,200+ Siswa Aktif`, `100% Guru Tersertifikasi`, `A Terakreditasi`.

### 5.5 Inputs, Forms & CMS Interface (Admin Dashboard)
* **Text Inputs & Selects:** Clean white field, `border border-slate-300`, `rounded-xl`, `px-4 py-2.5`, label positioned cleanly above (`text-xs font-semibold uppercase text-slate-600 tracking-wider mb-1.5`). Focus state: `ring-2 ring-[#3D6BF5]/20 border-[#3D6BF5] outline-none`.
* **Rich Text Editor (TipTap):** Distraction-free clean container with pinned toolbar, subtle separator lines, and typography matching public article rendering.
* **Data Tables:** Clean Slate-50 header row, 1px horizontal borders, monospace ID / date badges, status chips (`bg-emerald-50 text-emerald-700` for Published, `bg-amber-50 text-amber-700` for Draft).

### 5.6 Gallery & Lightbox
* **Album Grid:** Masonry / Bento asymmetric collage showcasing student activities, workshops, lab facilities, and academic ceremonies.
* **Lightbox Modal:** Dark immersive backdrop (`bg-slate-950/90 backdrop-blur-md`), zero-clutter image viewer with smooth zoom and keyboard navigation (`←`, `→`, `Esc`).

### 5.7 Faculty & Leadership Directory (Pengurus & GTK)
* **Card Anatomy:**
  1. Aspect ratio portrait container (`aspect-[3/4]`, `rounded-2xl`, `overflow-hidden`, `bg-slate-100`) with crisp formal portrait photography.
  2. Subtitle / Department Chip: Monospace or pill tag (`JetBrains Mono`, `text-xs text-blue-700 bg-blue-50/80 border border-blue-200/60`).
  3. Formal Name: Bold display typography with academic degrees (`Plus Jakarta Sans`, `font-bold text-slate-900 text-base`).
  4. Role & Assignment: Secondary slate caption (`text-xs text-slate-500 font-medium`, e.g. "Kepala Program Keahlian RPL").
  5. Category Tabs: Clean filter switcher (`Semua`, `Pimpinan`, `Guru Produktif`, `Guru Normatif/Adaptif`, `Staf Tata Usaha`).

### 5.8 Achievement & Award Cards (Prestasi)
* **Design Philosophy:** Celebratory yet academically grounded. Uses Prestige Gold (`#E5B62A`) accents for medals and competition titles.
* **Card Anatomy:**
  1. Image Container (`aspect-[16/10]` or `aspect-[4/3]`): High-contrast photo of trophy presentation or certificate handover.
  2. Prestige Rank Badge: Top-left floating badge (`bg-[#E5B62A]/15 text-[#92400E] border border-[#E5B62A]/40 font-bold px-3 py-1 rounded-full text-xs font-mono`, e.g. "Juara 1 Tingkat Nasional").
  3. Competition Title: 2-line clamped bold headline (`text-slate-900 font-bold text-base hover:text-primary`).
  4. Recipient Attribution: Monospace metadata with winner icon/label (`text-xs text-slate-600 font-mono`, e.g. "Tim RPL — Fikri & Zaki").
  5. Year & Level Indicator: Bottom row with subtle divider showing competition year (`2026`) and level badge (`Provinsi / Nasional`).

### 5.9 YouTube Video Showcase & Responsive Player
* **Zero-Buffer Video Strategy:** Leverages YouTube iframe integration with custom branded wrapper.
* **Video Card Anatomy:**
  1. 16:9 Thumbnail Container (`aspect-video rounded-2xl overflow-hidden relative group cursor-pointer bg-slate-900`).
  2. High-Res YouTube Poster (`hqdefault.jpg`) with subtle dark overlay gradient.
  3. Tactile Play Button: Centered circular white/navy play pill (`w-14 h-14 rounded-full bg-white/95 text-[#103EA5] shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform`).
  4. Duration & Title Row: Monospace publication date and 2-line video title below the thumbnail.
* **Interactive Player Modal:**
  - Backdrop: Deep Midnight Slate (`bg-slate-950/90 backdrop-blur-md`).
  - Container: 16:9 aspect ratio iframe wrapper (`max-w-4xl w-full mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10`).
  - Controls: Top-right close button (`✕`) with Esc key listener.

### 5.10 Floating WhatsApp Contact Pill
* **Fixed Anchor:** Bottom-right corner (`fixed bottom-6 right-6 z-50`).
* **Styling:** Emerald Brand Pill (`bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-[#25D366]/30 px-5 py-3 rounded-full flex items-center gap-2.5 font-semibold text-sm transition-all hover:scale-105 active:scale-95`).
* **Visual Elements:** WhatsApp SVG icon + text "Tanya PPDB / Info Sekolah" with subtle continuous notification ping dot.

---

## 6. Layout Principles & Grid Architecture

* **Max Width Container:** `max-w-7xl` (`1280px` to `1400px`), centered with horizontal gutters (`px-4 sm:px-6 lg:px-8`).
* **Vertical Rhythm:**
  * Section gap: `clamp(4rem, 8vw, 7.5rem)` (`py-16 md:py-24`) for clean visual pacing.
  * Component gap: `gap-6` or `gap-8` on desktop, collapsing to `gap-4` on mobile.
* **Asymmetric Feature Grids:**
  * *Profile / About Section:* 2-column split where Left is an editorial statement + bullet highlights, and Right is a 2-tier stacked image bento with laboratory & campus life photos.
  * *Programs Section (TKJ, RPL, Akuntansi):* 3 asymmetric specialty cards highlighting curriculum, labs, and career pathways with distinctive accent tags.
* **Strict Single-Column Collapse:** Multi-column layouts cleanly collapse to single-column under `768px` (`md` breakpoint) without breaking typography or causing horizontal scroll.
* **Viewport Height Rule:** Full-height sections must use `min-h-[100dvh]` (never static `h-screen`).

---

## 7. Motion & Interaction Philosophy

* **Animation Engine:** Framer Motion / Tailwind Transition utilities.
* **Spring Physics Config:**
  ```javascript
  const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 0.8
  };
  ```
* **Staggered Orchestration:** News lists and gallery grids reveal items sequentially with a `50ms` stagger delay (`transition-all duration-500 ease-out`).
* **Perpetual Micro-Interactions:**
  * Pulse indicator on "Status Aktif / Berita Baru" badge (`relative flex h-2.5 w-2.5` with a continuous ping ring).
  * Subtle hover lift on bento cards (`translate-y-[-4px]` with shadow expansion).
* **Hardware Acceleration:** All animations strictly confined to `transform` and `opacity` properties. No layout-thrashing animations on `height`, `width`, or `margin`.

---

## 8. Anti-Patterns (Banned Design Clichés)

To maintain an authentic, high-end educational brand, the following elements are **strictly forbidden**:

- ❌ **No AI emojis in copy or titles** (e.g., 🚀, ✨, 🔥, 🎓). Use clean Lucide SVG icons instead.
- ❌ **No `Inter` or standard browser fallback serifs** (`Times New Roman`, `Georgia`).
- ❌ **No pure pitch black (`#000000`)** — always use Charcoal Slate `#0F172A` or Midnight Navy `#0A1931`.
- ❌ **No purple neon glow buttons or cyan laser borders**.
- ❌ **No generic 3-equal-box SaaS feature rows**. Use Bento-grid variance or 2-column offset splits.
- ❌ **No fake placeholder copy or round numbers** (e.g., "John Doe", "99.99% Satisfaction"). Use realistic school data (e.g., "Drs. H. Ahmad Dahlan", "NPSN: 202xxxxx").
- ❌ **No filler UI text** such as *"Scroll to explore"*, *"Swipe down"*, or bouncing down-arrows.
- ❌ **No overlapping elements without spatial isolation or dedicated scrim protection**.
- ❌ **No broken external image links**. Use structured school assets or reliable placeholders with explicit aspect ratios.

---

## 9. Stitch Generation Directives (Prompting Cheatsheet)

When generating screens for SMK Al-Muhtadin in Google Stitch, inject these semantic prompts:

```text
A modern, minimalist school portal for "SMK Al-Muhtadin" featuring Deep Royal Navy (#103EA5), Vibrant Azure (#3D6BF5), and Prestige Gold (#E5B62A) accents on a crisp Canvas Slate (#F8FAFC) background. High-agency Bento-grid layout with generously rounded cards (24px), track-tight Plus Jakarta Sans display typography, tactile pill buttons with arrow icons (↗), monospace date stamps, and clean architectural photography. Strict spatial zones, no generic AI gradients, and balanced academic elegance.
```
