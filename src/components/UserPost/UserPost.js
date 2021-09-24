import React, { useState } from 'react'
import '../UserPost/UserPost.css'
import { AiOutlineLike } from 'react-icons/ai'
import { AiTwotoneLike } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { commentOnPost, likePost } from '../../features/Feed/feedSlice'

const UserPost = ({ postID, name, likes, comments, input }) => {
    const dispatch = useDispatch()
    const [commentInput, setCommentInput] = useState('')
    const [expandPostContainer, setExpandPostContainer] = useState(false)
    const { userID } = useSelector(state => state.auth)

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
                <div className="img">{name[0]}</div>
                <div className="name">{name}</div>
            </div>

            <div className='user-tweet'>
                <textarea value={input} readOnly />
            </div>

            <div className='options'>
                <div>

                    <button onClick={() => likeOnPost()}>
                        {likes.includes(userID) ? <AiTwotoneLike /> : <AiOutlineLike />}
                    </button>
                    <span>{likes.length !== 0 && likes.length}</span>
                </div>

                <div>
                    <button onClick={() => setExpandPostContainer(pre => !pre)}><BiCommentDetail /></button>
                    <span>{comments?.length !== 0 && comments?.length}</span>
                </div>
            </div>

            {expandPostContainer &&
                <div className='comments-container' style={{ display: expandPostContainer ? 'block' : 'none' }}>
                    {comments.map(comment => {
                        return (
                            <div className='all-comments' key={comment._id}>
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
