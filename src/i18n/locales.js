export const STORAGE_KEY = "pickpackhub-locale";

/** Fallback when geo + browser do not resolve (and for SSR). */
export const DEFAULT_LOCALE = "en";

export const LOCALE_OPTIONS = [
  { code: "bg", label: "Български", flag: "🇧🇬" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

/** @type {Record<string, string>} */
export const HTML_LANG = {
  bg: "bg",
  en: "en",
  tr: "tr",
  de: "de",
  fr: "fr",
  it: "it",
  es: "es",
};
