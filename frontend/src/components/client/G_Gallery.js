import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/G_Gallery.css';

const videos = [
  { id: 1, title: 'Video 1', url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U', description: 'Deskripsi Video 1', thumbnail: 'https://img.youtube.com/vi/ysz5S6PUM-U/0.jpg' },
  { id: 2, title: 'Video 2', url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', description: 'Deskripsi Video 2', thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/0.jpg' },
  { id: 3, title: 'Video 3', url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', description: 'Deskripsi Video 3', thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/0.jpg' },
  // Add more videos as needed
];

const Gallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = (video) => {
    setSelectedVideo(video);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedVideo(null);
  };

  return (
    <Container className="my-5 gallery-container">
      <h2 className="text-center mb-4">Galeri Video</h2>
      <Row>
        {videos.map(video => (
          <Col md={4} key={video.id} className="mb-4">
            <Card className="video-card" onClick={() => handleShow(video)}>
              <Card.Img variant="top" src={video.thumbnail} alt={video.title} />
              <Card.Body>
                <Card.Title>{video.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedVideo && (
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedVideo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactPlayer url={selectedVideo.url} className="react-player" width="100%" height="100%" controls />
            <p className="mt-3">{selectedVideo.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Gallery;