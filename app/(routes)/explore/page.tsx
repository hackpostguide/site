'use client'
import type { GetServerSideProps, NextPage } from 'next';

import PostCard from '@/app/components/(postComponents)/PostCard';
import Loader from '@/app/components/Loader';
import { postToJSON } from '@/app/lib/firebase';
import { Timestamp, query, where, orderBy, limit, collectionGroup, getDocs, startAfter, getFirestore } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import GridFeed from '@/app/components/(postComponents)/GridFeed';
// import Metatags from './components/Metatags';

// Max post to query per page
const LIMIT = 3;

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  // Function to fetch posts
  const fetchPosts = async (startAfterCursor = null) => {
    setLoading(true);

    const ref = collectionGroup(getFirestore(), 'posts'); 
    let postsQuery = query(
      ref,
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(LIMIT),
    );

    if (startAfterCursor) {
      postsQuery = query(postsQuery, startAfter(startAfterCursor));
    }

    const querySnapshot = await getDocs(postsQuery);
    const newPosts = querySnapshot.docs.map(doc => postToJSON(doc));

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Get next page in pagination query
  const getMorePosts = async () => {
    const last = posts[posts.length - 1];
    const cursor = last && last.createdAt ? typeof last.createdAt === 'number' ? Timestamp.fromMillis(last.createdAt) : last.createdAt : null;

    fetchPosts(cursor);
  };

  return (
    <main>
      {/* <Metatags title="Home Page" description="Get the latest posts on our site" /> */}

      <h3>All posts from the community:</h3>

      <GridFeed posts={posts} />

      {!loading && !postsEnd && <Button color="primary" onClick={getMorePosts}>Load more</Button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>
  );
}

export default Home