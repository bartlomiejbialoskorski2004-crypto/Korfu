# KORFU INVESTMENT

Premium-editorial landing page for a real-estate agency selling investment apartments on Corfu, Greece.

Stack: **Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · Motion · Sanity (embedded Studio) · Vercel**

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in Sanity values
npm run dev
```

Open <http://localhost:3000> for the site and <http://localhost:3000/studio> for the embedded Sanity Studio.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes (for Studio + CMS fetches) | From <https://www.sanity.io/manage> → your project → Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | yes (defaults to `production` if missing) | Usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | optional | Defaults to `2024-10-01` |
| `SANITY_API_READ_TOKEN` | optional | Required only for private datasets / draft mode |

> The build will succeed even with empty Sanity values — the home page does not need Sanity. The `/studio` route and any CMS content will fail at runtime until real values are provided.

## Deploying to Vercel

1. **Import the GitHub repository** at <https://vercel.com/new> — Vercel auto-detects Next.js. Framework preset: *Next.js*. Build command and output directory: leave defaults.
2. **Set environment variables** in *Project Settings → Environment Variables*. At minimum, add the variables from the table above (mark Sanity values as available for *Production*, *Preview*, and *Development* environments).
3. **Deploy**. Vercel uses the `engines.node` constraint in `package.json` (Node ≥ 20).
4. **Sanity Studio CORS** — after the first successful deploy, open <https://www.sanity.io/manage> → your project → *API → CORS origins* and add:
   - `https://<your-vercel-project>.vercel.app`
   - any custom production domain you assign
   - `http://localhost:3000` (for local Studio)
5. **Custom domain (optional)** — Project Settings → Domains. Re-add the production domain to Sanity CORS after attaching it.

### Region

Vercel auto-picks the deploy region. To pin to Frankfurt (closer for Greek/Polish users), edit project settings or add `regions: ["fra1"]` in `vercel.json` if needed.

## Project layout

```
src/
├── app/                        # App Router entry points
│   ├── layout.tsx              # root layout (Geist, RootCursor, metadata)
│   ├── page.tsx                # homepage → Hero + ComingSoon
│   ├── globals.css             # Tailwind v4 import + palette tokens
│   └── studio/[[...tool]]/     # embedded Sanity Studio
├── components/
│   ├── hero/                   # editorial hero (TopBar, HeroVideo, MaskedWord, MagneticCTA, …)
│   ├── sections/ComingSoon.tsx # placeholder #oferta section
│   └── ui/                     # NavLink, RootCursor (custom cursor)
├── lib/
│   ├── i18n.ts                 # server-safe dictionary (PL + EN)
│   ├── use-locale.ts           # client hook (useSyncExternalStore + localStorage)
│   └── client-stores.ts        # shared minute ticker + hover-media subscription
└── sanity/                     # client + Studio config (env, schemas, structure)
public/
├── images/hero-poster.jpg      # placeholder poster (replace with real shot of Corfu)
└── video/hero.mp4              # ⚠️ add a drone clip (e.g. Pexels free) — 1080p, < 8 MB
```

## Hero design highlights

- Live Corfu time + weather pill (Open-Meteo, no API key)
- Geographic coordinates badge — `39°37′N 19°50′E`
- Word-clip mask on the “Korfu / Corfu” headline word
- Magnetic CTA with spring-following pointer offset
- Mix-blend custom cursor (8 px dot → “→” pill on link hover)
- Word-by-word `clip-path` reveal on the H1
- Subtle video parallax + scale, all gated by `prefers-reduced-motion`
- Bilingual PL/EN toggle with `localStorage` persistence

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server at <http://localhost:3000> |
| `npm run build` | Production build (Turbopack) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint (Next.js config) |
