# Product Requirements Document (PRD)
# SMK Al-Muhtadin — Official School Website

**Version**: 1.1  
**Date**: August 9, 2026  
**Status**: ✅ Approved — Ready for Development  
**Prepared by**: Antigravity AI  

---

## 1. Executive Summary

### Problem Statement
SMK Al-Muhtadin currently lacks a centralized digital presence, making it difficult for prospective students, parents, current students, and the general public to access school information, news, and official announcements in a timely and organized manner.

### Proposed Solution
Build a modern, responsive official school website that serves as the single source of truth for school information, featuring a public-facing frontend (React) and a secure content management backend (Laravel + PostgreSQL). The website will be easy to navigate, visually professional, and content-manageable by non-technical staff through an Admin Dashboard (CMS).

### Success Criteria (KPIs)

| Metric | Target |
|---|---|
| Page load time (LCP) | ≤ 2.5 seconds on a 4G connection |
| Lighthouse Performance Score | ≥ 85 |
| Lighthouse Accessibility Score | 100 |
| Mobile responsiveness | 100% pages pass on screens ≥ 320px wide |
| Admin content publish time | ≤ 5 minutes from draft to live |
| MVP launch | Within 1 month of development start |

---

## 2. User Experience & Functionality

### User Personas

| Persona | Description | Primary Goal |
|---|---|---|
| **Prospective Student / Parent** | Families considering enrollment at SMK Al-Muhtadin | Find school profile, vision/mission, programs, and contact info |
| **Current Student** | Enrolled student looking for news & announcements | Read the latest school news and updates |
| **General Public** | Community members, journalists, or institutions | Learn about the school's achievements and activities via news and gallery |
| **School Administrator** | Non-technical staff managing content (e.g., teacher or TU staff) | Publish news articles, upload gallery images, update school information |

---

### Pages & User Stories

#### 2.1 — Home Page

> **Story**: As a visitor, I want to see a compelling homepage so that I can quickly understand what SMK Al-Muhtadin offers and navigate to what I need.

**Acceptance Criteria:**
- Displays a hero banner with the school name, tagline, and a clear call-to-action button (e.g., "Lihat Profil Sekolah")
- Shows a "Latest News" section (minimum 3 most recent articles) with thumbnail, title, and date
- Shows a brief "About School" section with a link to the full Profile page
- Includes a footer with school contact info (address, phone, email), social media links, and copyright
- Fully responsive on mobile, tablet, and desktop

---

#### 2.2 — News Page

> **Story**: As a visitor, I want to read the latest school news and announcements so that I stay informed about events and activities.

**Acceptance Criteria:**
- Displays a paginated list of news articles (≥ 10 articles per page)
- Each article card shows: thumbnail image, title, category tag, publication date, and a short excerpt (≤ 150 characters)
- Clicking a card navigates to a full article detail page
- Article detail page shows: featured image, title, author, date, body content (rich text / HTML), and related articles
- News can be filtered/searched by title keyword
- Supports categories (e.g., "Pengumuman", "Kegiatan", "Prestasi")

---

#### 2.3 — Profile Page

> **Story**: As a prospective parent or student, I want to learn about the school's background and leadership so that I can trust in the school's credibility.

**Acceptance Criteria:**
- Displays school history, founding year, and general description
- Includes a Principal's message with photo and name
- Shows a structured list of programs/majors offered (e.g., TKJ, RPL, Akuntansi)
- Displays school's accreditation status and NPSN (school registration number)
- Includes a teacher/staff directory section (name, position, photo — optional)

---

#### 2.4 — Vision & Mission Page

> **Story**: As a visitor, I want to read the school's vision and mission so that I understand the institution's values and goals.

**Acceptance Criteria:**
- Clearly separates "Visi" (Vision) and "Misi" (Mission) sections
- Mission is displayed as a numbered or bulleted list
- Includes the school's motto if applicable
- Content is editable via Admin Dashboard

---

#### 2.5 — Gallery Page

> **Story**: As a visitor, I want to view photos of school activities so that I can get an impression of campus life and events.

**Acceptance Criteria:**
- Displays images in a responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Images are grouped by album/category (e.g., "PPDB 2025", "Peringatan HUT RI")
- Clicking an image opens a lightbox with full-size view and navigation (prev/next)
- Albums can be managed (created, renamed, deleted) from the Admin Dashboard
- Images support lazy loading for performance

---

#### 2.6 — Admin Dashboard (CMS)

> **Story**: As a school administrator, I want to log in to a secure dashboard so that I can manage all website content without needing a developer.

