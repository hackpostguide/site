import "@/app/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/app/config/site";
import { fontSans } from "@/app/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/app/components/Navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark", children }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <p className="flex items-center gap-1 text-current">
                &copy; 2023 - {currentYear} HackPost Guide
                &bull; 
				<Link
					isExternal
					href="https://www.gnu.org/licenses/gpl-3.0.html#license-text/"
					title="GNU General Public License v3.0"
				>
					<span className="text-default-600">Licensed under GNU General Public License v3.0</span>
				</Link>
				&bull; 

				<Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui.org"
                title="nextui.org"
              >
                <span className="text-default-600">Powered by NextUI</span>
                {/* <p className="text-primary">NextUI</p> */}
              </Link>
			  </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}