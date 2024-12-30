CREATE TABLE media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type ENUM('video', 'photo') NOT NULL,
    media LONGBLOB NOT NULL,
    thumbnail LONGBLOB NOT NULL
);