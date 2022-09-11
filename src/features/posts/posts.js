import {Tile} from '../../components/postTile.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, postsSlice, loadPosts, postsToRender,toggleShowComments, commentsLoad  } from './postsSlice.js';
import { Comment } from '../../components/comment.js'
import './stylePost.css';
import { toHumanTime } from '../../utilities/timeConverter.js';
import Spinner from '../../components/spinner.js';
import voteUpArrow from './postImages/voteUpArrow.png'
import voteDownArrow from './postImages/voteDownArrow.png';
import commentUp from './postImages/commentUp.png';
import commentDown from './postImages/commentDown.png';
import chat from './postImages/chat.png';

export const Posts = () => {

    
    const dispatch = useDispatch();
   
    
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
if(hasError) {
    return <p>Error While Loading.</p>
}

if (isLoading) {
    return <Spinner/>
};


if (posts.length === 0) {
    return (
        <div >
            <h3>No Results for "{searchTerm}"</h3>
        </div>
    )
};




    return (
        <div className='posts'>
            {posts.map((post, index) => {
                return <Tile key = {index} content = {post} className = "post">
                 <div className='postTile'>
                    <div className='postVote'>
                        <button className='voteUp'  type = 'button'>
                                    <img src = {voteUpArrow} alt = ''/>
                        </button>
                        <p>
                            {post.ups}
                        </p>
                        <button className = 'voteDown' type = 'button'>
                        <img src = {voteDownArrow} alt = ''/>
                        </button>
                    </div> 

                    <div className='postContent'>
                       <h4>{post.title}</h4> 
                        <img src = {post.image} alt = 'img' />
                        <div className='postInfo'>
                             <div className='postComments'>
                            <span className='authorInfo'>
                                {post.author}
                            </span>
                            <span>{toHumanTime(post.created_utc)}</span>
                            
                           

                                 

                                    <button type = 'button' onClick = { ()=>{
                                    
                                                            dispatch(toggleShowComments(index));
                                                            allPosts.posts[index].comments.length === 0 && dispatch(commentsLoad(index, post.permalink));
                                                    }  }>
                                        <img src = {chat} alt = ''/>
                                        {allPosts.posts[index].displayComments ? <img src = {commentUp} alt = '' /> : <img src = {commentDown} alt = ''/>}
                                    </button>
                                    {post.num_comments}
                                </div>
                                <span className='postComments'>    
                                    <div>
                                        {allPosts.posts[index].displayComments && allPosts.posts[index].comments.map((comment) => <Comment content = {comment} key = {comment.id} />)}
                                        {allPosts.posts[index].isLoadingComments && <Spinner/>}
                                        {allPosts.posts[index].hasErrorComments && <p>Error While Loading</p>}

                                    </div>
                                
                                </span>
                            
                               
                        </div>
                    </div>
                
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