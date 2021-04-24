/**
 *@description this component allows the user to update their profile
 *@requires React
 *@requires axios
 *@requires React-Router-Dom
 *@requires React-Bootstrap
 *@access private
 */

import React, { useState } from "react";
import axios from "axios";
// import { BrowserRouter, Link } from "react-router-dom";

// import PropTypes from "prop-types";

import "./update-view.scss";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

export function UpdateView(props) {
  const { films, user, userInfo } = props;

  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const [birthday, updateBirthday] = useState("");

  /**
   * sends the user's updated info to the API
   *@function handleUpdate
   *@param {string} username
   *@param {string} password
   *@param {string} email
   *@param {string} birthday
   */
  const handleUpdate = (e) => {
    //prevents the default behavior of submitting the form
    e.preventDefault();
    //sends an update to the database
    axios
      .put(
        `https://fataleflix.herokuapp.com/update/${localStorage.getItem(
          "user"
        )}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        const data = response.data;
        alert("profile successfully updated");
        localStorage.setItem("user", data.Username);
      })
      .then((response) => {
        goBack();
      })
      .catch((error) => {
        alert("error updating profile");
      });
  };

  /**
   * goes back to previous page
   *@function goBack
   */
  const goBack = () => {
    history.back();
  };

  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>username</Form.Label>
        <Form.Control
          type="text"
          className="form"
          placeholder="Username"
          value={username}
          onChange={(e) => updateUsername(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>password</Form.Label>
        <Form.Control
          type="password"
          className="form"
          value={password}
          onChange={(e) => updatePassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>email</Form.Label>
        <Form.Control
          type="email"
          className="form"
          value={email}
          onChange={(e) => updateEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>birthday</Form.Label>
        <Form.Control
          type="date"
          className="form"
          value={birthday}
          onChange={(e) => updateBirthday(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <div className="button-group">
        <Button variant="outline-danger" type="submit" onClick={handleUpdate}>
          update
        </Button>
        <Button variant="outline-danger" className="btn" onClick={goBack}>
          back
        </Button>
      </div>
    </Form>
  );
}
