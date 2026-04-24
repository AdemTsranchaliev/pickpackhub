import { useEffect, useMemo } from "react";
import { BRAND_NAME, CONTACT_EMAIL } from "../brand.js";
import { useI18n } from "../i18n/I18nContext.jsx";
import { messages } from "../i18n/messages.js";
import { DEFAULT_LOCALE, LOCALE_OPTIONS } from "../i18n/locales.js";
import { SITE_URL } from "../seo/siteUrl.js";

const OG_LOCALE = {
  bg: "bg_BG",
  en: "en_GB",
  tr: "tr_TR",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
  es: "es_ES",
};

function upsertMetaName(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaProperty(property, content) {
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertHreflang(hreflang, href) {
  let el = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function clearHreflangAlternates() {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function SeoHead() {
  const { locale, m } = useI18n();
  const seo = m.seo ?? messages[DEFAULT_LOCALE].seo ?? messages.en.seo;

  const ogUrl = useMemo(() => `${SITE_URL}/?lang=${encodeURIComponent(locale)}`, [locale]);
  const logoUrl = `${SITE_URL}/favicon.svg`;

  useEffect(() => {
    document.title = seo.title;

    upsertMetaName("description", seo.description);
    upsertMetaName("keywords", seo.keywords);
    upsertMetaName("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    upsertMetaName("googlebot", "index, follow");

    upsertMetaProperty("og:type", "website");
    upsertMetaProperty("og:site_name", BRAND_NAME);
    upsertMetaProperty("og:title", seo.title);
    upsertMetaProperty("og:description", seo.description);
    upsertMetaProperty("og:url", ogUrl);
    upsertMetaProperty("og:locale", OG_LOCALE[locale] ?? "en_GB");
    upsertMetaProperty("og:image", logoUrl);
    upsertMetaProperty("og:image:alt", `${BRAND_NAME} — logo`);

    upsertMetaName("twitter:card", "summary");
    upsertMetaName("twitter:title", seo.title);
    upsertMetaName("twitter:description", seo.description);

    upsertCanonical(`${SITE_URL}/`);

    clearHreflangAlternates();
    for (const { code } of LOCALE_OPTIONS) {
      upsertHreflang(code, `${SITE_URL}/?lang=${encodeURIComponent(code)}`);
    }
    upsertHreflang("x-default", `${SITE_URL}/?lang=${encodeURIComponent(DEFAULT_LOCALE)}`);

    const orgId = `${SITE_URL}/#organization`;
    const websiteId = `${SITE_URL}/#website`;
    upsertJsonLd("pph-jsonld-main", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": orgId,
          name: BRAND_NAME,
          url: SITE_URL,
          logo: logoUrl,
          email: CONTACT_EMAIL,
          areaServed: ["Bulgaria", "Greece", "Romania", "European Union"],
          knowsAbout: ["Third-party logistics", "E-commerce fulfilment", "Warehousing", "Cross-border EU shipping"],
        },
        {
          "@type": "WebSite",
          "@id": websiteId,
          name: BRAND_NAME,
          url: SITE_URL,
          inLanguage: LOCALE_OPTIONS.map((o) => o.code),
          publisher: { "@id": orgId },
          description: seo.description,
        },
      ],
    });
  }, [locale, seo.title, seo.description, seo.keywords, ogUrl, logoUrl]);

  return null;
}
