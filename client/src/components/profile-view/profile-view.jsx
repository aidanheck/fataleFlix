/* eslint-disable no-underscore-dangle */
/**
 *@description this component allows the user to view and update their profile
 *@requires React
 *@requires axios
 *@requires React-Router-Dom
 *@requires React-Bootstrap
 *@access private
 */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Tabs, Tab, Form } from 'react-bootstrap';

export class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.Username = null,
    this.Password = null,
    this.Email = null,
    this.Birthday = null;

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      Queue: [],
    };
  }

  //   const { films, user, userInfo } = props;
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://fataleflix.herokuapp.com/users/${username}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          Queue: res.data.Queue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * deletes a user's profile
   *@function deleteUser
   *@param {string} user
   */

  /**
   * Deletes an added film from the queue
   *@function deleteQueueItem
   *@param {string} filmId
   */

  deleteQueueItem(e, film) {
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .delete(
        `https://fataleflix.herokuapp.com/users/${username}/films/${film}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        alert('removed item from queue');
      })
      .catch((err) => {
        alert(`error removing item ${err}`);
      });
  }

  updateUser(e, newUsername, newEmail, newBirthday) {
    this.setState({
    });

    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios({
      method: 'put',
      url: `https://fataleflix.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername || this.state.Username,
        Password: this.Password,
        Email: newEmail || this.state.Email,
        Birthday: newBirthday || this.state.Birthday,
      },
    })
      .then((response) => {
        alert('account has been updated');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/client/users/${username}`, '_self');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  deleteUser(e) {
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios({
      method: 'delete',
      url: `https://fataleflix.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('account removed');
        window.open('/client', '_self');
      })
      .catch((e) => {
        console.log('error removing account');
      });
  }

  render() {
    const {
      Queue, Username, Email, Birthday,
    } = this.state;
    const { films } = this.props;

    return (
      <div className="profile-view">
        <Container fluid>
          <Tabs defaultActiveKey="profile" transition={false} className="profile-tabs">
            <Tab className="tab-item" eventKey="profile" title="profile">
              <Card style={{ width: '50%' }} className="profile-card">
                <Card.Body>
                  <Card.Text>
                    Username:
                    {' '}
                    {Username}
                    {' '}
                  </Card.Text>
                  <Card.Text>
                    {' '}
                    Email:
                    {' '}
                    {Email}
                    {' '}
                  </Card.Text>
                  <Card.Text>
                    Birthday:
                    {' '}
                    {Birthday}
                    {' '}
                  </Card.Text>
                  <Card.Text>
                    Queue:
                    <div className="queue-container">
                      <ul className="queue-list">
                        {Queue.length > 0
                      && films.map((film) => {
                        if (film._id === Queue.find((queuedFilm) => queuedFilm === film._id)) {
                          return (
                            <li className="queued-item" key={film._id}>
                              {film.Title}
                              <Button size="sm" className="remove-queue" onClick={(e) => this.deleteQueueItem(e, film._id)}>remove</Button>
                            </li>
                          );
                        }
                      })}
                      </ul>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Tab>
            <Tab className="tab-item" eventKey="update" title="update">
              <Card className="update-card">
                <h1 className="profile-title">update account</h1>
                <Card.Body>
                  <Form className="update-form" onSubmit={(e) => this.updateUser(e, this.Username, this.Password, this.Email, this.Birthday)}>
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label className="form-label">username:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="edit username"
                        defaultValue={Username}
                        onChange={(e) => this.setUsername(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label className="form-label">password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="enter password"
                        defaultValue=""
                        onChange={(e) => this.setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label className="form-label">email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="edit email"
                        defaultValue={Email}
                        onChange={(e) => this.setEmail(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        a password is required
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicBirthday">
                      <Form.Label className="form-label">birthday</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="edit birthday"
                        defaultValue={Birthday}
                        onChange={(e) => this.setBirthday(e.target.value)}
                      />
                    </Form.Group>
                    <Button className="update" variant="outline-danger" size="sm">Update</Button>
                  </Form>
                  <div className="button-container">
                    <Link to="/">
                      <Button className="back-button" block>back</Button>
                    </Link>
                    <Button className="delete-user" block onClick={(e) => this.deleteUser(e)}>delete account</Button>
                  </div>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Queue: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      }),
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};
