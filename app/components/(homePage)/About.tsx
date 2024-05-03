'use client';
import { siteConfig } from '@/app/config/site';
import { Button, Link } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';
import { DiscordIcon, GithubIcon, TwitterIcon } from '../Icons';
import { Icon } from '@iconify/react';
import { title, subtitle } from "@/app/components/Primitives";

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
      <div ref={leftRef} className={`mb-16 md:w-2/3 transition-all duration-1000 ${leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
        <div>
          <h1 className={title({ size: "sm" })}>We are&nbsp;</h1>
          <h1 className={title({ size: "sm", color: "blue" })}>free</h1>
          <h1 className={title({ size: "sm" })}> and </h1>
          <h1 className={title({ size: "sm", color: "blue" })}>open source.</h1>
        </div>
        <p className="my-4">
          The codebase is open source, and we welcome contributions from the community. If you find a bug, have a feature request, or want to contribute improvements, check out our GitHub repository.
        </p>
        <Button isExternal color="secondary" size='lg' as={Link} className='text-sm font-normal' variant='ghost' href={siteConfig.links.github}>
          <GithubIcon size={20} /> Github
        </Button>
      </div>
      <div ref={rightRef} className={`md:w-2/3 md:ml-auto flex flex-col items-start md:items-end md:text-right transition-all duration-1000 ${rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
        <p className="mb-4">
          Likewise, make sure to also join our discord server! Our Discord server is a great place to get support, share knowledge, and be part of a vibrant community. We also encourage you to follow us on social media!
        </p>
        <div className='flex flex-col md:flex-row gap-3'>
          <Button isExternal color="primary" size='lg' as={Link} className='text-sm font-normal' variant='ghost' href={siteConfig.links.discord}>
            <DiscordIcon size={20} /> Join our Discord
          </Button>
          <Button isExternal color="success" size='lg' as={Link} className='text-sm font-normal' variant='ghost' href={siteConfig.links.linktree}>
            <Icon icon="bi:instagram" width="1.4rem" height="1.4rem" />
            <Icon icon="bi:youtube" width="1.4rem" height="1.4rem" />
            <TwitterIcon /> Follow us on Social Media
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;