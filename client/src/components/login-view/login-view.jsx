import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../login-view/login-view.scss';

export function LoginView(props) {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

     const handleSubmit = (e) => {

          console.log(username, password);
          e.preventDefault();
          axios.post('https://fataleflix.herokuapp.com/login', {
               Username: username,
               Password: password
          })
               .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
               })
               .catch(e => {
                    console.log('no such user')
               });
     };

     return (
          <Container className="login-container">
               <Form>
                    <Form.Group controlID="formBasicUsername">
                         <Form.Label>username: </Form.Label>
                         <Form.Control type="text" v alue={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlID="formBasicPassword">
                         <Form.Label>password: </Form.Label>
                         <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="outline-danger" size="sm" block onClick={handleSubmit}>submit</Button>
               </Form>
          </Container>
     )
}