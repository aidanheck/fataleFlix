/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
/**
 *@description this component shows the individual film's details.
 *@requires React
 *@requires axios
 *@requires Prop-Types
 *@requires React-Bootstrap
 *@requires React-Router-Dom
 *@access private
 */

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { setFilms } from '../../actions/actions';
import './film-view.scss';

export class FilmView extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * adds a film to a user's queue
   *@function addQueueItem
   *@param {string} user
   *@param {string} movieId
   */
  addQueueItem(e, film) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios
      .post(
        `https://fataleflix.herokuapp.com/users/${user}/films/${film._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        console.log(res);
        alert(`${film.Title} was added to your queue.`);
      })
      .catch((err) => {
        alert(`${err} ${film.Title} was not added to your queue.`);
      });
  }

  render() {
    const { film } = this.props;
    if (!film) return <div className="main-view" />;
    return (
      <Container>
        <Row className="film-view-container">
          <Col lg={4}>
            <div className="film-view">
              <img
                alt="film poster"
                className="film-poster"
                src={film.ImagePath}
              />
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
                <Button
                  onClick={(e) => this.handleAddFavorite(e, film)}
                  variant="outline-danger"
                  className="btn"
                >
                  add film to queue
                </Button>
              </div>
              <Link to="/">
                <Button variant="outline-danger" className="btn">
                  home
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ film: state.film });

export default connect(mapStateToProps, { setFilms })(FilmView);

FilmView.propTypes = {
  film: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }),
};
