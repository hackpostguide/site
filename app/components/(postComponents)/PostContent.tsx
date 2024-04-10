import ReactMarkdown from 'react-markdown';
import { useUpdateViews } from '@/app/components/(postComponents)/hooks/useUpdateViews';
import { MarkdownComponents } from './MarkdownComponents';
import { Card, CardBody, CardHeader, Link } from '@nextui-org/react';

export default function PostContent({ post, path }: { post: any, path: string }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();
  // useUpdateViews(post.slug, path);

  const formattedDate = createdAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="">
      <Card className='p-5'>
        <CardBody>
          <h1 className='text-center mb-6'>{post?.title}</h1>
          <div className='flex justify-center items-center mb-6'>
            <p>Written by</p>
            <Link href={`/users/${post.username}/`} underline="hover" className="mx-2">
              <p>@{post.username}</p>
            </Link>
            <p>on</p>
            <p className="ml-2">{formattedDate}</p>
          </div>
        </CardBody>
      </Card>
      <ReactMarkdown components={MarkdownComponents} className="my-5">{post?.content}</ReactMarkdown>
      {/* <p>Views: {post.views}</p> */}
    </div>
  );
}