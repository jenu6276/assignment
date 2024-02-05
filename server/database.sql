-- create the database
CREATE DATABASE assignment;

-- create a table for users
CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone INT NOT NULL,
    password VARCHAR(200) NOT NULL
);

-- insert a fake user
INSERT INTO users
    (firstname, lastname, email, phone, password)
VALUES
    ('kaushik', 'savaliya', 'kjsavaliya2@gmail.com', '9510435820', 'admin123');