**Acceptance Criteria:**
- Authentication via email + password with JWT (JSON Web Token)
- Role-based access: `Super Admin` (full access) and `Editor` (can manage news & gallery only)
- **News Management**: Create, Read, Update, Delete (CRUD) articles with a rich-text editor (e.g., TipTap or Quill); upload featured images; set status (Draft / Published)
- **Gallery Management**: Create albums, upload multiple images at once, delete images/albums
- **Profile & Vision/Mission Management**: Edit static page content (school description, vision, mission) via a rich-text editor
- **Dashboard Overview**: Shows counts of total articles, total gallery images, draft articles
- All admin routes protected by authentication middleware
- Audit log: track who published/edited content and when

---

### Non-Goals (Out of Scope for MVP)

The following features are **explicitly excluded** from this version to protect the 1-month timeline:

- ❌ Online Student Enrollment / PPDB Registration Form
- ❌ E-Learning or LMS features (courses, assignments, grades)
- ❌ Student/Teacher Internal Portal (separate login for students)
- ❌ Live chat / chatbot feature
- ❌ Mobile app (iOS/Android)
- ❌ Multi-language support (English/Indonesian toggle)
- ❌ Payment gateway integration

---

## 3. Technical Specifications

### 3.1 Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                        │
│         React (Vite) — SPA / SSR-optional                │
│    Public Pages  │  Admin Dashboard (Protected Routes)   │
└──────────────────────────┬───────────────────────────────┘
                           │ HTTPS (REST API / JSON)
                           ▼
┌──────────────────────────────────────────────────────────┐
│                      BACKEND LAYER                       │
│         Laravel 11 — RESTful API                         │
│  Auth (Sanctum/JWT) │ Business Logic │ File Storage      │
└──────────────────────────┬───────────────────────────────┘
                           │ PDO / Eloquent ORM
                           ▼
┌──────────────────────────────────────────────────────────┐
│                     DATABASE LAYER                       │
│              PostgreSQL 16                               │
│  users │ news │ categories │ galleries │ albums │ pages  │
└──────────────────────────────────────────────────────────┘
```

---

### 3.2 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | React (Vite) | React 18+ |
| Frontend UI | Tailwind CSS + shadcn/ui | Latest |
| Frontend Routing | React Router DOM | v6+ |
| Backend | Laravel | 11.x |
| Authentication | Laravel Sanctum (SPA Token) | Built-in |
| Database | PostgreSQL | 16.x |
| File Storage | Local Disk (Laravel Storage) → upgrade to S3 in v2 | — |
| Rich Text Editor | TipTap | v2+ |
| Image Optimization | Laravel Intervention/Image | v3 |
| Deployment | VPS (Ubuntu) + Nginx + PHP-FPM | — |

---

### 3.3 Database Schema (Core Tables)

#### `users`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT (PK) | |
| name | VARCHAR(255) | |
| email | VARCHAR(255) UNIQUE | |
| password | VARCHAR(255) | Bcrypt hashed |
| role | ENUM('super_admin', 'editor') | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

#### `news`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT (PK) | |
| title | VARCHAR(255) | |
| slug | VARCHAR(255) UNIQUE | URL-friendly |
| excerpt | TEXT | ≤ 150 chars |
| body | TEXT | HTML/Rich text |
| featured_image | VARCHAR(500) | File path |
| status | ENUM('draft', 'published') | |
| category_id | BIGINT (FK → categories) | |
| author_id | BIGINT (FK → users) | |
| published_at | TIMESTAMP NULLABLE | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

#### `categories`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT (PK) | |
| name | VARCHAR(100) | e.g., "Pengumuman" |
| slug | VARCHAR(100) UNIQUE | |

#### `albums`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT (PK) | |
| name | VARCHAR(255) | e.g., "PPDB 2025" |
| description | TEXT NULLABLE | |
| created_at | TIMESTAMP | |

#### `gallery_images`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT (PK) | |
| album_id | BIGINT (FK → albums) | |
| image_path | VARCHAR(500) | |
| caption | VARCHAR(255) NULLABLE | |
| order | INT | For sorting |
| created_at | TIMESTAMP | |

#### `pages`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT (PK) | |
| key | VARCHAR(100) UNIQUE | e.g., "vision_mission", "profile" |
| title | VARCHAR(255) | |
| content | TEXT | HTML/Rich text |
| updated_at | TIMESTAMP | |
| updated_by | BIGINT (FK → users) | |

---

### 3.4 API Endpoints (Key)

#### Public Endpoints (No Auth Required)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/news` | List published articles (paginated) |
| GET | `/api/news/{slug}` | Get single article |
| GET | `/api/categories` | List all categories |
| GET | `/api/albums` | List all albums with images |
| GET | `/api/pages/{key}` | Get static page content (profile, vision) |

