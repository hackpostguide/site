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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { Badge } from "@/components/ui/badge";
import { tags as tagConfig } from "@/app/config/tags";

export default function PostCard({ posts, admin = false }: { posts: any[], admin?: boolean }) {
  return posts && posts.length ? <>{posts.map((post: any, i: number) => <PostItem post={post} key={i} admin={admin} />)}</> : <></>;
}

function PostItem({ post, admin }: { post: any, admin: boolean }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  const [uid, setUID] = useState<string | null>(null);

  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUID = async () => {
      const fetchedUID = await getUIDWithUsername(post.username);
      setUID(fetchedUID);

      const fetchedUser = await getUserWithUsername(post.username);
      setUser(fetchedUser);
      // console.log('user: ', fetchedUser.data().photoURL);
    };
    fetchUID();
  }, [post.username]);

  // const path = uid ? `users/${uid}/posts/${post.slug}` : null;
  // const postRef = path ? doc(firestore, path) : null;
  // const user = auth.currentUser;

  // const [realtimePost] = useDocumentData(postRef);

  // const updatedPost = realtimePost || post;


  // Helper function to get tag color
  const getTagColor = (tagName: string) => {
    const allTags = [...tagConfig.difficulty, ...tagConfig.topics];
    const tag = allTags.find(t => t.name === tagName);
    return tag ? tag.color : "bg-gray-400"; // default color if not found
  };

  return (
    <Card
      className="max-w-[400px] p-3 relative flex flex-col justify-between hover:shadow-lg hover:scale-105 transition-transform duration-300"
    >
      <div className="w-full">
        <CardHeader className="">
          <Link passHref href={`/users/${post.username}`}>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user?.data().photoURL} alt={`@${post.username}`} />
                <AvatarFallback>{post.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <strong className='text-warning'>@{post.username}</strong>
            </div>
          </Link>
          <Link passHref href={`/users/${post.username}/${post.slug}`}>
            <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
          </Link>
        </CardHeader>
        <Link passHref href={`/users/${post.username}/${post.slug}`}>
          <CardContent className="">
            {/* Render tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} className={`${getTagColor(tag)} text-white`}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-foreground/85 line-clamp-5 mt-6">{post.description}</p>
            {admin && (post.published ? <p className="text-success">Published</p> : <p className="text-danger">Unpublished</p>)}
          </CardContent>
        </Link>
      </div>
      <CardFooter className="flex justify-between text-warning font-bold mt-4">
        <span>~{minutesToRead} min</span>
        <HeartCard post={post} path={`users/${uid}/posts/${post.slug}`} onPostPage={false}/>
      </CardFooter>
      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Button className="whitespace-nowrap h-12 mb-5" asChild>
            <Link href={`/dashboard/${post.slug}`}>
              Edit
            </Link>
          </Button>
        </>
      )}
    </Card>
  );
  }