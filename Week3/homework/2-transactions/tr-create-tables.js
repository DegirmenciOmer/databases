const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
});

const execQuery = util.promisify(connection.query.bind(connection));


const DROP_DB = `DROP DATABASE week3_db;`
const CREATE_A_DB = `
        CREATE DATABASE IF NOT EXISTS week3_db
    `;

const SELECT_DB = `
        USE week3_db;
    `;

const CREATE_ACCOUNT_TABLE = `
    CREATE TABLE IF NOT EXISTS account (
        account_number INT PRIMARY KEY,
        balance INT 
    );
    `;

const CREATE_ACCOUNT_CHANGES_TABLE = `
    CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT PRIMARY KEY AUTO_INCREMENT,
        account_number INT,
        amount INT,
        changed_date DATETIME,
        remark VARCHAR(50) 
    );
    `;
async function renderDB() {
    try {
        connection.connect();
        const mysqlCommands = [DROP_DB, CREATE_A_DB, SELECT_DB, CREATE_ACCOUNT_TABLE, CREATE_ACCOUNT_CHANGES_TABLE];
        mysqlCommands.forEach(async command => await execQuery(command));



    }
    catch (error) {
        console.error(error);
        connection.end();
    }
    connection.end()

}

renderDB();