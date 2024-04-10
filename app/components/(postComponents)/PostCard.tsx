import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from "@nextui-org/react";

export default function PostCard({ posts, admin = false }: { posts: any[], admin?: boolean }) {
  return posts && posts.length ? <>{posts.map((post: any, i: number) => <PostItem post={post} key={i} admin={admin} />)}</> : <></>;
}

function PostItem({ post, admin }: { post: any, admin: boolean }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);


  return (
    <Card
      className="max-w-[400px] p-3 relative hover:-translate-y-1 after:content-[''] after:absolute after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 flex flex-col justify-between"
      isPressable
    >
      <div className="w-full">
        <CardHeader className="text-secondary flex gap-3 justify-between items-center">
          <Link passHref href={`/users/${post.username}`}>
            <strong>By @{post.username}</strong>
          </Link>
          {/* If admin view, show extra controls for user */}
          {admin && (
            <>
              <Button as={Link} href={`/dashboard/${post.slug}`} size="sm" className="whitespace-nowrap">
                Edit
              </Button>
            </>
          )}
        </CardHeader>
        <Divider />
        <Link passHref href={`/users/${post.username}/${post.slug}`}>
          <CardBody className="p-3">
            <h2 className="text-xl font-bold text-primary">{post.title}</h2>
            <p className="text-default-600 line-clamp-5">{post.content}</p>
            {admin && (post.published ? <p className="text-success">Published</p> : <p className="text-danger">Unpublished</p>)}
          </CardBody>
        </Link>
      </div>
      <CardFooter className="flex justify-between text-warning font-bold mt-4">
        <span>{minutesToRead} min read</span>
        <span className="">💖 {post.heartCount || 0} Hearts</span>
        {/* <span>Views: {post.views}</span> */}
      </CardFooter>
    </Card>
  );
}