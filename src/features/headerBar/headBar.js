import { useEffect, useState } from 'react';
import logoReddit from './images/logoReddit.png';
import logoSearch from './images/iconSearch.svg';
import logoGitHub from './images/logoGitHub.png';
import remove from './images/cross.png';
// import {selectSearchTem} from './searchSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import { setSearchTerm, clearSearchTerm, selectSearchTerm} from '../posts/postsSlice.js';

export const HeaderBar = () => {
    const [searchTermLocal, setSearchTermLocal]  = useState('');
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);

    const handleSearch = (e) => {
        setSearchTermLocal(e.target.value);
    };

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    }, [searchTerm]);

    const submitSearchTerm = (e) => {
        e.preventDefault();      
        dispatch(setSearchTerm(searchTermLocal));
    }

    const clearSearch = (e) => {
        e.preventDefault();
        setSearchTermLocal('');
        dispatch(clearSearchTerm(''));
    }

    return (
        <header className = "head">
            
                <img className = "redditLogo" alt = "Reddit Logo" src = {logoReddit}/>
           
            <form onSubmit={submitSearchTerm}>
                <input 
                    id ="search"
                    type = "text" 
                    placeholder = "Search Post"
                    value = {searchTermLocal}
                    onChange = {handleSearch}
                />
                {searchTermLocal !== '' && <button  onClick = {clearSearch}>
                                                <img alt = 'remove' src = {remove}/>
                                            </button>}

                <button type = 'submit' aria-label = 'search'>
                    <img alt = "search" src = {logoSearch}/>
                </button>
            </form>
            <div className = "gitHub">
                <a href = 'https://github.com/djongit' target= "_blank" rel = "noreferrer">
                    <img alt = "GitHub Logo" src = {logoGitHub}/>
                </a>
            </div>
        </header>
    )
};