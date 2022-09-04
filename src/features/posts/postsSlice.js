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
  //  console.log(json);
    const postData = json.data.children.map((post, index)=> {
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
        permalink,
        comments: [],
        isLoadingComments: false,
        hasErrorComments: false,
        displayComments: false
     
        
        
        

      }
    })

    return postData;
  }
);

 // this will load comments after use presses comments button
export const commentsLoad = (i, permalink) => {
  return async (dispatch) => {
    dispatch(commentsLoadPending(i));
    try {
      const response = await fetch(`${API_ROOT}${permalink}.json`);
      const json = await response.json();
      const commentData = json[1].data.children.map((comment) => {
        const { author, body, id, created_utc } = comment.data;
        return {
          author,
          body,
          id,
          created_utc
        }
      });
      return dispatch(commentsLoadFulfilled({i, commentData}));
    } catch {
      dispatch(commentsLoadRejected(i));
    }
  }
}
 // --->>>AsyncThunk does not work. Could not pass parameter of the required post.

// export const commentsLoad = createAsyncThunk(
//   'posts/commentsLoad',
//   async({permalink, i}, {state, dispatch}) => { 
//     // console.log(permalink) ;
//       const response = await fetch(`${API_ROOT}${permalink}.json`);
//       const json = await response.json();
// // console.log(json);
//       const commentData = json[1].data.children.map((comment, ind) => {
//           const { author, body, id, created_utc} = comment.data;
          
//                 return  { 
                
//                         i: i,
//                         author,
//                         body,
//                         id,
//                         created_utc 
//                   }
                                       
//           }
           
//        );
// // return console.log(commentData) ;
// return commentData;  
// }
// );


const initialSatate = {
  posts: [],
  hasError: false,
  isLoading: false,
  searchTerm: '',
  selectedSubreddit: '/r/pics/'

};

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
         
        },
        toggleShowComments: (state, action) => {
          state.posts[action.payload].displayComments = !state.posts[action.payload].displayComments;
        },
        commentsLoadPending: (state, action) => {
          state.posts[action.payload].isLoadingComments = true;
        },
        commentsLoadFulfilled: (state, action) => {
          console.log('loadComments: '+ action.payload);
          state.posts[action.payload.i].isLoadingComments = false;
          state.posts[action.payload.i].comments = action.payload.commentData;
        },
        commentsLoadRejected: (state, action) => {
          state.posts[action.payload].isLoadingComments = false;
          state.posts[action.payload].hasErrorComments = true;
        }
        
        
    },
    extraReducers: {
      [loadPosts.pending]: (state, action) =>{
        
        state.isLoading = true;
        state.hasError = false;
      },
      [loadPosts.fulfilled]: (state, action) => {
        // console.log('loadPost: '+ action.payload);
        state.posts = action.payload;
        state.isLoading = false;
        state.hasError = false;
      },
      [loadPosts.rejected]: (state, action) => {
        
        state.isLoading = false;
        state.hasError = true;
      },

      // [commentsLoad.fulfilled]: (state, action) => {
      //   console.log(action.payload);
      //   state.posts[action.payload.i].comments = action.payload;
      //   state.posts[action.payload.i].isLoadingComments = false;
      //   state.posts[action.payload.i].hasErrorComments = false;

      // },
      // [commentsLoad.pending]: (state, action) => {
        
      //   state.posts[action.payload.i].isLoadingComments = true;
      //   state.posts[action.payload.i].hasErrorComments = false;
      // },
      // [commentsLoad.rejected]: (state, action) => {
      //   state.posts[action.payload.i].isLoadingComments = false;
      //   state.posts[action.payload.i].hasErrorComments = true;       
      // },
      
    }
});



// export fetchPosts = (subreddit) => async(dispatch) => {
//   try {
//     dispatch(s)
//   }
// }






export const selectSearchTerm = (state) => state.allPosts.searchTerm;
export const selectAllPosts = (state) => state.allPosts.posts;
export const { setSubreddit, 
              setSearchTerm, 
              clearSearchTerm, 
              toggleShowComments,
              commentsLoadPending,
              commentsLoadFulfilled,
              commentsLoadRejected
            } = postsSlice.actions;
export default postsSlice.reducer;

export const postsToRender = createSelector([selectAllPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if(searchTerm !== '')  {
      return posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    } 
    return posts;
  }
);