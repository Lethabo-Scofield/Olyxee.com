import Head from "next/head";
import { FC } from "react";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogType?: string;
}

const siteUrl = "https://olyxee.com";

const SEO: FC<SEOProps> = ({ title, description, path, ogType = "website" }) => {
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
      <meta property="og:image" content={`${siteUrl}/api/og`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/api/og`} />
      <meta name="twitter:creator" content="@Olyxee" />
    </Head>
  );
};

export default SEO;
