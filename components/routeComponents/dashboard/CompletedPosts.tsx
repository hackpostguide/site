import React from 'react'
import { useGetCompletedPosts, useGetInProgressPosts } from '@/components/postComponents/hooks';
import { Card, CardContent } from '@/components/ui/card';


export const CompletedPosts = async (): Promise<JSX.Element> => {
    const completedPosts = useGetCompletedPosts();
    const inProgressPosts = useGetInProgressPosts();
  
    // return (
    //   <div>
    //     <h2>
    //       Coming soon!
    //     </h2>
    //   </div> 
    // );
  
    // TODO: Fix issue with both functions always returning undefined
  
    console.log('completedPosts: ', completedPosts);  
    console.log('inProgressPosts: ', inProgressPosts);
  
    if (!completedPosts) {
      return <p>Loading...</p>;
    }
  
    return (
      <div>
        {/* <h1>In Progress Posts</h1>
        {inProgressPosts.length > 0 ? (
          inProgressPosts.map((post: any, index: number) => (
            <div key={index}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>Hearts: {post.heartCount}</p>
            </div>
          ))
        ) : (
          <p>No in progress posts found.</p>
        )} */}
  
        <h1>Completed Posts</h1>
        {(await completedPosts).posts.length > 0 ? (
          (await completedPosts).posts.map((post: any, index: number) => (
            <div key={index}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>Hearts: {post.heartCount}</p>
            </div>
          ))
        ) : (
          <p>No completed posts found.</p>
        )}
      </div>
    );
}