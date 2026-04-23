import Head from "next/head";
import { FC } from "react";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  keywords?: string[];
  noindex?: boolean;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const siteUrl = "https://olyxee.com";

const SEO: FC<SEOProps> = ({
  title,
  description,
  path,
  ogType = "website",
  keywords,
  noindex = false,
  ogImage,
  jsonLd,
}) => {
  const fullTitle = `${title} | Olyxee`;
  const url = `${siteUrl}${path}`;
  const image = ogImage ?? `${siteUrl}/api/og`;

  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  // Auto-generate BreadcrumbList from the URL path so every page gets one for free
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0) {
    const breadcrumbItems = [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      ...segments.map((seg, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: seg
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        item: `${siteUrl}/${segments.slice(0, i + 1).join("/")}`,
      })),
    ];
    jsonLdArray.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    });
  }

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="canonical" href={url} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Olyxee" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - Olyxee`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@Olyxee" />
      <meta name="twitter:site" content="@Olyxee" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
      {jsonLdArray.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  );
};

export default SEO;
