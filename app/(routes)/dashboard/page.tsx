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
import { CreateNewPost } from '@/components/routeComponents/dashboard/CreateNewPost';
import { CompletedPosts } from '@/components/routeComponents/dashboard/CompletedPosts';

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
          <Tabs defaultValue="create" className="">
            <TabsList className="grid w-full sm:w-[300px] grid-cols-2 mb-6">
              <TabsTrigger value="complete">My Progress</TabsTrigger>
              <TabsTrigger value="create">My Posts</TabsTrigger>
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
      <div className='mb-16'>
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
