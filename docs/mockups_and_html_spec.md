# FIFA WORLD CUP 2026 CHECKLIST
## HD Mockups + Pixel Perfect HTML Specification
### Desktop Edition (Keyboard + Mouse Optimized)

---

# Creative Direction

The application must feel like a hybrid between:

- FIFA Ultimate Team
- Panini Digital Album
- EA Sports FC menus
- Modern esports dashboards
- Premium collectible interfaces

Visual tone:

- dark UI
- holographic accents
- vibrant gradients
- premium sports atmosphere
- dense but organized layouts
- responsive desktop-first interaction

---

# Global UI Rules

## Resolution Targets

### Main Design Resolution
- 1920x1080

### Secondary
- 2560x1440
- 1600x900
- 1366x768

---

# Global Layout

## Application Shell

```html
<body class="app-shell">
  <aside class="sidebar"></aside>
  <main class="content"></main>
  <aside class="right-panel"></aside>
</body>
```

---

# Color Tokens

```css
:root {
  --bg: #0B0B0D;
  --surface: #151515;
  --surface-2: #1D1D1F;
  --cyan: #79D8DB;
  --cyan-dark: #55C8D0;
  --yellow: #FFD400;
  --red: #E21B3C;
  --orange: #FF6A00;
  --green: #22B455;
  --blue: #2458FF;
  --white: #F5F5F5;
}
```

---

# Typography

## Fonts

### Headings
- Bebas Neue
- Inter Tight

### UI Text
- Inter

### Numbers
- Montserrat ExtraBold

---

# MAIN MENU SCREEN

## Visual Description

A premium fullscreen dashboard with:

- left holographic navigation
- animated player artwork
- floating collectible cards
- glowing CTA buttons
- live progress widget

Background:
- dark gradient
- football texture overlays
- cyan and yellow glows

---

## Desktop Layout

```html
<div class="main-menu-layout">
  <aside class="menu-sidebar">
    <div class="logo">PANINI WC 2026</div>

    <nav>
      <button class="menu-item active">View Collection</button>
      <button class="menu-item">Mark Owned</button>
      <button class="menu-item">Mark Duplicate</button>
      <button class="menu-item">Statistics</button>
      <button class="menu-item">Search</button>
      <button class="menu-item">Export</button>
    </nav>
  </aside>

  <main class="hero-area">
    <div class="hero-card"></div>
    <div class="progress-panel"></div>
  </main>
</div>
```

---

## Mockup Notes

### Left Sidebar
- translucent dark glass
- active item glow cyan
- hover animation
- large iconography

### Hero Area
- giant typography
- animated football cards
- collectible atmosphere

### Progress Widget
- radial completion ring
- total stickers
- duplicates
- missing

---

# VIEW COLLECTION SCREEN

## Visual Direction

This is the core experience.

The screen should feel like:

> “Browsing a premium digital football sticker album.”

---

## Layout

```html
<div class="collection-screen">
  <header class="topbar"></header>

  <section class="collection-toolbar"></section>

  <section class="card-grid">
    <article class="sticker-card owned"></article>
    <article class="sticker-card missing"></article>
    <article class="sticker-card duplicate"></article>
  </section>
</div>
```

---

## Sticker Card Design

### Visual Layers

1. Gradient background
2. Holographic overlay
3. Giant background number
4. Player render
5. National flag stripe
6. Sticker metadata
7. Quantity badge
8. Rarity glow

---

## Sticker Card CSS

```css
.sticker-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(145deg, #1d1d1f, #0f0f10);
  transition: 220ms ease-out;
  box-shadow: 0 10px 40px rgba(0,0,0,.45);
}

.sticker-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 20px 60px rgba(121,216,219,.25);
}
```

---

## States

### Missing
- grayscale
- reduced glow

### Owned
- full vibrant colors
- cyan outline

### Duplicate
- orange/gold glow
- animated badge

---

# SEARCH SCREEN

## UX Goal

Fast desktop-oriented searching.

