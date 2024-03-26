import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { auth } from '../lib/firebase';

// Initialize Firestore
const firestore = getFirestore();

// Custom hook to read auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe = () => {};

    if (user) {
      // Create a reference to the user document
      const ref = doc(firestore, 'users', user.uid);
      // Listen for document updates
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    // Clean up the subscription
    return unsubscribe;
  }, [user]);

  return { user, username };
}
