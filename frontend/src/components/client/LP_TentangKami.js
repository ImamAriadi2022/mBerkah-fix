import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/LP_TentangKami.css';

const LP_TentangKami = () => {
  const [show, setShow] = useState(false);
  const [tentang, setTentang] = useState({});
  const [sertifikasi, setSertifikasi] = useState([]);

  useEffect(() => {
    fetchTentang();
    fetchSertifikasi();
  }, []);

  const fetchTentang = async () => {
    try {
      const response = await axios.get('https://api.mutiaraberkah.my.id/api/tentang/read.php');
      if (Array.isArray(response.data) && response.data.length > 0) {
        setTentang(response.data[0]);
      } else {
        console.error('Data tentang is not an array or is empty:', response.data);
      }
    } catch (error) {
      console.error('Error fetching tentang:', error);
    }
  };

  const fetchSertifikasi = async () => {
    try {
      const response = await axios.get('https://api.mutiaraberkah.my.id/api/sertifikat/read.php');
      if (Array.isArray(response.data)) {
        setSertifikasi(response.data);
      } else {
        console.error('Data sertifikasi is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching sertifikasi:', error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="my-5 tentang-kami-section" id="about">
      <h2 className="text-center mb-4">Tentang Kami</h2>
      <Row>
        <Col md={6} className="mb-4">
          <img src="img/landing/about.jpg" alt="About Us" className="img-fluid rounded hero-image" />
        </Col>
        <Col md={6} className="text-start p-4">
          <p>
            Kami adalah agensi penyaluran asisten rumah tangga yang berkomitmen untuk menyediakan layanan terbaik bagi keluarga Anda. 
            Dengan pengalaman bertahun-tahun, kami memastikan bahwa setiap asisten rumah tangga yang kami salurkan telah melalui proses seleksi yang ketat dan pelatihan yang memadai.
          </p>
          <p>
            Visi kami adalah menjadi agensi terpercaya yang dapat diandalkan oleh setiap keluarga dalam memenuhi kebutuhan asisten rumah tangga. 
            Misi kami adalah memberikan layanan yang profesional, aman, dan berkualitas tinggi.
          </p>
          <Button variant="primary" onClick={handleShow}>
            Detail Tentang Kami
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Tentang Kami</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Sejarah Perusahaan</Card.Title>
              <Card.Text>{tentang.history}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Jumlah Pegawai</Card.Title>
              <Card.Text>{tentang.employees}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Sertifikasi</Card.Title>
              <div className="cert-grid">
                {sertifikasi.map((cert, index) => (
                  <div key={index} className="text-center">
                    <img src={`data:image/jpeg;base64,${cert.image}`} alt={cert.name} className="img-fluid rounded mb-2" />
                    <p>{cert.name}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Lokasi</Card.Title>
              <p><a href={tentang.google_map_link} target="_blank" rel="noopener noreferrer">{tentang.location}</a></p>
              <iframe
                src={tentang.google_map_embed}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LP_TentangKami;