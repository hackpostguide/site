import { Card, Avatar, CardBody } from '@nextui-org/react';
import Img from 'next/image';

export default function UserProfile({ user }: { user: any }) {
  return (
    <div>
      <div className= "flex justify-center items-center">
        <Card className="px-10 md:px-20 py-8 rounded-lg shadow-lg flex flex-col items-center">
          <CardBody>
            <Avatar
              showFallback // Show fallback avatar if src is not provided
              color="primary"
              // name={user?.displayName ?? ''}
              // size=""
              src={user?.photoURL ?? ''}
              className="w-40 h-40 mb-4"
            />
            <p className="mb-2 text-default-600 text-xl">
              <i>@{user.username}</i>
            </p>
            <h1 className="text-default-foreground mb-2 text-2xl">{user.displayName}</h1>
            {/* <h2 className="text-default-600 mb-1 text-lg">About Me:</h2> */}
            {/* <p className="text-default-600 text-lg">{user.bio}</p> */}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}