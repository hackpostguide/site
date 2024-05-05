'use client';
import Link from 'next/link'
import React, { useContext } from 'react'
import AuthCheck from '@/app/components/(dashboard)/AuthCheck'
import HeartButton from './HeartButton'
import { UserContext } from '@/app/lib/context'
import { doc, getFirestore } from 'firebase/firestore';
import { auth, firestore } from '@/app/lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Button, Card, CardBody } from '@nextui-org/react';

const HeartCard = ({ post, path }: { post: any; path: any }) => {

    const postRef = path ? doc(firestore, path) : null;
    const user = auth.currentUser;

    const [realtimePost] = useDocumentData(postRef);

    const updatedPost = realtimePost || post;

    if (!updatedPost.published) {
        return null;
    }

    return (
        <aside className="">
            <Card className="w-[200px] h-[600px]">
                <CardBody>
                    {/* <p className="m-3">Views: {updatedPost.views}</p> */}
                    <p className="m-3 mb-0">
                        <strong>Hearts:</strong>
                    </p>
                    <p className="m-3 mt-0">
                        <strong>{updatedPost.heartCount || 0} 💖</strong>
                    </p>

                    <AuthCheck
                        fallback={
                            <Button className="m-3" color="secondary" variant="bordered" as={Link} href="/enter">
                                💖 Heart
                            </Button>
                        }
                        >
                        <HeartButton postRef={postRef} />
                    </AuthCheck>

                    {user?.uid === updatedPost.uid && (
                    <Button className="m-3" as={Link} color="primary" href={`/dashboard/${updatedPost.slug}`}>
                        Edit Post
                    </Button>
                    )}
                </CardBody>
            </Card>
        </aside>
    )
}

export default HeartCard