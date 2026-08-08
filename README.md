# AWS Student Builder Group — HITMS

A modern, animated website for the AWS Student Builder Group at HITMS, built with
**React 19 + TanStack Start + Tailwind CSS v4 + Framer Motion**.

The theme is a soft, light slate-navy paired with a warm AWS amber, aligned with
the SBG logo.

---

## 1. What you need installed

| Tool    | Version | Download |
| ------- | ------- | -------- |
| Node.js | 20 or newer | https://nodejs.org (LTS) |
| npm     | comes with Node | — |

> npm is included with Node.js  no separate install required.

---

## 2. Run the project (commands)

Open a terminal inside the project folder and run, in order:

```bash
# 1) Install all dependencies (only the first time)
npm install

# 2) Start the local dev server (hot reload)
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:8080).

### Other useful commands

```bash
npm run build     # Production build into the dist/ folder
npm run preview   # Preview the production build locally
npm run lint      # Check code style
```

---

## 3. Folder structure

```text
.
├── public/
│   └── members/            # Drop member photos here (see each team's _REQUIRED_FILENAMES.md)
│       ├── captain/
│       ├── technical/
│       ├── media/
│       ├── marketing/
│       ├── creative/
│       └── events/
├── src/
│   ├── assets/             # Fonts & images bundled by Vite
│   ├── components/         # Reusable UI (Navbar, Footer, Hero3D, BootIntro, …)
│   │   └── ui/             # shadcn/ui primitives
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Helpers & utilities
│   ├── routes/             # Pages (file-based routing)
│   │   ├── __root.tsx      # App shell (html/head/body)
│   │   ├── index.tsx       # Home
│   │   ├── about.tsx
│   │   ├── events.tsx
│   │   ├── members.tsx     # Teams + captain spotlight
│   │   ├── resources.tsx
│   │   └── contact.tsx
│   └── styles.css          # Design tokens + theme (all colors live here)
├── package.json
└── vite.config.ts
```

---

## 4. Adding member photos

Each team folder under `public/members/` has a `_REQUIRED_FILENAMES.md` listing
the exact filenames to use. Add a `.jpg` for each member with the **exact name**
shown there, e.g.:

```
public/members/captain/Hanzala Salaheen.jpg
public/members/technical/Abdul Rafay.jpg
```

If a photo is missing, the card automatically shows the person's initials as a
fallback — nothing breaks.

---

## 5. Changing the theme

All colors are defined once in `src/styles.css` (the `:root` block) using `oklch`
values. Change `--primary`, `--background`, `--accent`, etc. there and the whole
site updates — never hardcode colors inside components.
