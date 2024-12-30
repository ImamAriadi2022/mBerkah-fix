import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Crud_Sertif.css';

const Crud_Sertif = () => {
    const [sertifikat, setSertifikat] = useState([]);
    const [form, setForm] = useState({ id: null, name: '', description: '', image: '' });
    const [feedback, setFeedback] = useState('');
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchSertifikat();
    }, []);

    const fetchSertifikat = async () => {
        try {
            const response = await axios.get('https://api.mutiaraberkah.my.id/api/sertifikat/read.php');
            console.log('Response data:', response.data);
            if (Array.isArray(response.data)) {
                setSertifikat(response.data);
            } else {
                console.error('Data is not an array:', response.data);
                setFeedback('Failed to fetch sertifikat. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching sertifikat:', error);
            setFeedback('Failed to fetch sertifikat. Please try again later.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('image', form.image);

        console.log('Submitting form data:', form.name, form.description, form.image); // Tambahkan log ini

        try {
            if (form.id) {
                formData.append('id', form.id);
                const response = await axios.post('https://api.mutiaraberkah.my.id/api/sertifikat/update.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Update response:', response.data);
                setFeedback('Sertifikat updated successfully.');
            } else {
                const response = await axios.post('https://api.mutiaraberkah.my.id/api/sertifikat/create.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Create response:', response.data);
                setFeedback('Sertifikat created successfully.');
            }
            fetchSertifikat();
            setForm({ id: null, name: '', description: '', image: '' });
            setPreview(null);
        } catch (error) {
            console.error('Error submitting form:', error);
            setFeedback('Failed to submit form. Please try again later.');
        }
    };

    const handleEdit = (item) => {
        setForm(item);
        setPreview(item);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.post('https://api.mutiaraberkah.my.id/api/sertifikat/delete.php', { id });
            console.log('Delete response:', response.data);
            setFeedback('Sertifikat deleted successfully.');
            fetchSertifikat();
        } catch (error) {
            console.error('Error deleting sertifikat:', error);
            setFeedback('Failed to delete sertifikat. Please try again later.');
        }
    };

    return (
        <Container className="crud-sertif-container my-5">
            <h1 className="text-center mb-4">Admin Panel - Sertifikat</h1>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="image" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">{form.id ? 'Update Sertifikat' : 'Add Sertifikat'}</Button>
                    </Form>
                    {feedback && <Alert variant="info" className="mt-3">{feedback}</Alert>}
                    {preview && (
                        <Card className="mt-4">
                            <Card.Header>Preview Sertifikat</Card.Header>
                            <Card.Body>
                                <Card.Title>{preview.name}</Card.Title>
                                <Card.Text>{preview.description}</Card.Text>
                                <img src={`data:image/jpeg;base64,${preview.image}`} alt={preview.name} className="img-fluid rounded mb-2" style={{ maxWidth: '100px' }} />
                                <Button variant="warning" onClick={() => handleEdit(preview)} className="mr-2">Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(preview.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    )}
                    <ListGroup className="mt-4">
                        {sertifikat.map(item => (
                            <ListGroup.Item key={item.id}>
                                <h5>{item.name}</h5>
                                <p>{item.description}</p>
                                <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} className="img-fluid rounded mb-2" style={{ maxWidth: '100px' }} />
                                <Button variant="warning" onClick={() => handleEdit(item)} className="mr-2">Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Crud_Sertif;