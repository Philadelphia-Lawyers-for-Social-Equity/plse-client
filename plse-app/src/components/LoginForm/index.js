import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import {withRouter} from 'react-router-dom';
import "./style.css";
import { Button, Container, Row, Col } from 'react-bootstrap';

class LoginForm extends Component {
    render() {
        return <Container><div className="text-center">
            <form>
                <Row>
                    <Col>
                        <p>Username</p>
                        <input
                            type="text"
                            name="username"
                            id="username"
                        //value={this.state.username}
                        //onChange={this.handleChange}
                        >
                        </input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Password</p>
                        <input
                            type="password"
                            name="password"
                            id="password"
                        // value={this.state.password}
                        // onChange={this.handleChange}
                        >
                        </input>
                    </Col>
                </Row>
                <Row><Col></Col></Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <Button id='SubmitButton'
                            variant="info"
                            // onClick={this.handleSubmit}
                            name="action">Submit
                                       </Button>
                    </Col>
                    <Col></Col>
                </Row>
            </form>
        </div>
        </Container>;
    }
}

export default LoginForm;