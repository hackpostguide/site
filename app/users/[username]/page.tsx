import UserProfile from "@/app/components/UserProfile";
import PostFeed from "@/app/components/PostFeed";
import { getUserData } from "./getUserData";
import Link from "next/link";

export default async function UserProfilePage({ params }: { params: { username: string } }) {
//   const { username } = params;
//   const userData = await getUserData(username);

//   //if no user, return 404 page
//   if (!userData) {
//     return <main>
//       <h1>404 - That page does not seem to exist...</h1>
//       <Link href="/">
//         <button className="btn-blue">Go home</button>
//       </Link>
//     </main>;
//     // return {
//     //   notFound: true,
//     // };
//   }

//   const { user, posts } = userData;

  return (
    <main>
      {/* <Metatags title={user.username} description={`${user.username}'s public profile`} /> */}
      {/* <UserProfile user={user} /> */}
      {/* <PostFeed posts={posts} /> */}
      <p>User Profile page</p>
    </main>
  );
}