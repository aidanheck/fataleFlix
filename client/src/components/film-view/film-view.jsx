import React from 'react';

export class FilmView extends React.Component {
     
     constructor() {
          super();
          this.state = {};
     }

     render() {
          const { film } = this.props;

          if (!film) return null;

          return (
               <div className="film-view">
                    <img className="film-poster" src={film.ImagePath}/>
                    <div className="film-title">
                         <span className="label">Title: </span>
                         <span className="value">{film.Title}</span>
                    </div>
                    <div className="film-description">
                         <span className="label">Description: </span>
                         <span className="value">{film.Description}</span>
                    </div>
                    <div className="film-genre">
                         <span className="label">Genre: </span>
                         <span className="value">{film.Genre.Name}</span>
                    </div>
                    <div className="film-director">
                         <span className="label">Director: </span>
                         <span className="value">{film.Director.Name}</span>
                    </div>
                    <a href="/" target="_blank"> 
                    <button> go home </button></a>
               </div>
               
          );
          }
     }