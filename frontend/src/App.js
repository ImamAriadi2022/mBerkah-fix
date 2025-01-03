import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/client/LandingPage';
import ArtList from './pages/client/artList';
import FormRegis from './pages/client/FormRegis';
import PageGallery from './pages/client/Gallery';
import ContactPerson from './pages/client/ContactPerson'



// ini buat admin
import Login from './pages/admin/Login';
import Beranda from './pages/admin/Beranda'
import JasaSect from './pages/admin/JasaSect';
import TentangSect from './pages/admin/TentangSect';
import SertifSect from './pages/admin/SertifSect';
import DataSect from './pages/admin/DataSect';
import AdminRevSect from './pages/admin/AdminRevSect';
import GalleryPage from './pages/admin/GalleryPage'
import AdminCP from './pages/admin/AdminCP';

import './App.css';


function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/search" element={<ArtList />} />
          <Route exact path="/register" element={<FormRegis />} />
          <Route exact path="/gallery" element={<PageGallery />} />
          <Route exact path="/contact" element={<ContactPerson />} />

          {/* ini buat admin */}
          <Route exact path="/admin" element={<Login />} />
          <Route exact path="/admin-beranda" element={<Beranda />} />
          <Route exact path="/admin-jasa" element={<JasaSect />} />
          <Route exact path="/admin-tentang" element={<TentangSect />} />
          <Route exact path="/admin-sertif" element={<SertifSect />} />
          <Route exact path="/admin-data" element={<DataSect />} />
          <Route exact path="/admin-rev" element={<AdminRevSect />} />
          <Route exact path="/admin-gallery" element={<GalleryPage />} />
          <Route exact path="/admin-cp" element={<AdminCP />} />
          {/* Tambahkan rute lainnya di sini */}
        </Routes>
      </div>
    </Router>
    </>
  );
}



export default App;