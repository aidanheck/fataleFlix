/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

import { Link } from 'react-router-dom';

import './film-card.scss';

// eslint-disable-next-line import/prefer-default-export
// eslint-disable-next-line react/prefer-stateless-function
export class FilmCard extends Component {
  render() {
    const { film } = this.props;
    return (
      <CardColumns style={{ display: 'flex', flexDirection: 'row' }}>
        <Card className="film-card" style={{ width: '30rem', flex: 1 }}>
          <Card.Img variant="top" src={film.ImagePath} />
          <Card.Body>
            <Card.Title>
              {film.Title}
              {' '}
              (
              {film.Released}
              )
            </Card.Title>
            <Card.Text>{film.Description}</Card.Text>
            <Link to={`/films/${film._id}`}>
              <Button variant="outline-danger">open</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardColumns>
    );
  }
}

FilmCard.propTypes = {
  film: PropTypes.shape({
    _id: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Released: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
