import React from 'react';

export const Comment = (props) => {
    const { body, author, created_utc } = props.content;
    return (
        <div className='oneComment'>
                <h4 className ='oneCommentAuthor' > { author } </h4>
                <p className ='oneCommentText'> { body }</p>
                <p className = 'oneCommentTime'> { created_utc } </p>
        </div>
    )
}