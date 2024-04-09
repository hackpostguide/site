'use client';
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Icon } from '@iconify/react';

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/app/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/app/components/ThemeSwitch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/app/components/Icons";

import { Logo } from "@/app/components/Icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import UserAvatar from "./UserAvatar";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Navbar = () => {
	const { username } = useContext(UserContext);
	const [menuOpen, setMenuOpen] = useState(false);
	const router = useRouter();

	const handleLogout = async () => {
		await signOut(auth);
		toast.success('Signed out successfully!');
		router.push('/');
		setMenuOpen(false);
	  };

	//debugging:
	useEffect(() => {
		console.log('Menu Open:', menuOpen);
	  }, [menuOpen]);

	// Implement search later
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<NextUINavbar maxWidth="xl" position="sticky" isBordered isMenuOpen={menuOpen}>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-2" href="/">
						<Logo />
						<p className="font-bold text-inherit">Hackpost</p>
						<p className="text-inherit">Guide</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden sm:flex gap-6 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			{/* NonMobile Screen */}
			<NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
				<div className="flex items-center gap-5">

					<div className="hidden sm:flex gap-3">
					<Link isExternal href={siteConfig.links.discord} aria-label="Discord">
						<DiscordIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.github} aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link>

					<ThemeSwitch />
					</div>


					{/* User has signed in AND completed onboarding (has username) */}
					{username && (
						<>
							<Button
								// isIconOnly 
								startContent={<Icon icon="gravity-ui:folder" width="1.2rem" height="1.2rem"/> }
								color="warning" 
								aria-label="Dashboard" 
								variant="ghost"
								className="text-sm font-bold"
								as={Link}
								href={'/dashboard'}
							>
								My dashboard
							</Button> 
							<UserAvatar/>
						</>
					)}
				</div>

				{/* Add search bar later: */}
				{/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}

				{/* User has not signed in OR has not completed onboarding (has not created a username) */}
				{!username && (
					<NavbarItem className="hidden sm:flex">
					<Button
						color="primary"
						as={Link}
						className={"text-sm font-normal"}
						href={'/enter'}
						variant="solid"
					>
						Login / Sign Up
					</Button>
					</NavbarItem>
				)}
			</NavbarContent>


			{/* Mobile screens */}
			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				{/* Add other socials later */}
				{/* <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
					<TwitterIcon className="text-default-500" />
				</Link> */}
				<Link isExternal href={siteConfig.links.discord} aria-label="Discord">
					<DiscordIcon className="text-default-500" />
				</Link>
				<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				{/* User has signed in AND completed onboarding (has username) */}
				{username && (
					<UserAvatar />
				)}
				<NavbarMenuToggle 
					onChange={() => setMenuOpen(!menuOpen)} 
					aria-label={menuOpen ? "Close menu" : "Open menu"} 
				/>
			</NavbarContent>

			<NavbarMenu>
			{/* Add search bar later */}
			{/* {searchInput} */}

			<div className="mx-4 mt-2 flex flex-col gap-2">
				{/* User is logged in */}
				{username
				? siteConfig.navMenuItemsLoggedIn.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						{index === siteConfig.navMenuItemsLoggedIn.length - 1 ? (
						// Render a Button for the last item
						<Button
							color="danger"
							className="mt-2"
							onClick={handleLogout}
							size="lg"
						>
							<p>Log Out</p>
						</Button>
						) : (
							// Render a Link for all other items
							<Link
								color={"foreground"}
								href={item.label === "My Profile" ? `${item.href}/${username}` : item.href} 
								size="lg"
								onClick={() => setMenuOpen(false)} 
							>
								<p>{item.label}</p>
							</Link>
						)}
					</NavbarMenuItem>
					))
				: siteConfig.navMenuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						{index === siteConfig.navMenuItems.length - 1 ? (
						// Render a Button for the last item
						<Button onClick={() => setMenuOpen(false)}  color="primary" className="mt-2" size="lg" as={Link} href="/enter">
							Login / Sign Up
						</Button>
						) : (
						// Render a Link for all other items
						<Link
							color={"foreground"}
							href={item.href}
							size="lg"
							onClick={() => setMenuOpen(false)} 
						>
							<p>{item.label}</p>
						</Link>
						)}
					</NavbarMenuItem>
					))}
			</div>
			</NavbarMenu>

		</NextUINavbar>
	);
};
