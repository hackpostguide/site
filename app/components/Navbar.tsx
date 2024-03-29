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
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import UserAvatar from "./UserAvatar";
import { auth } from "../lib/firebase";

export const Navbar = () => {
	const { user, username } = useContext(UserContext);

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
		<NextUINavbar maxWidth="xl" position="sticky" isBordered>
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

			<NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
				{/* Social media and avatar */}
				<div className="flex items-center gap-5">
					{/* Social media */}
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

					{auth.currentUser && (
						<>
							<Button 
								// isIconOnly 
								startContent={<Icon icon="bi:plus-lg" width="1.2rem" height="1.2rem"/> }
								color="secondary" 
								aria-label="Dashboard" 
								variant="faded"
								className="text-sm font-bold"
								as={Link}
								href={'/dashboard'}
							>
								Create New
							</Button> 
							<UserAvatar/>
						</>
					)}
				</div>

				{/* Add search bar later: */}
				{/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}

				{/* User has not signed in OR has not completed onboarding (has not created a username) */}
				{!auth.currentUser && (
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
				
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{/* Add search bar later */}
				{/* {searchInput} */}


				<div className="mx-4 mt-2 flex flex-col gap-2">
    			{siteConfig.navMenuItems.map((item, index) => (
        		<NavbarMenuItem key={`${item}-${index}`}>
            	{index === siteConfig.navMenuItems.length - 1 ? (
                // Render a Button for the last item
                <Button
                    color="primary" // or any color you wish to use for the button
                    size="lg"
                    // auto // for automatic width based on content
                    // add the onClick or href prop as needed
                >
                    {item.label}
                </Button>
            ) : (
                // Render a Link for all other items
                <Link
                    color={
                        index === 2
                            ? "primary"
                            : "foreground"
                    }
                    href="#"
                    size="lg"
                >
                    {item.label}
                </Link>
            )}
        </NavbarMenuItem>
    ))}
</div>

			</NavbarMenu>
		</NextUINavbar>
	);
};
