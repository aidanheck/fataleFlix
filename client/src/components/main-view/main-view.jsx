/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/**
 *@description This component is the home page of the app.
 *@requires React
 *@requires Prop-Types
 *@requires React-Router-Dom
 *@requires React-Bootstrap
 *@requires FeatherIcon
 *@access private
 */

import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

import { setFilms, setUser } from '../../actions/actions';

import FilmsList from '../films-list/films-list';
import { FilmView } from '../film-view/film-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

export class MainView extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (accessToken !== null) {
      this.props.setUser(user);
      this.getFilms(accessToken);
    }
  }
  /**
   * stores user's name and token in localStorage
   *@function onLoggedIn
   *@returns {string} token
   *@returns {string} user
   */

  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getFilms(authData.token);
  }

  /**
   * removes user's name and token in localStorage
   *@function onLoggedOut
   *@returns {string} token
   *@returns {string} user
   */
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser(!user);
    window.open('/client/login', '_self');
  }

  /**
   * gets films from the API
   *@function getFilms
   *@param {string} token
   *@returns {array} films
   */
  getFilms(token) {
    axios
      .get('https://fataleflix.herokuapp.com/films', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setFilms(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { films, user } = this.props;

    // //before the films have been loaded
    if (!films) return <div className="main-view" />;

    return (
      <Router basename="/client">
        <Navbar
          sticky="top"
          className="navbar-style"
          variant="dark"
          expand="lg"
        >
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            <img
              alt="fataleflix logo"
              width="150px"
              src="https://i.postimg.cc/MT7tXv8K/fataleflixlogo.png"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">home</Nav.Link>
              <Nav.Link as={Link} to={`/users/${user}`}>profile</Nav.Link>
              <Nav.Link href="/client/register">register</Nav.Link>
              <Nav.Link href="/client/login">login</Nav.Link>
              <Nav.Link onClick={() => this.onLoggedOut()}>logout</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="search for a film!"
                className="mr-sm-2"
              />
              <Button variant="outline-danger" className="search-button">
                search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="main-view">
          <Container fluid>
            <Row className="main-container">
              <Route
                exact
                path="/"
                render={() => {
                  if (!user) {
                    return (
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    );
                  }
                  return <FilmsList films={films} />;
                }}
              />

              <Route exact path="/client/register" render={() => <RegistrationView />} />

              <Route
                exact
                path="/films/:filmId"
                render={({ match }) => (
                  <FilmView
                    film={films.find((f) => f._id === match.params.filmId)}
                  />
                )}
              />

              <Route
                path="/films/genres/:name"
                render={({ match }) => {
                  if (!films) return <div className="main-view" />;
                  return (
                    <GenreView
                      genre={
                        films.find((f) => f.Genre.Name === match.params.name)
                          .Genre
                      }
                      otherFilms={films.filter(
                        (f) => f.Genre.Name === match.params.name,
                      )}
                    />
                  );
                }}
              />

              <Route
                path="/films/directors/:name"
                render={({ match }) => (
                  <DirectorView
                    director={films.find(
                      (f) => f.Director.Name === match.params.name,
                    )}
                  />
                )}
              />
              <Route
                path="/users/:username"
                render={() => {
                  if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                  if (films.length === 0) return <Container className="main-view" />;
                  return <ProfileView films={films} />;
                }}
              />
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({ films: state.films, user: state.user });

export default connect(mapStateToProps, { setFilms, setUser })(MainView);

MainView.propTypes = {
  film: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
      }),
      ImagePath: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired,
    }),
  ),
  user: PropTypes.string.isRequired,
};
