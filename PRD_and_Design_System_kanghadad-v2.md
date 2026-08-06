# Product Requirements Document (PRD) & Design System (v2.0)
**Project Name:** kanghadad.com
**Version:** 2.0.0 (Updated with Git-Based Visual CMS Integration)  
**Owner:** Abdullah Alhadad (Kang Hadad)  
**Target Platform:** Cloudflare Pages (Static Site Generator via Astro.build)  
**Primary Focus:** EdTech / TKJ Vocational Education, Digital Da'wah, & Critical Social Essays  

---

## PART 1: PRODUCT REQUIREMENTS DOCUMENT (PRD)

### 1. Executive Summary & Vision
**kanghadad.com** is a modern personal platform and digital garden designed to bridge **technical vocational skills (Computer & Network Engineering / TKJ)** with **Islamic ethics and contemporary social commentary**. Operating on a zero-maintenance, high-performance static architecture (Astro + Cloudflare Pages), the site serves as an open learning repository for students, a portfolio for professional engagements, and a thought-leadership portal for digital da'wah.

### 2. Objectives & Key Results (OKRs)
* **Performance & Speed:** Achieve a 95+ Lighthouse score across Performance, Accessibility, Best Practices, and SEO. Page load time under 1.2s worldwide via Cloudflare Edge CDN.
* **Reader Retention & UX:** Maintain an average session duration of >2.5 minutes by providing clean typography, high contrast dark/light themes, and structured table of contents.
* **Developer & Author Efficiency:** Enable friction-free content creation using Markdown/MDX files backed by Git commits, accessible via terminal (`git push`) or web GUI (`/admin` Keystatic / Decap CMS).

### 3. User Personas & Target Audience
1. **Vocational Students (TKJ MAN 2 Cianjur & General Learners):**
   * *Needs:* Clear, step-by-step networking guides (MikroTik, Cisco, Linux), copyable terminal commands, and downloadable lab worksheets.
   * *Pain Points:* Slow websites with intrusive ads, messy code formatting, and hard-to-navigate module hierarchies.
2. **Community & Islamic Tech Enthusiasts:**
   * *Needs:* Insightful articles exploring digital ethics, AI policy from an Islamic perspective, and social commentaries.
   * *Pain Points:* Cluttered blog layouts that distract from reading long-form essays.
3. **Academic & Professional Peers:**
   * *Needs:* Quick verification of teaching credentials, project showcases, and speaker/consultation contact methods.

### 4. Core Features & Functional Requirements

| Feature ID | Feature Name | Description & Specification | Priority |
| :--- | :--- | :--- | :--- |
| **FR-01** | **Dynamic Dual-Theme (Light/Dark)** | Instant CSS variable switching saved in `localStorage`. Respects system `prefers-color-scheme`. | P0 (Must Have) |
| **FR-02** | **Structured Content Collections** | Astro Content Collections API with strict schema validation for `/tkj`, `/risalah`, and `/garden`. | P0 (Must Have) |
| **FR-03** | **Interactive Code Snippets** | Syntax highlighting with copy-to-clipboard button and terminal line indicators for MikroTik/Linux commands. | P0 (Must Have) |
| **FR-04** | **Da'wah & Essay Callouts** | Styled quotation blocks for Quranic verses, Hadith, and key thesis highlights. | P1 (High) |
| **FR-05** | **Digital Garden Taxonomy** | Categorization of notes by growth status: 🌱 *Seedling*, 🌿 *Growing*, 🌳 *Evergreen*. | P1 (High) |
| **FR-06** | **Table of Contents (ToC)** | Auto-generated sticky ToC sidebar for articles exceeding 800 words. | P1 (High) |
| **FR-07** | **Static Search & Filter** | Client-side lightweight search (Pagefind or Fuse.js) for quick lookup of networking commands and topics. | P2 (Medium) |
| **FR-08** | **Git-based Visual Admin / CMS** | Web GUI integration via `/admin` (Keystatic / Decap CMS) for browser-based writing without manual terminal/git commands. Auto-commits Markdown to GitHub. | P1 (High) |

---

## PART 2: DESIGN SYSTEM (ELECTRIC ORANGE & SLATE)

### 1. Brand Identity & Personality
* **Traits:** Authoritative yet approachable, technically precise, contemplative, and modern.
* **Motto:** *"Logika Teknologi, Vokasi, dan Value Islam."*

### 2. Color Tokens (CSS Variables)

#### Theme A: Dark Mode (Default)
* `--bg-body`: `#09090B` (Deep Charcoal Black)
* `--bg-card`: `#121215` (Elevated Surface Black)
* `--bg-alt`: `#1A1A1E` (Muted Accent Container)
* `--text-main`: `#F4F4F5` (High Contrast White Gray)
* `--text-muted`: `#A1A1AA` (Subtle Zinc)
* `--border`: `#27272A` (Subtle Border Gray)
* `--accent-orange`: `#FF7D1A` (Electric Orange Accent)
* `--accent-orange-hover`: `#FF9442` (Lighter Orange Focus)
* `--tag-tkj-bg`: `#321908` (Dark Amber Tint)
* `--tag-tkj-text`: `#FF9442` (Bright Amber)
* `--tag-islam-bg`: `#27272A` (Zinc Slate Tint)
* `--tag-islam-text`: `#E4E4E7` (Slate Gray Text)
* `--code-bg`: `#000000` (Pure Black Code Block)
* `--code-text`: `#FF7D1A` (High Contrast Command Highlight)

#### Theme B: Light Mode
* `--bg-body`: `#FAFAFA` (Soft Neutral White)
* `--bg-card`: `#FFFFFF` (Pure White Card)
* `--bg-alt`: `#F1F3F5` (Subtle Neutral Background)
* `--text-main`: `#121212` (Jet Black Text)
* `--text-muted`: `#555555` (Mid Gray)
* `--border`: `#E2E8F0` (Border Slate)
* `--accent-orange`: `#FF6B00` (Vibrant Brand Orange)
* `--tag-tkj-bg`: `#FFF0E6` (Soft Orange Tint)
* `--tag-tkj-text`: `#D95200` (Dark Orange Text)

### 3. Typography Hierarchy
* **Primary Sans-Serif (Body & Headers):** `'Plus Jakarta Sans'`, sans-serif  
  * *H1 Hero:* 2.3rem / 36.8pt — Weight: 800 — Line Height: 1.2
  * *H2 Section:* 1.25rem / 20pt — Weight: 800 — Line Height: 1.3
  * *H3 Card Title:* 1.15rem / 18.4pt — Weight: 700 — Line Height: 1.35
  * *Body Paragraph:* 1.0rem / 16pt — Weight: 400 — Line Height: 1.7 (Reading Width: `65ch`)
* **Monospace (Code & Terminal):** `'Fira Code'`, monospace  
  * *Code Snippet:* 0.85rem / 13.6pt — Weight: 400 / 500 — Line Height: 1.5

### 4. Component Standards & UI Pattern Guidelines
1. **Cards & Containers:** `border-radius: 12px;`, `border: 1px solid var(--border);`, subtle hover translation (`transform: translateY(-2px);`).
2. **Callout Boxes (Da'wah & Quotes):** `border-left: 3px solid var(--accent-orange);`, `padding: 14px 18px;`, background tinted matching active theme.
3. **Buttons & Interactive Controls:** Minimum touch target size `44px x 44px`. Focus state outlined with `--accent-orange`.

---
*Generated for kanghadad.com — Cloudflare Pages & Astro Implementation Roadmap (v2.0).*
