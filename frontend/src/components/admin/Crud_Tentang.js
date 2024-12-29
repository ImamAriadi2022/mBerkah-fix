import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Crud_Tentang = () => {
    const [tentang, setTentang] = useState([]);
    const [form, setForm] = useState({ id: null, history: '', employees: '', location: '', google_map_link: '', google_map_embed: '' });
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetchTentang();
    }, []);

    const fetchTentang = async () => {
        try {
            const response = await axios.get('http://localhost/mBerkah-fix/backend/api/tentang/read.php');
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
                const response = await axios.post('http://localhost/mBerkah-fix/backend/api/tentang/update.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Update response:', response.data);
                setFeedback('Tentang updated successfully.');
            } else {
                const response = await axios.post('http://localhost/mBerkah-fix/backend/api/tentang/create.php', formData, {
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
            const response = await axios.post('http://localhost/mBerkah-fix/backend/api/tentang/delete.php', { id });
            console.log('Delete response:', response.data);
            setFeedback('Tentang deleted successfully.');
            fetchTentang();
        } catch (error) {
            console.error('Error deleting tentang:', error);
            setFeedback('Failed to delete tentang. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Admin Panel - Tentang Kami</h1>
            <form onSubmit={handleSubmit}>
                <textarea name="history" placeholder="History" value={form.history} onChange={handleChange}></textarea>
                <input type="number" name="employees" placeholder="Employees" value={form.employees} onChange={handleChange} />
                <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
                <input type="text" name="google_map_link" placeholder="Google Map Link" value={form.google_map_link} onChange={handleChange} />
                <input type="text" name="google_map_embed" placeholder="Google Map Embed" value={form.google_map_embed} onChange={handleChange} />
                <button type="submit">{form.id ? 'Update Tentang' : 'Add Tentang'}</button>
            </form>
            {feedback && <p>{feedback}</p>}
            <ul>
                {tentang.map(item => (
                    <li key={item.id}>
                        <h3>{item.history}</h3>
                        <p>Employees: {item.employees}</p>
                        <p>Location: {item.location}</p>
                        <a href={item.google_map_link} target="_blank" rel="noopener noreferrer">Google Map Link</a>
                        {item.google_map_embed && (
                            <iframe
                                src={item.google_map_embed}
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        )}
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Crud_Tentang;