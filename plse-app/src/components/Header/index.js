import React, { Component } from 'react';
import "./style.css";
import { Image, Col, Row } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Row>
                <Col xs={6} md={4}>
                    <Image src="./assets/PLSE_logotype_320.png" />
                </Col>
            </Row>
        )
    }
}

export default Header;