import React, { useState } from 'react';
import Axios from 'axios';

export class FilmCard extends React.Component {
     render() {
          //this is given to the <FilmCard/> component by the outer world which, in this case, is 'MainView', as 'MainView' is what's connected to your database via the films endpoint of your API
          const { film, onClick } = this.props;

          return (
               <div onClick={() => onClick(film)} className="film-card">{film.Title}</div>

          );
     }
}