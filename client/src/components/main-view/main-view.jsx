import React, { Component } from 'react';
import Axios from 'axios';

import { Button, Form, FormControl, NavBar, Nav, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import { LoginView } from '../login-view/login-view';
import { FilmCard } from '../film-card/film-card';
import { FilmView } from '../film-view/film-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

     constructor() {
          super();

          this.state = {
               // films: null,
               // selectedFilm: null,
               user: null
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

     onLoggedIn(user) {
          this.setState({
               user
          });
     }

     render() {
          const { films, selectedFilm, user } = this.state;

          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

          //before the films have been loaded
          if (!films) return <div className="main-view"/>

          return (
               <Container>
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
                    <FormControl type="text" placeholder="search for a film!" className="mr-sm-2"/>
                    <Button variant="outline-danger">search</Button>
               </Form>
               </Navbar.Collapse>
               </Navbar>
               <div className="main-view">
                    <Container fluid="sm">
                    {selectedFilm
                    ? <FilmView film={selectedFilm}/>
               : films.map(film => (
                    <FilmCard key={film._id} film={film} onClick={film => this.onFilmClick(film)}/>
                         ))
                     }
                     </Container>
                </div>
                </Container>
                );
                    }
}
