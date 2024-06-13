import React from 'react';
import { partners } from "@/app/config/partners";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';

export const Partners = () => {
  return (
    <div>
        <h1 className='mb-8'>Partners</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.hackathons.map((partner: any, index: any) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex justify-center">
                    <Image src={partner.image} alt={partner.name} width={200} height={100} className="object-contain" />
                </CardHeader>
                <CardContent>
                    <CardTitle>{partner.name}</CardTitle>
                </CardContent>
                </Card>
            ))}
        </div>
    </div>
    
  );
};