import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/app/config/site";
import { title, subtitle } from "@/app/components/Primitives";
import { DiscordIcon } from "@/app/components/Icons";
import ToastButton from "./components/ToastButton";
import { Button } from "@nextui-org/button";
import ExploreFeed from "./components/(postComponents)/ExploreFeed";

export default function Home() {
	return (
		<>
		{/* Align the hero page text to the left later */}
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Jump right in into the premier resource hub for&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>hackathon participants.&nbsp;</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Guiding your journey. Free. Open Source. Community Driven.
				</h2>
			</div>

			<div className="flex gap-3">
				<Button
					
					className={buttonStyles({ color: "secondary", radius: "md", variant: "shadow" })}
					href='#'
				>
					Start Exploring
				</Button>
				<Button color="primary"
					as={Link}
					className={"text-sm font-normal"}
					href={'/enter'}
					variant="solid"
				>
					Login / Sign Up
				</Button>
				
				<Link
					isExternal
					className={buttonStyles({ variant: "bordered", radius: "md" })}
					href={siteConfig.links.discord}
				>
					<DiscordIcon size={20} />
					Join our Discord
				</Link>
				{/* <ToastButton /> */}
			</div>
			<div className="flex gap-3">
				{/* <ToastButton /> */}
			</div>
		</section>

		<section id="explore">
			<div>
				<h1 className={title({ size: "sm" })}>
					Explore new posts
				</h1>
				<h2 className={subtitle()}>
					Discover the latest posts from the community.
				</h2>
				<ExploreFeed />
			</div>
		</section>
		</>
	);
}
