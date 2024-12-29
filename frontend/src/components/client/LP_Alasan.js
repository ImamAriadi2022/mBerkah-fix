import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './css/LP_Alasan.css';

const reasons = [
  'Proses seleksi yang ketat dan pelatihan yang memadai',
  'Pengalaman bertahun-tahun dalam penyaluran ART',
  'Pelayanan yang profesional dan terpercaya',
  'Kepuasan pelanggan yang tinggi',
  'Dukungan penuh untuk ART dan keluarga'
];

const LP_Alasan = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <Container className="my-5 alasan-section" ref={ref}>
      <h2 className={`text-center mb-4 ${inView ? 'animate__animated animate__fadeInDown' : ''}`}>Kenapa Harus Memilih Kami?</h2>
      <Row>
        <Col md={6} className={inView ? 'animate__animated animate__fadeInLeft' : ''}>
          <ul className='px-2 text-start'>
            {reasons.map((reason, index) => (
              <li key={index} className='px-5'>{reason}</li>
            ))}
          </ul>
        </Col>
        <Col md={6} className={inView ? 'animate__animated animate__fadeInRight' : ''}>
          <img src="path/to/your-image.jpg" alt="Kenapa Memilih Kami" className="img-fluid rounded" />
        </Col>
      </Row>
    </Container>
  );
};

export default LP_Alasan;