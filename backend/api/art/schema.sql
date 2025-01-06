CREATE TABLE art_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    tempatTanggalLahir VARCHAR(255) NOT NULL,
    usia INT NOT NULL,
    tinggi INT NOT NULL,
    beratBadan INT NOT NULL,
    jenisKelamin VARCHAR(50) NOT NULL,
    kewarganegaraan VARCHAR(100) NOT NULL,
    agama VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    pendidikan VARCHAR(255) NOT NULL,
    pengalaman TEXT NOT NULL,
    skills TEXT NOT NULL,
    foto LONGBLOB NOT NULL,
    role VARCHAR(50) NOT NULL,
    is_published BOOLEAN DEFAULT FALSE
);