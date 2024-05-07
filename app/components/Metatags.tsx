import Head from 'next/head';
import { siteConfig } from '../config/site';
import { NextSeo } from 'next-seo'; 

export default function Metatags({
        title = siteConfig.name,
        description = siteConfig.description,
        // image = 'https://www.hackpost.guide/apple-touch-icon.png',
}): JSX.Element {
        return (
            <>
                <NextSeo
                    title={'title'}
                    description={'description'}
                    canonical="https://www.hackpost.guide"
                    openGraph={{
                        url: 'https://www.hackpost.guide',
                        title: 'title',
                        description: 'description',
                        images: [
                            {
                                url: 'https://www.hackpost.guide/apple-touch-icon.png',
                                width: 800,
                                height: 800,
                                alt: 'Og Image Alt',
                                type: 'image/jpeg',
                            },
                        ],
                        siteName:  siteConfig.name,
                    }}
                    twitter={{
                        handle: '@hackpostguide',
                        site: '@hackpostguide',
                        cardType: 'summary_large_image',
                    }}
                />
            </>
                // <Head>
                //         <title>{title}</title>
                //         <meta name="twitter:card" content="summary" />
                //         {/* <meta name="twitter:site" content="@" /> */}
                //         <meta name="twitter:title" content={title} />
                //         <meta name="twitter:description" content={description} />
                //         {/* <meta name="twitter:image" content={image} /> */}

                //         <meta property="og:title" content={title} />
                //         <meta property="og:description" content={description} />
                //         {/* <meta property="og:image" content={image} /> */}
                // </Head>
        );
}