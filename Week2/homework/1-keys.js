const util = require('util');
const fs = require('fs');
const mysql = require('mysql');


const CONNECTION_CONFIG = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
};

const connection = mysql.createConnection(CONNECTION_CONFIG);

const CREATE_DB = `
CREATE DATABASE IF NOT EXISTS week2_db;
    `;


const USE_DB = `
use week2_db;
`

const CREATE_AUTHORS_TABLE = `
CREATE TABLE IF NOT EXISTS authors(
    author_no INT primary key,
    author_name varchar(42), 
    university varchar(42),
    date_of_birth DATE,
    h_index INT(12),
    gender enum('m', 'f')
    );`;

async function alterAuthTable() {
    const readFile = util.promisify(fs.readFile);
    const executeQuery = util.promisify(connection.query.bind(connection));

    const ADD_COLUMN_TO_AUTHORS_TABLE = `
        ALTER TABLE authors ADD COLUMN Collaborator INT;
    `;
    const ADD_FK_TO_AUTHORS_TABLE = `
        ALTER TABLE authors ADD FOREIGN KEY(Collaborator) REFERENCES authors(author_no);
    `;

    connection.connect();

    try {
        await Promise.all[executeQuery(CREATE_DB), executeQuery(USE_DB), executeQuery(CREATE_AUTHORS_TABLE), executeQuery(ADD_COLUMN_TO_AUTHORS_TABLE),
            executeQuery(ADD_FK_TO_AUTHORS_TABLE)];

        const data = await readFile(__dirname + '/files/authors.json', 'utf8');
        const authors = JSON.parse(data);
        for (let i = 0; i < CREATE_AUTHORS_TABLE.length; i++) {
            connection.query('INSERT INTO authors SET ?', authors[i], error => {
                if (error) {
                    throw error;
                }
            });
        }

        console.log(data);
        connection.end();

    } catch (err) {
        console.error(err.message);
        connection.end();
    }

}

alterAuthTable();