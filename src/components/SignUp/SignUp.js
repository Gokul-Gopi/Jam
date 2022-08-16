import React, { useEffect, useState } from "react";
import "../SignUp/SignUp.css";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BiQuestionMark } from "react-icons/bi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdGlasses } from "react-icons/io";
import { Link } from "react-router-dom";
import { signUpUser } from "../../features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.auth);
  const [showPwd, setShowPwd] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    userName: "",
    email: "",
    pwd: "",
    confirmPwd: "",
  });
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    bio: "",
    email: "",
    pwd: "",
    confirmPwd: "",
  });

  useEffect(() => {
    success && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const validateForm = () => {
    let validator = true;
    const { firstName, email, pwd, confirmPwd } = userDetails;

    const eMailValidator = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const pwdValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (firstName.length === 0) {
      setFormErrors((preValue) => ({
        ...preValue,
        firstName: "*Firstname cannot be empty",
      }));
      validator = false;
    } else {
      setFormErrors((preValue) => ({ ...preValue, firstName: "" }));
    }

    if (!eMailValidator.test(email)) {
      setFormErrors((preValue) => ({ ...preValue, email: "*Invalid e-Mail" }));
      validator = false;
    } else {
      setFormErrors((preValue) => ({ ...preValue, email: "" }));
    }

    if (!pwdValidator.test(pwd)) {
      setFormErrors((preValue) => ({
        ...preValue,
        pwd: "*Minimum 8 characters long and must contain a number",
      }));
      validator = false;
    } else {
      setFormErrors((preValue) => ({ ...preValue, pwd: "" }));
    }

    if (pwd !== confirmPwd) {
      setFormErrors((preValue) => ({
        ...preValue,
        confirmPwd: "*Passwords does not match",
      }));
      validator = false;
    } else {
      setFormErrors((preValue) => ({ ...preValue, confirmPwd: "" }));
    }

    return validator;
  };

  const signupHandler = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(signUpUser(userDetails));
    }
  };

  return (
    <div className="authForm">
      <div className="auth-form-container">
        <form>
          <span className="error">{formErrors.firstName}</span>
          <div className="input-box">
            <BiUserCircle className="icon" />
            <input
              type="text"
              placeholder="Firstname"
              value={userDetails.firstName}
              onChange={(e) =>
                setUserDetails((pre) => ({ ...pre, firstName: e.target.value }))
              }
            />
          </div>

          <div className="input-box">
            <BiUserCircle className="icon" />
            <input
              type="text"
              placeholder="Lastname"
              value={userDetails.lastName}
              onChange={(e) =>
                setUserDetails((pre) => ({ ...pre, lastName: e.target.value }))
              }
            />
          </div>

          <span className="error">{formErrors.userName}</span>
          <div className="input-box">
            <IoMdGlasses className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={userDetails.userName}
              onChange={(e) =>
                setUserDetails((pre) => ({ ...pre, userName: e.target.value }))
              }
            />
          </div>

          <span className="error">{formErrors.email}</span>
          <div className="input-box">
            <HiOutlineMail className="icon" />
            <input
              type="text"
              placeholder="e-mail"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails((pre) => ({ ...pre, email: e.target.value }))
              }
            />
          </div>

          <div className="input-box">
            <BiMessageRoundedDetail className="icon" />
            <input
              type="text"
              placeholder="Bio"
              value={userDetails.bio}
              onChange={(e) =>
                setUserDetails((pre) => ({ ...pre, bio: e.target.value }))
              }
            />
            <BiQuestionMark />
          </div>

          <span className="error">{formErrors.pwd}</span>
          <div className="input-box">
            <RiLockPasswordLine className="icon" />
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              value={userDetails.pwd}
              onChange={(e) =>
                setUserDetails((pre) => ({ ...pre, pwd: e.target.value }))
              }
            />
            {showPwd ? (
              <AiOutlineEye
                className="icon show-pwd-icon"
                onMouseUp={() => setShowPwd(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="icon show-pwd-icon"
                onMouseDown={() => setShowPwd(true)}
              />
            )}
          </div>

          <span className="error">{formErrors.confirmPwd}</span>
          <div className="input-box">
            <RiLockPasswordLine className="icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={userDetails.confirmPwd}
              onChange={(e) =>
                setUserDetails((pre) => ({
                  ...pre,
                  confirmPwd: e.target.value,
                }))
              }
            />
          </div>

          <div className="form-btns">
            <button className="form-btn" onClick={(e) => signupHandler(e)}>
              Sign Up
            </button>
            <span>
              Already have an account?{" "}
              <Link to="/login">
                <button className="route-to-signup">Login</button>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
