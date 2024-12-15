import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.css";

export default function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home">Sweat and Syntax</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#personalized">Personalized Plans</Nav.Link>
              <Nav.Link href="#aiplan">AI generated Plans</Nav.Link>
              <NavDropdown title="More" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#aboutus">About Us</NavDropdown.Item>
                <NavDropdown.Item href="#contactus">
                  Contact Us
                </NavDropdown.Item>
                <NavDropdown.Item href="#xxx">xxx</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#signin">Sign In</Nav.Link>
              <Nav.Link eventKey={2} href="#signup">
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
