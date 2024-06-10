import { auth } from '@/lib/firebase';
import { collectionGroup, getFirestore, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

export function useGetCompletedPosts() {
  const user = auth.currentUser;
  const uid = user?.uid;
  const db = getFirestore();

  console.log("uid: ", uid); 
  
  // Reference to the completes collection group
  const completesCollectionGroupRef = collectionGroup(db, 'completes');
  const postQuery = query(
    completesCollectionGroupRef,
    // where('uid', '==', uid),
    // where('completeStatus', '==', 'Completed'),
    // orderBy('heartCount', 'desc')
  );

  console.log(postQuery);
  
  const [querySnapshot] = useCollection(postQuery);

  console.log("Query snapshot: ", querySnapshot);
  
  const completedPosts = querySnapshot?.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id
  })) || [];

  if (!user) {
    return { posts: [], loading: false, error: 'No authenticated user found' };
  }

  return { posts: completedPosts};
}
