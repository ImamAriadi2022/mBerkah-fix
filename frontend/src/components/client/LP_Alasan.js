import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './css/LP_Alasan.css';

const reasons = [
  {
    point: 'Proses seleksi yang ketat dan pelatihan yang memadai',
    detail: 'Kami memastikan bahwa setiap asisten rumah tangga yang kami salurkan telah melalui proses seleksi yang ketat dan pelatihan yang memadai untuk memberikan layanan terbaik.'
  },
  {
    point: 'Pengalaman bertahun-tahun dalam penyaluran ART',
    detail: 'Dengan pengalaman bertahun-tahun, kami memiliki keahlian dan pengetahuan untuk menyalurkan asisten rumah tangga yang berkualitas.'
  },
  {
    point: 'Pelayanan yang profesional dan terpercaya',
    detail: 'Kami berkomitmen untuk memberikan pelayanan yang profesional dan terpercaya kepada setiap keluarga yang membutuhkan asisten rumah tangga.'
  },
  {
    point: 'Kepuasan pelanggan yang tinggi',
    detail: 'Kepuasan pelanggan adalah prioritas kami, dan kami bangga dengan tingkat kepuasan yang tinggi dari pelanggan kami.'
  },
  {
    point: 'Dukungan penuh untuk ART dan keluarga',
    detail: 'Kami memberikan dukungan penuh kepada asisten rumah tangga dan keluarga untuk memastikan hubungan kerja yang harmonis dan produktif.'
  }
];

const LP_Alasan = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [visibleDetail, setVisibleDetail] = useState(null);

  const toggleDetail = (index) => {
    setVisibleDetail(visibleDetail === index ? null : index);
  };

  return (
    <Container className="my-5 alasan-section" ref={ref}>
      <h2 className={`text-center mb-4 ${inView ? 'animate__animated animate__fadeInDown' : ''}`}>Kenapa Harus Memilih Kami?</h2>
      <Row>
        <Col md={6} className={inView ? 'animate__animated animate__fadeInLeft' : ''}>
          <ul className='px-2 text-start'>
            {reasons.map((reason, index) => (
              <li key={index} className='px-5' onClick={() => toggleDetail(index)}>
                {reason.point}
                <div className={`detail ${visibleDetail === index ? 'show' : ''}`}>
                  {reason.detail}
                </div>
              </li>
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