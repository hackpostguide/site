'use client';
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import Link from "next/link"
import { siteConfig } from "@/app/config/site"
import clsx from "clsx"
import { link as linkStyles } from "@nextui-org/theme"
import { JSX, SVGProps, useContext, useState } from "react"
import { UserContext } from ".././lib/context"
import UserAvatar from "./UserAvatar"
import { signOut } from "firebase/auth"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/Icons"
import { Logo } from "@/components/Icons";
import { ThemeSwitch } from "@/components/ThemeSwitch"
import { auth } from "@/lib/firebase"
import { Icon } from "@iconify/react/dist/iconify.js"

export default function Nav() {
  const { username } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    toast.success("Signed out successfully!")
    router.push("/")
    setIsMenuOpen(false)
  }

  return (
    <header className="max-w-7xl mx-auto flex h-20 shrink-0 items-center px-4 md:px-6">
      <ThemeSwitch />
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link className="mr-6 hidden lg:flex" href="#">
            <Logo className="h-6 w-6" />
            <span className="sr-only">Hackpost Guide</span>
          </Link>
          <div className="grid gap-2 py-6">
            {siteConfig.navMenuItems.map((item) => (
              <Link
                key={item.href}
                className="flex w-full items-center py-2 text-lg font-semibold"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {username ? (
              <>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  href={`/profile/${username}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button
                  color="danger"
                  className="mt-2 w-full"
                  onClick={handleLogout}
                >
                  <p>Log Out</p>
                </Button>
              </>
            ) : (
              <Button
                className="mt-2 w-full"
                onClick={() => setIsMenuOpen(false)}
				asChild
              >
				<Link href="/enter">Login / Sign Up</Link>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Link className="mr-6 hidden lg:flex" href="/">
        <Logo className="h-6 w-6" />
        <span className="">Hackpost Guide</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        {siteConfig.navItems.map((item) => (
          <Link
            key={item.href}
            className={clsx(
              linkStyles({ color: "foreground" }),
              "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            )}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
        <div className="flex items-center gap-5">
          <Link href={siteConfig.links.linktree} aria-label="Linktree">
            <Icon
              icon="ph:linktree-logo-bold"
              className="text-default-500"
              width="1.4rem"
              height="1.4rem"
            />
          </Link>
          <Link href={siteConfig.links.discord} aria-label="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          {username && (
            <>
              <Button
                // startContent={
                //   <Icon icon="gravity-ui:folder" width="1.2rem" height="1.2rem" />
                // }
                color="warning"
                aria-label="Dashboard"
                variant="ghost"
                className="text-sm font-bold"
				asChild
              >
                <Link href="/dashboard">My Dashboard</Link>
              </Button>
              <UserAvatar />
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}