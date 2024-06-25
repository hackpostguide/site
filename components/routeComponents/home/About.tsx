'use client';
import { siteConfig } from '@/app/config/site';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { DiscordIcon, GithubIcon, TwitterIcon } from '../../misc/Icons';
import { Icon } from '@iconify/react';
import { title, subtitle } from "@/components/misc/Primitives";

const About = () => {
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries: any[], observer: any) => {
      entries.forEach((entry) => {
        if (entry.target === leftRef.current) {
          setLeftVisible(entry.isIntersecting);
        } else if (entry.target === rightRef.current) {
          setRightVisible(entry.isIntersecting);
        }
      });
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (leftRef.current) {
      observer.observe(leftRef.current);
    }

    if (rightRef.current) {
      observer.observe(rightRef.current);
    }

    return () => {
      if (leftRef.current) {
        observer.unobserve(leftRef.current);
      }

      if (rightRef.current) {
        observer.unobserve(rightRef.current);
      }
    };
  }, []);

  return (
    <div className="p-8 flex flex-col md:items-start">
      <div ref={leftRef} className={`mb-40 md:w-3/4 transition-all duration-1000 ${leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
        <div>
          <h2 className={title({ size: "md", bold: "bold" })}>Learn the Essential Skills.&nbsp;</h2>
          <h2 className={title({ size: "md", bold: "extra", color: "blue" })}>Quickly.</h2>
        </div>
        <p className="text-xl my-4">
          Stop wasting time searching for tutorials online. Or worse, reinventing the wheel during your hackathon. Hackpost Guide provides guides made by the community on a wide variety of topics to help you stay on track and focus on building your project. If one guide isn&apos;t what you&apos;re looking for, check out others!
        </p>
        {/* <div className='py-4 flex flex-col md:flex-row gap-3'>
          <Button color="secondary" size='lg' className='text-sm font-normal' asChild>
            <Link href={siteConfig.links.github}>
              <GithubIcon size={20} className='mr-2' /> Github
            </Link>
          </Button>
          <Button color="primary" size='lg' className='text-sm font-normal' asChild>
            <Link href={siteConfig.links.discord}>
              <DiscordIcon size={20} className='mr-2' /> Join our Discord
            </Link>
          </Button>
        </div> */}
      </div>
      <div ref={rightRef} className={`md:w-4/5 md:ml-auto flex flex-col items-start md:items-end md:text-right transition-all duration-1000 ${rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
        <div>
          <h2 className={title({ size: "md"}) + "pb-10"}>All Posts & Guides are Free. </h2>
          <h2 className={title({ size: "md", color: "violet", bold: "bold" })}>Forever.</h2>
        </div>
        <p className="text-xl my-4">
          This resource isn&apos;t just for people participating in hackathons. If you&apos;re interested in hacking and want to learn, check out some of our popular guides - all content is free forever. If you&apos;re more experienced and want to help out, you can either share projects that you&apos;ve created, write guides, or share resources that you&apos;ve found helpful in the past. To chat with others, join our Discord server!
        </p>
        <div className='py-4 flex flex-col md:flex-row gap-3'>
          <Button size='lg' className='text-sm font-bold' asChild>
            <Link href={siteConfig.links.discord}>
              <DiscordIcon size={20} className='mr-2' /> Join our Discord
            </Link>
          </Button>
          {/* <Button color="success" size='lg' className='text-sm font-normal' asChild>
            <Link href={siteConfig.links.linktree}>
              <Icon icon="bi:instagram" width="1.4rem" height="1.4rem" className='mr-3'/>
              <Icon icon="bi:youtube" width="1.4rem" height="1.4rem" className='mr-3'/>
              <TwitterIcon className='mr-2'/> Follow us on Social Media
            </Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default About;