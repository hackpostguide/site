'use client';
import Link from 'next/link';
import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../../lib/firebase'
import toast from 'react-hot-toast'
import { UserContext } from '../../lib/context';
import { useRouter } from 'next/navigation';
import { Avatar } from '../ui/avatar';

import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '../ui/dropdown-menu';

const UserAvatar = () => {
  const { username } = useContext(UserContext);
  const user = auth.currentUser;
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
            <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? ''} />
            <AvatarFallback className='bg-foreground'>{user?.displayName?.substring(0, 2)}</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent aria-label="Profile Actions">
            <DropdownMenuLabel key="signedInProfile" className="gap-2 font-semibold">
                Signed in as {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem key="profile">
                <Link href={`/users/${username}`} color="foreground">
                    My Profile
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem key="dashboard">
                <Link href="/dashboard" color="foreground">
                    My Dashboard
                </Link>
            </DropdownMenuItem>
            {/* <DropdownItem key="settings">
                <Link href="/" color="foreground">
                    <p>My Settings</p>
                </Link>
            </DropdownItem> */}
            <DropdownMenuItem key="logout" className="text-danger focus:text-danger-hover"
                onClick={() => {
                    signOut(auth)
                    router.push('/')
                    toast.success('Signed out successfully!');
                }
            }>
                Log Out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAvatar