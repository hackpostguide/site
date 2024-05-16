'use client';
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import Link from "next/link"
import { siteConfig } from "@/app/config/site"
import { useContext, useState } from "react"
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
    <header className="sticky top-0 z-50 backdrop-blur bg-background/80 border-b border-foreground/10">
      <div className="flex max-w-7xl mx-auto h-16 items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-6">
        <Link className="flex items-center gap-2 text-lg" href="/">
          <Logo />
          <p className="font-bold">Hackpost</p>
          <p className="">Guide</p>
        </Link>
        <ul className="hidden md:flex">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <Button
                variant="ghost"
                asChild
              >
              <Link
                href={item.href}
              >
                {item.label}
              </Link>
              </Button>
              
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center">
        <div className="flex items-center justify-between mr-6">
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <Link
              href={siteConfig.links.linktree}
              aria-label="Linktree"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                icon="ph:linktree-logo-bold"
                className="text-default-500 w-5 h-5"
              />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <Link
              href={siteConfig.links.discord}
              aria-label="Discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordIcon className="text-default-500 w-5 h-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <Link
              href={siteConfig.links.github}
              aria-label="Github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="text-default-500 w-5 h-5" />
            </Link>
          </Button>
          <ThemeSwitch />
        </div>

        <div className="hidden md:flex">
          {username && (
            <div className="flex items-center gap-2">
              <Button
                color="warning"
                aria-label="Dashboard"
                className="text-sm font-bold"
                asChild
              >
                <Link href="/dashboard">My Dashboard</Link>
              </Button>
              <UserAvatar />
            </div>
          )}

          {!username && (
            <Button color="primary" className="text-sm font-normal" asChild>
              <Link href="/enter">Login / Sign Up</Link>
            </Button>
          )}
        </div>

      </div>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <Icon
                icon="tabler:menu-2"
                className="text-default-500 h-6 w-6"
              />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <Link className="mr-6 hidden lg:flex" href="/">
            <Logo className="h-6 w-6" />
            <span className="sr-only">Hackpost Guide</span>
          </Link>
          <div className="grid gap-2 py-6">
            {username
              ? siteConfig.navMenuItemsLoggedIn.map((item, index) => (
                  <div key={`${item}-${index}`}>
                    {index === siteConfig.navMenuItemsLoggedIn.length - 1 ? (
                      <Button
                        color="danger"
                        className="mt-2"
                        onClick={handleLogout}
                        size="lg"
                      >
                        <p>Log Out</p>
                      </Button>
                    ) : (
                      <Link
                        color={"foreground"}
                        href={item.label === "My Profile" ? `${item.href}/${username}` : item.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <p>{item.label}</p>
                      </Link>
                    )}
                  </div>
                ))
              : siteConfig.navMenuItems.map((item, index) => (
                  <div key={`${item}-${index}`}>
                    {index === siteConfig.navMenuItems.length - 1 ? (
                      <Button
                        onClick={() => setIsMenuOpen(false)}
                        color="primary"
                        className="mt-2"
                        size="lg"
                        asChild
                      >
                        <Link href="/enter">
                          <p>Login / Sign Up</p>
                        </Link>
                      </Button>
                    ) : (
                      <Link
                        color={"foreground"}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <p>{item.label}</p>
                      </Link>
                    )}
                  </div>
                ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
    </header>
  )
}
