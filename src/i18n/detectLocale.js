import { LOCALE_OPTIONS, STORAGE_KEY } from "./locales.js";

const valid = new Set(LOCALE_OPTIONS.map((o) => o.code));

/** ISO 3166-1 alpha-2 → locale when unambiguous; omit BE/CH etc. to fall back to browser. */
const COUNTRY_TO_LOCALE = {
  BG: "bg",
  TR: "tr",
  DE: "de",
  AT: "de",
  LI: "de",
  FR: "fr",
  MC: "fr",
  LU: "fr",
  IT: "it",
  SM: "it",
  VA: "it",
  ES: "es",
  AD: "es",
  GB: "en",
  IE: "en",
  US: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  ZA: "en",
  IN: "en",
  SG: "en",
};

export function isSupportedLocale(code) {
  return typeof code === "string" && valid.has(code);
}

export function readStoredLocaleRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && valid.has(raw)) return raw;
  } catch {
    /* ignore */
  }
  return null;
}

/** First matching browser language, or null. */
export function guessLocaleFromNavigator() {
  if (typeof navigator === "undefined") return null;
  const list = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of list) {
    if (!lang) continue;
    const base = String(lang).split("-")[0].toLowerCase();
    if (valid.has(base)) return base;
  }
  return null;
}

/** Read `?lang=xx` from URL, validate, strip param from address bar. */
export function consumeUrlLocaleParam() {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("lang")?.toLowerCase();
    if (!raw || !valid.has(raw)) return null;
    params.delete("lang");
    const qs = params.toString();
    const path = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", path);
    return raw;
  } catch {
    return null;
  }
}

export async function fetchCountryCode() {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 4500);
  try {
    const res = await fetch("https://get.geojs.io/v1/ip/country.json", {
      signal: ctrl.signal,
      credentials: "omit",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const cc = data?.country;
    if (typeof cc === "string" && cc.length === 2) return cc.toUpperCase();
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

export function localeFromCountry(countryCode) {
  if (!countryCode) return null;
  const upper = String(countryCode).toUpperCase();
  return COUNTRY_TO_LOCALE[upper] ?? null;
}
