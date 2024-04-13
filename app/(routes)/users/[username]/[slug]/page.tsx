import styles from '@/app/styles/Post.module.css';
import PostContent from '@/app/components/(postComponents)/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '@/app/lib/firebase';
import { getFirestore, doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { UserContext } from '@/app/lib/context';
import { useContext } from 'react';
import Metatags from '@/app/components/Metatags';
import HeartButton from '@/app/components/(postComponents)/HeartButton';
import Link from 'next/link';
import HeartCard from '@/app/components/(postComponents)/HeartCard';

async function getPost(username: string, slug: string) {
  const userDoc = await getUserWithUsername(username);
  let post;
  let path;
  if (userDoc) {
    const postRef = doc(getFirestore(), userDoc.ref.path, 'posts', slug);
    post = postToJSON(await getDoc(postRef));
    path = postRef.path;
  }
  return { props: { post, path }, revalidate: 100 };
}

export default async function Post({ params }: { params: { username: string; slug: string } }) {
  const { props } = await getPost(params.username, params.slug);
  const { post, path } = props;

  return (
    <main className={`${styles.container} mb-[100px]`}>
      <Metatags title={post?.title} description={post?.title} image='' />
      <section>
        {post?.published ? (
          <div>
            <PostContent post={post} path={path || ''} />
          </div>
        ) : (
          <p>This post is currently private.</p>
        )}
      </section>
      <HeartCard post={post} path={path} />
    </main>
  );
}