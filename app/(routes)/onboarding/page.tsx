'use client'
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import debounce from 'lodash.debounce';

import { auth, firestore } from '@/lib/firebase';
import { UserContext } from '@/lib/context';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Onboarding(props: any) {
  const { username } = useContext(UserContext);
  const router = useRouter()

  useEffect(() => {
    if (auth.currentUser && username) {
      router.push('/explore');
    }
    else if(!auth.currentUser) {
      router.push('/enter');
    }
  }, [username, router]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <UsernameForm />
      </div>

    </div>
  );
}

// Sign out button
function SignOutButton() {
  console.log('signed out with Google');
  return (
    <Button
      variant="outline"
      onClick={() => {
          signOut(auth)
          toast.success('Signed out successfully!');
        }
      }
      className="font-sm space-y-6 my-6"
    >
      <Icon icon="radix-icons:chevron-left" className="text-lg" /> Sign up with a different account
    </Button>
  );
}

function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { username } = useContext(UserContext);
  const user = auth.currentUser;

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error('Please agree to the terms of service, privacy policy, and community guidelines to continue.');
      return;
    }

    const userDocRef = doc(firestore, `users/${user?.uid}`);
    const usernameDocRef = doc(firestore, `usernames/${formValue}`);

    const batch = writeBatch(firestore);
    batch.set(userDocRef, { 
      bio: "No bio found", 
      username: formValue, 
      email: user?.email, 
      photoURL: user?.photoURL, 
      displayName: user?.displayName, 
      isBanned: false, 
      isAdmin: false, 
      banReason: "null"});
    batch.set(usernameDocRef, { uid: user?.uid });

    await batch.commit();
    // console.log('Username created!');
    toast.success('Signed up successfully! Redirecting to dashboard...');
  };

  const onChange = (e: any) => {
    const val = e.target.value.toLowerCase();
    const re = /^[a-zA-Z0-9-]{3,15}$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const usernameRef = doc(firestore, `usernames/${username}`);
        const docSnap = await getDoc(usernameRef);
        console.log('Firestore read executed!');
        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  if (!username) {
    return (
      <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="py-10 text-center text-3xl leading-9 tracking-tight">Create an account today!</h2>
      </div>
      <section>
        <h3 className='text-xl mb-3'>You are almost there!</h3>
        <p>Choose a Username:</p>
        <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <Input 
              className="my-2"
              // label="Username"
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={formValue}
              onChange={onChange}
              placeholder="eg: john-doe" 

            />
          </div>

          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

          <p className="text-sm">Usernames can only include alphanumeric characters (letters A-Z, numbers 0-9) and dashes (-) and must be 3-15 characters long. <br/> No spaces or special characters allowed. Profanity and obscene usernames are not allowed. You will not be able to change your username after you create your account.</p>
          
          {/* Terms and guidelines checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms-agreement"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <label htmlFor="terms-agreement" className="ml-2">
              I agree to the{" "}
              <Link href="terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </Link>
              ,{" "}
              <Link href="privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
              , and{" "}
              <Link href="community-guidelines" target="_blank" rel="noopener noreferrer">
                Community Guidelines
              </Link>
              .
            </label>
          </div>

          <div>
            <Button
              type="submit"
              disabled={!isValid}
              className="flex w-full"
              // className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Choose
            </Button>
          </div>

          {/* <h3>Debug State</h3>
          <div>
            UID: {user?.uid}
            <br />
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
            <br />
            Selected IsOver13: {isOver13 ? "true" : "false"}
          </div> */}
        </form>
      </section>
      <SignOutButton />
      </div>
    );
  }

  return null;
}

function UsernameMessage({ username, isValid, loading }: { username: string, isValid: boolean, loading: boolean }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && username.length < 3) {
    return <p className="text-danger">Username must be at least 3 characters long.</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">Username is unavailable.</p>;
  } else {
    return <p></p>;
  }
}