const mysql = require('mysql');

const invitees = [{
    invitee_no: 1,
    invitee_name: "Wouter Kleijn",
    invited_by: "Stas Seldin"
},
{
    invitee_no: 2,
    invitee_name: "Andrej Gajduk",
    invited_by: "TED MOSBY"
},
{
    invitee_no: 3,
    invitee_name: "Noer Paanaker",
    invited_by: "Stas Seldin"
},
{
    invitee_no: 4,
    invitee_name: "Tjebbe Schalij",
    invited_by: "Stas Seldin"
},
{
    invitee_no: 5,
    invitee_name: "Federico Fusco",
    invited_by: "Stas Seldin"
}
];

const meeting = [
    {
        meeting_no: 1,
        meeting_title: "Arrays",
        starting_time: "2020-01-11 09:00",
        ending_time: "2020-01-11 16:00",
        room_no: 11
    },
    {
        meeting_no: 2,
        meeting_title: "functions",
        starting_time: "2020-02-22 10:00",
        ending_time: "2020-02-22 17:20",
        room_no: 22
    },
    {
        meeting_no: 3,
        meeting_title: "Objects",
        starting_time: "2020-05-12 09:00",
        ending_time: "2020-05-12 13:40",
        room_no: 33
    },
    {
        meeting_no: 4,
        meeting_title: "react",
        starting_time: "2020-08-05 13:00",
        ending_time: "2020-08-05 16:30",
        room_no: 44
    },
    {
        meeting_no: 5,
        meeting_title: "Databases",
        starting_time: "2020-11-05 09:00",
        ending_time: "2020-11-05 16:00",
        room_no: 55
    }
]

const rooms = [
    {
        room_no: 11,
        room_name: "Andy",
        floor_number: 1
    },
    {
        room_no: 22,
        room_name: "Billy",
        floor_number: 2
    },
    {
        room_no: 33,
        room_name: "Casey",
        floor_number: 3
    },
    {
        room_no: 44,
        room_name: "Dolly",
        floor_number: 4
    },
    {
        room_no: 55,
        room_name: "Elly",
        floor_number: 5
    }
];

//Connect to the mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
});
connection.connect();

//Drop a database
connection.query("DROP DATABASE IF EXISTS meetup");

//Create a database
const dbQuery = "CREATE DATABASE IF NOT EXISTS meetup";
connection.query(dbQuery);

//Select a database
connection.query("USE meetup");

//Create tables
const queryTable = [
    "CREATE TABLE Invitee (invitee_no int(3) ZEROFILL, invitee_name varchar(50), invited_by varchar(50))",
    "CREATE TABLE Room (room_no int, room_name varchar(50), floor_number int)",
    "CREATE TABLE Meeting (meeting_no int(3) ZEROFILL, meeting_title varchar(50), starting_time datetime, ending_time datetime, room_no int)"
];

queryTable.forEach(query => {
    connection.query(query, (err, results, fields) => {
        if (err) throw err;
        console.log('Table created.');
    })
});

//Insert values 
function insertValues(tableName, tableContent) {
    tableContent.forEach(content => {
        connection.query(`INSERT INTO ${tableName} SET ?`, content, (err, results, fields) => {
            if (err) throw err;
            console.log(`Values inserted into the ${tableName} table.`)
        });
    });
}

insertValues('Invitee', invitees);
insertValues('Room', rooms);
insertValues('Meeting', meeting);

connection.end();