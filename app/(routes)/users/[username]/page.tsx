import UserProfile from "@/app/components/UserProfile";
import GridFeed from "@/app/components/(postComponents)/GridFeed";
import { getUserData } from "@/app/components/getUserData";
import Link from "next/link";
import { notFound } from "next/navigation";
import Metatags from "@/app/components/Metatags";

export default async function UserProfilePage({ params }: { params: { username: string } }) {
    // console.log('hello from user profile page')
    // console.log('params: ', params);

    const { username } = params;
    console.log('username: ', username);
    const userData = await getUserData(username);

    // console.log('userData from [username]/page.tsx: ', userData);

  //if no user, return 404 page
  if (!userData) {
    // return notFound();
    return <main>
      <h1>404 - That page does not seem to exist...</h1>
      <Link href="/public">
        <button className="btn-blue">Go home</button>
      </Link>
    </main>;
    // return {
    //   notFound: true,
    // };
  }

// console.log(userData);

const { user, posts } = userData;

return (
    <main>
        <Metatags title={user.username} description={`${user.username}'s public profile`} />
        <div>
          <UserProfile user={user} />
        </div>

        <div className="my-16">
          <h3 className="my-4">Posts by {user.username}:</h3>
          {posts.length > 0 ? (
              <GridFeed posts={posts} />
          ) : (
              <p>No posts found</p> 
          )}
        </div>
    </main>
);
}