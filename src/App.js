import React from 'react';

import './App.css';
import { HeaderBar } from './features/headerBar/headBar.js';
import {Categories} from './features/categories/categories.js';
import { Posts } from './features/posts/posts.js';
import { Subreddits } from './features/subreddits/subreddits.js';




function App() {
  return (
    <div className="App">
      <HeaderBar/>
      <div className = 'content'>
        <main>
        <Categories />
        <Posts />
      </main>
      <aside>
        <Subreddits />
      </aside>   
      </div>
       
    </div>
  );
}

export default App;
