import React from 'react';
import Axios from "axios";
import { FilmCard } from '../film-card/film-card';
import { FilmView } from '../film-view/film-view';
import { isNull } from 'lodash';

export class MainView extends React.Component {
     constructor() {
          super();

          this.state = {
               films: null,
               selectedFilm: null
          };
     }
     componentDidMount() {

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
//      //one of the 'hooks' available in a react component
//      componentDidMount() {
//           Axios.get('<my-api-endpoint/films')
//           .then(response => {
//                //assign the result to the state
//                this.setState({
//                     films: response.data
//                });
//           })
//           .catch(function(error) {
//                console.log(error);
//           });
//      }

//      render() {
//           //if the state isn't initualized, this will throw on runtime bedore the data is initially loaded
//           const { films } = this.state;

//           //before the films have been loaded
//           if (!films) return ( <div className="main-view">;
//           { films.map(film => (
//                <FilmCard key={film._id} film={film}/>
//           ))}
//           </div>
//           );
//      }
// }