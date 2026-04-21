# PickPackHub

Marketing site: **Vite + React + MUI**, multilingual, SEO helpers.

## Local

```bash
npm install
npm run dev
```

Build: `npm run build` → output in `dist/`.

Optional: copy `.env.example` to `.env` and set `VITE_PUBLIC_SITE_URL` for correct canonical URLs.

---

## Go online

### Option A — Netlify (recommended; no special GitHub token)

1. [Netlify](https://www.netlify.com/) → **Add new site** → **Import an existing project** → GitHub → **pickpackhub**.
2. Build command **`npm run build`**, publish **`dist`** (already in `netlify.toml`).
3. After the first deploy: **Site configuration → Environment variables** → add **`VITE_PUBLIC_SITE_URL`** = your site URL (e.g. `https://pickpackhub.netlify.app`, no trailing slash) → **Redeploy**.

Custom domain: add it in Netlify, then set `VITE_PUBLIC_SITE_URL` to `https://pickpackhub.com` (or your domain).

### Option B — GitHub Pages (deploy from branch `gh-pages`)

**Live URL:** **https://ademtsranchaliev.github.io/pickpackhub/**

This repo uses **Deploy from a branch** → branch **`gh-pages`**, folder **`/`** (not GitHub Actions), so updates work without pushing workflow files.

**Publish / update the public site** (from a clone with push access):

```bash
chmod +x scripts/deploy-github-pages.sh
./scripts/deploy-github-pages.sh
```

The script runs `npm ci`, builds with `VITE_BASE_PATH=/pickpackhub/`, patches `robots.txt` / `sitemap.xml` for the `github.io` URL, and **force-pushes** the `dist/` output to `gh-pages`.

**First-time / Settings check:** Repo → **Settings → Pages** → **Build and deployment** → source **Deploy from a branch** → branch **`gh-pages`**, folder **`/`** → Save.

---

## GitHub token note

Some tools cannot `git push` files under `.github/workflows/` without extra **workflow** scope. The `gh-pages` branch deploy avoids that. Netlify also avoids it.
