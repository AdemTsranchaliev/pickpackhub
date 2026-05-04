# PickPackHub

Marketing site: **Vite + React + MUI**, multilingual, SEO helpers.

## Local

```bash
npm install
npm run dev
```

Build: `npm run build` → output in `dist/`.

Optional: copy `.env.example` to `.env` and set `VITE_PUBLIC_SITE_URL` for correct canonical URLs.

**Contact form & email:** The form only **sends mail through the network** if the static build includes a **Web3Forms** access key. Without it, the site falls back to **`mailto:`** (opens the visitor’s email app — it does **not** send from your server). To fix “email not sending”:

1. Create a key at [web3forms.com](https://web3forms.com) and set the notification inbox to **`sales@pickpackhub.eu`**.  
2. **Local / script deploy:** put the key in **`.env.production.local`** (gitignored) as `VITE_WEB3FORMS_ACCESS_KEY=...` or run `export VITE_WEB3FORMS_ACCESS_KEY='...'` before `./scripts/deploy-github-pages.sh`.  
3. **GitHub Actions deploy:** in the repo go to **Settings → Secrets and variables → Actions → New repository secret**, name **`VITE_WEB3FORMS_ACCESS_KEY`**, value = your key. The workflow passes it into `npm run build`. Redeploy (**Actions** → run workflow, or push to `main`).

**Zoho Mail:** The site does not connect to Zoho’s API. **Web3Forms** only needs a **destination address** — set it to **`sales@pickpackhub.eu`**. If that mailbox is on **Zoho Mail**, form submissions land in the same Zoho inbox as regular mail. On first tests, check **Spam**; add a filter if notifications are filtered.

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

**Ако GitHub пише „not published“ или виждаш 404:** източникът трябва да е **Deploy from a branch** (клон `gh-pages`), **не** само „GitHub Actions“ като *единствен* източник — workflow-ът **качва** `gh-pages`; Pages трябва да го **сервира** от клона. Ръчно обновяване: **Actions** → **Deploy GitHub Pages** → **Run workflow** (след `workflow_dispatch`).

**Manual deploy** (optional):

```bash
chmod +x scripts/deploy-github-pages.sh
VITE_PUBLIC_SITE_URL=https://pickpackhub.eu ./scripts/deploy-github-pages.sh
```

Use `VITE_BASE_PATH` only if you publish without a custom domain (e.g. `VITE_BASE_PATH=/pickpackhub/` for `*.github.io/pickpackhub/` only).

---

## GitHub token note

GitHub Actions uses `GITHUB_TOKEN` to update `gh-pages`. Pushes from your machine need **repo** scope. Netlify deploy does not require a GitHub token for hosting.
