import ReactMarkdown from 'react-markdown';
import { useUpdateViews } from '@/app/components/(postComponents)/hooks/useUpdateViews';
import { MarkdownComponents } from './MarkdownComponents';
import { Card, CardBody, CardHeader, Link } from '@nextui-org/react';

export default function PostContent({ post, path }: { post: any, path: string }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

  // useUpdateViews(post.slug, path); 

  return (
    <div className="">
      <Card className='p-5'>
        <CardBody>
          <h1 className='text-center mb-6'>{post?.title}</h1>
          <p className='text-center'>
            Written by{' '}
            <Link href={`/users/${post.username}/`} underline="hover">
              @{post.username}
            </Link>{' '}
            on {createdAt.toISOString()}
          </p>
        </CardBody>
        
      </Card>
      <ReactMarkdown components={MarkdownComponents}>{post?.content}</ReactMarkdown>
      {/* <p>Views: {post.views}</p> */}
    </div>
  );
}