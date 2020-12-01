import React from 'react';
import axios from 'axios';
// import { response } from 'express';

import './film-view.scss';

import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export class FilmView extends React.Component {

     constructor() {
          super();
          this.state = {};
     }

     goHome() {
          history.back();
          window.scroll(0, 0);
     }

     addUserQueue(q) {
          const { film } = this.props;
          q.preventDefault();
          axios.post(`https://fataleflix.herokuapp.com/update-user/${localStorage.getItem('user')}/queue/${film._id}`, {
               username: localStorage.getItem('user')
          },
               { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          )
               .then((res) => {
                    document.location.reload(true);
               })
               .then((res) => {
                    alert(`${film.Title} was added to your queue.`)
               })
               .catch((err) => {
                    alert(err + `${film.Title} was not added to your queue.`)
               })
     }

     render() {
          const { film } = this.props;

          if (!film) return null;

          return (
               <Row className="film-view-container" >
                    <Col lg={4}>
                         <div className="film-view">
                              <img className="film-poster" src={film.ImagePath} />
                         </div>
                         <div>
                              <a className="btn" onClick={this.addUserQueue.bind(this)}>add film to queue</a>
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
               Name: PropTypes.string
          }),
          ImagePath: PropTypes.string,
          Queue: PropTypes.bool,
     })
};

