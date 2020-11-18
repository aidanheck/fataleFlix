import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import '../login-view/login-view.scss';

import { Link } from 'react-router-dom';

export function LoginView(props) {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

     const handleSubmit = (e) => {
          e.preventDefault();
          axios.post('https://fataleflix.herokuapp.com/login', {
               Username: username,
               Password: password,
          })
               .then((response) => {
                    const data = response.data;
                    props.onLoggedIn(data);
               })
               .catch((e) => {
                    console.log('no such user');
               });
     };

     return (
          <Container className="login-container">
               <Form>
                    <Form.Group controlId="formBasicUsername">
                         <Form.Label>username: </Form.Label>
                         <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                         <Form.Label>password: </Form.Label>
                         <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="outline-danger" size="sm" block onClick={handleSubmit}>sign in</Button>
               </Form>
          </Container>
     );
}