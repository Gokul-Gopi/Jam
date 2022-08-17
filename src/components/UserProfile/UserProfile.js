import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getUserDetails,
  getUsersPosts,
} from "../../features/Profile/profileSlice";
import "../UserProfile/UserProfile.css";
import UserPost from "../UserPost/UserPost";
import { BiExit } from "react-icons/bi";
import { logout } from "../../features/Auth/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profileData, userPosts, profileLoading } = useSelector(
    (state) => state.profile
  );
  console.log({ profileLoading, userPosts });
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getUsersPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (profileLoading || Object.keys(profileData).length < 1) {
    return (
      <div className="loading">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="user-profile-container">
        <div className="user-name">
          <div className="img"> {profileData?.userName[0].toUpperCase()}</div>
          <div className="name"> {profileData?.userName}</div>
          <button className="logout-btn" onClick={() => logoutHandler()}>
            <BiExit />
          </button>
        </div>

        <div className="user-bio">{profileData?.bio}</div>
      </div>

      {userPosts?.length > 0 && (
        <div className="user-allposts">
          <h2>My posts</h2>
          {userPosts
            .map((post) => {
              return (
                <UserPost
                  key={post?._id}
                  postID={post?._id}
                  name={profileData?.userName}
                  likes={post?.likes}
                  comments={post?.comments}
                  input={post?.text}
                />
              );
            })
            .reverse()}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
