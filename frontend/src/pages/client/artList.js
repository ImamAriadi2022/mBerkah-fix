import React from 'react';
import CL_Navbar from '../../components/client/CL_Navbar';
import Al_list from '../../components/client/AL_list';
import Footer from '../../components/client/Footer'
import WhatsAppButton from '../../components/client/WhatsAppButton';

const ArtList = () => {
    return (
        <>
            <CL_Navbar />
            <Al_list />
            <Footer />
            <WhatsAppButton phoneNumber="+6282120116224" />
        </>
    );
};

export default ArtList;