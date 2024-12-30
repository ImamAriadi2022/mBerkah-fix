import React from 'react';
import { Nav } from 'react-bootstrap';
import './css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
          <Nav.Link href="/admin-beranda">Dashboard</Nav.Link>
          <Nav.Link href="/admin-jasa">Jasa</Nav.Link>
          <Nav.Link href="/admin-tentang">Tentang Kami</Nav.Link>
          <Nav.Link href="/admin-sertif">Sertifikat</Nav.Link>
          <Nav.Link href="/admin-data">Data Pegawai tersedia</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;