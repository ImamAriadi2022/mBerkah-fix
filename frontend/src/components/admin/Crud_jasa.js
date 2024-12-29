import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Crud_jasa = () => {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ id: null, title: '', description: '', image: null });
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost/mBerkah-fix/backend/api/jasa/read.php');
            console.log('Response data:', response.data); // Tambahkan log ini
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
                await axios.post('http://localhost/mBerkah-fix/backend/api/jasa/update.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setFeedback('Service updated successfully.');
            } else {
                await axios.post('http://localhost/mBerkah-fix/backend/api/jasa/create.php', formData, {
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
            await axios.post('http://localhost/mBerkah-fix/backend/api/jasa/delete.php', { id });
            setFeedback('Service deleted successfully.');
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
            setFeedback('Failed to delete service. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
                <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                <input type="file" name="image" onChange={handleChange} />
                <button type="submit">{form.id ? 'Update Service' : 'Add Service'}</button>
            </form>
            {feedback && <p>{feedback}</p>}
            <ul>
                {services.map(service => (
                    <li key={service.id}>
                        <img src={`data:image/jpeg;base64,${service.image}`} alt={service.title} width="100" />
                        {service.title} - {service.description}
                        <button onClick={() => handleEdit(service)}>Edit</button>
                        <button onClick={() => handleDelete(service.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Crud_jasa;