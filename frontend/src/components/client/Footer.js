import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaYoutube, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row>
          <Col md={4} className="footer-col">
            <h4>Agency Title</h4>
            <div className="social-icons">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            </div>
            <p>&copy; 2024 Developed by <a href="https://creativebraind.com" target="_blank" rel="noopener noreferrer">CreativeBraind</a></p>
          </Col>
          <Col md={4} className="footer-col">
            <h4>Tentang Kami</h4>
            <p>Kami adalah agensi penyaluran asisten rumah tangga yang berkomitmen untuk menyediakan layanan terbaik bagi keluarga Anda.</p>
          </Col>
          <Col md={4} className="footer-col">
            <h4>Kontak</h4>
            <p>Email: info@agency.com</p>
            <p>Lokasi: Jl. Contoh No. 123, Jakarta</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;