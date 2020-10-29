
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

//main component
class fataleFlixApplication extends React.Component {
     constructor() {
     //call the superclass constructor so react can initialize it
     super();
     //initialize the state to an empty object so we can destructure it later
     this.state = {};
     }

     //this overrides the render() method of the superclass. no need to call super() though as it does nothing by default. 
     render() {
          return (
               <div className = "main-view"></div>
          );
     }
}

//finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(fataleFlixApplication), container);
