import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            const response = await axios.get('http://localhost/mBerkah-fix/backend/api/sertifikat/read.php');
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
                const response = await axios.post('http://localhost/mBerkah-fix/backend/api/sertifikat/update.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Update response:', response.data);
                setFeedback('Sertifikat updated successfully.');
            } else {
                const response = await axios.post('http://localhost/mBerkah-fix/backend/api/sertifikat/create.php', formData, {
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
            const response = await axios.post('http://localhost/mBerkah-fix/backend/api/sertifikat/delete.php', { id });
            console.log('Delete response:', response.data);
            setFeedback('Sertifikat deleted successfully.');
            fetchSertifikat();
        } catch (error) {
            console.error('Error deleting sertifikat:', error);
            setFeedback('Failed to delete sertifikat. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Admin Panel - Sertifikat</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
                <input type="file" name="image" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
                <button type="submit">{form.id ? 'Update Sertifikat' : 'Add Sertifikat'}</button>
            </form>
            {feedback && <p>{feedback}</p>}
            {preview && (
                <div className="preview">
                    <h3>Preview Sertifikat</h3>
                    <h3>{preview.name}</h3>
                    <p>{preview.description}</p>
                    <img src={`data:image/jpeg;base64,${preview.image}`} alt={preview.name} style={{ maxWidth: '100px' }} />
                    <button onClick={() => handleEdit(preview)}>Edit</button>
                    <button onClick={() => handleDelete(preview.id)}>Delete</button>
                </div>
            )}
            <ul>
                {sertifikat.map(item => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} style={{ maxWidth: '100px' }} />
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Crud_Sertif;