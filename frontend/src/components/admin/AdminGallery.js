import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/AdminGallery.css';

const AdminGallery = () => {
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'video',
    media: null,
    thumbnail: null
  });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get('http://localhost/mBerkah-fix/backend/api/gallery/read_media.php');
      if (Array.isArray(response.data)) {
        setMedia(response.data);
      } else {
        console.error('Data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const handleShow = (media) => {
    setSelectedMedia(media);
    setShow(true);
  };

  const handleClose = () => {
    setSelectedMedia(null);
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost/mBerkah-fix/backend/api/gallery/create_media.php', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Create response:', response.data);
      fetchMedia();
      handleClose();
    } catch (error) {
      console.error('Error creating media:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('http://localhost/mBerkah-fix/backend/api/gallery/delete_media.php', { id }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Delete response:', response.data);
      fetchMedia();
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1>Galeri Media Admin</h1>
          <Button variant="primary" onClick={() => setShow(true)}>Tambah Media</Button>
          <Row className="mt-4">
            {media.map((item) => (
              <Col md={4} key={item.id} className="mb-4">
                <Card className="h-100 text-center">
                  <Card.Img variant="top" src={`data:image/jpeg;base64,${item.thumbnail}`} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button variant="danger" onClick={() => handleDelete(item.id)}>Hapus</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMedia ? 'Edit Media' : 'Tambah Media'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Judul</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Tipe</Form.Label>
              <Form.Control as="select" name="type" value={formData.type} onChange={handleChange} required>
                <option value="video">Video</option>
                <option value="photo">Foto</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formMedia">
              <Form.Label>Media</Form.Label>
              <Form.Control type="file" name="media" onChange={handleFileChange} required />
            </Form.Group>
            <Form.Group controlId="formThumbnail">
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control type="file" name="thumbnail" onChange={handleFileChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Simpan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminGallery;