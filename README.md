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

### Option B — GitHub Pages

URL: **https://ademtsranchaliev.github.io/pickpackhub/**

1. Repo **Settings → Pages → Build and deployment**: source **GitHub Actions**.
2. Create **`.github/workflows/deploy-pages.yml`** in the repo (GitHub “Add file” is fine).  
   If `git push` rejects workflow files, run `gh auth refresh -s workflow` or use a PAT with **workflow** scope, then push from your machine.

**File `.github/workflows/deploy-pages.yml`:**

```yaml
# Deploy static site to GitHub Pages (Settings → Pages → Source: GitHub Actions).
name: Deploy GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"

      - name: Install and build
        env:
          VITE_BASE_PATH: /pickpackhub/
          VITE_PUBLIC_SITE_URL: https://ademtsranchaliev.github.io/pickpackhub
        run: |
          npm ci
          npm run build

      - name: Align robots & sitemap with deploy URL
        env:
          DEPLOY_ORIGIN: https://ademtsranchaliev.github.io/pickpackhub
        run: |
          sed -i "s|https://pickpackhub.com|${DEPLOY_ORIGIN}|g" dist/robots.txt dist/sitemap.xml

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

3. Push to `main` (or **Actions → Deploy GitHub Pages → Run workflow**). When green, open the Pages URL above.

---

## GitHub token note

OAuth apps used by `gh`/Cursor may lack the **workflow** scope → `git push` of `.github/workflows/*` can fail. Netlify avoids that; for Pages, paste the YAML in the web UI or refresh auth with `workflow` scope.
