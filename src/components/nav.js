import React from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const nav = () => (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light" inverse fluid>
    <Navbar.Brand href="/login">
      <img
        src="http://plsephilly.org/wp-content/uploads/2014/11/PLSE_logotype_320.png"
        width="90"
        height="30"
        className="d-inline-block align-top"
        alt="PLSE logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {/** Default Nav */}
        <Nav.Link>
          <Redirect to="/signup">Sign up</Redirect>
        </Nav.Link>

        <Nav.Link>
          <Redirect to="/login">Log in</Redirect>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default nav;
