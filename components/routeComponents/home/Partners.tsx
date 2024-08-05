import React from 'react';
import { partners } from "@/app/config/partners";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { title } from '@/components/misc/Primitives';

export const Partners = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className={title({ size: "md", bold: "bold" })}>
        Hackathons We&apos;ve Collaborated With:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {partners.hackathons.map((partner, index) => (
          <Link key={index} href={partner.url} target="_blank" className="block transform transition duration-300 hover:scale-105">
            <Card className="bg-background text-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 h-96 flex flex-col justify-center items-center z-10 overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center p-6 h-full w-full">
                <Image 
                  src={partner.image} 
                  alt={partner.name} 
                  width={240} 
                  height={120} 
                  className="object-contain max-h-48 mb-6"
                />
                <CardTitle className="text-3xl font-bold text-center">{partner.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};