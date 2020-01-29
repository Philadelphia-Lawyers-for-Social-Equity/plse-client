import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const nav = () => (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light" inverse fluid>
    <Navbar.Brand href="#home">
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
        <Nav.Link>
          <Link to="/login">Home Page</Link>
        </Nav.Link>

        <Nav.Link>
          <Link to="/admin">Admin Page</Link>
        </Nav.Link>

        <Nav.Link>
          <Link to="/profile">Profile Page</Link>
        </Nav.Link>

        <Nav.Link>
          <Link to="/signout">Sign Out</Link>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default nav;
