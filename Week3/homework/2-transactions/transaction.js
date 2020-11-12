const fs = require("fs");
const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3_db",
});

const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);

const SET_AUTOCOMMIT = `
    SET AUTOCOMMIT = 0;
    `;
const START_TRANSACTION = `
    START TRANSACTION;
    `;
const UPDATE_ACCOUNT_TABLE_101 = `UPDATE account SET balance = balance - 1000 WHERE account_number = 101;`;

const UPDATE_ACCOUNT_TABLE_102 = `UPDATE account SET balance = balance + 1000 WHERE account_number = 102;`;

const INSERT_TRANSACTION_TO_ACCOUNT_CHANGE = `
    INSERT INTO account_changes(account_number,amount,changed_date,remark) VALUES(101,1000,'2020-11-11', 
    '1000,00 was successfully transferred to 102'), (102,1000,'2020-11-11','Received: 1000,00 from 101');
    `;
const END_TRANSACTION = `COMMIT;`;

async function transact() {
  connection.connect();
  try {
    await Promise.all[
      (execQuery(SET_AUTOCOMMIT),
      execQuery(START_TRANSACTION),
      execQuery(UPDATE_ACCOUNT_TABLE_101),
      execQuery(UPDATE_ACCOUNT_TABLE_102),
      execQuery(INSERT_TRANSACTION_TO_ACCOUNT_CHANGE),
      execQuery(END_TRANSACTION))
    ];
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
  }
  connection.end();
}

transact();
