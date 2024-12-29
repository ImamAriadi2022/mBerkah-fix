import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/LP_TentangKami.css';

const LP_TentangKami = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = 'Kami didirikan pada tahun 2000 dengan tujuan menyediakan layanan asisten rumah tangga terbaik.';
  const employees = '150';
  const certifications = [
    { name: 'ISO 9001', description: 'Quality management systems', image: 'path/to/iso9001.jpg' },
    { name: 'ISO 14001', description: 'Environmental management systems', image: 'path/to/iso14001.jpg' },
    { name: 'OHSAS 18001', description: 'Occupational health and safety management systems', image: 'path/to/ohsas18001.jpg' }
  ];
  const location = 'Jl. Contoh No. 123, Jakarta';
  const googleMapLink = 'https://www.google.com/maps/place/Jl.+Contoh+No.+123,+Jakarta';
  const googleMapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.1234567890123!2d106.12345678901234!3d-6.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e123456789012345%3A0x123456789012345!2sJl.+Contoh+No.+123%2C+Jakarta!5e0!3m2!1sen!2sid!4v1234567890123';

  return (
    <Container className="my-5 tentang-kami-section" id="about">
      <h2 className="text-center mb-4">Tentang Kami</h2>
      <Row>
        <Col md={6} className="mb-4">
          <img src="path/to/about-us-image.jpg" alt="About Us" className="img-fluid rounded" />
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
          <p><strong>Sejarah Perusahaan:</strong> {history}</p>
          <p><strong>Jumlah Pegawai:</strong> {employees}</p>
          <p><strong>Sertifikasi:</strong></p>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-3">
              <img src={cert.image} alt={cert.name} className="img-fluid rounded mb-2" style={{ maxWidth: '100px' }} />
              <p><strong>{cert.name}:</strong> {cert.description}</p>
            </div>
          ))}
          <p><strong>Lokasi:</strong> <a href={googleMapLink} target="_blank" rel="noopener noreferrer">{location}</a></p>
          <iframe
            src={googleMapEmbed}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
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