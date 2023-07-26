import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from './commentsSlice';
import postsReducer from './postsSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});