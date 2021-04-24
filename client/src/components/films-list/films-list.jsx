/**
 *@description this component displays all films in the database
 *@requires React
 *@requires React-Redux
 *@requires React-Bootstrap
 *@access private
 */

import React from "react";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { FilmCard } from "../film-card/film-card";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./films-list.scss";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

/**
 * returns the films based on the search input
 *@function FilmsList
 *@param {string} films
 *@returns {array} films
 */

function FilmsList(props) {
  const { films, visibilityFilter } = props;

  let filteredFilms = films;

  if (visibilityFilter !== "") {
    filteredFilms = films.filter((f) =>
      f.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!filteredFilms) return <div className="main-view" />;

  return (
    <Container className="filmslist-container">
      <Row className="films-list">
        <Col xs={12}>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row>
      <div className="filmslist-div">
        <Row className="mb-3">
          {filteredFilms.map((f) => (
            <Col xs={12} lg={3}>
              <FilmCard key={f._id} film={f} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
export default connect(mapStateToProps)(FilmsList);
