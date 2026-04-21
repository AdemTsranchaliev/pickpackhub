import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages project site: set `VITE_BASE_PATH=/repo-name/` in CI. Netlify / custom domain: leave unset for `/`. */
function normalizeBase(path) {
  if (!path || path === "/") return "/";
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return withSlash.startsWith("/") ? withSlash : `/${withSlash}`;
}

export default defineConfig({
  plugins: [react()],
  base: normalizeBase(process.env.VITE_BASE_PATH),
});
