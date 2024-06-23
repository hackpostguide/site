'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React, { useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { auth } from '@/lib/firebase';
import { UserContext } from '@/lib/context';

export const CreatePosts = () => {
  const { username } = useContext(UserContext);

  return (
    <div className=''>
      <Card>
        <CardContent className='mt-10 flex flex-col sm:flex-row justify-center gap-10'>
          <div>
            <h2>Want to save your progress?</h2>
            <p>{username ? 'You can now mark guides as not started, in progress, and completed!' : "It's free - Sign up / Sign in today!"}</p>
          </div>
          {!username && (
            <Button
              color="warning"
              size='lg'
              className='text-sm font-bold my-8'
              asChild
            >
              <Link href='/enter'>
                Create an Account
              </Link>
            </Button>)
          }
        </CardContent>
      </Card>
    </div>
  );
};