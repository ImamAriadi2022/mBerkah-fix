import React from 'react';
import { Container } from 'react-bootstrap';
import 'animate.css';
import './css/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <Container className="dashboard-container text-center">
      <FontAwesomeIcon icon={faChartLine} size="6x" className="animate__animated animate__zoomIn" />
      <h1 className="animate__animated animate__fadeInDown mt-4">Selamat Datang di Halaman Admin</h1>
      <p className="animate__animated animate__fadeInUp">Kelola aplikasi Anda secara efisien dan efektif</p>
      <img src="img/admin/dashboard.jpg" alt="Dashboard Illustration" className="dashboard-image animate__animated animate__fadeInUp" />
    </Container>
  );
};

export default Dashboard;