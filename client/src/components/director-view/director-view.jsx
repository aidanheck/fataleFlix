import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends React.Component {
     constructor() {
          super();
          this.state = {};
     }

     render() {
          const { films, director } = this.props;

          if (!director) return <div className='main-view' />;

          return (
               <div className="director-view">
                    <Container>
                         <Card style={{ width: '50rem' }} className="director-card">
                              <Card.Body>
                                   <Card.Title>{director.Director.Name}</Card.Title>
                                   <Card.Text>{director.Director.Bio}</Card.Text>
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