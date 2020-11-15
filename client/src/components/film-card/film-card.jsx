import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export class FilmCard extends React.Component {
     render() {
          //this is given to the <FilmCard/> component by the outer world which, in this case, is 'MainView', as 'MainView' is what's connected to your database via the films endpoint of your API
          const { film } = this.props;

          return (
               <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={film.ImagePath} />
                    <Card.Body>
                         <Card.Title>{film.Title}</Card.Title>
                         <Card.Text>{film.Description}</Card.Text>
                         <Link to={`/films/${film._id}`}>
                              <Button variant="outline-danger" >open</Button>
                         </Link>
                    </Card.Body>
               </Card>
          );
     }
}


FilmCard.propTypes = {
     film: PropTypes.shape({
          Title: PropTypes.string,
          Description: PropTypes.string.isRequired,
          ImagePath: PropTypes.string.isRequired,
     }).isRequired,
     onClick: PropTypes.func.isRequired
};