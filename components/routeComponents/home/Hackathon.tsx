import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { siteConfig } from '@/app/config/site';

const Hackathon = () => {
  return (
    <section className="min-h-[65vh] p-5 bg-background flex flex-col items-center justify-evenly text-background text-shadow relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hackathon.hackpost.guide/hero-image.jpg"
            alt="Hero Background Image"
            fill
            quality={100}
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-purple-950/60"></div>
        <div className="relative mx-auto max-w-5xl z-20">
          <p className="text-2xl sm:text-3xl font-bold text-white">
            Spice up this summer with the very first
          </p>
          <div className="mt-4 mb-6 flex flex-col lg:flex-row justify-center">
            <h2 className="text-yellow-400 text-5xl sm:text-7xl font-black">
              Hackpost Guide <span className="text-7xl font-black text-white">Hackathon</span>
            </h2>
          </div>
          <p className="text-lg sm:text-xl mb-10 text-white font-bold">
            A virtual hackathon organized by Hackpost Guide. Join us for 2 weeks
            of hacking, learning, and fun!
          </p>
        </div>
        <div className="z-20">
            <Button variant="default" size="xl" asChild>
		  	    <Link href={siteConfig.links.hackathon} target='_blank'>Learn More</Link>
            </Button>
        </div>
    </section>
  )
}

export default Hackathon