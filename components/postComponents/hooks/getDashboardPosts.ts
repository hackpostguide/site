import { auth } from '@/lib/firebase';
import { collection, getFirestore, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

export function useGetDashboardPosts(){ 
    const uid: any = auth?.currentUser?.uid;
    const ref = collection(getFirestore(), 'users', uid, 'posts');
    const postQuery = query(ref, orderBy('updatedAt', 'desc'));
    const [querySnapshot] = useCollection(postQuery);
    const posts: any = querySnapshot?.docs.map((doc: any) => doc.data());

    return posts;
};