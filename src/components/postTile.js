import React from "react";

// Tile is universal component. It can be used to display posts as well as display Reddits

export const Tile = (props) => {
    const {content,className} = props
    // console.log(content);
 
    return (
        <div  className = {`tile_${className}`} tabIndex = {0}>
           
                    <div>
                        
                         {/* <h3 className={`${className}_name`}>{content.title}</h3>
                         <h4 className={`${className}_author`}>{content.author}</h4>
                        <div className="imgContainer">
                            <img src = {content.image} className = {className} alt = {content.name}/>
                          
                        </div>  */}
                    </div>
               
            {props.children}
        </div>
    ) 
  
    


}