#### Admin Endpoints (Auth Required — Bearer Token)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Admin logout |
| GET/POST | `/api/admin/news` | List / Create news |
| GET/PUT/DELETE | `/api/admin/news/{id}` | Get / Update / Delete news |
| POST | `/api/admin/news/{id}/publish` | Change status to published |
| GET/POST | `/api/admin/albums` | List / Create albums |
| POST | `/api/admin/albums/{id}/images` | Upload images to album |
| DELETE | `/api/admin/images/{id}` | Delete gallery image |
| PUT | `/api/admin/pages/{key}` | Update static page content |

---

### 3.5 Security & Privacy

| Concern | Implementation |
|---|---|
| Authentication | Laravel Sanctum SPA tokens; HTTPS-only cookies |
| Password Security | Bcrypt hashing (cost factor ≥ 12) |
| Authorization | Policy-based role checks on every admin endpoint |
| SQL Injection | Eloquent ORM with parameterized queries |
| XSS | Input sanitization on rich-text fields (strip scripts); React escapes output by default |
| CSRF | Laravel CSRF tokens for web forms |
| File Uploads | Validate MIME types (image only), max 5MB per image, store outside public root |
| Rate Limiting | Throttle login endpoint: max 5 attempts/minute per IP |
| Audit Logging | Log all CMS write operations (who, what, when) |

---

## 4. Risks & Roadmap

### 4.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Tight 1-month timeline causes rushed or incomplete features | High | High | Strictly enforce Non-Goals; cut Gallery or Profile to MVP if needed |
| Non-technical admin struggles with CMS interface | Medium | High | Provide simple onboarding guide/tutorial within the dashboard |
| Image storage fills up on local VPS | Medium | Medium | Set image size limits (5MB); plan migration to object storage (S3/Wasabi) in v2 |
| No SEO optimization leads to low discoverability | Medium | Medium | Use React Helmet for meta tags; implement sitemap.xml |
| PostgreSQL unfamiliarity for the team (if used to MySQL) | Low | Medium | Laravel Eloquent abstracts most differences; document any PostgreSQL-specific syntax |

---

### 4.2 Phased Roadmap

#### 🚀 MVP (Month 1) — Core Information Website
- [ ] Project setup: Laravel API + React Vite + PostgreSQL
- [ ] Authentication & Admin Dashboard (login, role management)
- [ ] Home Page (hero, latest news, about snippet, footer)
- [ ] News Module (list, detail, category filter, CRUD admin)
- [ ] Profile Page (static content, editable via CMS)
- [ ] Vision & Mission Page (static content, editable via CMS)
- [ ] Gallery Module (albums, image upload, lightbox, CRUD admin)
- [ ] Deployment to VPS (Nginx + PHP-FPM + Node build)

#### 📈 v1.1 (Month 2–3) — Enrichment
- [ ] Search feature (full-text search on news)
- [ ] Teacher & Staff Directory page
- [ ] Achievements & Awards Showcase section
- [ ] SEO improvements: sitemap.xml, Open Graph meta tags, structured data
- [ ] Image CDN / object storage migration (Wasabi / Cloudflare R2)
- [ ] Analytics integration (Google Analytics 4 or Umami)

#### 🌟 v2.0 (Month 4–6) — Advanced Features
- [ ] Online PPDB (Student Enrollment) Registration Form
- [ ] Download Center (forms, documents, syllabus PDF)
- [ ] Academic Calendar with event management
- [ ] Contact Us form with email notification (Laravel Mail + SMTP)
- [ ] Multi-language support (Bahasa Indonesia / English)

---

## 5. Resolved Decisions

All open questions have been answered by the stakeholder. No blockers remain for development.

| # | Question | Decision |
|---|---|---|
| 1 | **Hosting / VPS** | ✅ School owns an existing VPS — no provisioning needed |
| 2 | **Domain** | ✅ Domain is already registered and ready to point |
| 3 | **Brand Assets** | ✅ Logo, color palette, and fonts are ready to be handed off |
| 4 | **Existing Content** | ✅ Fresh start — no content migration required |
| 5 | **Email Notifications** | ❌ Not needed — excluded from all versions |
| 6 | **Additional Staff Roles** | ❌ Not needed — only `Super Admin` and `Editor` roles required |

### Infrastructure Summary

| Item | Detail |
|---|---|
| Server | Existing school-owned VPS |
| OS (recommended) | Ubuntu 22.04 LTS |
| Web Server | Nginx + PHP 8.3 FPM |
| Process Manager | Supervisor (Laravel queues) |
| Database | PostgreSQL 16 |
| Node | Node.js 20 LTS (for React build) |
| SSL | Let's Encrypt (Certbot) |
| Domain | Already registered — configure DNS A record to VPS IP |

---

*Document finalized and approved by stakeholder on August 9, 2026. Development may commence immediately.*
