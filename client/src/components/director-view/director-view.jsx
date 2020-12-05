import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
               <Container>
                    <div className="director-view">
                         <Card style={{ width: '50rem' }}>
                              <Card.Body>
                                   <Card.Title>{director.Name}</Card.Title>
                                   <Card.Text>Bio: {director.Bio}</Card.Text>
                              </Card.Body>
                              <Link to={"/"}>
                                   <Button variant="outline-danger">back</Button>
                              </Link>
                         </Card>
                    </div>
               </Container>
          )
     }
}