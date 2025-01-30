-- uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- run both query 
CREATE TYPE role AS ENUM ('admin', 'college');   
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role role ,
    update_password BOOLEAN DEFAULT FALSE
)

