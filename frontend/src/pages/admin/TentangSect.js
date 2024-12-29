import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar';
import Crud_Tentang from '../../components/admin/Crud_Tentang';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/TentangSect.css';

const TentangSect = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Crud_Tentang />
        </Col>
      </Row>
    </Container>
  );
};

export default TentangSect;