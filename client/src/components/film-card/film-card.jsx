import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

import { Link } from 'react-router-dom';

import './film-card.scss';

// const MAX_CHARS_IN_DESC = 50;

export class FilmCard extends React.Component {
     render() {
          //this is given to the <FilmCard/> component by the outer world which, in this case, is 'MainView', as 'MainView' is what's connected to your database via the films endpoint of your API
          const { film } = this.props;
          // let filmDescription = film.Description;
          // if (filmDescription.length > MAX_CHARS_IN_DESC) {
          //      filmDescription = `${filmDescription.substring(0, MAX_CHARS_IN_DESC)}...`;
          // }
          if (film) {
               return (
                    <CardColumns style={{ display: 'flex', flexDirection: 'row' }}>
                         <Card className="film-card" style={{ width: '30rem', flex: 1 }} >
                              <Card.Img variant="top" src={film.ImagePath} />
                              <Card.Body>
                                   <Card.Title>{film.Title} ({film.Released})</Card.Title>
                                   {/* <Card.Text>{film.Description}</Card.Text> */}
                                   <Link to={`/films/${film._id}`}>
                                        <Button variant="outline-danger">open</Button>
                                   </Link>
                              </Card.Body>
                         </Card>
                    </CardColumns>
               );
          }
     }
}

FilmCard.propTypes = {

     films: PropTypes.arrayOf(
          PropTypes.shape({
               Title: PropTypes.string,
               ImageUrl: PropTypes.string,
               Description: PropTypes.string,
               Genre: PropTypes.exact({
                    _id: PropTypes.string,
                    Name: PropTypes.string,
                    Description: PropTypes.string
               }),
               Director: PropTypes.shape({
                    Name: PropTypes.string
               }),
               ImagePath: PropTypes.string,
               Featured: PropTypes.bool,
          })
     )
};
