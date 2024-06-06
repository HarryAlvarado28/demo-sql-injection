-- Creación de la tabla Pacientes
CREATE TABLE Pacientes (
    id_paciente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero CHAR(1) CHECK (genero IN ('M', 'F')),
    direccion VARCHAR(255),
    telefono VARCHAR(20)
);

-- Creación de la tabla Doctores
CREATE TABLE Doctores (
    id_doctor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    telefono VARCHAR(20)
);

-- Creación de la tabla Citas
CREATE TABLE Citas (
    id_cita SERIAL PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_doctor INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    motivo TEXT,
    FOREIGN KEY (id_paciente) REFERENCES Pacientes(id_paciente),
    FOREIGN KEY (id_doctor) REFERENCES Doctores(id_doctor)
);

-- Creación de la tabla Tratamientos
CREATE TABLE Tratamientos (
    id_tratamiento SERIAL PRIMARY KEY,
    id_cita INT NOT NULL,
    descripcion TEXT NOT NULL,
    medicamento VARCHAR(255),
    dosis VARCHAR(255),
    FOREIGN KEY (id_cita) REFERENCES Citas(id_cita)
);


-- Insertar datos en la tabla Pacientes
INSERT INTO Pacientes (nombre, apellido, fecha_nacimiento, genero, direccion, telefono) VALUES
('Juan', 'Pérez', '1980-05-15', 'M', 'Calle Falsa 123', '555-1234'),
('María', 'González', '1992-07-22', 'F', 'Avenida Siempre Viva 456', '555-5678'),
('Carlos', 'Ramírez', '1975-11-30', 'M', 'Calle del Sol 789', '555-8765'),
('Lucía', 'Fernández', '1988-03-18', 'F', 'Boulevard Central 321', '555-4321');

-- Insertar datos en la tabla Doctores
INSERT INTO Doctores (nombre, apellido, especialidad, telefono) VALUES
('Ana', 'Martínez', 'Cardiología', '555-1111'),
('Luis', 'Sánchez', 'Neurología', '555-2222'),
('Elena', 'Torres', 'Pediatría', '555-3333'),
('Miguel', 'López', 'Dermatología', '555-4444');

-- Insertar datos en la tabla Citas
INSERT INTO Citas (id_paciente, id_doctor, fecha, hora, motivo) VALUES
(1, 1, '2024-06-10', '10:00', 'Chequeo general'),
(2, 2, '2024-06-11', '11:30', 'Dolor de cabeza persistente'),
(3, 3, '2024-06-12', '14:00', 'Consulta pediátrica para su hijo'),
(4, 4, '2024-06-13', '09:30', 'Revisión de lunares');

-- Insertar datos en la tabla Tratamientos
INSERT INTO Tratamientos (id_cita, descripcion, medicamento, dosis) VALUES
(1, 'Examen físico completo y pruebas de laboratorio', 'N/A', 'N/A'),
(2, 'Prescripción de analgésicos', 'Paracetamol', '500mg cada 8 horas'),
(3, 'Vacunación y control de desarrollo infantil', 'Vacuna MMR', '0.5ml'),
(4, 'Biopsia de lunar', 'N/A', 'N/A');
