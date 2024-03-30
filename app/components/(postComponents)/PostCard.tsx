import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";

export default function PostCard({ posts, admin = false }: { posts: any[], admin?: boolean }) {
  return posts && posts.length ? <>{posts.map((post: any, i: number) => <PostItem post={post} key={i} admin={admin} />)}</> : <></>;
}

function PostItem({ post, admin }: { post: any, admin: boolean }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <Card className="max-w-[400px]" isPressable>
      <CardHeader className="flex gap-3">
        <Link passHref href={`/users/${post.username}`}>
          <strong>By @{post.username}</strong>
        </Link>
      </CardHeader>
      <Divider />
      <Link passHref href={`/users/${post.username}/${post.slug}`}>
        <CardBody>
          <h2 className='text-xl'>{post.title}</h2>
          <p className="text-default-600">{post.content}</p>
        </CardBody>
        <CardFooter>
          <span>{minutesToRead} min read</span>
          <span className="">💗 {post.heartCount || 0} Hearts</span>
          <span>Views: {post.views}</span>
        </CardFooter>
      </Link>
      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link passHref href={`/dashboard/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>
          {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
        </>
      )}
    </Card>
  );
}