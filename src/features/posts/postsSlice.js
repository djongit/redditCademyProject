// import allPostsData from "../../data/data"; 
 import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';



// export const loadData = () => {
//     return {
//       type: 'posts/loadPosts',
//       payload: allPostsData
//     }
//   }
  
//   const initialState = [];
//   const allPostsReducer = (allPostA = initialState, action) => {
//     switch (action.type) {
//       case 'posts/loadPosts':
//         return action.payload;
//         default:
//             return allPostA;

//     }
// }

// export const selectAllPosts = (state) => state.allPosts;

// export default allPostsReducer;
const API_ROOT = 'https://www.reddit.com';

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async(subreddit) => {
    const response = await fetch(`${API_ROOT}${subreddit}.json`);
    const json = await response.json();
   console.log(json);
    const postData = json.data.children.map((post)=> {
      const { subreddit_name_prefixed, author, num_comments, title, id, ups, created_utc, permalink } = post.data;
      let img = post.data.url;
      return {
        author,
        subreddit: subreddit_name_prefixed,
        title: title,
        num_comments,
        image: img,
        id,
        ups,
        created_utc,
        permalink
      }
    })

    return postData;
  }
);
 


const initialSatate = {
  posts: [],
  hasError: false,
  isLoading: false,
  searchTerm: '',
  selectedSubreddit: '/r/pics/'

}

export const postsSlice = createSlice({
    name: 'posts',
    initialState: initialSatate,
    reducers: {
        // loadPosts: (state, action) => {
        //  return [...state, action.payload]
        // }
        clearSearchTerm: (state, action) => {
          state.searchTerm = '';
        },
        setSearchTerm: (state, action) => {
          state.searchTerm = action.payload;
        },
        setSubreddit:(state, action) => {
         
            state.selectedSubreddit = action.payload;
         
        }
    },
    extraReducers: {
      [loadPosts.pending]: (state, action) =>{
        state.isLoading = true;
        state.hasError = false;
      },
      [loadPosts.fulfilled]: (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
        state.hasError = false;
      },
      [loadPosts.rejected]: (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      }
    }
});



// export fetchPosts = (subreddit) => async(dispatch) => {
//   try {
//     dispatch(s)
//   }
// }






export const selectSearchTerm = (state) => state.allPosts.searchTerm;
export const selectAllPosts = (state) => state.allPosts.posts;
export const { setSubreddit, setSearchTerm, clearSearchTerm } = postsSlice.actions;
export default postsSlice.reducer;

export const postsToRender = createSelector([selectAllPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if(searchTerm !== '')  {
      return posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    } 
    return posts;
  }
);