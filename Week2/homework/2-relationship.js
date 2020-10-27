const util = require('util');
const mysql = require('mysql');


const CONNECTION_CONFIG = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
};

//generate papers
const papers = [];
for (let i = 1; i < 50; i++) {
    const paperObj = {
        paper_id: i,
        author_no: `author${i}`
    };
    papers.push(paperObj);

}

//There is a many to many relationship between the authors and research_papers tables.

async function createAuthorsAndPapersTable() {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const executeQuery = util.promisify(connection.query.bind(connection));


    const research_papers_TABLE = `
CREATE TABLE IF NOT EXISTS research_papers(
    paper_id INT primary key,
    paper_title varchar(42), 
    conference varchar(42),
    publish_date DATE
    );`;

    const authors_and_papers_TABLE = `
    CREATE TABLE IF NOT EXISTS authors_and_papers(
        author_no INT,
        paper_id INT,
        PRIMARY KEY(author_no,paper_id),
        FOREIGN KEY(author_no) REFERENCES authors(author_no),
        FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id)
    );
    `;
    connection.connect();
    try {
        await Promise.all[executeQuery(research_papers_TABLE), executeQuery(authors_and_papers_TABLE)];
        for (let i = 0; i < research_papers_TABLE.length; i++) {
            connection.query('INSERT INTO research_papers SET ?', papers[i], error => {
                if (error) {
                    throw error;
                }
            });
        }
        connection.end();

    } catch (err) {
        console.error(err.message);
        connection.end();
    }

}

createAuthorsAndPapersTable();