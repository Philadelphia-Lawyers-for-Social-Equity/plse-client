import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const SignUp = () => (
  <Container>
    <Row>
      {" "}
      <h1>Sign up</h1>
    </Row>

    <Row>
      <Form>
        <Form.Row>
          <Col>
            <Form.Label>First name</Form.Label>
            <Form.Control placeholder="First name" />
          </Col>
          <Col>
            <Form.Label>Last name</Form.Label>
            <Form.Control placeholder="Last name" />
          </Col>
        </Form.Row>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasic">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Row>
  </Container>
);

export default SignUp;
