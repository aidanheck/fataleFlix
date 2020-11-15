import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'react-router-dom';

export class GenreView extends React.Component {

     constructor() {
          super();
          this.state = {};
     }

     render() {
          const { films, genre } = this.props;

          if (!genre) return null;

          return (
               <Container>
                    <div className="genre-view">
                         <Card style={{ width: '25rem' }}>
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
          );
     }
}