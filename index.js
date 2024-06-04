const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
app.use(bodyParser.json());

// Configuración de la base de datos
const client = new Client({
    user: 'postgres',
    host: '172.172.152.57',
    database: 'postgres',
    password: 'Pass8Strong_DB@1593',
    port: 5432,
});

client.connect();

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
