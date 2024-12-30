import React from 'react';
import CL_Navbar from '../../components/client/CL_Navbar';
import Gallery from '../../components/client/G_Gallery';
import Footer from '../../components/client/Footer';
import WhatsAppButton from '../../components/client/WhatsAppButton';

const PageGallery = () => {
    return (
        <>
            <CL_Navbar />
            <Gallery />
            <Footer />
            <WhatsAppButton phoneNumber="+6282120116224" />
        </>
    );
}

export default PageGallery;