CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    whatsapp VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    instagram VARCHAR(50),
    tiktok VARCHAR(50),
    website VARCHAR(255),
    address TEXT,
    googleMapLink TEXT,
    googleMapEmbed TEXT
);