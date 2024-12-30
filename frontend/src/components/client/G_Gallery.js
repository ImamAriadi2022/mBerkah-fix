import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/G_Gallery.css';

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get('https://api.mutiaraberkah.my.id/api/gallery/read_media.php');
      if (Array.isArray(response.data)) {
        setMedia(response.data);
      } else {
        console.error('Data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const handleShow = (media) => {
    setSelectedMedia(media);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedMedia(null);
  };

  const videos = media.filter(item => item.type === 'video');
  const photos = media.filter(item => item.type === 'photo');

  return (
    <Container className="my-5 gallery-container">
      <h2 className="text-center mb-4">Galeri Video</h2>
      <Row>
        {videos.map(video => (
          <Col md={4} key={video.id} className="mb-4">
            <Card className="media-card" onClick={() => handleShow(video)}>
              <Card.Img variant="top" src={`data:image/jpeg;base64,${video.thumbnail}`} alt={video.title} />
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
              <Card.Img variant="top" src={`data:image/jpeg;base64,${photo.thumbnail}`} alt={photo.title} />
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
            {selectedMedia.type === 'video' ? (
              <ReactPlayer url={`data:video/mp4;base64,${selectedMedia.media}`} className="react-player" width="100%" height="100%" controls />
            ) : (
              <img src={`data:image/jpeg;base64,${selectedMedia.media}`} alt={selectedMedia.title} className="img-fluid" />
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