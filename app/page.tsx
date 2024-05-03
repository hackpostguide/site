import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/app/config/site";
import { title, subtitle } from "@/app/components/Primitives";
import { DiscordIcon } from "@/app/components/Icons";
import { Button } from "@nextui-org/button";
import StartExploringButton from "./components/(homePage)/StartExploringButton";
import PopularFeed from "./components/(postComponents)/(Feeds)/PopularFeed";
import About from "./components/(homePage)/About";
//import next/image
import Image from 'next/image';
import NewsLetter from "./components/(homePage)/NewsLetter";

export default function Home() {
	return (
		<>
		<section className="flex flex-col items-center justify-center gap-4 mt-10">
			<div className="inline-block text-center justify-center max-w-sm md:max-w-xl">
				<h1 className={title()}>Jump right in into the&nbsp;</h1>
				<h1 className={title({color: "blue" })}>open source&nbsp;</h1>
				<h1 className={title()}>resource hub for&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>hackathon participants.&nbsp;</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					The one-stop resource hub to help YOU ace your next hackathon. 
				</h2>
			</div>
			<div className="w-full flex flex-col items-center gap-3 md:justify-center md:gap-3">
				<Button color="primary" as={Link} className="font-normal bobbing-animation" href={'/enter'} variant="shadow" size="lg">
					Create an Account / Login
				</Button>
				<div className="mt-6 flex flex-row gap-3">
					<StartExploringButton />
						<Link isExternal className={`${buttonStyles({ variant: "bordered" })} text-xs font-normal md:text-sm`} href={siteConfig.links.discord}>
						<DiscordIcon size={20} /> Join our Discord
					</Link>
				</div>
			</div>

			{/* Add Newsletter later */}
			{/* <NewsLetter /> */}

			{/* ProductHunt embed */}
			{/* <div className="w-full mb-10 md:mt-10 flex flex-col items-center gap-3 md:flex-row md:justify-end md:gap-3">
				<Link href="https://www.producthunt.com/posts/hackpost-guide?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-hackpost&#0045;guide" target="_blank">
					<img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=454402&theme=light" alt="Hackpost&#0032;Guide - The&#0032;one&#0045;stop&#0032;resource&#0032;to&#0032;help&#0032;YOU&#0032;ace&#0032;your&#0032;next&#0032;hackathon&#0046; | Product Hunt" width="250" height="54" />
				</Link>
			</div> */}
		</section>

		<section className="py-8 md:py-10 mb-16">
			<About />
		</section>


		<section id="explore" className="py-12 md:pb-16">
			<div className="flex flex-col md:flex-row items-center justify-between mb-4">
				<h1 className={title({ size: "sm", color: "yellow" })}>Top Posts & Guides</h1>
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
					Explore All
				</Button>
			</div>
		</section>

		</>
	);
}
