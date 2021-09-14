import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUserDetails, getUsersPosts } from '../../features/Profile/profileSlice'
import '../UserProfile/UserProfile.css'
import UserPost from '../UserPost/UserPost'
const UserProfile = () => {

    const dispatch = useDispatch()
    const { userDetails, userPosts } = useSelector(state => state.profile)
    console.log({ userDetails, userPosts })


    useEffect(() => {
        dispatch(getUserDetails())
        dispatch(getUsersPosts())
        console.log('ran')
    }, [])

    return (
        <div className='user-profile'>
            <div className="user-profile-container">
                <div className='user-name'>
                    <div className='img'> {userDetails?.userName[0]}</div>
                    <div className='name'> {userDetails?.userName}</div>
                </div>

                <div className='user-bio'>
                    {userDetails?.bio}
                </div>
            </div>

            <div className="user-allposts">
                {userPosts.map(post => {
                    return <UserPost key={post._id} input={post.text} likes={post.likes.length} comments={post.comments} />
                })}
            </div>
        </div>
    )
}

export default UserProfile
