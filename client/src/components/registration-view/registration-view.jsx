import React, { useState } from 'react';
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { response } from 'express';

import './registration-view.scss';


export function RegistrationView() {
     const [username, createUsername] = useState('');
     const [password, createPassword] = useState('');
     const [email, createEmail] = useState('');
     const [birthday, createBirthday] = useState('');
};

const handleRegister = (e) => {
     e.preventDefault();

     const createdUser = {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
     };

     Axios
          .post('https://fataleflix.herokuapp.com/users', createdUser)
          .then((response) => {
               console.log(response);
               console.log(response.data);
               alert('Registered!');
               window.open('/client', '_self');
          })
          .catch((e) => {
               console.log(e.response);
               alert('there was an error.');
          });
};
return (
     <Container>
          <Form className="registration-form">
               <Form.Group controlID="formBasicUsername">
                    <Form.Label>username</Form.Label>
                    <Form.Control
                         type="text"
                         placeholder="think of a username!"
                         value={username} onChange={(e) => createUsername(e.target.value)} />
               </Form.Group>
               <Form.Group controlID="formBasicPassword">
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" placeholder="type in your most secure password" value={password} onChange={(e) => createPassword(e.target.value)} />
               </Form.Group>
               <Form.Group controlID="formBasicEmail">
                    <Form.Label>email</Form.Label>
                    <Form.Control type="email" placeholder="enter your email here!" value={email} onChange={(e) => createEmail(e.target.value)} />
               </Form.Group>
               <Form.Group controlID="formBasicBirthday">
                    <Form.Label>birthdate</Form.Label>
                    <Form.Control type="text" value={birthday} onChange={(e) => createBirthday(e.target.value)} />
               </Form.Group>
               <Button variant="outline-danger" size="sm" block onClick={handleRegister}>register</Button>
          </Form>
     </Container>
);