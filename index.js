require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
app.use(bodyParser.json());

// Configuración de la base de datos
const client = new Client({
    user: process.env.DB_USER,
    host: '172.172.152.57',
    database: 'postgres',
    password: process.env.DB_PASS,
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to database'))
    .catch(error => console.log('Error connecting to database', error));

// Endpoint de prueba
app.get('/test', (req, res) => {
    const id = req.query.id;
    console.log('Executing query: ', req.query, req.params, req.body);
    res.json(id);
});

// Endpoint para probar la conexión a la base de datos
app.get('/test-db', async (req, res) => {
    try {
        const result = await client.query('SELECT NOW()');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error conectando a la base de datos');
    }
});

// Endpoint vulnerable a SQL Injection para estudiantes
app.get('/estudiantes', (req, res) => {
    const nombre = req.query.nombre;
    const query = `SELECT * FROM Estudiantes WHERE nombre = '${nombre}'`;

    console.log('Executing query:', query);

    client.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        } else {
            res.json(result.rows);
        }
    });
});

// Endpoint vulnerable a SQL Injection para notas
app.get('/notas', (req, res) => {
    const estudiante_id = req.query.estudiante_id;
    const query = `SELECT * FROM Notas WHERE estudiante_id = ${estudiante_id}`;

    console.log('Executing query:', query);

    client.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        } else {
            res.json(result.rows);
        }
    });
});


// Vulnerable a SQL Injection
app.get('/pacientes', (req, res) => {
    const nombre = req.query.nombre;
    const query = `SELECT * FROM Pacientes WHERE nombre = '${nombre}'`;

    console.log('Executing query:', query);

    client.query(query, (err, result) => {
      if (err) {
        console.error('Error ejecutando la consulta', err.stack);
        res.status(500).send('Error en el servidor');
      } else {
        res.status(200).json(result.rows);
      }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
