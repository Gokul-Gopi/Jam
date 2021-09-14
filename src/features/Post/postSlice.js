import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BACKEND } from "../../api";

export const getThePost = createAsyncThunk('post/getThePost', async (postID) => {
    const { data } = await axios({
        method: 'GET',
        url: `${BACKEND}/post/${postID}`,
    })
    return data;
})

const initialState = {
    loading: false,
    text: "",
    author: "",
    likes: [],
    support: [],
    comments: [],
    fetchedPosts: [],
    message: null
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getFromFetchedPosts: (state, action) => {
            const [{ text, support, likes, comments }] = state.fetchedPosts.filter(i => i._id === action.payload)
            state.text = text;
            state.support = support.length;
            state.likes = likes.length;
            state.comments = comments;
            state.loading = false;
        },
        incrementStats: (state, action) => {
            state[action.payload].push('dummy text')
        },
        addComment: (state, action) => {
            state.comments.push({ _id: Date.now(), text: action.payload });
        }
    },
    extraReducers: {
        [getThePost.pending]: (state) => {
            state.loading = true;
        },
        [getThePost.fulfilled]: (state, action) => {
            const { text, support, likes, comments, author } = action.payload.response;
            state.author = author;
            state.text = text;
            state.support = support;
            state.likes = likes;
            state.comments = comments;
            state.loading = false;
        },
        [getThePost.rejected]: (state) => {
            state.loading = false;
        },
    }
});
export const { getFromFetchedPosts, incrementStats, addComment } = postSlice.actions;
export default postSlice.reducer;