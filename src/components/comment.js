import React from 'react';
import { toHumanTime } from '../utilities/timeConverter.js';

export const Comment = (props) => {
    const { body, author, created_utc } = props.content;
    // console.log(typeof created_utc);
    return (
        <div className='oneComment'>
                <h4 className ='oneCommentAuthor' > { author } </h4>
                <p className ='oneCommentText'> { body }</p>
                <p className = 'oneCommentTime'> {toHumanTime(created_utc)  } </p>
                
        </div>
    )
}