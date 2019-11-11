import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import {withRouter} from 'react-router-dom';
import "./style.css";
import { Button, ButtonGroup, Modal, Col } from 'react-bootstrap';

class LandingPage extends Component {
    render() {
        return <div className="text-center">

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