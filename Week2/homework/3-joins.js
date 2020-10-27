const mysql = require('mysql');
const connection = mysql.createConnection({
host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb'
});
connection.connect();

function mysqlConnection(queryName) {
    connection.query(queryName, (err, results, fields) => {
        if (err) throw err;
        console.log(results);
    });
}

const query1 =
    `SELECT 
    a.author_no, a.author_name, c.author_name AS Collaborator
FROM authors a
JOIN authors c
    ON a.collaborator = c.author_no;`;

mysqlConnection(query1);


const query2 =
    `
SELECT 
    a.author_no, a.author_name, a.university, a.h_index, a.gender, a.Collaborator, rp.paper_title
FROM authors a
LEFT JOIN authors_papers ap
	USING(author_no)
LEFT JOIN research_papers rp
    ON rp.paper_id = ap.paper_id;
`;

mysqlConnection(query2);
