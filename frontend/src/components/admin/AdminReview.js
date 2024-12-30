import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/AdminReview.css';

const AdminReview = () => {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await axios.get('https://api.mutiaraberkah.my.id/api/art/read.php');
            console.log('Response data:', response.data); // Tambahkan log ini untuk debugging
            if (Array.isArray(response.data)) {
                setRegistrations(response.data);
            } else {
                console.error('Data is not an array:', response.data);
            }
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
            fetchRegistrations();
        } catch (error) {
            console.error('Error approving registration:', error);
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
            fetchRegistrations();
        } catch (error) {
            console.error('Error rejecting registration:', error);
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
            fetchRegistrations();
        } catch (error) {
            console.error('Error deleting registration:', error);
        }
    };

    return (
        <Container fluid className="my-5">
            <Row className="justify-content-center">
                {registrations.length > 0 ? (
                    registrations.map((registration, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card className="h-100 text-center">
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${registration.foto}`} />
                                <Card.Body>
                                    <Card.Title>{registration.nama}</Card.Title>
                                    <Card.Text>Tempat Tanggal Lahir: {registration.tempatTanggalLahir}</Card.Text>
                                    <Card.Text>Usia: {registration.usia}</Card.Text>
                                    <Card.Text>Tinggi: {registration.tinggi}</Card.Text>
                                    <Card.Text>Berat Badan: {registration.beratBadan}</Card.Text>
                                    <Card.Text>Jenis Kelamin: {registration.jenisKelamin}</Card.Text>
                                    <Card.Text>Kewarganegaraan: {registration.kewarganegaraan}</Card.Text>
                                    <Card.Text>Agama: {registration.agama}</Card.Text>
                                    <Card.Text>Status: {registration.status}</Card.Text>
                                    <Card.Text>Pendidikan: {registration.pendidikan}</Card.Text>
                                    <Card.Text>Pengalaman: {registration.pengalaman}</Card.Text>
                                    <Card.Text>Kemampuan: {registration.skills.join(', ')}</Card.Text>
                                    {registration.status === 'approved' ? (
                                        <Card.Text className="text-success">Telah di-approve</Card.Text>
                                    ) : (
                                        <>
                                            <Button variant="success" onClick={() => handleApprove(registration.id)}>Approve</Button>
                                            <Button variant="danger" onClick={() => handleReject(registration.id)} className="ml-2">Reject</Button>
                                        </>
                                    )}
                                    <Button variant="danger" onClick={() => handleDelete(registration.id)} className="ml-2">Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No registrations to review.</p>
                )}
            </Row>
        </Container>
    );
};

export default AdminReview;