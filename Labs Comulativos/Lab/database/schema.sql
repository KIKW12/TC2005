-- Create database
CREATE DATABASE IF NOT EXISTS LabsComulativos;

USE LabsComulativos;

-- Create courses table
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    teacher VARCHAR(255) NOT NULL
);

-- Create students table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    grade INT NOT NULL,
    studentId VARCHAR(50) NOT NULL
);

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create roles table
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- Create user_roles junction table for many-to-many relationship
CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
('admin', 'Administrator with full access'),
('teacher', 'Teacher with access to courses and students'),
('student', 'Student with limited access');

-- Sample data (optional)
INSERT INTO courses (name, code, teacher) VALUES
('Matemáticas', 'MAT101', 'Prof. García'),
('Ciencias', 'CIE202', 'Prof. Rodríguez');

INSERT INTO students (name, grade, studentId) VALUES
('Ana López', 10, 'A12345'),
('Juan Pérez', 11, 'B67890');