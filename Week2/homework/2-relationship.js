const util = require('util');
const fs = require('fs');
const mysql = require('mysql');


const CONNECTION_CONFIG = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'week2_db',
};



//There is a many to many relationship between the authors and research_papers tables.

async function createAuthorsAndPapersTable() {
    const readFile = util.promisify(fs.readFile);

    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const executeQuery = util.promisify(connection.query.bind(connection));
    
    connection.connect();

    const research_papers_TABLE = `
CREATE TABLE IF NOT EXISTS research_papers(
    paper_id INT AUTO_INCREMENT,
    paper_title varchar(42), 
    conference varchar(42),
    publish_date DATE,
    PRIMARY KEY (paper_id)
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
    try {
        await Promise.all[executeQuery(research_papers_TABLE), executeQuery(authors_and_papers_TABLE)];

        const paperData = await readFile(__dirname + '/files/papers.json', 'utf8');
        const researchPapers = JSON.parse(paperData);

        const authPaperData = await readFile(__dirname + '/files/authors_papers.json', 'utf8');
        const authors_papers = JSON.parse(authPaperData);

        console.log(researchPapers, authPaperData);

        for (let i = 0; i < research_papers_TABLE.length; i++) {
            connection.query('INSERT INTO research_papers SET ?', researchPapers[i], error => {
                if (error) {
                    throw error;
                }
            });
        }

        
        for (let i = 0; i < authors_and_papers_TABLE.length; i++) {
            connection.query('INSERT INTO authors_and_papers SET ?', authors_papers[i], error => {
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