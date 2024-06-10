import { auth } from '@/lib/firebase';
import { collectionGroup, getFirestore, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

export function useGetInProgressPosts() {
    const user = auth.currentUser;
    const uid = user?.uid;
    const db = getFirestore();
    
    // Reference to the completes collection group
    const completesCollectionGroupRef = collectionGroup(db, 'completes');
    const postQuery = query(
      completesCollectionGroupRef,
      where('uid', '==', uid),
      where('completeStatus', '==', 'In Progress'),
    //   orderBy('heartCount', 'desc')
    );
    
    const [querySnapshot] = useCollection(postQuery!);
    const inProgressPosts: any = querySnapshot?.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id
    }));
  
    return inProgressPosts;
  }
  