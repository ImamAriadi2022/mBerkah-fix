import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminGallery from '../../components/admin/AdminGallery';
// import './css/GalleryPage.css';

const GalleryPage = () => {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="content">
                <AdminGallery />
            </div>
        </div>
    );
};

export default GalleryPage;