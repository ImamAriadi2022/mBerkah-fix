import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Crud_data from '../../components/admin/Crud_data';
import './css/DataSect.css';

const DataSect = () => {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="content">
                <Crud_data />
            </div>
        </div>
    );
};

export default DataSect;