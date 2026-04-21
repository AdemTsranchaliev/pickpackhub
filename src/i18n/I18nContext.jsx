import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { messages } from "./messages.js";
import {
  consumeUrlLocaleParam,
  fetchCountryCode,
  guessLocaleFromNavigator,
  isSupportedLocale,
  localeFromCountry,
  readStoredLocaleRaw,
} from "./detectLocale.js";
import { DEFAULT_LOCALE, HTML_LANG, LOCALE_OPTIONS, STORAGE_KEY } from "./locales.js";

const I18nContext = createContext(null);

const validLocales = new Set(LOCALE_OPTIONS.map((o) => o.code));

function persistLocale(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* ignore */
  }
}

function computeInitialLocale() {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const stored = readStoredLocaleRaw();
  if (stored) return stored;
  const urlLocale = consumeUrlLocaleParam();
  if (urlLocale) {
    persistLocale(urlLocale);
    return urlLocale;
  }
  return guessLocaleFromNavigator() || DEFAULT_LOCALE;
}

/** @param {unknown} obj @param {string} path */
export function getByPath(obj, path) {
  const parts = path.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = cur[p];
  }
  return cur;
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(computeInitialLocale);
  const geoDoneRef = useRef(false);
  const localeRef = useRef(locale);
  localeRef.current = locale;

  const setLocale = useCallback((next) => {
    if (!validLocales.has(next)) return;
    geoDoneRef.current = true;
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const m = useMemo(
    () => messages[locale] ?? messages[DEFAULT_LOCALE],
    [locale]
  );

  const t = useCallback(
    (path) => {
      const v = getByPath(m, path);
      return typeof v === "string" ? v : path;
    },
    [m]
  );

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale] ?? "en";
  }, [locale]);

  useEffect(() => {
    if (readStoredLocaleRaw()) {
      geoDoneRef.current = true;
      return;
    }

    let cancelled = false;

    (async () => {
      const country = await fetchCountryCode();
      if (cancelled || geoDoneRef.current) return;
      const fromGeo = localeFromCountry(country);
      if (fromGeo && isSupportedLocale(fromGeo)) {
        setLocaleState(fromGeo);
        persistLocale(fromGeo);
      } else {
        persistLocale(localeRef.current);
      }
      geoDoneRef.current = true;
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ locale, setLocale, t, m }), [locale, setLocale, t, m]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
