import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';

import './genre-view.scss';

export class GenreView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return <div className="main-view" />;

    return (
      <div className="genre-view">
        <Container>
          <Card style={{ width: '50rem' }} className="genre-card">
            <Card.Body>
              <Card.Title>{genre.Name}</Card.Title>
              <Card.Text>{genre.Description}</Card.Text>
            </Card.Body>
            <Link to="/">
              <Button variant="outline-danger">
                back
              </Button>
            </Link>
          </Card>
        </Container>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
