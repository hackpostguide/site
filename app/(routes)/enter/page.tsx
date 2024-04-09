'use client'
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithRedirect } from 'firebase/auth';
import Image from 'next/image';

import { auth, firestore } from '@/app/lib/firebase';
import { UserContext } from '@/app/lib/context';
import { Button } from '@nextui-org/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Enter(props: any) {
  const { username } = useContext(UserContext);
  const router = useRouter()

  useEffect(() => {
    if (auth.currentUser && username) {
      router.push('/dashboard');
    }
    else if(auth.currentUser && !username) {
      router.push('/onboarding');
    }
  }, [username, router]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl leading-9 tracking-tight">Create an account today!</h2>
      </div>

      <div className="mt-10 font-bold sm:mx-auto sm:w-full sm:max-w-sm">
        <p>Continue with:</p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignInButton />
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <p>We only offer signing in with Google as of right now. More options are coming soon!</p>
      </div>
    {/* <p>User: {String(user)}</p>
    <p>Username: {username}</p> */}
    </div>
  );
}

// Sign in with Google button
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
    <form className="space-y-6" action="#" method="POST">
      <div>
        <Button
          color="default"
          variant="bordered"
  
          onClick={signInWithGoogle}
          className="font-sm"

          startContent={<Image src="/google-icon-logo-png-transparent.png" alt="Google" width={20}
          height={20}
          style={{ width: 'auto', height: 'auto' }} />}
        >
          Sign Up/In with Google
        </Button>
      </div>
    </form>
  );
}

// Sign out button
function SignOutButton() {
    console.log('signed out with Google');
    return (
      <Button
        color="default"
        variant="bordered"

        onClick={() => {
            signOut(auth)
            toast.success('Signed out successfully!');
          }
        }
        className="font-sm space-y-6"
      >
        Sign Out
      </Button>
    );
}
