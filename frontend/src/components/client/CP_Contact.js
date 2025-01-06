import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaWhatsapp, FaPhone, FaEnvelope, FaInstagram, FaGlobe, FaTiktok } from 'react-icons/fa';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CP_Contact.css';

const CP_Contact = () => {
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await axios.get('https://api.mutiaraberkah.my.id/api/kontak/read.php');
      if (Array.isArray(response.data) && response.data.length > 0) {
        setContactInfo(response.data[0]);
      } else {
        console.error('Data bukan array atau kosong:', response.data);
      }
    } catch (error) {
      console.error('Error mengambil informasi kontak:', error);
    }
  };

  return (
    <Container>
      <Row className="p-5">
        <Col md={6} className="contact-info text-start">
          <h2>Kontak Kami</h2>
          <p><FaWhatsapp /> WhatsApp: {contactInfo.whatsapp}</p>
          <p><FaPhone /> Telepon: {contactInfo.phone}</p>
          <p><FaEnvelope /> Email: {contactInfo.email}</p>
          <p><FaInstagram /> Instagram: {contactInfo.instagram}</p>
          <p><FaTiktok /> TikTok: {contactInfo.tiktok}</p>
          <p><FaGlobe /> Website: {contactInfo.website}</p>
          <p>Alamat: {contactInfo.address}</p>
        </Col>
        <Col md={6}>
          <iframe
            src={contactInfo.googleMapEmbed}
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            title="Lokasi Kami"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default CP_Contact;