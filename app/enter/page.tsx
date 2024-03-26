'use client'
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithRedirect } from 'firebase/auth';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import Image from 'next/image';
import debounce from 'lodash.debounce';

import { auth, firestore } from '@/app/lib/firebase';
import { UserContext } from '@/app/lib/context';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/react';
import toast from 'react-hot-toast';

export default function Enter(props: any) {
  const { user, username } = useContext(UserContext);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-foreground">Join a community of hackers!</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {user ? (
          !username ? (
            <UsernameForm />
          ) : (
            <SignOutButton />
          )
        ) : (
          <SignInButton />
        )}
      </div>
    <p>User: {String(user)}</p>
    <p>Username: {username}</p>
    </div>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      console.log('Signed in with Google');
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

          startContent={<Image src="/google-icon-logo-png-transparent.png" alt="Google" width="20" height="20" />}
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

        onClick={() => signOut(auth)}
        className="font-sm space-y-6"
      >
        Sign Out
      </Button>
    );
}

function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const userDocRef = doc(firestore, `users/${user?.uid}`);
    const usernameDocRef = doc(firestore, `usernames/${formValue}`);

    const batch = writeBatch(firestore);
    batch.set(userDocRef, { bio: "", username: formValue, email: user?.email, photoURL: user?.photoURL, displayName: user?.displayName, isBanned: false, isAdmin: false, banReason: "null"});
    batch.set(usernameDocRef, { uid: user?.uid });

    await batch.commit();
    console.log('Username created!');
    toast.success('Logged in successfully!');
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
              variant="faded"
              isRequired 
              placeholder="eg: john-doe" 

            />
            {/* <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="myname"
                value={formValue}
                onChange={onChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div> */}
          </div>

          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

          <div>
            <Button
              color="primary"
              type="submit"
              isDisabled ={!isValid}
              className="flex w-full"
              // className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Choose
            </Button>
          </div>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
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