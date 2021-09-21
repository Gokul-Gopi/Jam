import React from 'react'
import '../PeopleCard/PeopleCard.css'
import { useDispatch } from 'react-redux'
import { followUser } from '../../features/Explore/exploreSlice'

const PeopleCard = ({ username, userbio, userID, following }) => {
    const dispatch = useDispatch()

    const followUserHandler = () => {
        dispatch(followUser({ userToFollow: userID }))
    }

    return (
        <div className='people-card'>
            <div className='user-img'>
                <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" />
            </div>
            <div className="user-info">
                <span className='username'>{username}</span>
                <span className='userbio'>{userbio}</span>
            </div>
            <div className='user-follow'>
                {following
                    ? <button onClick={() => followUserHandler()}>Unfollow</button>
                    : <button onClick={() => followUserHandler()}>Follow</button>
                }
            </div>
        </div>
    )
}

export default PeopleCard
