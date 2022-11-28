import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSubreddit } from '../posts/postsSlice.js';
import './styleCategories.css';
import hotImg from './categoriesIMG/hot.png';
import newImg from './categoriesIMG/new.png';
import topImg from './categoriesIMG/arrowUp.png';

const categoriesData = [
    {name: 'Hot', parameter: '/hot', img: hotImg},
    {name: 'New', parameter: '/new', img: newImg},
    {name: 'Top', parameter: '/top', img: topImg}
];


export const Categories = () => {
 const dispatch = useDispatch();
const activeCategory = useSelector((state)=>state.allPosts.selectedSubreddit);

    return (
        <div className = 'categories'>
            {categoriesData.map((category, index) => {
                return <button className={activeCategory === category.parameter ? 'activeCategory' : 'inactiveCategory'} key = {index} type = 'button' onClick = {
                    ()=> { dispatch(setSubreddit(category.parameter))}
                }><img alt = "" src = {category.img}/><p>{category.name}</p></button>
            })}
        </div>
    )
}
