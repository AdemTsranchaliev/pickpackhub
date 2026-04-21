/** Canonical site origin (no trailing slash). Override in build: `VITE_PUBLIC_SITE_URL`. */
export const SITE_URL = String(import.meta.env.VITE_PUBLIC_SITE_URL ?? "https://pickpackhub.com").replace(/\/$/, "");
