'use client';
import { siteConfig } from '@/app/config/site'
import { Button, Link } from '@nextui-org/react'
import React from 'react'
import { DiscordIcon, GithubIcon } from '../Icons'
import { Icon } from '@iconify/react';

const About = () => {
  return (
    <div className="p-8 flex flex-col md:items-start">
      <div className="mb-16 md:w-2/3">
        <h2 className="mb-4">We are open source.</h2>
        <p className="mb-4">
          The codebase is open source, and we welcome contributions from the community. If you find a bug, have a feature request, or want to contribute improvements, check out our GitHub repository.
        </p>
        <Button isExternal color="secondary" size='lg' as={Link} className='text-sm font-normal' variant='ghost' href={siteConfig.links.github}>
          <GithubIcon size={20} /> Github
        </Button>
      </div>
      <div className="md:w-2/3 md:ml-auto flex flex-col items-start md:items-end md:text-right">
        <p className="mb-4">
          Likewise, make sure to also join our discord server! Our Discord server is a great place to get support, share knowledge, and be part of a vibrant community. We also encourage you to follow us on social media!
        </p>
        <div className='flex flex-col md:flex-row gap-3'>
          <Button isExternal color="primary" size='lg' as={Link} className='text-sm font-normal' variant='ghost' href={siteConfig.links.discord}>
            <DiscordIcon size={20} /> Join our Discord
          </Button>
          <Button isExternal color="success" size='lg' as={Link} className='text-sm font-normal' variant='ghost' href={siteConfig.links.linktree}>
            <Icon icon="ph:linktree-logo-bold" width="1.4rem" height="1.4rem" /> Follow us on Social Media
          </Button>
        </div>
      </div>
    </div>
  )
}

export default About