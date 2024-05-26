import { Metadata } from 'next';
import { siteConfig } from '@/app/config/site';

interface MetadataParams {
  title?: string;
  description?: string;
  image?: string;
}

export const getMetadata = ({
  title,
  description,
  image = '/apple-touch-icon.png',
}: MetadataParams): Metadata => {
  const metadata: Metadata = {
    title: {
      default: title || siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: description || siteConfig.description,
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