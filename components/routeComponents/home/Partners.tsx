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
            <Card className="bg-background text-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 h-96 flex flex-col justify-between z-10 overflow-hidden">
              <CardHeader className="flex-1 flex items-center justify-center p-6">
                <Image 
                  src={partner.image} 
                  alt={partner.name} 
                  width={240} 
                  height={120} 
                  className="object-contain max-h-48"
                />
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardTitle className="text-3xl font-bold text-center">{partner.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};