const fs = require('fs');
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'week3_db'
});

const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);


async function insertValues() {
    connection.connect();
    try {

        const accounts_data = await readFile(__dirname + `/files/accounts.json`, 'utf8');
        const accounts = JSON.parse(accounts_data);
        accounts.map(async account => await execQuery('INSERT INTO account SET ?', account));

        const changes_data = await readFile(__dirname + `/files/account_changes.json`, 'utf8');
        const account_changes = JSON.parse(changes_data);
        account_changes.map(async change => await execQuery('INSERT INTO account_changes SET ?', change));
        // console.table(accounts);
        // console.table(account_changes);
    } catch (error) {
        console.error(error);
    }
    connection.end();
}

insertValues();


