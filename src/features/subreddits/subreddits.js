import React, { useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tile } from '../../components/postTile.js';
import { selectSubreddits, loadSubreddits } from "./subredditSlice";
import  { clearSearchTerm, setSubreddit } from '../posts/postsSlice.js'

export const Subreddits = () => {
    const dispatch = useDispatch();
    const allSubreddits = useSelector((state) => state.subreddits);
    const { subreddits } = allSubreddits;

    useEffect(()=> {
        dispatch(loadSubreddits());
    },[dispatch])
    

// subreddit uses tile component to render list of subreddits

    return (
        <div>
            <Tile  className = "subredditTile">
                <h2>Subreddits</h2>
                <ul>
                    {subreddits.map((subreddit, index)=> {
                    return <li key = {subreddit.id} >
                            <button type = 'button' onClick = {()=>
                                    {dispatch(setSubreddit(subreddit.url));
                                        dispatch(clearSearchTerm(''));
                                    }}>
                                <img src = {subreddit.image} alt = 'img'/>
                                {subreddit.title}
                            </button>

                        </li>
                    })}
                </ul>
            
                
           
     
            </Tile>
            
        </div>
    )
}