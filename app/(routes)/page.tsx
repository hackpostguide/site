import Link from 'next/link'
import { siteConfig } from "@/app/config/site";
import { title, subtitle } from "@/components/misc/Primitives";
import { Button } from "@/components/ui/button";
import StartExploringButton from "../../components/routeComponents/home/StartExploringButton";
import PopularFeed from "../../components/routeComponents/home/feed/PopularFeed";
import About from "../../components/routeComponents/home/About";
import Image from 'next/image';
import NewsLetter from "../../components/routeComponents/home/NewsLetter";
import { CreatePosts } from "../../components/routeComponents/home/CreatePosts";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/misc/Icons"
import { LandingStatistics } from '@/components/routeComponents/home/LandingStatistics';
import { Metadata } from 'next';
import { get } from 'lodash';
import { getMetadata } from '@/components/misc/Metatags';
import { Partners } from '@/components/routeComponents/home/Partners';
import Hackathon from '@/components/routeComponents/home/Hackathon';

export const metadata: Metadata = getMetadata({});

export default function Home() {
  return (
    <>
      {/* Circular Glow Background */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-full opacity-25 filter blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>

      <section className="my-16 flex flex-col items-center justify-center gap-4">
  

        <div className="inline-block text-center justify-center max-w-sm md:max-w-3xl">
          <h1 className={title({size: "xl"})}>
            <span className={title({size: "xl", bold: "extra", color: "yellow" })}>Hackpost </span> Guide
          </h1>
          <div className="mt-10">
            <h2 className={subtitle({ class: "mt-10 md:mt-12", size: "lg" })}>
              A <span className={subtitle({ class: "mt-10 md:mt-12", size: "lg", color: "yellow", bold: "semi"  })}>
                free collection of guides 
              </span> to help you win your next hackathon.
            </h2>
          </div>
        </div>
        <div className="my-10 w-full flex flex-col items-center gap-6 md:justify-center md:gap-8">
          <Button variant="default" className="z-30 bobbing-animation " size="xl" asChild>
		  	    <Link href="/explore">Explore Guides</Link>
          </Button>
          <Button variant="outline" className="z-30" size="lg" asChild>
		  	    <Link href={siteConfig.links.github} aria-label="Github"
              target="_blank"
              rel="noopener noreferrer"><GithubIcon className="text-default-500 w-6 h-6 mr-2" /> Star on Github</Link>
          </Button>
          <div className="flex flex-row gap-3">
            {/* <StartExploringButton />
            <Link href={siteConfig.links.discord} target="_blank" className="font-normal text-xs md:text-sm">
              <DiscordIcon size={20} /> Join our Discord
            </Link> */}
          </div>
        </div>
        {/* Add Newsletter later */}
        {/* <NewsLetter /> */}
        {/* ProductHunt embed */}
        {/* <div className="w-full mb-4 md:mt-4 flex flex-col items-center gap-3 md:flex-row md:justify-end md:gap-3">
          <Link href="https://www.producthunt.com/products/hackpost-guide?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-hackpost&#0045;guide" target="_blank">
            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=454402&theme=light" alt="Hackpost&#0032;Guide - The&#0032;one&#0045;stop&#0032;resource&#0032;to&#0032;help&#0032;YOU&#0032;ace&#0032;your&#0032;next&#0032;hackathon&#0046; | Product Hunt" width="250" height="54" />
          </Link>
        </div> */}
      </section>

      <section id="explore" className="py-12 md:pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <h2 className={title({ size: "md", bold: "bold", color: "yellow" })}>Popular:</h2>
        </div>
        <div className="p-0">
          <PopularFeed />
        </div>
        <div className="flex justify-center my-10">
		      <Button variant="default" size="xl" asChild>
		  	    <Link href="/explore">Explore Guides</Link>
          </Button>
        </div>
      </section>

      <section className="my-32">
        <LandingStatistics />
      </section>

      <section className="my-10">
        <About />
      </section>

      <section className="my-32">
        <Partners />
      </section>

      <section className="my-32">
        <Hackathon />
      </section>

      <section className="">
        <CreatePosts />
      </section>
    </>
  );
}