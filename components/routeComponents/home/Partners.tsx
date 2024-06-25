import React from 'react';
import { partners } from "@/app/config/partners";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export const Partners = () => {
  return (
    <div>
        <h2 className='mb-8'>Hackathon Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.hackathons.map((partner: any, index: any) => (
                <Link key={index} href={partner.url} target="_blank">
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                        <CardHeader className="flex justify-center items-center">
                            <Image src={partner.image} alt={partner.name} width={200} height={100} className="object-contain" />
                        </CardHeader>
                        <CardContent>
                            <CardTitle>{partner.name}</CardTitle>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
    
  );
};