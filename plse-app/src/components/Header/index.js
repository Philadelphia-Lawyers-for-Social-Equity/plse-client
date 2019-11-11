import React, { Component } from 'react';
import "./style.css";
import { Navbar } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Navbar bg="light">
                <Navbar.Brand href="/landing">
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
                        {/* Signed in as: <a href="#login">John Doe</a> */}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;