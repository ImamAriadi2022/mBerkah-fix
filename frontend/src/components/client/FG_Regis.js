import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/FG_Regis.css';

const FG_Regis = () => {
    const [formData, setFormData] = useState({
        nama: '',
        tempatTanggalLahir: '',
        usia: '',
        tinggi: '',
        beratBadan: '',
        jenisKelamin: '',
        kewarganegaraan: '',
        agama: '',
        status: '',
        pendidikan: '',
        pengalaman: '',
        skills: [],
        foto: null
    });
    const [feedback, setFeedback] = useState({ show: false, message: '', variant: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, foto: e.target.files[0] });
    };

    const handleSkillChange = (index, value) => {
        const newSkills = formData.skills.map((skill, i) => (i === index ? value : skill));
        setFormData({ ...formData, skills: newSkills });
    };

    const addSkill = () => {
        setFormData({ ...formData, skills: [...formData.skills, ''] });
    };

    const removeSkill = (index) => {
        const newSkills = formData.skills.filter((_, i) => i !== index);
        setFormData({ ...formData, skills: newSkills });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === 'skills') {
                formData[key].forEach((skill, index) => {
                    formDataToSend.append(`skills[${index}]`, skill);
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch('http://localhost/mBerkah-fix/backend/api/art/create.php', {
                method: 'POST',
                body: formDataToSend
            });

            const textResponse = await response.text();
            console.log('Raw server response:', textResponse);

            const result = JSON.parse(textResponse); // Cobalah parsing manual
            console.log(result);
            setShowSuccess(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCloseSuccess = () => setShowSuccess(false);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1>Registration Form</h1>
                    {feedback.show && <Alert variant={feedback.variant}>{feedback.message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" name="nama" value={formData.nama} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formTempatTanggalLahir">
                            <Form.Label>Tempat Tanggal Lahir</Form.Label>
                            <Form.Control type="text" name="tempatTanggalLahir" value={formData.tempatTanggalLahir} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formUsia">
                            <Form.Label>Usia</Form.Label>
                            <Form.Control type="number" name="usia" value={formData.usia} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formTinggi">
                            <Form.Label>Tinggi</Form.Label>
                            <Form.Control type="number" name="tinggi" value={formData.tinggi} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBeratBadan">
                            <Form.Label>Berat Badan</Form.Label>
                            <Form.Control type="number" name="beratBadan" value={formData.beratBadan} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formJenisKelamin">
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Control type="text" name="jenisKelamin" value={formData.jenisKelamin} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formKewarganegaraan">
                            <Form.Label>Kewarganegaraan</Form.Label>
                            <Form.Control type="text" name="kewarganegaraan" value={formData.kewarganegaraan} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formAgama">
                            <Form.Label>Agama</Form.Label>
                            <Form.Control type="text" name="agama" value={formData.agama} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" name="status" value={formData.status} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formPendidikan">
                            <Form.Label>Pendidikan</Form.Label>
                            <Form.Control type="text" name="pendidikan" value={formData.pendidikan} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formPengalaman">
                            <Form.Label>Pengalaman</Form.Label>
                            <Form.Control type="text" name="pengalaman" value={formData.pengalaman} onChange={handleChange} required />
                        </Form.Group>
                        <h4 className="mt-4">Kemampuan</h4>
                        {formData.skills.map((skill, index) => (
                            <Form.Group className="mb-3" key={index}>
                                <Row>
                                    <Col md={10}>
                                        <Form.Control
                                            type="text"
                                            value={skill}
                                            onChange={(e) => handleSkillChange(index, e.target.value)}
                                            placeholder={`Kemampuan ${index + 1}`}
                                            required
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="danger" onClick={() => removeSkill(index)}>Hapus</Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        ))}
                        <Button variant="primary" onClick={addSkill}>Tambah Kemampuan</Button>
                        <Form.Group controlId="formFoto" className="mt-4">
                            <Form.Label>Upload Foto</Form.Label>
                            <Form.Control type="file" name="foto" onChange={handleFileChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FG_Regis;