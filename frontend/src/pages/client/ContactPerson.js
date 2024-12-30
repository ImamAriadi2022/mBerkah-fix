import React from 'react';
import CL_Navbar from '../../components/client/CL_Navbar';
import CP_Contact from '../../components/client/CP_Contact';
import Footer from '../../components/client/Footer';
import WhatsAppButton from '../../components/client/WhatsAppButton';


const ContactPerson = () => {
    return (
        <>
            <CL_Navbar />
            <CP_Contact />
            <Footer />
            <WhatsAppButton phoneNumber="+6282120116224" />
        </>
    );
}


export default ContactPerson;