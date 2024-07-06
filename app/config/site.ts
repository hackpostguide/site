export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Hackpost Guide",
	description: "The open source resource hub for hackathoners. Free. Community Driven.",
	navItems: [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Guides",
      href: "/explore",
    },
	{
			label: "Hackathon!",
			href: "https://hackathon.hackpost.guide",
	},
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
		{
			label: "Hackathon!",
			href: "https://hackathon.hackpost.guide",
		},
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
		{
			label: "Hackathon!",
			href: "https://hackathon.hackpost.guide",
		},
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
		discord: "https://discord.gg/5QBDjTGAmP",
		linktree: "https://linktr.ee/hackpostguide?utm_source=hackpost.guide",
		hackathon: "https://hackathon.hackpost.guide",
		donate: "https://hcb.hackclub.com/donations/start/hackpost-guide?amount=5000",
		join: "https://forms.gle/Rm6AUWLip1ZkkJBb7",
	},
};
