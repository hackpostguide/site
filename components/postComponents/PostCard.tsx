'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import markdownToTxt from 'markdown-to-txt';
import HeartCard from './HeartCard';
import { auth, firestore, getUserWithUsername } from '@/lib/firebase';
import { getUIDWithUsername } from './hooks';
import { useState, useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';

export default function PostCard({ posts, admin = false }: { posts: any[], admin?: boolean }) {
  return posts && posts.length ? <>{posts.map((post: any, i: number) => <PostItem post={post} key={i} admin={admin} />)}</> : <></>;
}

function PostItem({ post, admin }: { post: any, admin: boolean }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  const [uid, setUID] = useState<string | null>(null);

  useEffect(() => {
    const fetchUID = async () => {
      const fetchedUID = await getUIDWithUsername(post.username);
      setUID(fetchedUID);
      // console.log('fetchedUID: ', fetchedUID);
    };
    fetchUID();
  }, [post.username]);

  // const path = uid ? `users/${uid}/posts/${post.slug}` : null;
  // const postRef = path ? doc(firestore, path) : null;
  // const user = auth.currentUser;

  // const [realtimePost] = useDocumentData(postRef);

  // const updatedPost = realtimePost || post;

  return (
    <Card
      className="max-w-[400px] p-3 relative flex flex-col justify-between"
      
    >
      <div className="w-full">
        <CardHeader className="">
          <Link passHref href={`/users/${post.username}`}>
            <div>
              
              <strong className='text-warning'>@{post.username}</strong>
            </div>
          </Link>
          <Link passHref href={`/users/${post.username}/${post.slug}`}>
            <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
          </Link>
        </CardHeader>
        <Link passHref href={`/users/${post.username}/${post.slug}`}>
          <CardContent className="">
            <p className="text-foreground/70 line-clamp-5">{markdownToTxt(post.content)}</p>
            {admin && (post.published ? <p className="text-success">Published</p> : <p className="text-danger">Unpublished</p>)}
          </CardContent>
        </Link>
      </div>
      <CardFooter className="flex justify-between text-warning font-bold mt-4">
        <span>~{minutesToRead} min</span>
        {/* <span className="">💖 {post.heartCount || 0} Hearts</span> */}
        {/* <span>Views: {post.views}</span> */}
        <HeartCard post={post} path={`users/${uid}/posts/${post.slug}`} onPostPage={false}/>
      
        {/* If admin view, show extra controls for user */}
        {admin && (
          <>
            <Button className="whitespace-nowrap h-12" asChild>
              <Link  href={`/dashboard/${post.slug}`}>
                Edit
              </Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}