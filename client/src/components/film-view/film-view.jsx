import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './film-view.scss';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class FilmView extends React.Component {

     constructor() {
          super();
          this.state = {};
     }

     addUserQueue(queue) {
          const token = localStorage.getItem('token');
          const { film } = this.props;
          queue.preventDefault();
          axios.post(`https://fataleflix.herokuapp.com/users/${localStorage.getItem('user')}/Films/${film._id}`, {
               username: localStorage.getItem('user')
          },
               { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, }
          )
               .then((res) => {
                    console.log(res);
                    alert(`${film.Title} was added to your queue.`)
               })
               .catch((err) => {
                    alert(err + `${film.Title} was not added to your queue.`)
               });
     }

     render() {
          const { film } = this.props;

          if (!film) return <div class="main-view" />;

          return (
               <Container>
                    <Row className="film-view-container" >
                         <Col lg={4}>
                              <div className="film-view">
                                   <img className="film-poster" src={film.ImagePath} />
                              </div>
                              <div>
                                   <Button onClick={() => this.addUserQueue(film)}
                                        variant="outline-danger">add film to queue</Button>
                                   <Link to={'/'}><Button variant="outline-danger">home</Button></Link>
                              </div>
                         </Col>
                         <Col lg={4}>
                              <div className="film-block">
                                   <div className="film-title">
                                        <span className="value">{film.Title}</span>
                                   </div>
                                   <div className="film-description">
                                        <span className="value">{film.Description}</span>
                                   </div>
                                   <div className="film-genre">
                                        <span className="label">Genre:&nbsp;</span>
                                        <Link to={`/genres/${film.Genre.Name}`}>
                                             <span className="value-link">{film.Genre.Name}</span>
                                        </Link>
                                   </div>
                                   <div className="film-director">
                                        <span className="label">Director:&nbsp;</span>
                                        <Link to={`/directors/${film.Director.Name}`}>
                                             <span className="value-link">{film.Director.Name}</span>
                                        </Link>
                                   </div>
                                   <Button variant="outline-danger" className="btn back-button" onClick={this.goHome.bind(this)}>back</Button>
                              </div>
                         </Col>
                    </Row>
               </Container>
          );
     }
}

FilmView.propTypes = {
     film: PropTypes.shape({
          Title: PropTypes.string,
          ImagePath: PropTypes.string,
          Description: PropTypes.string,
          Genre: PropTypes.exact({
               _id: PropTypes.string,
               Name: PropTypes.string,
               Description: PropTypes.string
          }),
          Director: PropTypes.shape({
               Name: PropTypes.string,
               Bio: PropTypes
          }),
          ImagePath: PropTypes.string,
          Queue: PropTypes.bool,
     })
};

