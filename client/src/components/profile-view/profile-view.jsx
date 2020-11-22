import React from 'react';
import axios from 'axios';

import './profile-view.scss';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

     constructor() {
          super();
          this.state = {
               username: null,
               password: null,
               email: null,
               birthday: null,
               queue: [],
               films: []
          };
     }

     componentDidMount() {
          const accessToken = localStorage.getItem('token');
          this.getUser(accessToken);
     }

     getUser(token) {
          const username = localStorage.getItem('user');

          axios
               .get(`https://fataleflix.herokuapp.com/users/${username}`, {
                    headers: { Authorization: `Bearer ${token}` },
               })
               .then((res) => {
                    this.setState({
                         Username: res.data.Username,
                         Password: res.data.Password,
                         Email: res.data.Email,
                         Birthday: res.data.Birthday,
                         Queue: res.data.Queue,
                    });
               })
               .catch(function (err) {
                    console.log(err);
               });
     }

     deleteQueueItem(filmID) {
          console.log(this.props.films);
          axios
               .delete(`https://fataleflix.herokuapp.com/users/${localStorage.getItem('user')}/Films/${filmID}`,
                    {
                         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }
               )
               .then((res) => {
                    alert('removed item from queue');
               })
               .catch((err) => {
                    alert('error removing item' + err);
               });
     }

     deleteUser(e) {
          axios
               .delete(`https://fataleflix.herokuapp.com/users/${localStorage.getItem('user')}`,
                    {
                         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }
               )
               .then((res) => {
                    alert('this account has been deleted.');
                    localStorage.removeItem('token', 'user');
                    window.open('/');
               })
               .catch((event) => {
                    alert('this account has not been delete.');
               });
     }

     render() {
          const { films } = this.props;

          const QueueList = films.filter((film) =>
               this.state.Queue.includes(film._id));

          return (
               <Container>
                    <div className="profile-view">
                         <Card style={{ width: '25rem' }}>
                              <Card.Body>
                                   <Card.Text>Username: {this.state.Username} </Card.Text>
                                   <Card.Text> Email: {this.state.Email} </Card.Text>
                                   <Card.Text>Birthday: {this.state.Birthday} </Card.Text>
                                    Queue: {QueueList.map((film) => (
                                        <div key={film._id} className='queued-films-button'>
                                             <Link to={`/films/${film._id}`}>
                                                  <Button variant="outline-danger">{film.Title}</Button>
                                             </Link>
                                             <Button variant="outline-danger" onClick={(e) => this.deleteQueueItem(film._id)}>remove from queue</Button></div>
                                   ))}
                                   <Link to={'/'}>
                                        <Button variant="outline-danger">back</Button>
                                   </Link>
                              </Card.Body>
                         </Card>
                    </div>
               </Container>
          );
     }
}