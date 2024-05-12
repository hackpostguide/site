'use client';

import Loader from '@/components/Loader';
import { postToJSON } from '@/lib/firebase';
import { query, where, orderBy, limit, collectionGroup, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import GridFeed from '../GridFeed';
import Metatags from '../../Metatags';

// Max post to query: 6

const PopularFeed = ({ LIMIT = 6 }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    const ref = collectionGroup(getFirestore(), 'posts');
    const postsQuery = query(
      ref,
      where('published', '==', true),
      orderBy('heartCount', 'desc'),
      limit(LIMIT)
    );
    const querySnapshot = await getDocs(postsQuery);
    const newPosts = querySnapshot.docs.map(doc => postToJSON(doc));
    setPosts(newPosts);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main>
      <Metatags title="Explore Popular Posts" description="Popular posts from the community" />

      <GridFeed posts={posts} />
      <Loader show={loading} />
    </main>
  );
};

export default PopularFeed;