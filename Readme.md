# RIC Website

Official website for RIC, built with React.js and Vite.

## Theme — Changing Tangents

> From broken logic to brilliant horizons.

Genre: **Abstract**. The site treats anomalies as doorways to new paradigms rather
than errors to erase, and unites four streams into one engine of lateral
transformation: **Core Research**, **Digital Exploration**, **Systemic Design** and
**Speculative Thinking**.

**Colour palette** — "Prismatic Glassmorphism & Iridescence (Refraction & Divergence)". Hexes live
once, as RGB channels, in `src/index.css` (`:root`); `tailwind.config.js` maps them to the same
token names as before, so existing classes (`bg-ink`, `text-mint`, …) still work:

| Token      | Role                                   | Hex       |
| ---------- | -------------------------------------- | --------- |
| `ink`      | Midnight Teal — the stage              | `#062B32` |
| `prism`    | retired — now a cyan shade (glass tints) | `#1FA9AD` |
| `mint`     | Iridescent Cyan — labels, hover        | `#36E5E8` |
| `amber`    | Refraction Amber — warm light          | `#FFC878` |
| `crimson`  | Form error messages only               | `#FF6A72` |
| `chalk`    | Soft Lavender Pearl — text             | `#ECEAF6` |
| `titanium` / `chrome` / `magenta` | glass neutrals / rare accent | `#A7B0BA` / `#D5DCE6` / `#D64FC8` |

The visible palette is three colours: **cyan, amber and white**. Blue and red are no longer used
for decoration (red stays for form errors).

Lighting rule: light travels left → right and dips slightly downward. Glass highlights sit on the
top/left edges; spectral colour appears only at exit edges (lower/right) and in the hero beam.

**Logo:** `src/components/common/Logo` renders the RIC mark as inline SVG
(`variant="nav"` for Navbar/Footer, `"hero"` for the Home hero, `"preload"` for the intro). Facets
are drawn as outlines, assembled and filled. `Preloader` plays the assembly full-screen once per
session (skipped under `prefers-reduced-motion`), then the mark flies into the hero, where
`PrismBeam` draws the beam that enters, bends and splits.

**Vision board motifs:** scattered blueprints, fractured light prisms, chalkboard
equations with sudden branches, circuit paths curving unpredictably, macroscopic
crystallization, multi-layered overlay diagrams.

Fonts: 8 switchable sets (**Font test** swatches in the footer, saved in `localStorage`). Data in
`src/data/fontSets.js`, UI in `components/common/FontSwitcher`, one Google Fonts request in
`index.html`. Tailwind: `font-display` (headings), `font-sub`, `font-body`, `font-mono` (labels).

## Tech Stack

- **React.js** (with Vite)
- **React Router** – client-side routing between pages
- **Tailwind CSS** – styling for most pages and shared components
- **Custom CSS** – used only for the Home page (`Home.css` / `Hero.css`)

> Styling convention: pages and shared components use Tailwind utility classes.
> The Home page is the only place using hand-written CSS.

## Pages (Navigation)

| Page       | Route       | Source                          | Styling     |
| ---------- | ----------- | ------------------------------- | ----------- |
| Home       | `/`         | `src/pages/Home/Home.jsx`       | Custom CSS  |
| About Us   | `/about`    | `src/pages/About/About.jsx`     | Tailwind    |
| Events     | `/events`   | `src/pages/Events/Events.jsx`   | Tailwind    |
| Team       | `/team`     | `src/pages/Team/Team.jsx`       | Tailwind    |
| Contact Us | `/contact`  | `src/pages/Contact/Contact.jsx` | Tailwind    |

These links live in the `Navbar` (`src/components/common/Navbar`).

## Folder Structure

```
RIC/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar/        Navbar.jsx
│   │   │   ├── Footer/        Footer.jsx
│   │   │   ├── Button/        Button.jsx
│   │   │   └── Logo/          Logo.jsx + logoShards.js
│   │   └── home/              Hero.jsx + Hero.css
│   ├── pages/
│   │   ├── Home/              Home.jsx + Home.css
│   │   ├── About/             About.jsx
│   │   ├── Events/            Events.jsx
│   │   ├── Team/              Team.jsx
│   │   └── Contact/           Contact.jsx
│   ├── routes/                AppRoutes.jsx
│   ├── data/                  events.js, team.js
│   ├── hooks/                 useScrollTop.js
│   ├── utils/                 constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── .gitignore
```

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the build
```
