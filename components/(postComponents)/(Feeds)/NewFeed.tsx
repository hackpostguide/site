'use server';

import GridFeed from '../GridFeed';
import Metatags from '../../Metatags';
import { postToJSON, fetchNewPosts } from '@/lib/firebase';
import { query, where, orderBy, limit, collectionGroup, getDocs, getFirestore } from 'firebase/firestore';

// Max post to query: 6
const LIMIT = 6;

async function getData() {
  const posts = await fetchNewPosts(() => limit(LIMIT));
  return { posts };
}

export default async function NewFeed() {
  const { posts } = await getData();

  return (
    <main>
      <Metatags title="Explore New Posts" description="New posts from the community" />
      <GridFeed posts={posts} />
    </main>
  );
}