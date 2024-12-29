import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaWhatsapp, FaPhone, FaEnvelope, FaInstagram, FaGlobe } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CP_Contact.css';

const contactInfo = {
  whatsapp: '+6281234567890',
  phone: '+622123456789',
  email: 'contact@example.com',
  instagram: '@example',
  website: 'www.example.com',
  address: 'Jl. Contoh No. 123, Jakarta',
  googleMapLink: 'https://www.google.com/maps/place/Jl.+Contoh+No.+123,+Jakarta',
  googleMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.1234567890123!2d106.12345678901234!3d-6.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e123456789012345%3A0x123456789012345!2sJl.+Contoh+No.+123%2C+Jakarta!5e0!3m2!1sen!2sid!4v1234567890123'
};

const CP_Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
      `Nama: ${formData.name}\nEmail: ${formData.email}\nNo HP: ${formData.phone}\nPesan: ${formData.message}`
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className="hero-section-contact" style={{ backgroundImage: `url('/img/Contact/contact.jpg')` }}>
        <div className="hero-content-contact px-5">
          <h1>Hubungi Kami</h1>
          <p>Kami siap membantu Anda. Silakan hubungi kami melalui kontak di bawah ini atau tinggalkan pesan Anda.</p>
        </div>
      </div>
      <Container className="my-5 contact-container">
        <Row>
          <Col md={6} className="text-start">
            <h2>Kontak Kami</h2>
            <ul className="list-unstyled">
              <li><FaWhatsapp /> WhatsApp: <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">{contactInfo.whatsapp}</a></li>
              <li><FaPhone /> Telepon: <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></li>
              <li><FaEnvelope /> Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
              <li><FaInstagram /> Instagram: <a href={`https://instagram.com/${contactInfo.instagram}`} target="_blank" rel="noopener noreferrer">{contactInfo.instagram}</a></li>
              <li><FaGlobe /> Website: <a href={`https://${contactInfo.website}`} target="_blank" rel="noopener noreferrer">{contactInfo.website}</a></li>
            </ul>
            <h3>Alamat Kami</h3>
            <p>{contactInfo.address}</p>
            <iframe
              src={contactInfo.googleMapEmbed}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </Col>
          <Col md={6} className="text-start">
            <h2>Tinggalkan Pesan Disini</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>No HP</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pesan</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Kirim Pesan
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CP_Contact;