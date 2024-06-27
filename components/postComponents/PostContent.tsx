import ReactMarkdown from 'react-markdown';
import { useUpdateViews } from '@/components/postComponents/hooks/useUpdateViews';
import { MarkdownComponents } from './MarkdownComponents';
import { Card, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { Badge } from "@/components/ui/badge";
import { tags as tagConfig } from "@/app/config/tags";

export default function PostContent({ post, path }: { post: any, path: string }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

  const formattedDate = createdAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const getTagColor = (tagName: string) => {
    const allTags = [...tagConfig.difficulty, ...tagConfig.type, ...tagConfig.topics];
    const tag = allTags.find(t => t.name === tagName);
    return tag ? tag.color : "bg-gray-400";
  };

  return (
    <div className="">
      <Card className='md:p-8'>
        <CardHeader className="space-y-6">
          <h1 className='text-5xl font-bold text-center'>{post?.title}</h1>
          
          <p className="text-xl text-foreground/85 font-semibold text-center">
            {post.description}
          </p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag: string) => (
                <Badge key={tag} className={`${getTagColor(tag)} text-white text-sm px-3 py-1`}>
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Separator className="my-6" />
          
          <div className='flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 text-sm text-foreground/70'>
            <p>Written by</p>
            <Button variant="link" size="sm" className='p-0 h-auto font-semibold' asChild>
              <Link href={`/users/${post.username}/`}>
                <p>@{post.username}</p>
              </Link>
            </Button>
            <p>on {formattedDate}</p>
          </div>
        </CardHeader>
      </Card>
      <ReactMarkdown components={MarkdownComponents} className="my-8">
        {post?.content}
      </ReactMarkdown>
    </div>
  );
}