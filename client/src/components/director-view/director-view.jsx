/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { film, director } = this.props;

    if (!director) return <div className="main-view" />;

    return (
      <div className="director-view">
        <Container>
          <Card style={{ width: '50rem' }} className="director-card">
            <Card.Body>
              <Card.Title>{film.Director.Name}</Card.Title>
              <Card.Text>{film.Director.Bio}</Card.Text>
            </Card.Body>
            <Link to={`/films/${film._id}`}>
              <Button variant="outline-danger">back</Button>
            </Link>
          </Card>
        </Container>
      </div>
    );
  }
}
