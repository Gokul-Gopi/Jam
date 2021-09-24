import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../features/Explore/exploreSlice'
import '../Explore/Explore.css'
import PeopleCard from '../PeopleCard/PeopleCard'
import { BiSearchAlt } from 'react-icons/bi'

const Explore = () => {

    const dispatch = useDispatch()
    const { users, usersFollowed } = useSelector(state => state.explore)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const searchUsers = (input) => {
        // const filterUsers = users.filter(user => {  

        // })
    }

    return (
        <div className='explore'>
            <div className="explore-container">
                <div className="search-user-input">
                    <input type="text" onChange={(e) => { searchUsers(e.target.value) }} placeholder='Search users' />
                    <button><BiSearchAlt /></button>
                </div>

                <div className='user-list-grid'>
                    {users.map(e => {
                        return <PeopleCard key={e._id} username={e.name} userbio={e.bio} userID={e._id} following={e.following} />
                    })}
                </div>

            </div>
        </div>
    )
}

export default Explore
