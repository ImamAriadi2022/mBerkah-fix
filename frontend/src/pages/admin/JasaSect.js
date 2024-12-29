import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar';
import Crud_jasa from '../../components/admin/Crud_jasa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/JasaSect.css';

const JasaSect = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Crud_jasa />
        </Col>
      </Row>
    </Container>
  );
};

export default JasaSect;