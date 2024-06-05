const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
app.use(bodyParser.json());
const client = new Client();

try {
    // Configuración de la base de datos
    const client = new Client({
        user: 'postgres',
        host: '172.172.152.57',
        database: 'postgres',
        password: 'Pass8Strong_DB@1593',
        port: 5432,
    });

    client.connect();
    console.log('Connected to database');
} catch (error) {
    console.log('Error connecting to database', error);
}

app.get('/test', (req, res) => {
    const id = req.query.id;

    console.log('Executing query: ', req.body, req.query, id);

    if (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error executing query');
    } else {
        res.json(id);
    }
});

app.get('/es', (req, res) => {
    const id = req.query.id;
    const query = `SELECT * FROM Estudiantes WHERE id = '${id}'`;

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
