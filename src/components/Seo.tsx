import { useEffect } from "react";
import {
  absoluteUrl,
  defaultRobots,
  ensureAbsoluteUrl,
  type JsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string | null;
  modifiedTime?: string | null;
  structuredData?: JsonLd[];
};

type MetaTagDefinition = {
  attribute: "name" | "property";
  key: string;
  content?: string | null;
};

const setMetaTag = ({ attribute, key, content }: MetaTagDefinition) => {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!content) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement("meta");
  element.setAttribute(attribute, key);
  element.setAttribute("content", content);

  if (!existing) {
    document.head.appendChild(element);
  }
};

const setCanonicalLink = (href: string) => {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const element = existing ?? document.createElement("link");

  element.setAttribute("rel", "canonical");
  element.setAttribute("href", href);

  if (!existing) {
    document.head.appendChild(element);
  }
};

const setManagedStructuredData = (structuredData: JsonLd[]) => {
  document.head.querySelectorAll('script[data-managed-by="seo"]').forEach((node) => node.remove());

  structuredData.forEach((entry) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.managedBy = "seo";
    script.text = JSON.stringify(entry);
    document.head.appendChild(script);
  });
};

const Seo = ({
  title,
  description,
  path,
  image,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  structuredData = [],
}: SeoProps) => {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path);
    const imageUrl = ensureAbsoluteUrl(image ?? siteConfig.defaultImagePath);
    const robots = noindex ? "noindex,nofollow,noarchive" : defaultRobots;
    const twitterCard = imageUrl === ensureAbsoluteUrl(siteConfig.defaultImagePath) ? "summary" : "summary_large_image";

    document.title = title;
    document.documentElement.lang = "en";

    setCanonicalLink(canonicalUrl);

    [
      { attribute: "name", key: "description", content: description },
      { attribute: "name", key: "author", content: siteConfig.siteName },
      { attribute: "name", key: "application-name", content: siteConfig.siteName },
      { attribute: "name", key: "apple-mobile-web-app-title", content: siteConfig.siteName },
      { attribute: "name", key: "theme-color", content: siteConfig.themeColor },
      { attribute: "name", key: "robots", content: robots },
      { attribute: "name", key: "googlebot", content: robots },
      { attribute: "property", key: "og:locale", content: siteConfig.locale },
      { attribute: "property", key: "og:type", content: type },
      { attribute: "property", key: "og:site_name", content: siteConfig.siteName },
      { attribute: "property", key: "og:title", content: title },
      { attribute: "property", key: "og:description", content: description },
      { attribute: "property", key: "og:url", content: canonicalUrl },
      { attribute: "property", key: "og:image", content: imageUrl },
      { attribute: "property", key: "og:image:alt", content: `${title} - ${siteConfig.brandName}` },
      { attribute: "name", key: "twitter:card", content: twitterCard },
      { attribute: "name", key: "twitter:site", content: siteConfig.twitterHandle },
      { attribute: "name", key: "twitter:title", content: title },
      { attribute: "name", key: "twitter:description", content: description },
      { attribute: "name", key: "twitter:image", content: imageUrl },
      { attribute: "property", key: "article:published_time", content: type === "article" ? publishedTime : null },
      { attribute: "property", key: "article:modified_time", content: type === "article" ? modifiedTime : null },
    ].forEach(setMetaTag);

    setManagedStructuredData(structuredData);
  }, [description, image, modifiedTime, noindex, path, publishedTime, structuredData, title, type]);

  return null;
};

export default Seo;
