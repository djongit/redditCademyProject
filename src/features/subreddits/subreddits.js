import React, { useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tile } from '../../components/tile.js';
import {  loadSubreddits } from "./subredditSlice";
import  {  clearSearchTerm, setSubreddit } from '../posts/postsSlice.js'
import './styleSubreddits.css';

export const Subreddits = () => {
    const dispatch = useDispatch();
    const allSubreddits = useSelector((state) => state.subreddits);
    const activeSubreddit = useSelector((state) => state.allPosts.selectedSubreddit);
    
    const { subreddits } = allSubreddits;   

    useEffect(()=> {
        dispatch(loadSubreddits());
    },[dispatch])
    

// subreddit uses tile component to render list of subreddits

    return (
        <div>
            <Tile  className = "subredditTile">
                <h2>Subreddits</h2>
                <ul className="subredditList">
                    {subreddits.map((subreddit, index)=> {
                    return <li className = {activeSubreddit === subreddit.url ? 'activeSubreddit': 'standBySubreddit'} key = {subreddit.id} >
                            <button type = 'button' onClick = {()=>
                                    {dispatch(setSubreddit(subreddit.url));
                                        dispatch(clearSearchTerm(''));
                                    }}>
                                <img className = 'subredditIcon' src = {subreddit.image} alt = ''/>
                                <p> {subreddit.title}</p>
                            </button>

                        </li>
                    })}
                </ul>
            
                
           
     
            </Tile>
            
        </div>
    )
}