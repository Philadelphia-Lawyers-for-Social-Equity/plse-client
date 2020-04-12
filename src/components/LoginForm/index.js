import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/auth";

export default function LoginForm() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  function postLogin() {
    const url = process.env.REACT_APP_BACKEND_HOST + "/api/v0.1.0/auth/token/";
    axios
      .post(url, {
        username: userName,
        password: password
      })
      .then(res => {
        if (res.status === 200) {
          setAuthTokens(res.data);
          localStorage.setItem("access_token", res.data.access);
          console.log(setAuthTokens);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch(err => {
        setIsError(true);
      });
  }

  if (isLoggedIn) {
    // get the profile
    const url = process.env.REACT_APP_BACKEND_HOST + "/api/v0.1.0/expunger/my-profile/";
    axios.get(url, config)
      .then(
        res => {
          if (res.status === 200) {
            // return data
            console.log(res.data);
          }
        });

    //return <Redirect to="/landing" />;
  }

  return (
    <div>
      <Form style={{ margin: `80px` }}>
        <Row>
          <Col md={4}></Col>
          <Col md={1}>
            <p>Username</p>
          </Col>
          <Col md={3}>
            <input
              type="text"
              name="username"
              id="username"
              value={userName}
              onChange={e => {
                setUserName(e.target.value);
              }}
            ></input>
          </Col>
          <Col md={4}></Col>
        </Row>

        <Row>
          <Col md={4}></Col>
          <Col md={1}>
            <p>Password</p>
          </Col>
          <Col md={3}>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            ></input>
          </Col>
          <Col md={4}></Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col md={5}></Col>
          <Col md={2}>
            <Button
              id="SubmitButton"
              variant="info"
              onClick={postLogin}
              name="action"
            >
              Submit
            </Button>
            {isError && (
              <div>The username or password provided were incorrect</div>
            )}
          </Col>
          <Col md={5}></Col>
        </Row>
      </Form>
    </div>
  );
}
