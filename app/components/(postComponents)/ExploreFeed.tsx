'use client';

import PostCard from './PostCard';
import Loader from '@/app/components/Loader';
import { postToJSON } from '@/app/lib/firebase';
import { query, where, orderBy, limit, collectionGroup, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// Max post to query
const LIMIT = 5;

const ExploreFeed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    const ref = collectionGroup(getFirestore(), 'posts');
    const postsQuery = query(
      ref,
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
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
      {/* <Metatags title="Home Page" description="Get the latest posts on our site" /> */}

      <div className="grid grid-cols-5 gap-4">
        <PostCard posts={posts} />
      </div>
      <Loader show={loading} />
    </main>
  );
};

export default ExploreFeed;