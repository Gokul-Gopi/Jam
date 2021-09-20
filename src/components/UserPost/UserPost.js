import React, { useEffect, useState } from 'react'
import '../UserPost/UserPost.css'
import { BiLike } from 'react-icons/bi'
import { BiCommentDetail } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { commentOnPost, likePost } from '../../features/Feed/feedSlice'

const UserPost = ({ name, data }) => {
    const dispatch = useDispatch()
    const [commentInput, setCommentInput] = useState('')
    const [expandPostContainer, setExpandPostContainer] = useState(false)
    const { likes, comments, text, _id } = data
    const likeOnPost = () => {
        dispatch(likePost(_id))
    }
    console.log({ likes })

    const postComment = () => {
        if (commentInput.length !== 0) {
            dispatch(commentOnPost({ _id, commentInput }))
            setCommentInput('')
        }
    }

    return (
        <div className='user-post'>
            <div className='user-info'>
                <div className="img">{!name ? "" : name[0]}</div>
                <div className="name">{name}</div>
            </div>

            <div className='user-tweet'>
                <textarea value={text} readOnly />
            </div>

            <div className='options'>
                <div>
                    <button onClick={() => likeOnPost()}><BiLike /></button>
                    <span>{likes.length !== 0 && likes.length}</span>
                </div>

                <div>
                    <button onClick={() => setExpandPostContainer(pre => !pre)}><BiCommentDetail /></button>
                    <span>{comments?.length !== 0 && comments?.length}</span>
                </div>
            </div>

            {expandPostContainer &&
                <div className='comments-container'>
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
