import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './genre-view.scss';

export class GenreView extends React.Component {

     constructor() {
          super();
          this.state = {};
     }

     render() {
          const { film, genre } = this.props;

          if (!genre) return <div className="main-view" />;

          return (
               <div className="genre-view">
                    <Container>
                         <Card style={{ width: '50rem' }} className="genre-card">
                              <Card.Body>
                                   <Card.Title>{genre.Name}</Card.Title>
                                   <Card.Text>{genre.Description}</Card.Text>
                              </Card.Body>
                              <Link to={"/"}>
                                   <Button variant="outline-danger">back</Button>
                              </Link>
                         </Card>
                    </Container>
               </div>
          );
     }
}