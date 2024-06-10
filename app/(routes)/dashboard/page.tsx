// app/admin/page.tsx
'use client';
import React from 'react'
import AuthCheck from '@/components/routeComponents/dashboard/AuthCheck'
import PostCard from '@/components/postComponents/PostCard'
import { UserContext } from '@/lib/context'
import { auth } from '@/lib/firebase'
import { serverTimestamp, query, collection, orderBy, getFirestore, setDoc, doc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCollection } from 'react-firebase-hooks/firestore'
import kebabCase from 'lodash.kebabcase'
import toast from 'react-hot-toast'
import { title, subtitle } from "@/components/Primitives";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetCompletedPosts, useGetDashboardPosts, useGetInProgressPosts } from '@/components/postComponents/hooks';
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Dashboard() {
  return (
    <main>
      <AuthCheck>
        <section>
          <h1
            className={'text-2xl mb-10 text-center md:text-3xl lg:text-4xl'}
          >
            My dashboard
          </h1>
        </section>

        <section>
          <Tabs defaultValue="complete" className="">
            <TabsList className="grid w-full sm:w-[300px] grid-cols-2">
              <TabsTrigger value="complete">In Progress</TabsTrigger>
              <TabsTrigger value="create">Write Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="complete">
              <CompletedPosts />
            </TabsContent>
            <TabsContent value="create">
              <UserPosts />
            </TabsContent>
          </Tabs>
        </section>
              
      </AuthCheck>
    </main>
  )
}


const UserPosts = (): JSX.Element => {
  return (
    <>
      <div className='mt-4 mb-16'>
        <Card className="p-8 pt-16">
          <CardContent>
            <CardTitle className={`${title({ size: "sm" })}`}>
                Create new post
            </CardTitle>
            <div className='my-6'>
              <CreateNewPost />
            </div>
          </CardContent>
          <CardFooter>
            <p className=''>
              The title has to be at least 3 characters long and less than 100 characters long.
              You will also <strong>not</strong> be able to edit the title after creating the post - make sure it is concise and informative!
              <br />
              After creating your post, you will be able to edit the content.
            </p>
          </CardFooter>
        </Card>
      </div>
      <div>
        <h2 className={`${title({ size: "sm" })}`}>
          Existing posts:
        </h2>
        <div className='my-6'>
          <PostList />
        </div>
      </div>
    </>
  );
}

const CompletedPosts = (): JSX.Element => {
  const completedPosts = useGetCompletedPosts();
  const inProgressPosts = useGetInProgressPosts();

  // console.log('completedPosts: ', completedPosts);  
  // console.log('inProgressPosts: ', inProgressPosts);

  if (!completedPosts || !inProgressPosts) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>In Progress Posts</h1>
      {inProgressPosts.length > 0 ? (
        inProgressPosts.map((post: any, index: number) => (
          <div key={index}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Hearts: {post.heartCount}</p>
          </div>
        ))
      ) : (
        <p>No in progress posts found.</p>
      )}

      <h1>Completed Posts</h1>
      {completedPosts.posts.length > 0 ? (
        completedPosts.posts.map((post: any, index: number) => (
          <div key={index}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Hearts: {post.heartCount}</p>
          </div>
        ))
      ) : (
        <p>No completed posts found.</p>
      )}
    </div>
  );
}

const PostList = (): JSX.Element => {
  const posts = useGetDashboardPosts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
      {posts && posts.length > 0 ? (
        <PostCard posts={posts} admin />
      ) : (
        <p>You have yet to create your first post</p>
      )}
    </div>
  )
}

const CreateNewPost = (): JSX.Element => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  //slug generation: 
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();
  // Convert milliseconds to seconds
  const secondsSinceEpoch = Math.floor(currentTimestamp / 1000);
  // Subtract the number of seconds between 1/1/1970 and 1/1/2000
  const secondsSince2000 = secondsSinceEpoch - 946684800;
  // Use the number of seconds since 1/1/2000 as the slug
  // Ensure slug is URL safe
  const kebabTitle = encodeURI(kebabCase(title))
  const slug = "post-" + secondsSince2000.toString() + "-" + kebabTitle;


  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e: any): Promise<void> => {
    e.preventDefault();
    const uid: any = auth?.currentUser?.uid;
    const ref = doc(getFirestore(), 'users', uid, 'posts', slug);
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world! \nPosts use markdown - if you are unfamiliar with markdown, check out [this guide](https://guides.github.com/features/mastering-markdown/). You can click on the link after previewing your post (using the preview button). After publishing, you may view your post's public page using the 'Live Post' button. \n\nHappy writing! 🚀" ,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
      views: 0, // Initialize views to 0
      tags: [],
    };
    toast.promise(setDoc(ref, data), {
      loading: 'Creating post...',
      success: 'Post created!',
      error: 'Failed to create post',
    })
    // toast.success('Post created!');
    // Imperative navigation after doc is set
    router.push(`/dashboard/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <div className="flex items-center">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your title here..."
          className="flex-grow mr-2 h-16"
        />
        {/* <p>
          <strong>Slug:</strong> {slug}
        </p> */}
        <Button type="submit" color="success" disabled={!isValid} size="lg" className="h-16">
          Create New
        </Button>
      </div>
    </form>
  );
};