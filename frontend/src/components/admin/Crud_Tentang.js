import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Crud_Tentang.css';

const Crud_Tentang = () => {
    const [tentang, setTentang] = useState([]);
    const [form, setForm] = useState({ id: null, history: '', employees: '', location: '', google_map_link: '', google_map_embed: '' });
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetchTentang();
    }, []);

    const fetchTentang = async () => {
        try {
            const response = await axios.get('https://api.mutiaraberkah.my.id/api/tentang/read.php');
            console.log('Response data:', response.data);
            if (Array.isArray(response.data)) {
                setTentang(response.data);
            } else {
                console.error('Data is not an array:', response.data);
                setFeedback('Failed to fetch tentang. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching tentang:', error);
            setFeedback('Failed to fetch tentang. Please try again later.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('history', form.history);
        formData.append('employees', form.employees);
        formData.append('location', form.location);
        formData.append('google_map_link', form.google_map_link);
        formData.append('google_map_embed', form.google_map_embed);

        try {
            if (form.id) {
                formData.append('id', form.id);
                const response = await axios.post('https://api.mutiaraberkah.my.id/api/tentang/update.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Update response:', response.data);
                setFeedback('Tentang updated successfully.');
            } else {
                const response = await axios.post('https://api.mutiaraberkah.my.id/api/tentang/create.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Create response:', response.data);
                setFeedback('Tentang created successfully.');
            }
            fetchTentang();
            setForm({
                id: null,
                history: '',
                employees: '',
                location: '',
                google_map_link: '',
                google_map_embed: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setFeedback('Failed to submit form. Please try again later.');
        }
    };

    const handleEdit = (item) => {
        setForm(item);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.post('https://api.mutiaraberkah.my.id/api/tentang/delete.php', { id });
            console.log('Delete response:', response.data);
            setFeedback('Tentang deleted successfully.');
            fetchTentang();
        } catch (error) {
            console.error('Error deleting tentang:', error);
            setFeedback('Failed to delete tentang. Please try again later.');
        }
    };

    return (
        <Container className="crud-tentang-container my-5">
            <h1 className="text-center mb-4">Admin Panel - Tentang Kami</h1>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formHistory">
                            <Form.Label>History</Form.Label>
                            <Form.Control as="textarea" name="history" placeholder="History" value={form.history} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formEmployees">
                            <Form.Label>Employees</Form.Label>
                            <Form.Control type="number" name="employees" placeholder="Employees" value={form.employees} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formGoogleMapLink">
                            <Form.Label>Google Map Link</Form.Label>
                            <Form.Control type="text" name="google_map_link" placeholder="Google Map Link" value={form.google_map_link} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formGoogleMapEmbed">
                            <Form.Label>Google Map Embed</Form.Label>
                            <Form.Control as="textarea" name="google_map_embed" placeholder="Google Map Embed" value={form.google_map_embed} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">{form.id ? 'Update Tentang' : 'Add Tentang'}</Button>
                    </Form>
                    {feedback && <Alert variant="info" className="mt-3">{feedback}</Alert>}
                    <ListGroup className="mt-4">
                        {tentang.map(item => (
                            <ListGroup.Item key={item.id}>
                                <h5>{item.history}</h5>
                                <p>Employees: {item.employees}</p>
                                <p>Location: {item.location}</p>
                                <a href={item.google_map_link} target="_blank" rel="noopener noreferrer">Google Map Link</a>
                                {item.google_map_embed && (
                                    <iframe
                                        src={item.google_map_embed}
                                        width="100%"
                                        height="300"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        title="Google Map"
                                    ></iframe>
                                )}
                                <Button variant="warning" onClick={() => handleEdit(item)} className="mr-2 mt-2">Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(item.id)} className="mt-2">Delete</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Crud_Tentang;