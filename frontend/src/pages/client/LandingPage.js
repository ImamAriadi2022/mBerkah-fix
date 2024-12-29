import React from 'react';
import CL_Navbar from '../../components/client/CL_Navbar'; 
import LP_Hero from '../../components/client/LP_Hero';
import LP_Jasa from '../../components/client/LP_Jasa';
import LP_TentangKami from '../../components/client/LP_TentangKami';
import LP_Review from '../../components/client/LP_Review';
import LP_Alasan from '../../components/client/LP_Alasan';
import Footer from '../../components/client/Footer';

const LandingPage = () => {
  return (
    <div>
        <CL_Navbar />
        <LP_Hero />
        <LP_Jasa />
        <LP_TentangKami />
        <LP_Review />
        <LP_Alasan />
        <Footer />
      {/* bisa menambahkan untuk selanjutnya*/}
    </div>
  );
};

export default LandingPage;