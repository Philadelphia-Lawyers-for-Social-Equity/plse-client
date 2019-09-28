import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import {withRouter} from 'react-router-dom';
import "./style.css";
import { Button, ButtonGroup, Container, Modal, Col } from 'react-bootstrap';

class LandingPage extends Component {
    render() {
        return <Container>
            <div className="text-center">

            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Attorneys</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Col>
                        Please select the attorney that you will be filing for:
                    <ButtonGroup vertical >
                            <Button>Carl Oxholm III</Button>
                            <Button>Rachel Miller</Button>
                            <Button>Taylor Pacheco</Button>
                            <Button>Sarah Coyle</Button>
                            <Button>Executive Director</Button>
                        </ButtonGroup>
                    </Col>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Select</Button>
                </Modal.Footer>
            </Modal.Dialog>


        </div>
        </Container>;
    }
}

export default LandingPage;