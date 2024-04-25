export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Hackpost Guide - Jump Right In",
	description: "The open source resource hub for hackathoners. Free. Community Driven.",
	navItems: [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Explore",
      href: "/explore",
    },
	// {
		// 	label: "Blog",
		// 	href: "/blog",
	// },
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Explore",
			href: "/explore",
		},
		// {
		// 	label: "Blog",
		// 	href: "/blog",
		// },
		{
			label: "Login / Sign Up",
			href: "/enter",
		},
	],
	navMenuItemsLoggedIn: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Explore",
			href: "/explore",
		},
		// {
		// 	label: "Blog",
		// 	href: "/blog",
		// },
		{
			label: "My Profile",
			href: "/users",
		},
		{
			label: "My Dashboard",
			href: "/dashboard",
		},
		{
			label: "Log Out",
			href: "/",
		},
	],
	links: {
		github: "https://github.com/hackpostguide/site",
		discord: "https://discord.gg/UjZDQcTMjD",
	},
};
