'use client';
import Link from 'next/link'
import React, { useContext } from 'react'
import AuthCheck from '@/app/components/(dashboard)/AuthCheck'
import HeartButton from './HeartButton'
import { UserContext } from '@/app/lib/context'
import { doc, getFirestore } from 'firebase/firestore';
import { firestore } from '@/app/lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

const HeartCard = ({ post, path }: { post: any; path: any }) => {

    const postRef = path ? doc(firestore, path) : null;
    const { user: currentUser } = useContext(UserContext);

    const [realtimePost] = useDocumentData(postRef);

    const updatedPost = realtimePost || post;

    return (
        <aside className="card">
            <p>Views: {updatedPost.views}</p>
            <p>
                <strong>{updatedPost.heartCount || 0} 🤍</strong>
            </p>

            <AuthCheck
            fallback={
                <Link passHref href="/enter">
                <button>💗 Sign Up</button>
                </Link>
            }
            >
            <HeartButton postRef={postRef} />
            </AuthCheck>

            {currentUser?.uid === updatedPost.uid && (
            <Link passHref href={`/admin/${updatedPost.slug}`}>
                <button className="btn-blue">Edit Post</button>
            </Link>
            )}
        </aside>
    )
}

export default HeartCard