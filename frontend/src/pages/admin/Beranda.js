import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Dashboard from '../../components/admin/Dashboard';
import './css/Beranda.css';

const Beranda = () => {
  return (
    <div className="beranda-container">
      <Sidebar />
      <div className="dashboard">
        <Dashboard />
      </div>
    </div>
  );
};

export default Beranda;