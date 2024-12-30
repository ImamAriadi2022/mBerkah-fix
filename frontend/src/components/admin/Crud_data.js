import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Crud_data.css';

const Crud_data = () => {
    const [reviews, setReviews] = useState([]);
    const [form, setForm] = useState({ id: null, title: '', value: '', description: '' });
    const [feedback, setFeedback] = useState('');
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('https://api.mutiaraberkah.my.id/api/data/read.php');
            console.log('Response data:', response.data);
            if (Array.isArray(response.data)) {
                setReviews(response.data);
            } else {
                console.error('Data is not an array:', response.data);
                setFeedback('Failed to fetch reviews. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setFeedback('Failed to fetch reviews. Please try again later.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title: form.title,
            value: form.value,
            description: form.description
        };

        try {
            if (form.id) {
                formData.id = form.id;
                const response = await axios.post('https://api.mutiaraberkah.my.id/api/data/update.php', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Update response:', response.data);
                setFeedback('Review updated successfully.');
            } else {
                const response = await axios.post('https://api.mutiaraberkah.my.id/api/data/create.php', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Create response:', response.data);
                setFeedback('Review created successfully.');
            }
            fetchReviews();
            setForm({ id: null, title: '', value: '', description: '' });
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
            const response = await axios.post('https://api.mutiaraberkah.my.id/api/data/delete.php', { id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Delete response:', response.data);
            setFeedback('Review deleted successfully.');
            fetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
            setFeedback('Failed to delete review. Please try again later.');
        }
    };

    return (
        <Container className="crud-data-container my-5">
            <h1 className="text-center mb-4">Admin Panel - Reviews</h1>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formValue">
                            <Form.Label>Value</Form.Label>
                            <Form.Control type="number" name="value" placeholder="Value" value={form.value} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">{form.id ? 'Update Review' : 'Add Review'}</Button>
                    </Form>
                    {feedback && <Alert variant="info" className="mt-3">{feedback}</Alert>}
                    {preview && (
                        <Card className="mt-4">
                            <Card.Header>Preview Review</Card.Header>
                            <Card.Body>
                                <Card.Title>{preview.title}</Card.Title>
                                <Card.Text>{preview.value}</Card.Text>
                                <Card.Text>{preview.description}</Card.Text>
                                <Button variant="warning" onClick={() => handleEdit(preview)} className="mr-2">Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(preview.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    )}
                    <ListGroup className="mt-4">
                        {reviews.map(item => (
                            <ListGroup.Item key={item.id}>
                                <h5>{item.title}</h5>
                                <p>{item.value}</p>
                                <p>{item.description}</p>
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

export default Crud_data;