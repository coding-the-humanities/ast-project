import React from 'react';
import './app.css';

import Game from './components/Game.jsx';

let gridSize = 2;
React.render(<Game gridSize={ gridSize }/>, document.body);

/*

1. define distinction between being and null (nothingness)
2. everything that is, can be caught by a system (grid)
--------
3. test if something exists on the grid
   a. if yes, move on to a different square
   b. if no, refine the grid and repeat 3 until grid is completed
*/
