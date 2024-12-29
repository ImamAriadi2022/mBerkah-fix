import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/LP_Jasa.css';

const services = [
  {
    title: 'Baby Sister',
    description: 'Professional baby sister services for your little ones.',
    image: 'path/to/baby-sister.jpg'
  },
  {
    title: 'Asisten Rumah Tangga',
    description: 'Reliable and trustworthy domestic helpers.',
    image: 'path/to/asisten-rumah-tangga.jpg'
  },
  {
    title: 'Suster Balita',
    description: 'Experienced caregivers for toddlers.',
    image: 'path/to/suster-balita.jpg'
  }
];

const LP_Jasa = () => {
  return (
    <Container className="my-5">
        <h2 className="text-center mb-4">Perkerjaan yang kami tawarkan </h2>
      <Row>
        {services.map((service, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={service.image} alt={service.title} />
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