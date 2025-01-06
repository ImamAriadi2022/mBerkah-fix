import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/FG_Regis.css';

const FG_Regis = () => {
    const [selectedRole, setSelectedRole] = useState(null);
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
        foto: null,
        role: ''
    });
    const [feedback, setFeedback] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setFormData({ ...formData, role });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'skills') {
            setFormData({ ...formData, skills: value.split(',') });
        } else if (name === 'foto') {
            setFormData({ ...formData, foto: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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
            const response = await fetch('https://api.mutiaraberkah.my.id/api/art/create.php', {
                method: 'POST',
                body: formDataToSend
            });

            const textResponse = await response.text();
            console.log('Raw server response:', textResponse);

            const result = JSON.parse(textResponse);
            console.log(result);
            setShowSuccess(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Container className="fg-regis-container my-5">
            {!selectedRole ? (
                <Row className="justify-content-center">
                    <Col md={4}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Daftar ART</Card.Title>
                                <Button variant="primary" onClick={() => handleRoleSelect('ART')}>Pilih</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Daftar Pengurus Lansia</Card.Title>
                                <Button variant="primary" onClick={() => handleRoleSelect('Pengurus Lansia')}>Pilih</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Daftar Baby Sitter</Card.Title>
                                <Button variant="primary" onClick={() => handleRoleSelect('Baby Sitter')}>Pilih</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h1 className="text-center mb-4">Formulir data pekerja {selectedRole}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formNama">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="nama" placeholder="Nama" value={formData.nama} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formTempatTanggalLahir">
                                <Form.Label>Tempat Tanggal Lahir</Form.Label>
                                <Form.Control type="text" name="tempatTanggalLahir" placeholder="Tempat Tanggal Lahir" value={formData.tempatTanggalLahir} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formUsia">
                                <Form.Label>Usia</Form.Label>
                                <Form.Control type="number" name="usia" placeholder="Usia" value={formData.usia} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formTinggi">
                                <Form.Label>Tinggi</Form.Label>
                                <Form.Control type="number" name="tinggi" placeholder="Tinggi" value={formData.tinggi} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formBeratBadan">
                                <Form.Label>Berat Badan</Form.Label>
                                <Form.Control type="number" name="beratBadan" placeholder="Berat Badan" value={formData.beratBadan} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formJenisKelamin">
                                <Form.Label>Jenis Kelamin</Form.Label>
                                <Form.Control type="text" name="jenisKelamin" placeholder="Jenis Kelamin" value={formData.jenisKelamin} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formKewarganegaraan">
                                <Form.Label>Kewarganegaraan</Form.Label>
                                <Form.Control type="text" name="kewarganegaraan" placeholder="Kewarganegaraan" value={formData.kewarganegaraan} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formAgama">
                                <Form.Label>Agama</Form.Label>
                                <Form.Control type="text" name="agama" placeholder="Agama" value={formData.agama} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formPendidikan">
                                <Form.Label>Pendidikan</Form.Label>
                                <Form.Control type="text" name="pendidikan" placeholder="Pendidikan" value={formData.pendidikan} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formPengalaman">
                                <Form.Label>Pengalaman</Form.Label>
                                <Form.Control as="textarea" name="pengalaman" placeholder="Pengalaman" value={formData.pengalaman} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formSkills">
                                <Form.Label>Kemampuan</Form.Label>
                                <Form.Control type="text" name="skills" placeholder="Kemampuan (pisahkan dengan koma)" value={formData.skills.join(',')} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formFoto">
                                <Form.Label>Foto</Form.Label>
                                <Form.Control type="file" name="foto" onChange={handleChange} required />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">Submit</Button>
                        </Form>
                        {feedback && <Alert variant="info" className="mt-3">{feedback}</Alert>}
                        {showSuccess && <Alert variant="success" className="mt-3">Pendaftaran berhasil!</Alert>}
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default FG_Regis;