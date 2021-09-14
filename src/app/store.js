import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice'
import feedReducer from '../features/Feed/feedSlice'
import nortificationReducer from '../features/Nortification/nortificationSlice'
import exploreReducer from '../features/Explore/exploreSlice'
import profileReducer from '../features/Profile/profileSlice'
import postReducer from '../features/Post/postSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    nortification: nortificationReducer,
    explore: exploreReducer,
    post: postReducer,
    profile: profileReducer
  },
});
