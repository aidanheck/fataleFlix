import React from 'react';
import Axios from 'axios';

import { Container } from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap/Form';
import { FormControl } from 'react-bootstrap/FormControl';
import { Navbar } from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap/Nav';

import { LoginView } from '../login-view/login-view';
import { FilmView } from '../film-view/film-view';
import { FilmCard } from '../film-card/film-card';
import { RegistrationView } from '../registration-view/registration-view';

import '/index.scss';

export class MainView extends React.Component {

     constructor() {
          super();

          this.state = {
               films: null,
               selectedFilm: null,
               user: null,
          };
     }

     // One of the "hooks" available in a React Component
     componentDidMount() {
          Axios
               .get("https://fataleflix.herokuapp.com/films")
               .then((response) => {
                    // Assign the result to the state
                    this.setState({
                         films: response.data,
                    });
               })
               .catch(function (error) {
                    console.log(error);
               });
     }
     onFilmClick(film) {
          this.setState({
               selectedFilm: film
          });
     }

     onLoggedIn(authData) {
          console.log(authData);
          this.setState({
               user: authData.user.Username
          });

          localStorage.setItem('token', authData.token);
          localStorage.setItem('user', authData.user.Username);
          this.getFilms(authData.token);
     }

     getFilms(token) {
          Axios.get('https://fataleflix.herokuapp.com/films', {
               headers: { Authorization: 'Bearer' }
          })
     }

     render() {
          const { films, selectedFilm, user } = this.state;

          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

          //before the films have been loaded
          if (!films) return <div className="main-view" />;

          return (
               <Container>
                    <div className="main-view">
                         <Navbar bg="dark" variant="dark" expand="lg">
                              <Navbar.Brand href="/">fataleFlix</Navbar.Brand>
                              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                              <Navbar.Collapse id="basic-navbar-nav">
                                   <Nav className="mr-auto">
                                        <Nav.Link href="/">home</Nav.Link>
                                        <Nav.Link href="/login">login</Nav.Link>
                                        <Nav.Link href="/register">register</Nav.Link>
                                        <Button size="sm" variant="outline-danger" onclick={() => this.onLoggedOut()}></Button>
                                   </Nav>
                                   <Form inline>
                                        <FormControl type="text" placeholder="search for a film!" className="mr-sm-2" />
                                        <Button variant="outline-danger">search</Button>
                                   </Form>
                              </Navbar.Collapse>
                         </Navbar>
                         <div className="main-view">
                              <Container fluid="sm">
                                   {selectedFilm
                                        ? <FilmView film={selectedFilm} />
                                        : films.map(film => (
                                             <FilmCard key={film._id} film={film} onClick={film => this.onFilmClick(film)} />
                                        ))
                                   }
                              </Container>
                         </div>
                    </div>
               </Container>
          );
     }
}

// let mapStateToProps = (state) => {
//      return { films: state.films };
// };
