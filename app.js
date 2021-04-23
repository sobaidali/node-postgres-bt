const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const dust = require('dustjs-helpers');
// const { pool } = require('./psql-config');
const ejs = require('ejs')
const { Pool, Client } = require('pg');

const app = express();

//database connection string    
const connectionString = 'postgresql://npbt:12345@localhost:5432/recipebookdb'

//assign dust engine to .dust files
// app.engine('dust', consolidate.dust);

//set default ext .dust
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const pool = new Pool({
        connectionString,
    })

    const client = new Client({
        connectionString,
    })
    client.connect()
    client.query('SELECT * FROM recipes', (err, result) => {
        res.render('index', { recipes: result.rows });
        client.end()
    })
})

app.post('/add', (req, res) => {
    const pool = new Pool({
        connectionString,
    })

    const client = new Client({
        connectionString,
    })
    client.connect()
    client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)', ["Chicken burger", "Chicken, Spice etc.", "Add spice into chicken etc."]);
})

app.listen(5000, () => console.log("Localhost is connected to port 5000."))
