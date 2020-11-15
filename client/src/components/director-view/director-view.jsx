import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'react-router-dom';

export class DirectorView extends React.Component {

     constructor() {
          super();
          this.state = {};
     }

     render() {
          const { films, director } = this.props;

          if (!director) return null;

          return (
               <Container>
                    <div className="director-view">
                         <Card style={{ width: '25rem' }}>
                              <Row>
                                   <Col xs={1}></Col>
                                   <Col>
                                        <span>{director.Name}</span></Col>
                                   <Col xs={8}>
                                        <span>{director.bio}</span>
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