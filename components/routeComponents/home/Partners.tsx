import React from 'react';
import { partners } from "@/app/config/partners";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { title } from '@/components/misc/Primitives';

export const Partners = () => {
  return (
    <div>
      <h2 className={title({ size: "md", bold: "bold" })}>Hackathons We&apos;ve Collaborated With:</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.hackathons.map((partner, index) => (
          <Link key={index} href={partner.url} target="_blank" className="block">
            <Card className="bg-background text-foreground shadow-md hover:shadow-lg transition-shadow duration-300 h-80 flex flex-col justify-between z-10">
              <CardHeader className="flex-1 flex items-center justify-center p-4">
                <Image 
                  src={partner.image} 
                  alt={partner.name} 
                  width={160} 
                  height={80} 
                  className="object-contain max-h-32"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg text-center">{partner.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};