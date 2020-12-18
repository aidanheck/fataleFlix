import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { FilmCard } from '../film-card/film-card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './films-list.scss';

const mapStateToProps = state => {
     const { visibilityFilter } = state;
     return { visibilityFilter };
};

function FilmsList(props) {
     const { films, visibilityFilter } = props;
     let filteredFilms = films;

     if (visibilityFilter !== '') {
          filteredFilms = films.filter(f => f.Title.includes(visibilityFilter));
     }

     if (!films) return <div className="main-view" />;

     return <div className="films-list"><VisibilityFilterInput visibilityFilter={visibilityFilter} />
          <Container className="filmslist-container">
               <Row>
                    <Col>
                         {filteredFilms.map(f => <FilmCard key={f._id} film={f} />)}
                    </Col>
               </Row>
          </Container>

     </div >;
}

export default connect(mapStateToProps)(FilmsList);