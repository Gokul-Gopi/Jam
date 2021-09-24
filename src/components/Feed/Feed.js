import React, { useEffect, useState } from 'react'
import '../Feed/Feed.css'
import UserPost from '../UserPost/UserPost'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, loadPosts } from '../../features/Feed/feedSlice'
import { MdSend } from 'react-icons/md'

const Feed = () => {
    const [postInput, setPostInput] = useState('')

    const { posts } = useSelector(state => state.feed)
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const submitPostHandler = () => {
        setPostInput('')
        dispatch(createPost(postInput))
    }

    useEffect(() => {
        isLoggedIn && dispatch(loadPosts())
    }, [])


    return (
        <div className='feed'>
            <div className="feed-container">
                <div className="create-post-input">
                    <input type="text" value={postInput} onChange={(e) => { setPostInput(e.target.value) }} placeholder='Whats happening?' />
                    <button onClick={() => submitPostHandler()}><MdSend /></button>
                </div>

                {posts.length === 0
                    ? (<span>No post</span>)
                    : (posts.map(post => {
                        return <UserPost key={post.id} name={post.name} postID={post.id} likes={post.likes} comments={post.comments} input={post.input} />

                    }))
                }

            </div>
        </div>
    )
}

export default Feed
