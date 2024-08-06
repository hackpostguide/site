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
  const metaDescription = description || siteConfig.description;
  const imageUrl = image.startsWith('http') ? image : `${url.origin}${image}`;

  const metadata: Metadata = {
    metadataBase: url,
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: metaDescription,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    applicationName: 'Hackpost Guide',
    keywords: ['Hackathon', 'Help', 'Guide', 'Hack', 'Hackathon Guide'],
    authors: author ? [{ name: author }] : [{ name: 'Hackpost Guide' }],
    creator: author || 'Hackpost Guide',
    publisher: 'Hackpost Guide',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title: fullTitle,
      description: metaDescription,
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@hackpostguide',
      creator: '@hackpostguide',
      title: fullTitle,
      description: metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonical.toString(),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
  };

  if (title) {
    metadata.title = title;
  }

  return metadata;
};