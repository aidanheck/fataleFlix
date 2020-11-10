import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class FilmCard extends React.Component {
     render() {
          //this is given to the <FilmCard/> component by the outer world which, in this case, is 'MainView', as 'MainView' is what's connected to your database via the films endpoint of your API
          const { film, onClick } = this.props;

          return (
               <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={film.ImagePath} />
                    <Card.Body>
                         <Card.Title>{film.Title}</Card.Title>
                         <Card.Text>{film.Description}</Card.Text>
                         <Button variant="outline-danger" onClick={() => onClick(film)}>open</Button>
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