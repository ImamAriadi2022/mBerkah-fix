import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/AL_list.css';

const initialARTs = [
  { id: 1, name: 'Siti', address: 'Jakarta', age: 25, profession: 'Baby Sitter', willingToWork: 'Jakarta', profile: 'Siti adalah seorang baby sitter profesional dengan pengalaman 5 tahun.', image: 'path/to/siti.jpg' },
  { id: 2, name: 'Ani', address: 'Bandung', age: 30, profession: 'Housekeeper', willingToWork: 'Bandung', profile: 'Ani adalah seorang housekeeper yang andal dengan pengalaman 10 tahun.', image: 'path/to/ani.jpg' },
  { id: 3, name: 'Budi', address: 'Surabaya', age: 28, profession: 'Driver', willingToWork: 'Surabaya', profile: 'Budi adalah seorang driver berpengalaman dengan pengalaman 8 tahun.', image: 'path/to/budi.jpg' },
  // Tambahkan lebih banyak ART sesuai kebutuhan
];

const AL_list = () => {
  const [arts, setArts] = useState(initialARTs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedART, setSelectedART] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (art) => {
    setSelectedART(art);
    setShow(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredARTs = arts.filter(art =>
    art.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.age.toString().includes(searchTerm)
  );

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Daftar ART</h2>
      <Form.Control
        type="text"
        placeholder="Cari berdasarkan profesi atau umur"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />
      <Row>
        {filteredARTs.length > 0 ? (
          filteredARTs.map(art => (
            <Col md={4} key={art.id} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={art.image} alt={art.name} />
                <Card.Body>
                  <Card.Title>{art.name}</Card.Title>
                  <Card.Text><strong>Alamat Asal:</strong> {art.address}</Card.Text>
                  <Card.Text><strong>Usia:</strong> {art.age}</Card.Text>
                  <Card.Text><strong>Profesi:</strong> {art.profession}</Card.Text>
                  <Card.Text><strong>Bersedia Kerja di:</strong> {art.willingToWork}</Card.Text>
                  <Button variant="primary" onClick={() => handleShow(art)}>Detail Profil</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">Data tidak ada</p>
          </Col>
        )}
      </Row>

      {selectedART && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detail Profil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedART.image} alt={selectedART.name} className="img-fluid rounded mb-3" />
            <p><strong>Nama:</strong> {selectedART.name}</p>
            <p><strong>Alamat Asal:</strong> {selectedART.address}</p>
            <p><strong>Usia:</strong> {selectedART.age}</p>
            <p><strong>Profesi:</strong> {selectedART.profession}</p>
            <p><strong>Bersedia Kerja di:</strong> {selectedART.willingToWork}</p>
            <p><strong>Profil:</strong> {selectedART.profile}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default AL_list;