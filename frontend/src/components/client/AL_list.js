import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/AL_list.css';

const AL_list = () => {
    const [registrations, setRegistrations] = useState([]);
    const [filter, setFilter] = useState('ART');
    const [searchAge, setSearchAge] = useState('');
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchRegistrations();
    }, [filter, searchAge]);

    const fetchRegistrations = async () => {
        try {
            const response = await axios.get('https://api.mutiaraberkah.my.id/api/art/read.php');
            if (Array.isArray(response.data)) {
                const filteredData = response.data.filter(reg => reg.role === filter && (searchAge === '' || reg.usia === parseInt(searchAge)));
                setRegistrations(filteredData);
            } else {
                console.error('Data is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching registrations:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchAge(e.target.value);
    };

    const handleShow = (worker) => {
        setSelectedWorker(worker);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleHire = () => {
        const phoneNumber = "+6282120116224";
        const message = `Halo, saya tertarik untuk merekrut ${selectedWorker.nama} yang berusia ${selectedWorker.usia} tahun sebagai ${selectedWorker.role}.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Container className="al-list-container my-5">
            <h1 className="text-center mb-4">Daftar {filter}</h1>
            <div className="text-center mb-4 button-group">
                <Button variant="primary" onClick={() => setFilter('ART')} className="mr-2">ART</Button>
                <Button variant="primary" onClick={() => setFilter('Pengurus Lansia')} className="mr-2">Pengurus Lansia</Button>
                <Button variant="primary" onClick={() => setFilter('Baby Sister')}>Baby Sister</Button>
            </div>
            <Form className="mb-4">
                <Form.Group controlId="searchAge">
                    <Form.Label>Cari Berdasarkan Usia</Form.Label>
                    <Form.Control type="number" placeholder="Masukkan usia" value={searchAge} onChange={handleSearchChange} />
                </Form.Group>
            </Form>
            <Row className="justify-content-center">
                {registrations.length > 0 ? (
                    registrations.map((registration, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card className="h-100 text-center">
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${registration.foto}`} className="card-img-top mx-auto" />
                                <Card.Body>
                                    <Card.Title>{registration.nama}</Card.Title>
                                    <Card.Text>Usia: {registration.usia}</Card.Text>
                                    <Button variant="primary" onClick={() => handleShow(registration)}>Detail Profile</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center">No registrations to review.</p>
                )}
            </Row>

            {selectedWorker && (
                <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog">
                    <Modal.Header closeButton>
                        <Modal.Title>Detail Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card className="text-start">
                            <Card.Img variant="top" src={`data:image/jpeg;base64,${selectedWorker.foto}`} className="card-img-top mx-auto" />
                            <Card.Body>
                                <Card.Title>{selectedWorker.nama}</Card.Title>
                                <Card.Text>Tempat Tanggal Lahir: {selectedWorker.tempatTanggalLahir}</Card.Text>
                                <Card.Text>Usia: {selectedWorker.usia}</Card.Text>
                                <Card.Text>Tinggi: {selectedWorker.tinggi}</Card.Text>
                                <Card.Text>Berat Badan: {selectedWorker.beratBadan}</Card.Text>
                                <Card.Text>Jenis Kelamin: {selectedWorker.jenisKelamin}</Card.Text>
                                <Card.Text>Kewarganegaraan: {selectedWorker.kewarganegaraan}</Card.Text>
                                <Card.Text>Agama: {selectedWorker.agama}</Card.Text>
                                <Card.Text>Status: {selectedWorker.status}</Card.Text>
                                <Card.Text>Pendidikan: {selectedWorker.pendidikan}</Card.Text>
                                <Card.Text>Pengalaman: {selectedWorker.pengalaman}</Card.Text>
                                <Card.Text>Kemampuan: {selectedWorker.skills.join(', ')}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleHire}>
                            Hire Pekerja Ini
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default AL_list;