import React from 'react'
import '../PeopleCard/PeopleCard.css'
import { BiUserCircle } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { followUser, setFollowedUsers } from '../../features/Explore/exploreSlice'
import { useSelector } from 'react-redux'

const PeopleCard = ({ username, userbio, userID }) => {
    const dispatch = useDispatch()
    const { usersFollowed } = useSelector(state => state.explore)
    // console.log(usersFollowed)

    const followUserHandler = () => {
        dispatch(followUser({ userToFollow: userID }))
        // dispatch(setFollowedUsers(userID))
    }

    return (
        <div className='people-card'>
            <div className='user-img'>
                <BiUserCircle className='icon' />
            </div>
            <div className="user-info">
                <span className='username'>{username}</span>
                <span className='userbio'>{userbio}</span>
            </div>
            <div className='user-follow'>
                <button onClick={() => followUserHandler()}> Follow</button>
            </div>
        </div>
    )
}

export default PeopleCard
