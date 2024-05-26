import { Metadata } from 'next';
import { siteConfig } from '@/app/config/site';

interface MetadataParams {
  title?: string;
  description?: string;
  image?: string;
  author?: string;    
}

export const getMetadata = ({
  title,
  description,
  author,
  image = '/apple-touch-icon.png',
}: MetadataParams): Metadata => {
  const metadata: Metadata = {
    metadataBase: new URL('https://hackpost.guide'),
    title: {
      default: title || siteConfig.name,
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
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [image],
    },
  };

  return metadata;
};