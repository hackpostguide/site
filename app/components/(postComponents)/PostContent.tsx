import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useUpdateViews } from '@/app/components/(postComponents)/hooks/useUpdateViews';

export default function PostContent({ post, path }: { post: any, path: string }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

  // useUpdateViews(post.slug, path); 

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{' '}
        <Link href={`/${post.username}/`} className="text-info">
          @{post.username}
        </Link>{' '}
        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
      <p>Views: {post.views}</p>
    </div>
  );
}