import styles from '@/styles/Post.module.css';
import PostContent from '@/components/postComponents/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '@/lib/firebase';
import { getFirestore, doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { getMetadata } from '@/components/misc/Metatags';
import HeartButton from '@/components/postComponents/HeartButton';
import Link from 'next/link';
import HeartCard from '@/components/postComponents/HeartCard';
import { notFound } from 'next/navigation';
import { getPost } from '@/components/postComponents/hooks';
import { Metadata, ResolvingMetadata } from 'next';
import { Props } from 'next/script';
import { get } from 'lodash';
import { Button } from '@/components/ui/button';

// export const metadata: Metadata = {
//   title: 'skibidibop and a dadadidoo',
//   description: 'The open source resource hub for hackathoners. Free. Community Driven.',
//   // title: post?.title || '',
//   // description: post?.title || '',
// };

export async function generateMetadata(
  { params }: { params: { username: string; slug: string } },
): Promise<Metadata> {
  const { props } = await getPost(params.username, params.slug);
  const { post, path } = props;
 
  return getMetadata({
    title: post?.title,
    description: post?.description?.length > 0 ? post?.description : post?.title,
    author: post?.username,
  });
} 


export default async function Post({ params }: { params: { username: string; slug: string } }) {
  const { props } = await getPost(params.username, params.slug);
  const { post, path } = props;

  return (
    <main className={`${styles.container} mb-[100px]`}>
      <section className="max-w-4xl mx-auto lg:pr-32">
        <Button className="mb-10" asChild>
          <Link href='/explore'>
            ← Back to Explore Feed ✨
          </Link>
        </Button>
        {post?.published ? (
          <div>
            <PostContent post={post} path={path || ''} />
          </div>
        ) : (
          <div>
            <h3>This post is private. </h3>
            <p>If you are the owner, make sure to visit the post through the &quot;Edit&quot; button.</p>
          </div>
        )}
        <div className="flex justify-center">
          <Button className="mt-10" size="lg" asChild>
          <Link href='/explore'>
            Check out more guides 🚀
          </Link>
        </Button>
        </div>
        
      </section>
      <HeartCard post={post} path={path} onPostPage={true} />
    </main>
  );
}