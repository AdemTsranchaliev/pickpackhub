# PickPackHub

Marketing site: **Vite + React + MUI**, multilingual, SEO helpers.

## Local

```bash
npm install
npm run dev
```

Build: `npm run build` → output in `dist/`.

Optional: copy `.env.example` to `.env` and set `VITE_PUBLIC_SITE_URL` for correct canonical URLs. For the contact form to **send email in the browser** (no `mailto:`), get a free key at [Web3Forms](https://web3forms.com), set the destination inbox to `sales@pickpackhub.eu`, and add **`VITE_WEB3FORMS_ACCESS_KEY`** to `.env` and to your host’s build environment (then rebuild).

---

## Go online

### Option A — Netlify (recommended; no special GitHub token)

1. [Netlify](https://www.netlify.com/) → **Add new site** → **Import an existing project** → GitHub → **pickpackhub**.
2. Build command **`npm run build`**, publish **`dist`** (already in `netlify.toml`).
3. After the first deploy: **Site configuration → Environment variables** → add **`VITE_PUBLIC_SITE_URL`** = your site URL (e.g. `https://pickpackhub.netlify.app`, no trailing slash) → **Redeploy**.

Custom domain: add it in Netlify, then set `VITE_PUBLIC_SITE_URL` to `https://pickpackhub.com` (or your domain).

### Option B — GitHub Pages (branch `gh-pages`)

**Public URL (custom domain, `public/CNAME`):** **https://pickpackhub.eu**  
*(Докато DNS към GitHub не е настроен, `https://ademtsranchaliev.github.io/pickpackhub/` пренасочва към домейна, ако той е активиран в **Settings → Pages**.)*

On every push to **`main`**, **GitHub Actions** runs **Deploy GitHub Pages** (`.github/workflows/deploy-gh-pages.yml`): production build (root `base`, `VITE_PUBLIC_SITE_URL=https://pickpackhub.eu`), patches `robots.txt` / `sitemap.xml`, pushes **`gh-pages`**.

**First-time:** **Settings → Pages** → **Deploy from a branch** → **`gh-pages`** / **`/`** → Save. In **Settings → Pages** (or **Domains**), add **pickpackhub.eu** and follow DNS (A/AAAA or CNAME) for GitHub Pages.

**Manual deploy** (optional):

```bash
chmod +x scripts/deploy-github-pages.sh
VITE_PUBLIC_SITE_URL=https://pickpackhub.eu ./scripts/deploy-github-pages.sh
```

Use `VITE_BASE_PATH` only if you publish without a custom domain (e.g. `VITE_BASE_PATH=/pickpackhub/` for `*.github.io/pickpackhub/` only).

---

## GitHub token note

GitHub Actions uses `GITHUB_TOKEN` to update `gh-pages`. Pushes from your machine need **repo** scope. Netlify deploy does not require a GitHub token for hosting.
