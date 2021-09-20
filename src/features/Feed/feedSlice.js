import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useSelector } from "react-redux"
import { BACKEND } from '../../api'
import callToastify from "../../utils/toast"
import authSlice from "../Auth/authSlice"


export const loadPosts = createAsyncThunk("feed/loadPosts", async () => {
    const { data } = await axios({
        method: 'GET',
        url: `${BACKEND}/feed`,
    })
    console.log(data)
    return data;
})

export const createPost = createAsyncThunk("feed/createPost", async (userPost) => {
    const { data } = await axios({
        method: 'POST',
        url: `${BACKEND}/post`,
        data: { postInput: userPost },
    })

    return data;
})

export const likePost = createAsyncThunk("feed/likePost", async (postID) => {
    console.log(postID)
    const { data } = await axios({
        method: 'POST',
        url: `${BACKEND}/post/like/${postID}`,
    })
    console.log({ data })
    return data;
})

export const commentOnPost = createAsyncThunk("feed/commentOnPost", async (userPayload) => {
    const { postID, commentInput } = userPayload

    const { data } = await axios({
        method: 'POST',
        url: `${BACKEND}/comment/${postID}`,
        data: { commentInput }
    })

    return data
})

const initialState = {
    loading: false,
    postLoading: false,
    toast: null,
    posts: [],
    postMessage: null,
    success: false
}

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.posts.push(action.payload);
        },
        setMessage: (state, action) => {
            state[action.payload] = null;
        },
        incrementStatCount: (state, action) => {
            const { postId, data } = action.payload;
            state.posts.find(i => i.posts.find(j => j._id === postId && j[data].push(postId)))
        },
    },
    extraReducers: {
        [loadPosts.pending]: (state) => {
            state.loading = true;
        },
        [loadPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.posts
            state.loading = false;
        },
        [loadPosts.rejected]: (state) => {
            state.loading = false;
        },
        [createPost.pending]: (state) => {
            state.postLoading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.postLoading = false;
            state.success = true
        },
        [createPost.rejected]: (state) => {
            state.postLoading = false;
        },
        [commentOnPost.fulfilled]: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post
                }
                return post
            })
        },
        [commentOnPost.rejected]: (state, action) => {
            state.toast = callToastify('Somethings wrong please try again')
        },
        [likePost.fulfilled]: (state, action) => {

        },
        [likePost.rejected]: (state, action) => {
            // state.message = action.payload.message;
        }
    }
});

export const { addComment, setMessage, incrementStatCount } = feedSlice.actions;
export default feedSlice.reducer;