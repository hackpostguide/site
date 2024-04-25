'use server';

import PostCard from '../PostCard';
import GridFeed from '../GridFeed';
import Metatags from '../../Metatags';
import { postToJSON, fetchPopularPosts } from '@/app/lib/firebase';
import { limit, QueryConstraint } from 'firebase/firestore';

// Max post to query: 6
const LIMIT = 6;

async function getData() {
  const posts = await fetchPopularPosts(() => limit(LIMIT));
  return { posts };
}

export default async function PopularFeed() {
  const { posts } = await getData();

  return (
    <main>
      <Metatags title="Explore Popular Posts" description="Popular posts from the community" />
      <GridFeed posts={posts} />
    </main>
  );
}