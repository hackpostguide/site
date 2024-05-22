import styles from '@/styles/Post.module.css';
import PostContent from '@/components/(postComponents)/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '@/lib/firebase';
import { getFirestore, doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import Metatags from '@/components/Metatags';
import HeartButton from '@/components/(postComponents)/HeartButton';
import Link from 'next/link';
import HeartCard from '@/components/(postComponents)/HeartCard';
import { notFound } from 'next/navigation';
import { getPost } from '@/components/(postComponents)/hooks';

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
          notFound()
        )}
      </section>
      <HeartCard post={post} path={path} onPostPage={true} />
    </main>
  );
}