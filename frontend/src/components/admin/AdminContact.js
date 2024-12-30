import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/AdminContact.css';

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    whatsapp: '',
    phone: '',
    email: '',
    instagram: '',
    tiktok: '',
    website: '',
    address: '',
    googleMapLink: '',
    googleMapEmbed: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://api.mutiaraberkah.my.id/api/kontak/read.php');
      if (Array.isArray(response.data)) {
        setContacts(response.data);
      } else {
        console.error('Data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleShow = (contact) => {
    if (contact) {
      setFormData({
        whatsapp: contact.whatsapp,
        phone: contact.phone,
        email: contact.email,
        instagram: contact.instagram,
        tiktok: contact.tiktok,
        website: contact.website,
        address: contact.address,
        googleMapLink: contact.googleMapLink,
        googleMapEmbed: contact.googleMapEmbed
      });
      setSelectedContact(contact);
    } else {
      setFormData({
        whatsapp: '',
        phone: '',
        email: '',
        instagram: '',
        tiktok: '',
        website: '',
        address: '',
        googleMapLink: '',
        googleMapEmbed: ''
      });
      setSelectedContact(null);
    }
    setShow(true);
  };

  const handleClose = () => {
    setSelectedContact(null);
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = { ...formData };

    try {
      let response;
      if (selectedContact) {
        formDataToSend.id = selectedContact.id;
        response = await axios.post('https://api.mutiaraberkah.my.id/api/kontak/update.php', formDataToSend, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        response = await axios.post('https://api.mutiaraberkah.my.id/api/kontak/create.php', formDataToSend, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      console.log('Submit response:', response.data);
      fetchContacts();
      handleClose();
    } catch (error) {
      console.error('Error submitting contact:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('https://api.mutiaraberkah.my.id/api/kontak/delete.php', { id }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Delete response:', response.data);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <Container className="admin-contact-container">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="text-center mb-4">Kontak Admin</h1>
          <Button variant="primary" onClick={() => handleShow(null)} className="mb-4">Tambah Kontak</Button>
          <Row>
            {contacts.map((contact) => (
              <Col md={6} key={contact.id} className="mb-4">
                <Card className="h-100 text-center">
                  <Card.Body>
                    <Card.Title>{contact.email}</Card.Title>
                    <Card.Text>
                      <strong>WhatsApp:</strong> {contact.whatsapp}<br />
                      <strong>Phone:</strong> {contact.phone}<br />
                      <strong>Instagram:</strong> {contact.instagram}<br />
                      <strong>TikTok:</strong> {contact.tiktok}<br />
                      <strong>Website:</strong> {contact.website}<br />
                      <strong>Address:</strong> {contact.address}<br />
                    </Card.Text>
                    <Button variant="warning" onClick={() => handleShow(contact)} className="mr-2">Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(contact.id)}>Hapus</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedContact ? 'Edit Kontak' : 'Tambah Kontak'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formWhatsapp">
              <Form.Label>WhatsApp</Form.Label>
              <Form.Control type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formInstagram">
              <Form.Label>Instagram</Form.Label>
              <Form.Control type="text" name="instagram" value={formData.instagram} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formTikTok">
              <Form.Label>TikTok</Form.Label>
              <Form.Control type="text" name="tiktok" value={formData.tiktok} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control type="text" name="website" value={formData.website} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" name="address" value={formData.address} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formGoogleMapLink">
              <Form.Label>Google Map Link</Form.Label>
              <Form.Control type="text" name="googleMapLink" value={formData.googleMapLink} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formGoogleMapEmbed">
              <Form.Label>Google Map Embed</Form.Label>
              <Form.Control as="textarea" name="googleMapEmbed" value={formData.googleMapEmbed} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Simpan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminContact;