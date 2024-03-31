// app/admin/page.tsx
'use client';
import React from 'react'
import styles from '@/app/styles/Admin.module.css'
import AuthCheck from '@/app/components/(dashboard)/AuthCheck'
import PostCard from '@/app/components/(postComponents)/PostCard'
import { UserContext } from '@/app/lib/context'
import { auth } from '@/app/lib/firebase'
import { serverTimestamp, query, collection, orderBy, getFirestore, setDoc, doc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCollection } from 'react-firebase-hooks/firestore'
import kebabCase from 'lodash.kebabcase' //implement kebabCase for slug later?
import toast from 'react-hot-toast'
import { title, subtitle } from "@/app/components/Primitives";
import { Button, Input } from '@nextui-org/react';

export default function Dashboard() {
  return (
    <main>
      <AuthCheck>
        <h1
          className={'text-2xl mb-10 text-center md:text-3xl lg:text-4xl'}
        >
          My dashboard
        </h1>
        <div>
          <h2 className={`${title({ size: "xs" })}`}>
            Create new post
          </h2>
          <div className='my-6'>
            <CreateNewPost />
          </div>
        </div>
        
        <div>
          <h2 className={`${title({ size: "sm" })}`}>
            My posts
          </h2>
          <div className='my-6'>
            <PostList /> 
          </div>
        </div>
        
      </AuthCheck>
    </main>
  )
}

const PostList = (): JSX.Element => {
  const uid: any = auth?.currentUser?.uid
  const ref = collection(getFirestore(), 'users', uid, 'posts')
  const postQuery = query(ref, orderBy('createdAt'))
  const [querySnapshot] = useCollection(postQuery)
  const posts: any = querySnapshot?.docs.map((doc: any) => doc.data())

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
      <PostCard posts={posts} admin />
    </div>
  )
}

const CreateNewPost = (): JSX.Element => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  //TODO: use server timestamp instead to generate a unique slug in the future

  //slug generation: 
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();
  // Convert milliseconds to seconds
  const secondsSinceEpoch = Math.floor(currentTimestamp / 1000);
  // Subtract the number of seconds between 1/1/1970 and 1/1/2000
  const secondsSince2000 = secondsSinceEpoch - 946684800;
  // Use the number of seconds since 1/1/2000 as the slug
  const slug = "post-" + secondsSince2000.toString();


  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e: any): Promise<void> => {
    e.preventDefault();
    const uid: any = auth?.currentUser?.uid;
    const ref = doc(getFirestore(), 'users', uid, 'posts', slug);
    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
      views: 0, // Initialize views to 0
    };
    await setDoc(ref, data);
    toast.success('Post created!');
    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <div className="flex items-center">
        <Input
          size="lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Your title here..."
          className="flex-grow mr-2"
        />
        {/* <p>
          <strong>Slug:</strong> {slug}
        </p> */}
        <Button type="submit" color="success" isDisabled={!isValid} size="lg" className="h-16">
          Create New
        </Button>
      </div>
    </form>
  );
};