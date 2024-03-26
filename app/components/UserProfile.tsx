import Img from 'next/image';

export default function UserProfile({ user }: { user: any }) {
    console.log('user from UserProfile', user);
  return (
    <div className="box-center">
        {/* Add alternate src for photoURL later */}
      <Img alt="${user.displayName}'s profile picture" src={user.photoURL} width={150} height={150} className="card-img-center" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
      <h2>About Me:</h2>
      <p>{user.bio}</p>
      {/* <p>User Profile</p> */}
    </div>
  );
}