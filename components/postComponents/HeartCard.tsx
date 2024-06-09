'use client';
import Link from 'next/link'
import React, { useContext } from 'react'
import AuthCheck from '@/components/routeComponents/dashboard/AuthCheck'
import HeartButton from './HeartButton'
import { UserContext } from '@/lib/context'
import { doc, getFirestore } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Complete from './CompleteButton';
import CompleteButton from './CompleteButton';
import { Circle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const HeartCard = ({ post, path, onPostPage }: { post: any; path: any, onPostPage: boolean }) => {

    // console.log('HeartCard post: ', post);
    // console.log('HeartCard path: ', path);

    const postRef = path ? doc(firestore, path) : null;
    const user = auth.currentUser;

    const [realtimePost] = useDocumentData(postRef);

    const updatedPost = realtimePost || post;

    if (!updatedPost.published) {
        return null;
    }

    if(onPostPage){
        return (
            <aside className="">
                <Card className="min-w-[200px] h-[600px]">
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
                                <div>
                                    <TooltipProvider>
                                        <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button className="m-3" size="lg" variant="default" asChild>
                                                <Link href="/enter">
                                                    💖 Heart
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Sign up / Sign in to heart this post!
                                        </TooltipContent>
                                        </Tooltip>



                                        <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button className="m-3 bg-red-500 hover:bg-red-600 text-white" size="lg" variant="default" asChild>
                                                <Link href="/enter">
                                                    <Circle className="w-6 h-6 mr-2" /> Not Complete
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Sign up / Sign in to save your progress
                                        </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            }
                            >
                            <HeartButton postRef={postRef} heartCount={updatedPost.heartCount}/>
                            <CompleteButton postRef={postRef} completed={updatedPost.completed} isIcon={false}/>
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
    else {
        return (
            <div className="flex items-center justify-center">
                <AuthCheck
                    fallback={
                        <TooltipProvider>
                            <Tooltip>
                            <TooltipTrigger asChild>
                                <div className='flex items-center justify-center'>
                                    <Button className="m-3" size="lg" variant="outline" asChild>
                                        <Link href="/enter">
                                            {updatedPost.heartCount || 0} Hearted! 💖
                                        </Link>
                                    </Button>

                                    <Button className="bg-red-500 hover:bg-red-600 text-white" size="icon" variant="default" asChild>
                                        <Link href="/enter">
                                            <Circle className="w-6 h-6 mx-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                Sign up / Sign in to heart and save your progress
                            </TooltipContent>
                            </Tooltip>

                        </TooltipProvider>
                    }
                    >
                    <HeartButton postRef={postRef} heartCount={updatedPost.heartCount}/>
                    <CompleteButton postRef={postRef} completed={updatedPost.completed} isIcon={true}/>
                </AuthCheck>
            </div>
        )
    }
}

export default HeartCard