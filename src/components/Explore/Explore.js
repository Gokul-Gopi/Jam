import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../features/Explore/exploreSlice'
import '../Explore/Explore.css'
import PeopleCard from '../PeopleCard/PeopleCard'

const Explore = () => {

    const dispatch = useDispatch()
    const { users } = useSelector(state => state.explore)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <div className='explore'>
            <div className="explore-container">
                <div className="search-user-input">
                    <input type="text" />
                    <button>Search</button>
                </div>

                <div className='user-list-grid'>
                    {users.map(e => {
                        return <PeopleCard key={e._id} username={e.userName} userbio={e.bio} userID={e._id} />
                    })}
                </div>

            </div>
        </div>
    )
}

export default Explore
