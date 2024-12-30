import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            const response = await axios.get('http://localhost/mBerkah-fix/backend/api/data/read.php');
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
                const response = await axios.post('http://localhost/mBerkah-fix/backend/api/data/update.php', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Update response:', response.data);
                setFeedback('Review updated successfully.');
            } else {
                const response = await axios.post('http://localhost/mBerkah-fix/backend/api/data/create.php', formData, {
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
            const response = await axios.post('http://localhost/mBerkah-fix/backend/api/data/delete.php', { id }, {
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
        <div>
            <h1>Admin Panel - Reviews</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
                <input type="number" name="value" placeholder="Value" value={form.value} onChange={handleChange} />
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
                <button type="submit">{form.id ? 'Update Review' : 'Add Review'}</button>
            </form>
            {feedback && <p>{feedback}</p>}
            {preview && (
                <div className="preview">
                    <h3>Preview Review</h3>
                    <h3>{preview.title}</h3>
                    <p>{preview.value}</p>
                    <p>{preview.description}</p>
                    <button onClick={() => handleEdit(preview)}>Edit</button>
                    <button onClick={() => handleDelete(preview.id)}>Delete</button>
                </div>
            )}
            <ul>
                {reviews.map(item => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.value}</p>
                        <p>{item.description}</p>
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Crud_data;