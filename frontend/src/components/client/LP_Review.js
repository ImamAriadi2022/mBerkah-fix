import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './css/LP_Review.css';

const reviews = [
  {
    title: 'Jumlah ART Tersedia',
    value: 150,
    description: 'ART yang siap bekerja'
  }
];

const LP_Review = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <Container fluid className="my-5 review-section" ref={ref}>
      <Row className="justify-content-center">
        {reviews.map((review, index) => (
          <Col md={3} key={index} className="mb-4">
            <Card className="h-100 text-center animate__animated animate__fadeInUp">
              <Card.Body>
                <Card.Title>{review.title}</Card.Title>
                <Card.Text className="display-4">
                  {inView && <CountUp end={review.value} duration={4} suffix={review.suffix || ''} />}
                </Card.Text>
                <Card.Text>{review.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LP_Review;