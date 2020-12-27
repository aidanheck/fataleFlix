import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import './genre-view.scss';

export class GenreView extends React.Component {

     constructor() {
          super();
          this.state = {};
     }

     render() {
          const { genre } = this.props;

          if (!genre) return <div className="main-view" />;

          return (
               <Container>
                    <div className="director-view">
                         <Card style={{ width: '50rem' }} className="genre-card">
                              <Card.Body>
                                   <Card.Title>{genre.Name}</Card.Title>
                                   <Card.Text>{genre.Description}</Card.Text>
                              </Card.Body>
                              <Link to={"/"}>
                                   <Button variant="outline-danger">back</Button>
                              </Link>
                         </Card>
                    </div>
               </Container>
          );
     }
}