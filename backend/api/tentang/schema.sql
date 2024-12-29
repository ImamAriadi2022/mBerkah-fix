CREATE TABLE tentang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    history TEXT NOT NULL,
    employees INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    google_map_link VARCHAR(255) NOT NULL,
    google_map_embed TEXT NOT NULL
);

CREATE TABLE certifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tentang_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image LONGBLOB NOT NULL,
    FOREIGN KEY (tentang_id) REFERENCES tentang(id) ON DELETE CASCADE
);