import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUserDetails } from '../../features/Profile/profileSlice'
import '../UserProfile/UserProfile.css'
import UserPost from '../UserPost/UserPost'
import { BiExit } from 'react-icons/bi'
import { logout } from '../../features/Auth/authSlice'

const UserProfile = () => {
    const dispatch = useDispatch()
    const { userDetails, userPosts } = useSelector(state => state.profile)

    const logoutHandler = () => {
        dispatch(logout())
    }

    useEffect(() => {
        dispatch(getUserDetails())
    }, [])

    return (
        <div className='user-profile'>
            <div className="user-profile-container">
                <div className='user-name'>
                    <div className='img'> {userDetails?.name[0]}</div>
                    <div className='name'> {userDetails?.name}</div>
                    <button className='logout-btn' onClick={() => logoutHandler()}><BiExit /></button>
                </div>

                <div className='user-bio'>
                    {userDetails?.bio}
                </div>
            </div>

            {userPosts.length !== 0 &&
                <div className="user-allposts">
                    <h2>My posts</h2>
                    {userPosts.map(post => {
                        return <UserPost key={post._id} postID={post._id} name={userDetails.name} likes={post.likes} comments={post.comments} input={post.text} />
                    }).reverse()}
                </div>
            }
        </div>
    )
}

export default UserProfile
