import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/LP_TentangKami.css';

const LP_TentangKami = () => {
  return (
    <Container className="my-5 tentang-kami-section" id="about">
      <h2 className="text-center mb-4">Tentang Kami</h2>
      <Row>
        <Col md={6} className="mb-4">
          <img src="path/to/about-us-image.jpg" alt="About Us" className="img-fluid rounded" />
        </Col>
        <Col md={6} className="text-start">
          <p>
            Kami adalah agensi penyaluran asisten rumah tangga yang berkomitmen untuk menyediakan layanan terbaik bagi keluarga Anda. 
            Dengan pengalaman bertahun-tahun, kami memastikan bahwa setiap asisten rumah tangga yang kami salurkan telah melalui proses seleksi yang ketat dan pelatihan yang memadai.
          </p>
          <p>
            Visi kami adalah menjadi agensi terpercaya yang dapat diandalkan oleh setiap keluarga dalam memenuhi kebutuhan asisten rumah tangga. 
            Misi kami adalah memberikan layanan yang profesional, aman, dan berkualitas tinggi.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LP_TentangKami;