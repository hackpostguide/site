import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import markdownToTxt from 'markdown-to-txt';

export default function PostCard({ posts, admin = false }: { posts: any[], admin?: boolean }) {
  return posts && posts.length ? <>{posts.map((post: any, i: number) => <PostItem post={post} key={i} admin={admin} />)}</> : <></>;
}

function PostItem({ post, admin }: { post: any, admin: boolean }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);


  return (
    <Card
      className="max-w-[400px] p-3 relative flex flex-col justify-between"
      
    >
      <div className="w-full">
        <CardHeader className="">
          <Link passHref href={`/users/${post.username}`}>
            <strong>By @{post.username}</strong>
          </Link>
          <Link passHref href={`/users/${post.username}/${post.slug}`}>
            <CardTitle className="text-2xl">{post.title}</CardTitle>
          </Link>
        </CardHeader>
        <Link passHref href={`/users/${post.username}/${post.slug}`}>
          <CardContent className="">
            <p className="text-default-600 line-clamp-5">{markdownToTxt(post.content)}</p>
            {admin && (post.published ? <p className="text-success">Published</p> : <p className="text-danger">Unpublished</p>)}
          </CardContent>
        </Link>
      </div>
      <CardFooter className="flex justify-between text-warning font-bold mt-4">
        <span>~{minutesToRead} min</span>
        <span className="">💖 {post.heartCount || 0} Hearts</span>
        {/* <span>Views: {post.views}</span> */}
      
        {/* If admin view, show extra controls for user */}
        {admin && (
          <>
            <Button className="whitespace-nowrap" asChild>
              <Link  href={`/dashboard/${post.slug}`}>
                Edit
              </Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}