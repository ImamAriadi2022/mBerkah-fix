import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import Lottie from 'react-lottie';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/FG_Regis.css';
import successAnimation from './animations/success.json'; // Ensure this path is correct

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
    skills: ['']
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, '']
    });
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => setShowSuccess(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Container className="my-5 form-container">
      <h2 className="text-center mb-4">Form Registrasi ART</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6} className="text-start">
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tempat, Tanggal Lahir</Form.Label>
              <Form.Control
                type="text"
                name="tempatTanggalLahir"
                value={formData.tempatTanggalLahir}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Usia</Form.Label>
              <Form.Control
                type="number"
                name="usia"
                value={formData.usia}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tinggi (cm)</Form.Label>
              <Form.Control
                type="number"
                name="tinggi"
                value={formData.tinggi}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Berat Badan (kg)</Form.Label>
              <Form.Control
                type="number"
                name="beratBadan"
                value={formData.beratBadan}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} className="text-start">
            <Form.Group className="mb-3">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                as="select"
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleChange}
                required
              >
                <option value="">Pilih</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kewarganegaraan</Form.Label>
              <Form.Control
                type="text"
                name="kewarganegaraan"
                value={formData.kewarganegaraan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Agama</Form.Label>
              <Form.Control
                type="text"
                name="agama"
                value={formData.agama}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pendidikan</Form.Label>
              <Form.Control
                type="text"
                name="pendidikan"
                value={formData.pendidikan}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-3">
              <Form.Label>Pengalaman</Form.Label>
              <Form.Control
                as="textarea"
                name="pengalaman"
                value={formData.pengalaman}
                onChange={handleChange}
                rows={3}
                required
              />
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
        <Button variant="success" onClick={addSkill}>Tambah Kemampuan</Button>
        <Button variant="primary" type="submit" className="mt-3">Daftar</Button>
      </Form>

      <Modal show={showSuccess} onHide={handleCloseSuccess} centered>
        <Modal.Body className="text-center">
          <Lottie options={defaultOptions} height={150} width={150} />
          <h4>Selamat, Anda telah berhasil mendaftar!</h4>
          <p>Tunggu konfirmasi dari admin terkait pendaftaran Anda. Jika diterima, profil Anda akan ada di daftar ART.</p>
          <Button variant="primary" onClick={handleCloseSuccess}>Tutup</Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default FG_Regis;