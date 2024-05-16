'use client';
import Link from 'next/link'
import React, { useContext } from 'react'
import AuthCheck from '@/components/(dashboard)/AuthCheck'
import HeartButton from './HeartButton'
import { UserContext } from '@/lib/context'
import { doc, getFirestore } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
                <CardContent className='flex flex-col justify-between p-6'>
                    {/* <p className="m-3">Views: {updatedPost.views}</p> */}
                    <p className="m-3 mb-0">
                        <strong>Hearts:</strong>
                    </p>
                    <p className="m-3 mt-0">
                        <strong>{updatedPost.heartCount || 0} 💖</strong>
                    </p>

                    <AuthCheck
                        fallback={
                            <Button className="m-3" variant="default" asChild>
                                <Link href="/enter">
                                    💖 Heart
                                </Link>
                            </Button>
                        }
                        >
                        <HeartButton postRef={postRef} />
                    </AuthCheck>

                    {user?.uid === updatedPost.uid && (
                    <Button className="m-3" size="lg" asChild>
                        <Link href={`/dashboard/${updatedPost.slug}`}>
                            Edit Post
                        </Link>
                        
                    </Button>
                    )}
                </CardContent>
            </Card>
        </aside>
    )
}

export default HeartCard