'use server';

import GridFeed from '../../../postComponents/GridFeed';
import { postToJSON, fetchNewPosts } from '@/lib/firebase';
import { query, where, orderBy, limit, collectionGroup, getDocs, getFirestore } from 'firebase/firestore';

// Max post to query: 3
const LIMIT = 3;

async function getData() {
  const posts = await fetchNewPosts(() => limit(LIMIT));
  return { posts };
}

export default async function NewFeed() {
  const { posts } = await getData();

  return (
    <main>
      <GridFeed posts={posts} />
    </main>
  );
}