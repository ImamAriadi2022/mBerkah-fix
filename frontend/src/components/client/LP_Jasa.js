import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/LP_Jasa.css';

const LP_Jasa = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await axios.get('http://localhost/mBerkah-fix/backend/api/jasa/read.php');
    setServices(response.data);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Perkerjaan yang kami tawarkan</h2>
      <Row>
        {services.map((service, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={`data:image/jpeg;base64,${service.image}`} alt={service.title} />
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LP_Jasa;