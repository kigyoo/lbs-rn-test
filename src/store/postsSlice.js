import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosService from "./axiosService";

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async () => {
        const response = await axiosService.get('/posts');
        const data = await response.data;
        return data;
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (params) => {
        const response = await axiosService.post('/posts', { params })
        const data = await response.data;
        return data;
    }
);

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (params) => {
        const response = await axiosService.put(`/posts/${params.id}`, { params })
        const data = await response.data;
        return data;
    }
);

const initialState = {
    list: {
        items: [],
        isLoading: false,
        hasError: false
    },
    post: {
        savedId: null,
        isLoading: false,
        hasError: false
    }
};

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        resetPost(state) {
            Object.assign(state.post, initialState.post)
        }
    },
    extraReducers(builder) {
        builder.addCase(getPosts.pending, (state, action) => {
            state.list.isLoading = true;
            state.list.hasError = false;
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.list.items = action.payload;
            state.list.isLoading = false;
            state.list.hasError = false;
        })
        builder.addCase(getPosts.rejected, (state, action) => {
            console.warn(`${action.type}:`, action?.error?.message);
            state.list.isLoading = false;
            state.list.hasError = true;
        })
        builder.addCase(createPost.pending, (state, action) => {
            state.post.isLoading = true;
            state.post.hasError = false;
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.post.savedId = action.payload.id;
            state.post.isLoading = false;
            state.post.hasError = false;
        })
        builder.addCase(createPost.rejected, (state, action) => {
            console.warn(`${action.type}:`, action?.error?.message);
            state.post.isLoading = false;
            state.post.hasError = true;
        })
        builder.addCase(updatePost.pending, (state, action) => {
            state.post.isLoading = true;
            state.post.hasError = false;
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.post.savedId = action.payload.id;
            state.post.isLoading = false;
            state.post.hasError = false;
        })
        builder.addCase(updatePost.rejected, (state, action) => {
            console.warn(`${action.type}:`, action?.error?.message);
            state.post.isLoading = false;
            state.post.hasError = true;
        })
    }
});

export const { resetPost } = postsSlice.actions;

export default postsSlice.reducer;