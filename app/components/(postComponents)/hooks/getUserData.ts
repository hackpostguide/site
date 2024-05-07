import { getUserWithUsername, postToJSON } from '@/app/lib/firebase';
import { query, collection, where, getDocs, limit, orderBy, getFirestore } from 'firebase/firestore';

export async function getUserData(username: any) {
  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return null;
  }

  const user = userDoc.data();

  const postsQuery = query(
    collection(getFirestore(), userDoc.ref.path, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(5)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return { user, posts };
}