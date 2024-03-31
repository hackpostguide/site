import React from 'react'
import PostCard from './PostCard'

const GridFeed = ({posts}: {posts: any[]}) => {
    return (
        // the prop drilling is not ideal - fix later?
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-4">
                <PostCard posts={posts} />
        </div>
    )
}

export default GridFeed