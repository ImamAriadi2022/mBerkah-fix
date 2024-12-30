import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './css/WhatsAppButton.css';

const WhatsAppButton = ({ phoneNumber }) => {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <FaWhatsapp size={24} />
    </div>
  );
};

export default WhatsAppButton;