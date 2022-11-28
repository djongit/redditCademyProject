import React from "react";

// Tile is universal component. It can be used to display posts as well as display Reddits

export const Tile = (props) => {
    const {className} = props
    // console.log(content);
 
    return (
        <div  className = {`tile_${className}`} tabIndex = {0}>               
            {props.children}
        </div>
    ) 
  
    


}