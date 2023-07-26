import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosService from "./axiosService";

export const getComments = createAsyncThunk(
    'comments/getComments',
    async (params) => {
        const response = await axiosService.get(`/posts/${params.postId}/comments`);
        const data = await response.data;
        return data;
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getComments.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
        builder.addCase(getComments.rejected, (state, action) => {
            console.warn(`${action.type}:`, action?.error?.message);
            state.isLoading = false;
            state.hasError = true;
        })
    }
});

export default commentsSlice.reducer;