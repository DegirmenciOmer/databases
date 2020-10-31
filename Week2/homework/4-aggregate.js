const mysql = require('mysql');
const connection = mysql.createConnection({
host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'week2_db'
});
connection.connect();

function queryConnection(queryName) {
    connection.query(queryName, (err, results, fields) => {
        if (err) throw err;
        console.table(results);
    });
}

const query1 = 
`
SELECT 
    rp.paper_title, count(a.author_no) AS total_author
FROM research_papers rp
JOIN authors_and_papers ap
    USING(paper_id)
JOIN authors a
    USING(author_no)
GROUP BY paper_title;
`;

queryConnection(query1);


const query2 = 
`
SELECT 
    a.gender, count(ap.paper_id) AS total_paper_by_females
FROM authors a
LEFT JOIN authors_and_papers ap
USING(author_no)
WHERE a.gender = 'f';
`;
queryConnection(query2);


const query3 = 
`
SELECT 
university, avg(h_index) as avarage_h_index
FROM authors
GROUP BY university;
`;
queryConnection(query3);

const query4 = 
`
SELECT 
a. university, count(ap.paper_id) AS total_papers_per_uni
FROM authors a
JOIN authors_and_papers ap
    USING(author_no)
JOIN research_papers rp
	USING(paper_id)
GROUP BY a.university;
`;
queryConnection(query4);


const query5 = 
`
SELECT 
a. university, min(a.h_index) AS min_h_index, max(a.h_index) AS max_h_index
FROM authors a
JOIN authors_and_papers ap
    USING(author_no)
JOIN research_papers rp
	ON rp.paper_id = ap.paper_id
GROUP BY a.university;
`;
queryConnection(query5);

connection.end();