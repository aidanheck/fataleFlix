import React, { useState } from 'react';
import './registration-view.scss';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
     const [username, createUsername] = useState("");
     const [password, createPassword] = useState("");
     const [email, createEmail] = useState("");
     const [birthday, createBirthday] = useState("");
};

return (
     <Form className="registration-form">
          <Form.Group controlID="formBasicUsername">
               <Form.Label>username</Form.Label>
               <Form.Control type="text" placeholder="think of a username :)" value={username} onChange={(e) => createUsername(e.target.value)}/>
          </Form.Group>
          <Form.Group controlID="formBasicPassword">
               <Form.Label>password</Form.Label>
               <Form.Control type="password" placeholder="type in your most secure password" value={password} onChange={(e) => createPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group controlID="formBasicEmail">
               <Form.Label>email</Form.Label>
               <Form.Control type="email" placeholder="enter your email here!" value={email} onChange={(e) => createEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group controlID="formBasicBirthday">
               <Form.Label>birthdate</Form.Label>
               <Form.Control type="text" value={birthday} onChange={(e) => createBirthday(e.target.value)}/>
          </Form.Group>
          <Button variant="outline-danger" size="sm" block onClick={handleRegister}>register</Button> 
     </Form>
);
