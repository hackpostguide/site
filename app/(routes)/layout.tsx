import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/app/config/site";
import { fontSans } from "@/app/config/fonts";
import { Providers } from "./providers";
import Nav from "@/components/misc/Navbar";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";
import type { Viewport } from 'next';

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script';
import Footer from "../../components/misc/Footer";
import { getMetadata } from "@/components/misc/Metatags";
import HGHackathonBanner from "@/components/banners/HGHackathon";


export const metadata: Metadata = getMetadata({});

const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export { viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <Script async
          id="google-tag-manager"
          src="https://www.googletagmanager.com/gtag/js?id=G-GRQQQGTNL5">
        </Script>
        <Script
           id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-GRQQQGTNL5');
          `}
        </Script>
      </head>
      <body
        className={clsx(
          "bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* <GoogleTagManager gtmId="G-WTDDS3XCDR" /> */}
        <Providers>
          <HGHackathonBanner />
          <Nav />
          {/* <div className="relative flex flex-col h-screen"> */}
            <main className="container mx-auto max-w-7xl pt-16 px-6 min-h-screen flex-grow">
              {children}
            </main>
            <Footer />
          {/* </div> */}
		      <Toaster />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}