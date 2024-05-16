import Link from 'next/link';
import React from 'react'
import { siteConfig } from "@/app/config/site";

const Footer = () => {
  const currentYear = new Date().getFullYear(); //2024
  return (
    <footer className="w-full flex flex-col items-center justify-center py-3 sm:flex-row px-6 mt-16">
        <p className="flex flex-wrap items-center justify-center gap-1 text-current text-base">
        &copy; {currentYear} HackPost Guide &bull;
        <Link target="_blank" rel="noopener noreferrer" href="https://www.hackpost.guide/terms" title="Terms and Conditions">
            <span className="text-default-600">Terms and Conditions</span>
        </Link>
        &bull;
        <Link target="_blank" rel="noopener noreferrer" href="https://www.hackpost.guide/privacy" title="Privacy">
            <span className="text-default-600">Privacy</span>
        </Link>
        &bull;
        <Link target="_blank" rel="noopener noreferrer" href="https://www.hackpost.guide/community-guidelines" title="Community Guidelines">
            <span className="text-default-600">Community Guidelines</span>
        </Link>
        &bull;
        <Link target="_blank" rel="noopener noreferrer" href={siteConfig.links.github} title="Github Repo">
            <span className="text-default-600">Github</span>
        </Link>
        </p>
    </footer>
  )
}

export default Footer