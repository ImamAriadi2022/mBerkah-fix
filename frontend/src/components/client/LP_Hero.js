import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/LP_Hero.css';

const LP_Hero = () => {
  return (
    <div className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-left">
            <h1 className="hero-title animate__animated animate__fadeInDown">Welcome to Our Agency</h1>
            <p className="hero-subtitle animate__animated animate__fadeInUp">We provide the best domestic helpers for your home</p>
            <Button variant="primary" className="animate__animated animate__zoomIn">Get Started</Button>
          </Col>
          <Col md={6} className="text-center">
            <img src="path/to/your/image.jpg" alt="Hero" className="img-fluid animate__animated animate__fadeInRight" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LP_Hero;