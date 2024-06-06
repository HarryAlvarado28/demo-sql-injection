CREATE TABLE Estudiantes (
    estudiante_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL
);

CREATE TABLE Materias (
    materia_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Notas (
    nota_id SERIAL PRIMARY KEY,
    estudiante_id INT NOT NULL REFERENCES Estudiantes(estudiante_id),
    materia_id INT NOT NULL REFERENCES Materias(materia_id),
    nota DECIMAL(4, 2) NOT NULL
);

-- Insertar estudiantes
INSERT INTO Estudiantes (nombre, apellido, fecha_nacimiento) VALUES
('Juan', 'Pérez', '2000-01-15'),
('María', 'González', '1999-05-23');

-- Insertar materias
INSERT INTO Materias (nombre) VALUES
('Matemáticas'),
('Historia');

-- Insertar notas
INSERT INTO Notas (estudiante_id, materia_id, nota) VALUES
(1, 1, 8.5),
(1, 2, 7.0),
(2, 1, 9.0),
(2, 2, 6.5);
