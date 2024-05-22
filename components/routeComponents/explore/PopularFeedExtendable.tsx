'use client';
import Loader from '@/components/Loader';
import { postToJSON, fetchPopularPosts } from '@/lib/firebase';
import { query, where, orderBy, limit, collectionGroup, getDocs, startAfter, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import GridFeed from '@/components/postComponents/GridFeed';

// Max post to query per page
const LIMIT = 12;

const PopularFeedExtendable = () => {
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
      orderBy('heartsCount', 'desc'), // Order by heartsCount
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
    const fetchInitialPosts = async () => {
      setLoading(true);
      const posts = await fetchPopularPosts(() => limit(LIMIT));
      setPosts(posts);
      setLoading(false);
    };

    fetchInitialPosts();
  }, []);

  // Get next page in pagination query
  const getMorePosts = async () => {
    const last = posts[posts.length - 1];
    const cursor = last && last.heartsCount
      ? last.heartsCount
      : null;

    fetchPosts(cursor);
  };

  return (
    <>
      <GridFeed posts={posts} />
      {!loading && !postsEnd && (
        <div className="flex justify-center my-5">
          <Button onClick={getMorePosts}>Show me more</Button>
        </div>
      )}
      <Loader show={loading} />
      {postsEnd && 'You have reached the end!'}
    </>
  );
};

export default PopularFeedExtendable;