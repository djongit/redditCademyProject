import React from "react";

export const SubredditTile = (props) => {
const { content, className } = props;

return (
    <div  className = 'subreddits' tabIndex = {0}>
       
                <div>
                    <button>
                        <h3 className="subredditName">{content.title}</h3>
                     <h4 className="subredditAuthor">{content.author}</h4>
                    <div className="imgContainer">
                        <img src = {content.image} className = {className} alt = {content.name}/>
                      
                    </div> 
                    </button>
                     
                </div>
           
        
    </div>
)

}