import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";


const API_ROOT = 'https://www.reddit.com';
let permalink = "/r/pics/comments/x0nz3i/oc_i_made_this_heisenberg_drawing_after_watching/";
export const commentsLoad = createAsyncThunk(
    'posts/commentLoad',
    async(permalink) => {
        const response = await fetch(`${API_ROOT}${permalink}.json`);
        const json = await response.json();
console.log(json);
        const postData = json.data.children.map((comment)=> {
            const { author, body, id, created_utc } = comment.data;
            let img = comment.data.url;
    }
    );
}
);

commentsLoad(permalink);