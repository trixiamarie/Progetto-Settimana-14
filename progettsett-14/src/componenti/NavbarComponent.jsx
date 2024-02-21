import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Link to={"/"} style={{textDecoration:"none"}}><Navbar.Brand>Prog.Set.14</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Link to={"/"} className="nav-link">
              Home
            </Link> */}
            <Link to={"/"} className="nav-link">
              Posts
            </Link>
            <Link to={"/users"} className="nav-link">
              Users
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
