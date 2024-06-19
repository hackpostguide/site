import { auth } from '@/lib/firebase';
import { collectionGroup, getFirestore, query, where, orderBy, getDocs } from 'firebase/firestore';

export async function useGetCompletedPosts() {
  const user = auth.currentUser;
  const uid = user?.uid;
  const db = getFirestore();

  console.log("uid: ", uid); 
  
  if (!uid) {
    return { posts: [] };
  }
  
  // Reference to the completes collection group
  const completesQuery = query(
    collectionGroup(db, 'completes'), 
    where('uid', '==', uid),
    where('completeStatus', '==', 'Completed'),
    orderBy('heartCount', 'desc')
  );
  
  const querySnapshot = await getDocs(completesQuery);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
  
  console.log("completesQuery query:", completesQuery);

  console.log("Query snapshot: ", querySnapshot);
  
  const posts: any = querySnapshot?.docs.map((doc: any) => doc.data());
  const completedPosts = querySnapshot?.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id
  })) || [];

  return completedPosts;
}
