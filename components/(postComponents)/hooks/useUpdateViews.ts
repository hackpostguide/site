'use client';
import { doc, getFirestore, updateDoc, increment } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export function useUpdateViews(slug: string, path: string) {
  const router = useRouter();

  console.log('path', path);
  console.log('post.slug', slug);


  // useEffect(() => {
  //   const incrementViews = async () => {
  //     const postRef = doc(getFirestore(), path);

  //     try {
  //       await updateDoc(postRef, {
  //         views: increment(1),
  //       });
  //     } catch (error) {
  //       console.error('Error incrementing views:', error);
  //     }
  //   };

  //   incrementViews();

  //   // Listen for client-side navigation events
  //   const handleRouteChange = () => {
  //     incrementViews();
  //   };

  //   router.events.on('routeChangeComplete', handleRouteChange);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [slug, path, router.events]);
}