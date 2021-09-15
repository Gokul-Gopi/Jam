import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUserDetails, getUsersPosts } from '../../features/Profile/profileSlice'
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
        dispatch(getUsersPosts())
    }, [])

    return (
        <div className='user-profile'>
            <div className="user-profile-container">
                <div className='user-name'>
                    <div className='img'> {userDetails?.userName[0]}</div>
                    <div className='name'> {userDetails?.userName}</div>
                    <button className='logout-btn' onClick={() => logoutHandler()}><BiExit /></button>
                </div>

                <div className='user-bio'>
                    {userDetails?.bio}
                </div>
            </div>

            <div className="user-allposts">
                <h2>My posts</h2>
                {userPosts.map((post, index) => {
                    return <UserPost key={index} data={post} name={userDetails?.userName} />
                })}
            </div>
        </div>
    )
}

export default UserProfile
