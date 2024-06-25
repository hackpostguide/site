import { Metadata } from 'next';
import { siteConfig } from '@/app/config/site';

interface MetadataParams {
  title?: string;
  description?: string;
  image?: string;
  author?: string;
  pathname?: string;
}

export const getMetadata = ({
  title,
  description,
  author,
  image = 'https://www.hackpost.guide/hackpost-guide-thumbnail.png',
  pathname,
}: MetadataParams): Metadata => {
  const fullTitle = title ? `${title} - ${siteConfig.name}` : siteConfig.name;
  const url = new URL('https://hackpost.guide');
  const canonical = pathname ? new URL(pathname, url) : url;

  const metadata: Metadata = {
    metadataBase: url,
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: description || siteConfig.description,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    applicationName: 'Hackpost Guide',
    keywords: ['Hackathon', 'Help', 'Guide', 'Hack', 'Hackathon Guide'],
    authors: author ? [{ name: author }] : [{ name: 'Hackpost Guide' }],
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title: fullTitle,
      description: description || siteConfig.description,
      url: canonical,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@hackpostguide', // Replace with your Twitter handle
      title: fullTitle,
      description: description || siteConfig.description,
      images: [image],
    },
    alternates: {
      canonical: canonical.toString(),
    },
  };

  if (title) {
    metadata.title = title;
  }

  return metadata;
};