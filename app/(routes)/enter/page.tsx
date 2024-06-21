'use client'
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithRedirect } from 'firebase/auth';
import Image from 'next/image';

import { auth, firestore } from '@/lib/firebase';
import { UserContext } from '@/lib/context';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Logo } from "@/components/misc/Icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Enter(props: any) {
  const { username } = useContext(UserContext);
  const router = useRouter()

  useEffect(() => {
    if (auth.currentUser && username) {
      router.push('/explore');
    }
    else if(auth.currentUser && !username) {
      router.push('/onboarding');
    }
  }, [username, router]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Card className="mx-auto w-full max-w-md p-10">
        <CardHeader>
          <Logo size={50} className="mx-auto my-4" />
          <CardTitle className="text-center mb-4">Sign In / Sign Up</CardTitle>
        </CardHeader>
        <p className="mb-6">Get started by signing in below. Free forever. </p>
        <SignInButton />
        <p className="text-gray-500 text-sm my-6">
          We only offer signing in with Google as of right now. More options are
          coming soon!
        </p>
      </Card>
    {/* <p>User: {String(user)}</p>
    <p>Username: {username}</p> */}
    </div>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log('Signed in with Google');
      toast.success('Logged in successfully! Redirecting...');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={signInWithGoogle}
      className="font-sm w-full text-center gap-5"
    >
      <Image src="/google-icon-logo-png-transparent.png" alt="Google" width="20" height="20" /> Sign Up/In with Google
    </Button>
  );
}