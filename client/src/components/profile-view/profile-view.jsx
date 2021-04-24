/**
 *@description this component allows the user to view and update their profile
 *@requires React
 *@requires axios
 *@requires React-Router-Dom
 *@requires React-Bootstrap
 *@access private
 */
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BrowserRouter, Link } from "react-router-dom";

import "./profile-view.scss";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      Queue: [],
      films: [],
    };
  }
  //   const { films, user, userInfo } = props;
  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    axios({
      method: "get",
      url: `https://fataleflix.herokuapp.com/users/${username}`,
      headers: {
        Authorization: `Bearer ${token}`,
        data: {},
      },
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
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token", "user");
    // this.setState({
    //      user: null
    // })
    window.open("/", "_self");
  }

  /**
   * deletes a user's profile
   *@function deleteUser
   *@param {string} user
   */

  deleteUser() {
    axios
      .delete(
        `https://fataleflix.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
          user: nullheroku,
        });
        window.open("/client/login", "_self");
      })
      .catch((error) => {
        alert("there was an error - your account could not be deleted" + error);
      });
  }
  /**
   * Deletes an added film from the queue
   *@function deleteQueueItem
   *@param {string} filmId
   */

  deleteQueueItem(filmID) {
    console.log(this.props.films);
    axios
      .delete(
        `https://fataleflix.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/queue/${filmID}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        alert("removed item from queue");
      })
      .catch((err) => {
        alert("error removing item" + err);
      });
  }

  render() {
    const { Queue, Username, Email, Birthday } = this.state;
    const { films } = this.props;
    const userQueue = this.state.Queue;
    const QueuedFilms = films.filter((film) => userQueue.includes(film._id));

    return (
      <div className="profile-view">
        <Container fluid>
          <Card style={{ width: "50%" }} className="profile-card">
            <Card.Body>
              <Card.Text>Username: {Username} </Card.Text>
              <Card.Text> Email: {Email} </Card.Text>
              <Card.Text>Birthday: {Birthday} </Card.Text>
              Queue:{" "}
              {QueuedFilms.map((film) => (
                <div key={film._id} className="queued-films-button">
                  <Link to={`/films/${film._id}`}>
                    <Button variant="outline-danger">{film.Title}</Button>
                  </Link>
                  <Button
                    variant="outline-danger"
                    onClick={(e) => this.deleteQueueItem(film._id)}
                  >
                    remove from queue
                  </Button>
                </div>
              ))}
              <br></br>
              <br></br>
              <div className="profile-button">
                <Link to="/update/:username">
                  <Button block variant="outline-danger">
                    update profile delete user
                  </Button>
                </Link>
                <Button
                  block
                  variant="outline-danger"
                  onClick={() => this.deleteUser()}
                >
                  delete user
                </Button>
                <Button
                  block
                  variant="outline-danger"
                  onClick={this.onLoggedOut.bind(this)}
                >
                  logout
                </Button>
              </div>
              ß
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, { setProfile })(ProfileView);
