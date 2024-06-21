import { getMetadata } from "@/components/misc/Metatags";
import UserProfile from "@/components/misc/UserProfile";
import GridFeed from "@/components/postComponents/GridFeed";
import { getUserData } from "@/components/postComponents/hooks";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(
  { params }: { params: { username: any } },
): Promise<Metadata> {
  const { username } = params;
  const userData = await getUserData(username);

  //if no user, return 404 page
  if (!userData) {
    notFound()
  }

  const { user, posts } = userData;
 
  return getMetadata({
    title: `${user.displayName} (@${user.username})`,
    description: `${user.displayName}'s Hackpost Guide profile`,
  });
}

export default async function UserProfilePage({ params }: { params: { username: any } }) {
    // console.log('hello from user profile page')
    // console.log('params: ', params);

    const { username } = params;
    // console.log('username: ', username);
    const userData = await getUserData(username);

    // console.log('userData from [username]/page.tsx: ', userData);

  //if no user, return 404 page
  if (!userData) {
    notFound()
    // return (
    //   <div>
    //     <h3>404 - Page Not Found</h3>
    //     <p className="mb-4">Could not find requested resource</p>
    //     <Link href="/">
    //       <p>Go back home</p>
    //     </Link>
    //   </div>
    // )
    // return {
    //   notFound: true,
    // };
  }

// console.log('userData from users/[username]/page.tsx:', userData);

const { user, posts } = userData;

return (
    <main>
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