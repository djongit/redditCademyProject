import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const API_ROOT = 'https://www.reddit.com/subreddits.json';

const initialState = {
    subreddits: [],
    hasError: false,
    isLoading: false,

};
export const loadSubreddits = createAsyncThunk(
    'subreddits/loadSubreddits',
    async () => {
        const response = await fetch(API_ROOT);
        const json = await response.json();
        // console.log(json);
        const redditData = json.data.children.map((subreddit)=> {
                const { display_name,
                    url,                   
                    id,
                    icon_img,

                 } = subreddit.data;
                return {
                    url,
                    title: display_name,
                    id,
                    image: icon_img,
                }
            
        });
       return redditData;
    }
);


const subredditSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {},
    extraReducers: {
        [loadSubreddits.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadSubreddits.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = action.error.message;
        },
        [loadSubreddits.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.subreddits = action.payload;
        }
    }
});

export const selectSubreddits = (state) => state.subreddits.subreddits;
export default subredditSlice.reducer;
