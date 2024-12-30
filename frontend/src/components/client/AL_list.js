import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/AL_list.css';

const AL_list = () => {
  const [arts, setArts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedART, setSelectedART] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchApprovedARTs();
  }, []);

  const fetchApprovedARTs = async () => {
    try {
      const response = await axios.get('https://api.mutiaraberkah.my.id/api/art/read_approved.php');
      if (Array.isArray(response.data)) {
        setArts(response.data);
      } else {
        console.error('Data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching approved ARTs:', error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (art) => {
    setSelectedART(art);
    setShow(true);
  };

  const filteredARTs = arts.filter(art =>
    art.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.usia.toString().includes(searchTerm) ||
    art.agama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1>Daftar Asisten rumah tangga</h1>
          <Form.Control
            type="text"
            placeholder="Cari arti berdasarkan nama, umur, agama dan kemampuan"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <Row>
            {filteredARTs.map((art) => (
              <Col md={4} key={art.id} className="mb-4">
                <Card className="h-100 text-center">
                  <Card.Img variant="top" src={`data:image/jpeg;base64,${art.foto}`} />
                  <Card.Body>
                    <Card.Title>{art.nama}</Card.Title>
                    <Card.Text>{art.profession}</Card.Text>
                    <Card.Text>{art.willingToWork}</Card.Text>
                    <Button variant="primary" onClick={() => handleShow(art)}>Lihat lebih detail</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {selectedART && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedART.nama}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Tempat Tanggal Lahir:</strong> {selectedART.tempatTanggalLahir}</p>
            <p><strong>Usia:</strong> {selectedART.usia}</p>
            <p><strong>Tinggi:</strong> {selectedART.tinggi}</p>
            <p><strong>Berat Badan:</strong> {selectedART.beratBadan}</p>
            <p><strong>Jenis Kelamin:</strong> {selectedART.jenisKelamin}</p>
            <p><strong>Kewarganegaraan:</strong> {selectedART.kewarganegaraan}</p>
            <p><strong>Agama:</strong> {selectedART.agama}</p>
            <p><strong>Status:</strong> {selectedART.status}</p>
            <p><strong>Pendidikan:</strong> {selectedART.pendidikan}</p>
            <p><strong>Pengalaman:</strong> {selectedART.pengalaman}</p>
            <p><strong>Kemampuan:</strong> {selectedART.skills.join(', ')}</p>
            <p><strong>Profile:</strong> {selectedART.profile}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default AL_list;