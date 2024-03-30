
// app/[username]/[slug]/page.tsx
import styles from '@/app/styles/Post.module.css';
import PostContent from '@/app/components/(postComponents)/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '@/app/lib/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { UserContext } from '@/app/lib/context';
import { useContext } from 'react';
// import Metatags from '@/app/components/Metatags';
// import AuthCheck from '@/app/components/AuthCheck';
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

  return {
    props: { post, path },
    revalidate: 100,
  };
}

export default async function Post({ params }: { params: { username: string; slug: string } }) {
  const { props } = await getPost(params.username, params.slug);
  const { post, path } = props;
  // const postRef = path ? doc(getFirestore(), path) : null;
  // console.log('post', post);
  // console.log('path', path);
  // console.log('postRef', postRef);
  // const [realtimePost] = useDocumentData(postRef);

  // const postData = post;

  // const { user: currentUser } = useContext(UserContext);

  return (
    <main className={styles.container}>
      {/* <Metatags title={post.title} description={post.title} /> */}

      {/* DEBUG */}
      {/* <p>post: {post}</p> */}
      {/* <p>path: {path}</p> */}
      {/* <p>postRef: {String(postRef)}</p> */}
      {/* <p>postRef.path: {postRef?.path}</p> */}

      <section>
        <PostContent post={post} />
      </section>

      <HeartCard post={post} path={path} />

    </main>
  );
}