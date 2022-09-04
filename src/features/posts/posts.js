import {Tile} from '../../components/postTile.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, postsSlice, loadPosts, postsToRender,toggleShowComments, commentsLoad  } from './postsSlice.js';
import { Comment } from '../../components/comment.js'
import './stylePost.css';

export const Posts = () => {
    const dispatch = useDispatch();
    // const allPostsS = useSelector(selectAllPosts);
    
    const posts = useSelector(postsToRender);
    const allPosts = useSelector((state) => state.allPosts)
    const { isLoading, hasError,selectedSubreddit, searchTerm } = allPosts;

  


    useEffect(() => {
        dispatch(loadPosts(selectedSubreddit))},[selectedSubreddit]
        );



// console.log(hasError);
// console.log(allPostsS);
// console.log(isLoading);
// console.log(allPosts.posts.data);

// if (isLoading) {
//     return <p>Loadin...</p>
// }
if (posts.length === 0) {
    return (
        <div >
            <h3>Results for "{searchTerm}"</h3>
        </div>
    )
}


    return (
        <div>
            {posts.map((post, index) => {
                return <Tile key = {index} content = {post} className = "post">
                    {post.title}
                    
                    <button className='voteUp' type = 'button'>
                                Up
                    </button>
                    <p>
                        {post.ups}
                    </p>
                    <button className = 'voteDown' type = 'button'>
                                    Down
                    </button>
                    <img src = {post.image} alt = 'img' />
                    <div className='postInfo'>
                        <span className='authorInfo'>
                            {post.author}
                        </span>
                        <span>{post.created_utc}</span>
                        <span className='postComments'>
                            <button type = 'button' onClick = { ()=>{
                                
                                                        dispatch(toggleShowComments(index));
                                                        dispatch(commentsLoad(index, post.permalink));
                                                }  }>
                                    Comments
                            </button>
                            {post.num_comments}
                            {allPosts.posts[index].displayComments && allPosts.posts[index].comments.map((comment) => 
                            <Comment content = {comment} key = {comment.id} />
                            )
                            }
                         </span>
                    </div>

                     
                </Tile>
                
            })}
        </div>
    )




//     return (
//         <div>
//                 {Object.keys(allPostsS).map((post, index) =>(
//                     <Tile key = {index} content = {post} />
//                 )  )}
            
//         </div>
//     )
}