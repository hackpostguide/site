'use client'
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithRedirect } from 'firebase/auth';
import Image from 'next/image';

import { auth, firestore } from '@/app/lib/firebase';
import { UserContext } from '@/app/lib/context';
import { Button, Card, CardBody } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Logo } from "@/app/components/Icons";

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
      <Card className="mx-auto w-full max-w-md p-10">
        <CardBody>
          <Logo size={50} className="mx-auto my-4" />
          <h3 className="text-center mb-4">Welcome to Hackpost Guide</h3>
          <p className="mb-6">Join our community of friendly developers creating and sharing free resources for hackathons.</p>
          <SignInButton />
          <p className="text-gray-500 text-sm my-6">
            We only offer signing in with Google as of right now. More options are
            coming soon!
          </p>
        </CardBody>
      </Card>
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
          variant="ghost"
          fullWidth
          size="lg"
          radius="sm"
          onClick={signInWithGoogle}
          className="font-sm"

          startContent={<Image src="/google-icon-logo-png-transparent.png" alt="Google" width="20" height="20" />}
        >
          Sign Up/In with Google
        </Button>

        {/* Debugging:
        <p>
          User: {String(auth.currentUser)}
          <br />
          Username: {username}; 
        </p> */}
      </div>
    </form>
  );
}

// Sign out button
// function SignOutButton() {
//     console.log('signed out with Google');
//     return (
//       <Button
//         color="default"
//         variant="bordered"

//         onClick={() => {
//             signOut(auth)
//             router.push('/');
//             toast.success('Signed out successfully!');
//           }
//         }
//         className="font-sm space-y-6"
//       >
//         Sign Out
//       </Button>
//     );
// }
