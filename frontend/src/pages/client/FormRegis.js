import React from 'react';
import CL_Navbar from '../../components/client/CL_Navbar';
import Footer from '../../components/client/Footer';
import FG_Regis from '../../components/client/FG_Regis';
import WhatsAppButton from '../../components/client/WhatsAppButton';



const FormRegis = () => {
    return (
        <>
            <CL_Navbar/>
            <FG_Regis/>
            <Footer/>
            <WhatsAppButton phoneNumber="+6282120116224" />
        </>
    );
}

export default FormRegis;