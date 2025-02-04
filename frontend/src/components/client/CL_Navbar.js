import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CL_Navbar.css';

const CL_Navbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="font-weight-bold">
          <img src="img/LogoNika.png" alt="Nika Mutiara Berkah" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Beranda</Nav.Link>
            <Nav.Link href="/search">Mencari Pekerja</Nav.Link>
            <Nav.Link href="/register">Menjadi Pekerja</Nav.Link>
            <Nav.Link href="/#about">Tentang Kami</Nav.Link>
            <Nav.Link href="/gallery">Galeri</Nav.Link>
            <Nav.Link href="/contact">Hubungi Kami</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CL_Navbar;