// this is an example of improting data from JSON
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main.js';


export default (function () {
    // YOUR CODE GOES HERE
    // next line is for example only
    // document.getElementById("app").innerHTML = "<h1>Hello WG Forge</h1>";
    ReactDOM.render(
        <Main />,
        document.getElementById('app')
      );
}());
