// app/admin/page.tsx
'use client';
import React from 'react'
import styles from '@/app/styles/Admin.module.css'
import AuthCheck from '@/app/components/(dashboard)/AuthCheck'
import PostFeed from '@/app/components/(postComponents)/PostCard'
import { UserContext } from '@/app/lib/context'
import { auth } from '@/app/lib/firebase'
import { serverTimestamp, query, collection, orderBy, getFirestore, setDoc, doc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCollection } from 'react-firebase-hooks/firestore'
import kebabCase from 'lodash.kebabcase'
import toast from 'react-hot-toast'

export default function Dashboard() {
  return (
    <main>
      {/* <AuthCheck>
        @ts-expect-error Server Component
        <PostList />
        @ts-expect-error Server Component
        <CreateNewPost />
      </AuthCheck> */}
      <AuthCheck>
        <PostList />
        <CreateNewPost />
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
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  )
}

const CreateNewPost = (): JSX.Element => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  //use server timestamp to generate a unique slug in the future
  // // Get the server timestamp
  // const serverTime = serverTimestamp();
  // console.log('serverTime', serverTime.toString());

  // // Use the number of seconds since 1/1/2000 as the slug
  // const slug = serverTime.toString();


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
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
};