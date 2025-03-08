-- Create database
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

-- Sample data (optional)
INSERT INTO courses (name, code, teacher) VALUES
('Matemáticas', 'MAT101', 'Prof. García'),
('Ciencias', 'CIE202', 'Prof. Rodríguez');

INSERT INTO students (name, grade, studentId) VALUES
('Ana López', 10, 'A12345'),
('Juan Pérez', 11, 'B67890');