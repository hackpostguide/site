import Head from 'next/head';
import { siteConfig } from '@/app/config/site';

export default function Metatags({
    title = siteConfig.name,
    description = siteConfig.description,
    image = 'public\apple-touch-icon.png',
}): JSX.Element {
    return (
        <Head>
            <title>{title}</title>
            <meta name="twitter:card" content="summary" />
            {/* <meta name="twitter:site" content="@" /> */}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
        </Head>
    );
}