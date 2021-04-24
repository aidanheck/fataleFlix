import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * submits username and password to API and logs user in if user's information is correct
   *@function handleSubmit
   *@param username
   *@param password
   *@returns {string} userData
   */

  const handleSubmit = (e) => {
    // prevents the default behavior of submitting the form so authentication can happen
    e.preventDefault();
    axios
      .post('https://fataleflix.herokuapp.com/client/login', {
        Username: username,
        Password: password,
      })
      // response comes in from the database
      .then((response) => {
        // if there is a match in the database, onLoggedIn is called
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log('no such user.');
      });
    // if (props.userData) {
    //   window.location = '/client/films';
    // }
  };

  return (
    <Container className="login-container">
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>username: </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter username"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
          />
        </Form.Group>

        <div className="button-group">
          <Button
            variant="outline-danger"
            size="sm"
            block
            onClick={handleSubmit}
          />
          <Link to="/register">
            <Button variant="outline-danger" size="sm">
              register
            </Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
}
