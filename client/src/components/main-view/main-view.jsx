import React, { Component } from 'react';
import Axios from 'axios';

import { FilmCard } from '../film-card/film-card';
import { FilmView } from '../film-view/film-view';

export class MainView extends React.Component {

     constructor() {
          super();

          this.state = {
               films: null,
               selectedFilm: null
          };
     }

// One of the "hooks" available in a React Component
     componentDidMount() {
          Axios
            .get("https://fataleflix.herokuapp.com/films")
            .then((response) => {
               // Assign the result to the state
               this.setState({
                    films: response.data,
               });
            })
            .catch(function (error) {
               console.log(error);
             });
     }
     onFilmClick(film) {
          this.setState({
               selectedFilm: film
          });
     }

     render() {
          const { films, selectedFilm } = this.state;

          //before the films have been loaded
          if (!films) return <div className="main-view"/>

          return (
               <div className="main-view">
                    {selectedFilm
                    ? <FilmView film={selectedFilm}/>
               : films.map(film => (
                    <FilmCard key={film._id} film={film} onClick={film => this.onFilmClick(film)}/>
                         ))
                     }
                </div>
                
                );
                    }
}
