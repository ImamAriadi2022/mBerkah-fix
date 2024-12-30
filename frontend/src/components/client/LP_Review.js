import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './css/LP_Review.css';

const LP_Review = () => {
  const [reviews, setReviews] = useState([]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('https://api.mutiaraberkah.my.id/api/data/read.php');
      if (Array.isArray(response.data)) {
        setReviews(response.data);
      } else {
        console.error('Data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

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