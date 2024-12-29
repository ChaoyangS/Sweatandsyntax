import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.css";

export default function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/login">
          {" "}
          {/* Updated to use Link */}
          Sweat and Syntax
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Uncomment if needed */}
            {/* <Nav.Link as={Link} to="/aiplan">AI generated Plans</Nav.Link> */}
            <NavDropdown title="More" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/aboutus">
                {" "}
                {/* Updated */}
                About Us
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contactus">
                {" "}
                {/* Updated */}
                Contact Us
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">
              {" "}
              {/* Updated */}
              Log In
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" eventKey={2}>
              {" "}
              {/* Updated */}
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
