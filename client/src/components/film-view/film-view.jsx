import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './film-view.scss';

import Container from 'react-bootstrap/Container';
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
          const user = localStorage.getItem('user');
          const { film } = this.props;

          axios.post(`https://fataleflix.herokuapp.com/users/${user}/films/${film._id}`, {
          },
               { headers: { Authorization: `Bearer ${token}` }, }
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

          if (!film) return <div className="main-view" />;

          return (
               <Container>
                    <Row className="film-view-container" >
                         <Col lg={4}>
                              <div className="film-view">
                                   <img className="film-poster" src={film.ImagePath} />
                              </div>

                         </Col>
                         <Col lg={{ span: 6, offset: 1 }}>
                              <div className="film-block">
                                   <div className="film-title">
                                        <span className="value">{film.Title}</span>
                                   </div>
                                   <div className="film-description">
                                        <span className="value">{film.Description}</span>
                                   </div>
                                   <div className="film-genre">
                                        <span className="label">Genre:&nbsp;</span>
                                        <Link to={`/films/genres/${film.Genre.Name}`}>
                                             <span className="value-link">{film.Genre.Name}</span>
                                        </Link>
                                   </div>
                                   <div className="film-director">
                                        <span className="label">Director:&nbsp;</span>
                                        <Link to={`/films/directors/${film.Director.Name}`}>
                                             <span className="value-link">{film.Director.Name}</span>
                                        </Link>
                                   </div>
                                   <div>
                                        <Button onClick={() => this.addUserQueue(film)}
                                             variant="outline-danger" className="btn">add film to queue</Button>
                                   </div>
                                   <Link to='/'>
                                        <Button variant="outline-danger" className="btn">home</Button>
                                   </Link>
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
               Bio: PropTypes.string
          }),
          ImagePath: PropTypes.string,
          Queue: PropTypes.bool,
     })
};

