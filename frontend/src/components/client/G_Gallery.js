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

const photos = [
  { id: 4, title: 'Foto 1', url: 'path/to/photo1.jpg', description: 'Deskripsi Foto 1', thumbnail: 'path/to/photo1-thumbnail.jpg' },
  { id: 5, title: 'Foto 2', url: 'path/to/photo2.jpg', description: 'Deskripsi Foto 2', thumbnail: 'path/to/photo2-thumbnail.jpg' },
  { id: 6, title: 'Foto 3', url: 'path/to/photo3.jpg', description: 'Deskripsi Foto 3', thumbnail: 'path/to/photo3-thumbnail.jpg' },
  // Add more photos as needed
];

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = (media) => {
    setSelectedMedia(media);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedMedia(null);
  };

  return (
    <Container className="my-5 gallery-container">
      <h2 className="text-center mb-4">Galeri Video</h2>
      <Row>
        {videos.map(video => (
          <Col md={4} key={video.id} className="mb-4">
            <Card className="media-card" onClick={() => handleShow(video)}>
              <Card.Img variant="top" src={video.thumbnail} alt={video.title} />
              <Card.Body>
                <Card.Title>{video.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="text-center mb-4">Galeri Foto</h2>
      <Row>
        {photos.map(photo => (
          <Col md={4} key={photo.id} className="mb-4">
            <Card className="media-card" onClick={() => handleShow(photo)}>
              <Card.Img variant="top" src={photo.thumbnail} alt={photo.title} />
              <Card.Body>
                <Card.Title>{photo.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedMedia && (
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMedia.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedMedia.url.includes('youtube') ? (
              <ReactPlayer url={selectedMedia.url} className="react-player" width="100%" height="100%" controls />
            ) : (
              <img src={selectedMedia.url} alt={selectedMedia.title} className="img-fluid" />
            )}
            <p className="mt-3">{selectedMedia.description}</p>
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