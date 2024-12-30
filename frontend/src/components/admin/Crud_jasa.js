import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Crud_jasa.css';

const Crud_jasa = () => {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ id: null, title: '', description: '', image: null });
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('https://api.mutiaraberkah.my.id/api/jasa/read.php');
            console.log('Response data:', response.data);
            if (Array.isArray(response.data)) {
                setServices(response.data);
            } else {
                console.error('Data is not an array:', response.data);
                setFeedback('Failed to fetch services. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setFeedback('Failed to fetch services. Please try again later.');
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('image', form.image);

        try {
            if (form.id) {
                formData.append('id', form.id);
                await axios.post('https://api.mutiaraberkah.my.id/api/jasa/update.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setFeedback('Service updated successfully.');
            } else {
                await axios.post('https://api.mutiaraberkah.my.id/api/jasa/create.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setFeedback('Service created successfully.');
            }
            fetchServices();
            setForm({ id: null, title: '', description: '', image: null });
        } catch (error) {
            console.error('Error submitting form:', error);
            setFeedback('Failed to submit form. Please try again later.');
        }
    };

    const handleEdit = (service) => {
        setForm({ ...service, image: null });
    };

    const handleDelete = async (id) => {
        try {
            await axios.post('https://api.mutiaraberkah.my.id/api/jasa/delete.php', { id });
            setFeedback('Service deleted successfully.');
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
            setFeedback('Failed to delete service. Please try again later.');
        }
    };

    return (
        <Container className="crud-jasa-container my-5">
            <h1 className="text-center mb-4">Admin Panel - Jasa</h1>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="image" onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">{form.id ? 'Update Service' : 'Add Service'}</Button>
                    </Form>
                    {feedback && <Alert variant="info" className="mt-3">{feedback}</Alert>}
                    <ListGroup className="mt-4">
                        {services.map(service => (
                            <ListGroup.Item key={service.id}>
                                <h5>{service.title}</h5>
                                <p>{service.description}</p>
                                <img src={`data:image/jpeg;base64,${service.image}`} alt={service.title} className="img-fluid rounded mb-2" style={{ maxWidth: '100px' }} />
                                <Button variant="warning" onClick={() => handleEdit(service)} className="mr-2">Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(service.id)}>Delete</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Crud_jasa;