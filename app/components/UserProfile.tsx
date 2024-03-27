import { Avatar } from '@nextui-org/react';
import Img from 'next/image';

export default function UserProfile({ user }: { user: any }) {
  return (
    <div>
      <div className= "flex justify-center items-center">
        <div
          className="p-8 rounded-lg shadow-lg flex flex-col items-center w-1/3"
        >
          <Avatar
            showFallback // Show fallback avatar if src is not provided
            color="primary"
            name={user?.displayName ?? ''}
            // size=""
            src={user?.photoURL ?? ''}
            className="w-40 h-40 mb-4"
          />
          <p className="mb-2 text-default-600 text-xl">
            <i>@{user.username}</i>
          </p>
          <h1 className="text-default-foreground mb-2 text-2xl">{user.displayName}</h1>
          <h2 className="text-gray-400 mb-4">About Me:</h2>
          <p className="text-gray-300">{user.bio}</p>
        </div>
      </div>
    </div>
  );
}