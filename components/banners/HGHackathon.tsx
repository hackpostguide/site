'use client';
import { siteConfig } from '@/app/config/site';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const HGHackathonBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-orange-500 text-black text-left sm:text-center font-bold p-3 relative">
      <span className="text-lg">The Hackpost Guide Hackathon is happening this summer! </span>
      <Link target="_blank" rel="noopener noreferrer" href={siteConfig.links.hackathon} className="text-lg ml-2 underline" title="Join Team">
        <span className="text-default-600">Register now</span>
      </Link>
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2" 
        onClick={() => setIsVisible(false)}
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HGHackathonBanner;
