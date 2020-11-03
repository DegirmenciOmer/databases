const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world',
    multipleStatements: true
});

conn.connect();

function getPopulation(Country, name, code, cb) {
    conn.query(
        `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
        function (err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result);
        }
    );
}

// 1. Give an example of a value that can be passed as `name` and `code` that would take advantage of SQL-injection and
//(fetch all the records in the database)

getPopulation('country', 'Zambia', "'ZMB'; SELECT * from country;", (err, results) => {
    if (err) throw err;
    console.table(results);
});




//2. Rewrite the function so that it is no longer vulnerable to SQL injection

//a question mark could be added to secure the query:

// function getPopulation(Country, name, code, cb) {
//     conn.query(`SELECT Population FROM ${Country} WHERE Name = ? and code = ?`,
//         [name, code],
//         (err, result) => {
//             if (err) cb(err);
//             if (result.length == 0) cb(new Error("Not found"));
//             cb(null, result);
//         }
//     );
// }

// getPopulation('country', 'Turkey', 'ZMB', (err, results) => {
//     if (err) throw err;
//     console.table(results)
// })
// conn.end();