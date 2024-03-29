'use client';
import Link from 'next/link';
import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../lib/firebase'
import toast from 'react-hot-toast'
import { UserContext } from '../lib/context';

const UserAvatar = () => {
  const { user, username } = useContext(UserContext);

  return (
    <Dropdown placement="bottom-end">
        <DropdownTrigger>
        <Avatar
            showFallback // Show fallback avatar if src is not provided
            isBordered
            as="button"
            className="hidden sm:flex transition-transform"
            color="primary"
            name={user?.displayName ?? ''}
            size="sm"
            src={user?.photoURL ?? ''}
        />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="signedInProfile" className="h-14 gap-2">
                <Link href={`/users/${username}`} color="foreground">
                    <p className="font-semibold">Signed in as {user?.email}</p>
                </Link>
            </DropdownItem>
            <DropdownItem key="profile">
                <Link href={`/users/${username}`} color="foreground">
                    <p>My Profile</p>
                </Link>
            </DropdownItem>
            <DropdownItem key="dashboard">
                <Link href="/dashboard" color="foreground">
                    <p>My Dashboard</p>
                </Link>
            </DropdownItem>
            <DropdownItem key="settings">
                <Link href="/" color="foreground">
                    <p>My Settings</p>
                </Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" 
                onClick={() => {
                    signOut(auth)
                    toast.success('Signed out successfully!');
                }
            }>
            Log Out
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}

export default UserAvatar