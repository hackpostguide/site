// Firebase v9+ imports use the new modular syntax
import { initializeApp, getApp, getApps, FirebaseOptions } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { collection, getDoc, getDocs, getFirestore, limit, query, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD0BItst5RuS0vY7TjAzcANMh1OKE7e_MQ",
  authDomain: "hackpost-guide.firebaseapp.com",
  projectId: "hackpost-guide",
  storageBucket: "hackpost-guide.appspot.com",
  messagingSenderId: "118368469097",
  appId: "1:118368469097:web:7c93d79f075e1ec58662f8",
  measurementId: "G-ZGT858FXFW"
};

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(firebaseApp);

// Storage exports
export const storage = getStorage(firebaseApp);

export const STATE_CHANGED = 'state_changed';

// Helper functions
/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */
export async function getUserWithUsername(username: string): Promise<any> {
  const q = query(
    collection(firestore, 'users'),
    where('username', '==', username),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc: any) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

// Initialize Firebase Analytics only on the client-side
// let analytics;
// if (typeof window !== 'undefined' && isSupported().dataFromWindow) {
//   analytics = getAnalytics(firebaseApp);
// }

// export { analytics };