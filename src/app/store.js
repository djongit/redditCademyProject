import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import allPostsReducer from '../features/posts/postsSlice';
import subredditReducer from '../features/subreddits/subredditSlice.js';
import searchTerm from '../features/headerBar/searchSlice.js';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    allPosts: allPostsReducer,
    subreddits: subredditReducer,
    searchTerm: searchTerm,
  },
});
