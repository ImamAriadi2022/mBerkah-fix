import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminContact from '../../components/admin/AdminContact';
import './css/AdminCP.css';

const AdminCP = () => {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="content">
                <AdminContact />
            </div>
        </div>
    );
};

export default AdminCP;