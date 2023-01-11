CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);