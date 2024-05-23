import ReactMarkdown from 'react-markdown';
import { useUpdateViews } from '@/components/postComponents/hooks/useUpdateViews';
import { MarkdownComponents } from './MarkdownComponents';
import { Card, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PostContent({ post, path }: { post: any, path: string }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();
  // useUpdateViews(post.slug, path);

  const formattedDate = createdAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-3xl mx-auto">
      <Card className='md:p-5 '>
        <CardHeader>
          <h1 className='text-center mb-6'>{post?.title}</h1>
          <div className='flex justify-center items-center mb-6'>
            <p>Written by</p>
            <Button variant="link" size="sm" className='px-2' asChild>
              <Link href={`/users/${post.username}/`} className="">
                <p>@{post.username}</p>
              </Link>
            </Button>
            <p>on</p>
            <p className="ml-2">{formattedDate}</p>
          </div>
        </CardHeader>
      </Card>
      <ReactMarkdown components={MarkdownComponents} className="my-5">{post?.content}</ReactMarkdown>
      {/* <p>Views: {post.views}</p> */}
    </div>
  );
}