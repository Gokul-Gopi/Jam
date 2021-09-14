import React, { useState } from 'react'
import '../UserPost/UserPost.css'
import { BiLike } from 'react-icons/bi'
import { BiCommentDetail } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { commentOnPost, likePost } from '../../features/Feed/feedSlice'

const UserPost = ({ input, postID, likes, comments }) => {

    const dispatch = useDispatch()
    const [commentInput, setCommentInput] = useState('')
    const [expandPostContainer, setExpandPostContainer] = useState(false)


    const likeOnPost = () => {
        dispatch(likePost(postID))
    }

    const postComment = () => {
        if (commentInput.length !== 0) {
            dispatch(commentOnPost({ postID, commentInput }))
            setCommentInput('')
        }
    }

    return (
        <div className='user-post'>
            <div className='user-info'>
                <div className="img">G</div>
                <div className="name">Gokul</div>
            </div>

            <div className='user-tweet'>
                <textarea value={input} readOnly />
            </div>

            <div className='options'>
                <div>
                    <button onClick={() => likeOnPost()}><BiLike /></button>
                    <span>{likes !== 0 && likes}</span>
                </div>

                <div>
                    <button onClick={() => setExpandPostContainer(pre => !pre)}><BiCommentDetail /></button>
                    <span>{comments.length !== 0 && comments.length}</span>
                </div>
            </div>

            {expandPostContainer &&
                <div className='comments-container'>
                    {comments.map(comment => {
                        return (
                            <div className='all-comments'>
                                <span className='user-name'>G</span>
                                <span className='user-comment'>{comment.comment}</span>
                            </div>
                        )
                    })}

                    <div className='comment-input'>
                        <input type="text" placeholder='Comment here' value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
                        <button disabled={commentInput.length === 0 && 'disabled'} onClick={() => postComment()}>Post</button>
                    </div>
                </div>
            }

        </div>
    )
}

export default UserPost
