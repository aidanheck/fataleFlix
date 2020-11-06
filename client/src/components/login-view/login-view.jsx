import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
     const [ username, setUsername ] = useState('');
     const [ password, setPassword ] = useState('');

     const handleSubmit = () => {
          console.log(username, password);
          /* send a request to the server for authentication then call props.onLoggedIn(username)*/
     };

     return (
          <Container className="login-container">
               <Form>
                    <Form.Group controlID="formBasicUsername">
                         <Form.Label>username</Form.Label>
                         <Form.Control type="text"v alue={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlID="formBasicPassword">
                         <Form.Label>password</Form.Label>
                         <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
      <Button variant="outline-danger" size="sm" block onClick={handleSubmit}>submit</Button> 
               </Form>
          </Container>
     );
}