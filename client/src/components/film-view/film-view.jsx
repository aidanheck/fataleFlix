import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'react-router-dom';

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
                         <Card.Img variant="top" src={film.ImagePath} />
                         <Card.Body>
                              <Card.Title>{film.Title}</Card.Title>
                              <Card.Text>Description: {film.Description}</Card.Text>
                              <Link to={`/genres/${film.Genre.Name}`}>
                                   <Button variant="outline-danger" >genre</Button>
                              </Link>
                              <Link to={`/directors/${film.Director.Name}`}>
                                   <Button variant="outline-danger" >director</Button>
                              </Link>
                              <Link to={'/'}>
                                   <Button variant="outline-danger">go home</Button>
                              </Link>
                         </Card.Body>
                    </Card>
               </div>
          );
     }
}