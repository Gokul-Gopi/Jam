import React, { useState, useEffect } from 'react'
import '../Login/Login.css'
import { BiUserCircle } from 'react-icons/bi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { loginUser, setToast } from '../../features/Auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import callToastify from '../../utils/toast'

const Login = () => {
    const { success } = useSelector(state => state.auth)
    const [showPwd, setShowPwd] = useState(false)
    const [userDetails, setUserDetails] = useState({
        userName: '',
        password: ''
    })
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        success && callToastify('Please log in to your account')
    }, [success])

    const loginHandler = (event) => {
        event.preventDefault()
        dispatch(loginUser(userDetails))
        if (isLoggedIn) {
            navigate('/')
        }
    }


    return (
        <div className='authForm'>
            <div className="auth-form-container">
                <form>
                    <div className='input-box'>
                        <BiUserCircle className='icon' />
                        <input type="text" placeholder='Username' value={userDetails.userName} onChange={(e) => setUserDetails(preValue => ({ ...preValue, userName: e.target.value }))} />
                    </div>

                    <div className='input-box'>
                        <RiLockPasswordLine className='icon' />
                        <input type={showPwd ? 'text' : 'password'} placeholder='Password' value={userDetails.password} onChange={(e) => setUserDetails(preValue => ({ ...preValue, password: e.target.value }))} />
                        {showPwd
                            ? <AiOutlineEye className='icon show-pwd-icon' onMouseUp={() => setShowPwd(false)} />
                            : <AiOutlineEyeInvisible className='icon show-pwd-icon' onMouseDown={() => setShowPwd(true)} />
                        }
                    </div>

                    <div className='form-btns'>
                        <button className='form-btn' onClick={(e) => loginHandler(e)}>Login</button>
                        <span>Don't have an account? <Link to='/signup'><button className='route-to-signup'>Sign Up</button></Link></span>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
