import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import {withRouter} from 'react-router-dom';
import "./style.css";
import { Button, ButtonGroup, Navbar, Modal, Col } from 'react-bootstrap';

class LandingPage extends Component {
    render() {
        return <div className="text-center">
            <Navbar bg="light">
                <Navbar.Brand href="#home">
                    <img
                        src="http://plsephilly.org/wp-content/uploads/2014/11/PLSE_logotype_320.png"
                        width="90"
                        height="30"
                        className="d-inline-block align-top"
                        alt="PLSE logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">John Doe</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Attorneys</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Col>
                        Please select the attorney that you will be filing for:
                    <ButtonGroup vertical >
                            <Button id="attorneyNames">Carl Oxholm III</Button>
                            <Button id="attorneyNames">Rachel Miller</Button>
                            <Button id="attorneyNames">Taylor Pacheco</Button>
                            <Button id="attorneyNames">Sarah Coyle</Button>
                            <Button id="attorneyNames">Executive Director</Button>
                        </ButtonGroup>
                    </Col>
                </Modal.Body>

                <Modal.Footer>
                    <Button id="cancelButton">Cancel</Button>
                    <Button id="attorneyNames">Select</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>;
    }
}

export default LandingPage;