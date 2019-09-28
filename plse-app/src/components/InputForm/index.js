import React, { Component } from 'react';
// import {withRouter} from 'react-router-dom';
import "./style.css";
import { Button, Form, Col, Row } from 'react-bootstrap';

class InputForm extends Component {
  render() {
    return (
      <Row>
        <Col></Col>
        <Col md={6}>  
        
      <Form>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Col sm={3}>
          <Form.Label>
            Client's Name
          </Form.Label>
          </Col>
          <Col md={{ span: 3 }}>
            <Form.Control defaultValue="First Name" />
          </Col>
          <Col sm="5">
            <Form.Control defaultValue="Last Name" />
          </Col>

        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Col sm={3}>
          <Form.Label>
            Date of Birth
          </Form.Label>
          </Col>
          <Col md={{ span: 3 }}>
            <Form.Control defaultValue="mm/dd/yyyy" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Col sm={3}>
          <Form.Label>
            Address
          </Form.Label>
          </Col>
          <Col sm="7">
            <Form.Control defaultValue="Street Name, Number" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Col sm={3}>
          <Form.Label>     
          </Form.Label>
          </Col>
          <Col sm={2}>
            <Form.Control defaultValue="City" />
          </Col>
          <Col sm={2}>
            <Form.Control defaultValue="State" />
          </Col>
          <Col sm={2}>
            <Form.Control defaultValue="Zip" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Col sm={3}>
          <Form.Label>
            Social Security
          </Form.Label>
          </Col>
          <Col sm="4">
            <Form.Control defaultValue="###-##-####" />
          </Col>
        </Form.Group>

        <Row>

        <Col sm={3}>
        <Form.Label>     
          </Form.Label>
        </Col>
        <Col sm="4">
        <Button id="ExpungeButton" type="submit">
          Start Expunging
        </Button>
        </Col>
        </Row>
      </Form>
      
        </Col>
        <Col></Col>
      </Row>
    )
  }
}

export default InputForm;
