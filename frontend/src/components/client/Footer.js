import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaYoutube, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Footer.css';

const socialLinks = {
  instagram: 'https://www.instagram.com/yourprofile',
  youtube: 'https://www.youtube.com/yourchannel',
  facebook: 'https://www.facebook.com/yourpage',
  whatsapp: 'https://wa.me/yourwhatsappnumber'
};

const email = '082120116224';
const location = 'RJ8R+P94 Sukasari, Kota Tangerang, Banten';

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row>
          <Col md={4} className="footer-col">
            <h4>PT Nika Mutiara Berkah</h4>
            <div className="social-icons">
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            </div>
            <p>&copy; 2024 Developed by <a href="https://cbraind.my.id" target="_blank" rel="noopener noreferrer">CreativeBraind</a></p>
          </Col>
          <Col md={4} className="footer-col">
            <h4>Tentang Kami</h4>
            <p>Kami adalah agensi penyaluran asisten rumah tangga yang berkomitmen untuk menyediakan layanan terbaik bagi keluarga Anda.</p>
          </Col>
          <Col md={4} className="footer-col">
            <h4>Kontak</h4>
            <p>WhatsApp: <a href={`mailto:${email}`}>{email}</a></p>
            <p>Lokasi: {location}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;