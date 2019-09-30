import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import {withRouter} from 'react-router-dom';
import "./style.css";
//import Header from "../Header"; 
import { Button, Form, Row, Col } from 'react-bootstrap';

class LoginForm extends Component {
    render() {
        return <div>
            <Form style={{ margin: `80px` }}>
                <Row>
                    <Col md={4}>
                    </Col>
                    <Col md={1}>
                        <p>Username</p>
                    </Col>
                    <Col md={3}>
                        <input 
                            type="text"
                            name="username"
                            id="username"
                        //value={this.state.username}
                        //onChange={this.handleChange}
                        >
                        </input>
                    </Col>
                    <Col md={4}>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                    </Col>
                    <Col md={1}>
                        <p>Password</p>
                    </Col>
                    <Col md={3}>
                        <input
                            type="password"
                            name="password"
                            id="password"
                        // value={this.state.password}
                        // onChange={this.handleChange}
                        >
                        </input>
                    </Col>
                    <Col md={4}>
                    </Col>
                </Row>
                <Row><Col></Col></Row>
                <Row>
                    <Col md={5}></Col>
                    <Col md={2}>
                        <Button id='SubmitButton'
                            variant="info"
                            // onClick={this.handleSubmit}
                            name="action">Submit
                                       </Button>
                    </Col>
                    <Col md={5}></Col>
                </Row>
            </Form>
        </div>

    }
}

export default LoginForm;