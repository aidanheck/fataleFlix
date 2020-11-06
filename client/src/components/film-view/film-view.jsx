import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class FilmView extends React.Component {
     
     constructor() {
          super();
          this.state = {};
     }

     render() {
          const { film } = this.props;

          if (!film) return null;

          return (
               <div>
                    <Card style={{ width: '25rem' }}>
                         <Card.Img variant="top" src={film.ImagePath}/>
                         <Card.Body>
                              <Card.Title>{film.Title}</Card.Title>
                              <Card.Text>Description: {film.Description}</Card.Text>
                              <Card.Text>Genre: {film.Genre}</Card.Text>
                              <Card.Text>Director: {film.Director.name}</Card.Text>
                               <Link to={'/'}>
                                     <Button variant="outline-danger">go home</Button>
                               </Link>
                          </Card.Body>
                  </Card>
               </div>
          );
          }
     }