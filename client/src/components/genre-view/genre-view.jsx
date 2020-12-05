import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                    <div className="genre-view">
                         <Card style={{ width: '35rem' }}>
                              <Row>
                                   <Col xs={1}></Col>
                                   <Col>
                                        <span>{genre.Name}</span></Col>
                                   <Col xs={8}>
                                        <span>{genre.Description}</span>
                                   </Col>
                              </Row>
                              <Row>
                                   <Link to={"/"}>
                                        <Button variant="outline-danger">back</Button>
                                   </Link>
                              </Row>
                         </Card>
                    </div>
               </Container>
          )
     }
}