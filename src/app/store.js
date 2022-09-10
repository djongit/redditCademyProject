import { configureStore } from '@reduxjs/toolkit';

import allPostsReducer from '../features/posts/postsSlice';
import subredditReducer from '../features/subreddits/subredditSlice.js';
import searchTerm from '../features/headerBar/searchSlice.js';
export const store = configureStore({
  reducer: {
    
    allPosts: allPostsReducer,
    subreddits: subredditReducer,
    searchTerm: searchTerm,
  },
});
