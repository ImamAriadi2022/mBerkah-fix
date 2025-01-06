import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/AdminReview.css';

const AdminReview = () => {
    const [registrations, setRegistrations] = useState([]);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await axios.get('https://api.mutiaraberkah.my.id/api/art/read.php');
            setRegistrations(response.data);
        } catch (error) {
            console.error('Error fetching registrations:', error);
        }
    };

    const handleApprove = async (id) => {
        try {
            const response = await axios.post('https://api.mutiaraberkah.my.id/api/art/update.php', { id, status: 'approved' }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Approve response:', response.data);
            setAlert({ show: true, message: 'Berhasil mengapprove pekerja.', variant: 'success' });
            fetchRegistrations();
        } catch (error) {
            console.error('Error approving registration:', error);
            setAlert({ show: true, message: 'Gagal mengapprove pekerja.', variant: 'danger' });
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await axios.post('https://api.mutiaraberkah.my.id/api/art/update.php', { id, status: 'rejected' }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Reject response:', response.data);
            setAlert({ show: true, message: 'Berhasil menolak pekerja.', variant: 'success' });
            fetchRegistrations();
        } catch (error) {
            console.error('Error rejecting registration:', error);
            setAlert({ show: true, message: 'Gagal menolak pekerja.', variant: 'danger' });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.post('https://api.mutiaraberkah.my.id/api/art/delete.php', { id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Delete response:', response.data);
            setAlert({ show: true, message: 'Berhasil menghapus pekerja.', variant: 'success' });
            fetchRegistrations();
        } catch (error) {
            console.error('Error deleting registration:', error);
            setAlert({ show: true, message: 'Gagal menghapus pekerja.', variant: 'danger' });
        }
    };

    const handleShow = (registration) => {
        setSelectedRegistration(registration);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    return (
        <Container className="admin-review-container my-5">
            <h1 className="text-center mb-4">Daftar Pekerja yang mendaftar</h1>
            {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ show: false, message: '', variant: '' })} dismissible>
                    {alert.message}
                </Alert>
            )}
            <Row className="card-grid">
                {registrations.length > 0 ? (
                    registrations.map((registration, index) => (
                        <Col md={4} lg={2} key={index} className="mb-4">
                            <Card className="h-100 text-center">
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${registration.foto}`} className="card-img-top mx-auto" />
                                <Card.Body>
                                    <Card.Title>{registration.nama}</Card.Title>
                                    <Card.Text>Usia: {registration.usia}</Card.Text>
                                    <Card.Text>Status: {registration.status}</Card.Text>
                                    <Button variant="primary" onClick={() => handleShow(registration)}>Detail</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No registrations to review.</p>
                )}
            </Row>

            {selectedRegistration && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detail Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card className="text-start">
                            <Card.Img variant="top" src={`data:image/jpeg;base64,${selectedRegistration.foto}`} className="card-img-top mx-auto" />
                            <Card.Body>
                                <Card.Title>{selectedRegistration.nama}</Card.Title>
                                <Card.Text>Usia: {selectedRegistration.usia}</Card.Text>
                                <Card.Text>Tempat Tanggal Lahir: {selectedRegistration.tempatTanggalLahir}</Card.Text>
                                <Card.Text>Tinggi: {selectedRegistration.tinggi}</Card.Text>
                                <Card.Text>Berat Badan: {selectedRegistration.beratBadan}</Card.Text>
                                <Card.Text>Jenis Kelamin: {selectedRegistration.jenisKelamin}</Card.Text>
                                <Card.Text>Kewarganegaraan: {selectedRegistration.kewarganegaraan}</Card.Text>
                                <Card.Text>Agama: {selectedRegistration.agama}</Card.Text>
                                <Card.Text>Status: {selectedRegistration.status}</Card.Text>
                                <Card.Text>Pendidikan: {selectedRegistration.pendidikan}</Card.Text>
                                <Card.Text>Pengalaman: {selectedRegistration.pengalaman}</Card.Text>
                                <Card.Text>Kemampuan: {selectedRegistration.skills.join(', ')}</Card.Text>
                                <Card.Text>Role: {selectedRegistration.role}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {selectedRegistration.status !== 'approved' && (
                            <>
                                <Button variant="success" onClick={() => handleApprove(selectedRegistration.id)}>Approve</Button>
                                <Button variant="danger" onClick={() => handleReject(selectedRegistration.id)} className="ml-2">Reject</Button>
                            </>
                        )}
                        <Button variant="danger" onClick={() => handleDelete(selectedRegistration.id)} className="ml-2">Delete</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default AdminReview;