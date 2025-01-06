import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminReview from '../../components/admin/AdminReview';
import './css/AdminRevSect.css';

const AdminRevSect = () => {
    return (
        <div className="admin-container">
            <Sidebar className="sidebar" />
            <AdminReview className="content" />
        </div>
    );
};

export default AdminRevSect;