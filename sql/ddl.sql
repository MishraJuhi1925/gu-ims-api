-- uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create college table
CREATE TABLE colleges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    confirmPassword VARCHAR(255) NOT NULL,
    role TEXT CHECK (role = 'college') NOT NULL DEFAULT 'college',
    status BOOLEAN NOT NULL DEFAULT FALSE,
    totalStudents INT DEFAULT 0,
    totalResults INT DEFAULT 0,
    totalUpdatedResults INT DEFAULT 0,
    password_updated BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE ,
    password VARCHAR(255) NOT NULL CHECK (LENGTH(password) BETWEEN 6 AND 20),
    name VARCHAR(255) NOT NULL,
    role TEXT CHECK (role = 'admin') NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    course_id VARCHAR(255) NOT NULL,
    reference VARCHAR(255) NOT NULL,
    course_code VARCHAR(255) NOT NULL,
    program_id INT NULL
);


CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    college VARCHAR(255) NOT NULL,
    year INT NOT NULL CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    division VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE examiners (
    id SERIAL PRIMARY KEY,
    examiner_name VARCHAR(255) NOT NULL,
    contact VARCHAR(15) NOT NULL CHECK (contact ~ '^[0-9]+$'),
    organization VARCHAR(255),
    internal_examiner_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    photo_url VARCHAR(255),
    exam_roll_number VARCHAR(255) NOT NULL,
    civil_id VARCHAR(255) NOT NULL,
    semester INTEGER NOT NULL,
    college_name VARCHAR(255) NOT NULL,
    program_name VARCHAR(255) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    course_id VARCHAR(255) NOT NULL,
    reference VARCHAR(255) NOT NULL,
    course_code VARCHAR(255) NOT NULL,
    external_practical_total_marks FLOAT NOT NULL,
    internal_practical_total_marks FLOAT NOT NULL,
    internal_theory_total_marks FLOAT NOT NULL,
    external_practical_marks VARCHAR(50) DEFAULT '',
    internal_practical_marks VARCHAR(50) DEFAULT '',
    internal_theory_marks VARCHAR(50) DEFAULT '',
    value_name VARCHAR(255) NOT NULL,
    overall_total_marks FLOAT NOT NULL,
    marks_updated VARCHAR(20) DEFAULT 'not updated',
    CHECK (marks_updated IN ('updated', 'not updated', 'modified')),
    remark TEXT CHECK (char_length(remark) <= 500),
    examiner_name VARCHAR(255),
    contact VARCHAR(15) CHECK (contact ~ '^[0-9]{10,15}$'),
    organization VARCHAR(255),
    internal_examiner_name VARCHAR(255)
);

CREATE TABLE marks (
    id SERIAL PRIMARY KEY,
    external_marks INTEGER NOT NULL,
    internal_marks INTEGER NOT NULL,
    value_name VARCHAR(255) NOT NULL,
    overall_total_marks INTEGER NOT NULL,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE timers (
    id SERIAL PRIMARY KEY,
    target_time TIMESTAMP NOT NULL
);
