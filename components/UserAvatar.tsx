'use client';
import Link from 'next/link';
import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '.././lib/firebase'
import toast from 'react-hot-toast'
import { UserContext } from '.././lib/context';
import { useRouter } from 'next/navigation';
import { Avatar } from './ui/avatar';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const UserAvatar = () => {
  const { username } = useContext(UserContext);
  const user = auth.currentUser;
  const router = useRouter()

  return (
    <Menubar>
    <MenubarMenu>
        <MenubarTrigger>
        <Avatar>
            <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? ''} />
            <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
        </Avatar>
        </MenubarTrigger>
        <MenubarContent aria-label="Profile Actions">
            <MenubarItem key="signedInProfile" className="h-14 gap-2">
                <Link href={`/users/${username}`} color="foreground">
                    <p className="font-semibold">Signed in as {user?.email}</p>
                </Link>
            </MenubarItem>
            <MenubarItem key="profile">
                <Link href={`/users/${username}`} color="foreground">
                    <p>My Profile</p>
                </Link>
            </MenubarItem>
            <MenubarItem key="dashboard">
                <Link href="/dashboard" color="foreground">
                    <p>My Dashboard</p>
                </Link>
            </MenubarItem>
            {/* <DropdownItem key="settings">
                <Link href="/" color="foreground">
                    <p>My Settings</p>
                </Link>
            </DropdownItem> */}
            <MenubarItem key="logout" color="danger" 
                onClick={() => {
                    signOut(auth)
                    router.push('/')
                    toast.success('Signed out successfully!');
                }
            }>
                <p>Log Out</p>
            </MenubarItem>
        </MenubarContent>
    </MenubarMenu>
    </Menubar>
  )
}

export default UserAvatar