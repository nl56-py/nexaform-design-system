import type { BlogRecord } from "@/lib/blogs";
import type { ProjectRecord } from "@/lib/projects";
import { siteConfig, siteContact, socialLinks } from "@/lib/site-config";

export type JsonLd = Record<string, unknown>;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type ItemListEntry = {
  name: string;
  path: string;
};

export const defaultRobots =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

export const organizationId = `${siteConfig.siteUrl}/#organization`;
export const websiteId = `${siteConfig.siteUrl}/#website`;

const collapseWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const normalizePath = (value: string) => {
  if (!value) {
    return "/";
  }

  return value.startsWith("/") ? value : `/${value}`;
};

export const absoluteUrl = (value = "/") => new URL(normalizePath(value), siteConfig.siteUrl).toString();

export const ensureAbsoluteUrl = (value?: string | null) => {
  if (!value) {
    return absoluteUrl(siteConfig.defaultImagePath);
  }

  if (/^https?:\/\//i.test(value) || value.startsWith("data:")) {
    return value;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  return absoluteUrl(value);
};

export const stripHtml = (value?: string | null) => {
  if (!value) {
    return "";
  }

  return collapseWhitespace(
    value
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'"),
  );
};

export const toMetaDescription = (value: string, maxLength = 160) => {
  const plainText = stripHtml(value);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  const clipped = plainText.slice(0, maxLength + 1);
  const lastSpace = clipped.lastIndexOf(" ");

  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped.slice(0, maxLength)).trim()}...`;
};

export const createTitle = (pageTitle: string) => `${pageTitle} | ${siteConfig.brandName}`;

export const buildOrganizationSchema = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: siteConfig.siteName,
  legalName: siteConfig.siteName,
  alternateName: siteConfig.alternateName,
  description: siteConfig.defaultDescription,
  url: siteConfig.siteUrl,
  logo: {
    "@type": "ImageObject",
    url: ensureAbsoluteUrl(siteConfig.logoPath),
  },
  image: ensureAbsoluteUrl(siteConfig.logoPath),
  email: siteContact.email,
  areaServed: siteContact.areaServed,
  address: {
    "@type": "PostalAddress",
    addressCountry: siteContact.countryCode,
  },
  sameAs: socialLinks.map((social) => social.href),
});

export const buildWebsiteSchema = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: siteConfig.siteName,
  alternateName: siteConfig.alternateName,
  url: siteConfig.siteUrl,
  inLanguage: "en",
  publisher: {
    "@id": organizationId,
  },
});

type WebPageSchemaInput = {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string | null;
  breadcrumbId?: string;
};

export const buildWebPageSchema = ({
  title,
  description,
  path,
  type = "WebPage",
  image,
  breadcrumbId,
}: WebPageSchemaInput): JsonLd => {
  const canonicalUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": organizationId,
    },
    breadcrumb: breadcrumbId
      ? {
          "@id": breadcrumbId,
        }
      : undefined,
    primaryImageOfPage: image
      ? {
          "@type": "ImageObject",
          url: ensureAbsoluteUrl(image),
        }
      : undefined,
  };
};

export const buildBreadcrumbSchema = (items: BreadcrumbItem[]): JsonLd => {
  const canonicalUrl = absoluteUrl(items[items.length - 1]?.path ?? "/");

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
};

type ItemListSchemaInput = {
  path: string;
  idSuffix: string;
  name: string;
  items: ItemListEntry[];
};

export const buildItemListSchema = ({
  path,
  idSuffix,
  name,
  items,
}: ItemListSchemaInput): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${absoluteUrl(path)}#${idSuffix}`,
  name,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(item.path),
    name: item.name,
  })),
});

export const buildBlogPostingSchema = (post: BlogRecord): JsonLd => {
  const pageUrl = absoluteUrl(`/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
    headline: post.title,
    description: toMetaDescription(post.excerpt),
    articleSection: post.category,
    keywords: (post.tags ?? []).join(", "),
    image: post.cover_image ? [ensureAbsoluteUrl(post.cover_image)] : [ensureAbsoluteUrl(siteConfig.defaultImagePath)],
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    author: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
  };
};

export const buildProjectSchema = (project: ProjectRecord): JsonLd => {
  const pageUrl = absoluteUrl(`/projects/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#case-study`,
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
    headline: project.title,
    name: project.title,
    description: toMetaDescription(project.description),
    keywords: (project.tags ?? []).join(", "),
    genre: project.industry ?? "Case Study",
    image: project.cover_image ? [ensureAbsoluteUrl(project.cover_image)] : [ensureAbsoluteUrl(siteConfig.defaultImagePath)],
    datePublished: project.created_at,
    dateModified: project.updated_at,
    creator: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
  };
};
