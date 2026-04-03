import Head from "next/head";
import { FC } from "react";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
}

const siteUrl = "https://olyxee.com";

const SEO: FC<SEOProps> = ({ title, description, path, ogType = "website", jsonLd }) => {
  const fullTitle = `${title} | Olyxee`;
  const url = `${siteUrl}${path}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Olyxee" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={`${siteUrl}/api/og`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - Olyxee`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/api/og`} />
      <meta name="twitter:creator" content="@Olyxee" />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
};

export default SEO;
