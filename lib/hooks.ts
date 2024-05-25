import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { auth, firestore } from './firebase';

// Initialize Firestore
// const firestore = getFirestore();

// a custom hook to read auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  // const user = auth.currentUser;
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe = () => {};

    if (user) {
      // created a reference to the user document
      const ref = doc(firestore, 'users', user.uid);
      // listening for document updates
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    // Clean up the subscription
    return unsubscribe;
  }, [user]);

  return { username };
}

export const getSeoConfig = (slug: string) => {
  const seoConfig = {
    title: `${slug}`,
    description: `${slug}`,
    // Add other SEO properties as needed
  };

  return seoConfig;
};
