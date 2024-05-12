import React from 'react'
import PostCard from './PostCard'

const GridFeed = ({ posts }: { posts: any[] }) => {
    // console.log('posts from GridFeed.tsx:', posts)
    return (
        <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-4">
            <PostCard posts={posts} />
        </div>
        </div>
    )
}

export default GridFeed