import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/client/LandingPage';
import ArtList from './pages/client/ArtList';
import FormRegis from './pages/client/FormRegis';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path = "/search" element={<ArtList/>} />
          <Route exact path = "/register" element={<FormRegis/>} />
          
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;