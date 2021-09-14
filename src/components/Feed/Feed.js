import React, { useEffect, useState } from 'react'
import '../Feed/Feed.css'
import UserPost from '../UserPost/UserPost'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, loadPosts } from '../../features/Feed/feedSlice'
import axios from 'axios'

const Feed = () => {
    const [postInput, setPostInput] = useState('')

    const { success, posts } = useSelector(state => state.feed)
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const submitPostHandler = () => {
        dispatch(createPost(postInput))
        success && setPostInput('')
    }

    useEffect(() => {
        isLoggedIn && dispatch(loadPosts())
    }, [])


    return (
        <div className='feed'>
            <div className="feed-container">
                <div className="create-post-input">
                    <input type="text" value={postInput} onChange={(e) => { setPostInput(e.target.value) }} />
                    <button onClick={() => submitPostHandler()}>Post</button>
                </div>
                {posts.map(post => {
                    return <UserPost input={post.text} postID={post._id} key={post._id} likes={post.likes.length} comments={post.comments} />
                })}

            </div>
        </div>
    )
}

export default Feed
