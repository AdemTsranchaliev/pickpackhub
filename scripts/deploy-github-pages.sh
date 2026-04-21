#!/usr/bin/env bash
# Build and push static site to branch `gh-pages` (GitHub Pages: Deploy from branch).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export VITE_BASE_PATH="${VITE_BASE_PATH:-/pickpackhub/}"
export VITE_PUBLIC_SITE_URL="${VITE_PUBLIC_SITE_URL:-https://ademtsranchaliev.github.io/pickpackhub}"

npm ci
npm run build

DEPLOY_ORIGIN="${VITE_PUBLIC_SITE_URL%/}"
if [[ "$(uname)" == "Darwin" ]]; then
  sed -i '' "s|https://pickpackhub.com|${DEPLOY_ORIGIN}|g" dist/robots.txt dist/sitemap.xml
else
  sed -i "s|https://pickpackhub.com|${DEPLOY_ORIGIN}|g" dist/robots.txt dist/sitemap.xml
fi

rm -f dist/.DS_Store
TMP="$(mktemp -d)"
cp -R dist/. "$TMP/"
cd "$TMP"
git init
git checkout -B gh-pages
git add -A
git commit -m "Deploy static site to GitHub Pages ($(date -u +%Y-%m-%dT%H:%MZ))"

REMOTE="${GITHUB_PAGES_REMOTE:-origin}"
if git -C "$ROOT" remote get-url "$REMOTE" &>/dev/null; then
  UPSTREAM="$(git -C "$ROOT" remote get-url "$REMOTE")"
else
  echo "No git remote '$REMOTE' in $ROOT; set GITHUB_PAGES_REMOTE or add origin." >&2
  exit 1
fi

git remote add origin "$UPSTREAM"
git push -u origin gh-pages --force
echo "Done. Site: ${VITE_PUBLIC_SITE_URL}/"