Inspired by:
- Steam search
- FUT transfer market
- esports dashboards

---

## Layout

```html
<div class="search-layout">
  <div class="search-header">
    <input class="search-input" />
  </div>

  <div class="search-results-grid"></div>

  <aside class="search-preview"></aside>
</div>
```

---

## Features

### Left
- search results grid

### Right
- giant preview card
- player stats
- rarity info
- ownership status

---

# STATISTICS SCREEN

## Visual Concept

A sports analytics dashboard.

Should resemble:
- FIFA analytics
- esports control panels
- football data dashboards

---

## Layout

```html
<div class="stats-dashboard">
  <section class="stats-overview"></section>

  <section class="charts-grid">
    <div class="chart-card"></div>
    <div class="chart-card"></div>
    <div class="chart-card"></div>
  </section>
</div>
```

---

## Widgets

### Completion Widget
- giant circular progress
- animated percentage

### Group Stats
- horizontal bars
- group flags
- completion glow

### Duplicate Rankings
- podium visualization
- collectible rarity style

---

# EXPORT SCREEN

## Visual Style

Professional export center.

Feels like:
- esports inventory management
- modern dashboard utilities

---

## Layout

```html
<div class="export-layout">
  <section class="export-panel">
    <button class="export-option pdf"></button>
    <button class="export-option csv"></button>
    <button class="export-option txt"></button>
  </section>

  <section class="preview-panel"></section>
</div>
```

---

## Export Cards

### PDF
- red accent
- printable preview

### CSV
- green spreadsheet aesthetic

### TXT
- cyan terminal-inspired look

---

# MARK OWNED SCREEN

## Interaction Style

Quick keyboard-first workflow.

Optimized for:
- rapid sticker entry
- collectors opening packs
- minimal friction

---

## Layout

```html
<div class="mark-owned-layout">
  <section class="input-panel"></section>
  <section class="recently-added"></section>
</div>
```

---

## UX Details

### Left
- giant input field
- autocomplete
- quick quantity selector

### Right
- recently added stickers
- animated acquisition feedback

---

# DUPLICATES SCREEN

## Visual Style

Trade-market inspired.

Use:
- orange accents
- marketplace visuals
- duplicate counters

---

# GLOBAL COMPONENTS

## Buttons

```css
.btn-primary {
  background: linear-gradient(145deg, #FFD400, #F3D116);
  color: black;
  border-radius: 18px;
  padding: 14px 22px;
  font-weight: 800;
}
```

---

## Panels

```css
.panel {
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 24px;
}
```

---

# ASSETS REQUIRED

## Backgrounds

### Generate
- dark football textures
- geometric gradients
- holographic overlays
- stadium lighting
- diagonal esports patterns

---

## Card Assets

### Generate
- holographic borders
- rarity frames
- foil overlays
- gradient backgrounds
- collectible badges

---

## Icons

### Categories
- collection
- search
- statistics
- export
- duplicates
- teams
- players

Recommended:
- Lucide
- Heroicons

---

# ANIMATION SYSTEM

## Motion Style

Inspired by:
- EA Sports FC menus
- modern gaming UI
- esports transitions

---

## Recommended Library

```bash
npm install framer-motion
```

---

## Motion Rules

### Hover
- slight scale
- glow increase
- smooth elevation

### Page Transition
- fade + blur
- 220ms duration

### Card Reveal
- flip animation
- glow pulse
- particle burst

---

# DESKTOP UX PRINCIPLES

## The App Must Feel

- extremely responsive
- tactile with mouse
- efficient with keyboard
- visually rewarding
- premium collectible focused

---

# IMPLEMENTATION STACK

## Recommended

### Frontend
- React
- TailwindCSS
- Framer Motion

### Runtime
- Bun

### Desktop
- Tauri

---

# FINAL CREATIVE SUMMARY

The application should ultimately feel like:

> “A next-generation premium FIFA World Cup digital sticker collection platform designed for collectors, trading enthusiasts, and completionists.”

