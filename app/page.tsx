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
import StartExploringButton from "./components/(homePage)/StartExploringButton";
import PopularFeed from "./components/(postComponents)/PopularFeed";

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

			<div className="flex flex-wrap justify-center gap-3">
				<div className="flex flex-col justify-center gap-3 sm:flex-row">
				<StartExploringButton />
				<Button
					color="primary"
					as={Link}
					className={"text-xs sm:text-sm font-normal"}
					href={'/enter'}
					variant="solid"
				>
					Login / Sign Up
				</Button>
				<Link
					isExternal
					className={`${buttonStyles({ variant: "bordered" })} text-xs sm:text-sm`}
					href={siteConfig.links.discord}
				>
					<DiscordIcon size={20} /> Join our Discord
				</Link>
				</div>
			</div>
		</section>

		<section id="explore" className="py-8 md:py-10">
			<div className="flex flex-col sm:flex-row items-center justify-between mb-4">
				<h1 className={title({ size: "sm", color: "cyan" })}>Top Posts</h1>
			</div>
			<div className="p-0">
				<PopularFeed />
			</div>
			<div className="flex justify-center my-10">
				<Button
					as={Link}
					href={'/explore'}
					variant="ghost"
					size="lg"
					color="primary"
					className="text-xs sm:text-sm"
				>
					Explore All Posts
				</Button>
			</div>
		</section>


		</>
	);
}
