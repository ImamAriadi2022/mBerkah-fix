import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Crud_Sertif from '../../components/admin/Crud_Sertif';
import './css/SertifSect.css';

const SertifSect = () => {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="content">
                <Crud_Sertif />
            </div>
        </div>
    );
};

export default SertifSect;