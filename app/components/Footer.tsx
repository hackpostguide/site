import { Link } from '@nextui-org/react'
import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear(); //2024
  return (
    <footer className="w-full flex flex-col items-center justify-center py-3 sm:flex-row px-6 mt-16">
        <p className="flex flex-wrap items-center justify-center gap-1 text-current text-base">
        &copy; {currentYear} HackPost Guide &bull;
        <Link isExternal href="https://www.hackpost.guide/terms" title="Terms and Conditions">
            <span className="text-default-600">Terms and Conditions</span>
        </Link>
        &bull;
        <Link isExternal href="https://www.hackpost.guide/privacy" title="Privacy">
            <span className="text-default-600">Privacy</span>
        </Link>
        &bull;
        <Link isExternal href="https://www.hackpost.guide/community-guidelines" title="Community Guidelines">
            <span className="text-default-600">Community Guidelines</span>
        </Link>
        &bull;
        <Link isExternal href="https://nextui.org" title="nextui.org">
            <span className="text-default-600">Powered by NextUI</span>
        </Link>
        </p>
    </footer>
  )
}

export default Footer