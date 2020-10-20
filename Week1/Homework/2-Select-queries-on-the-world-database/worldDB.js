const mysql = require('mysql');
const connection = mysql.createConnection({
host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world'
});
connection.connect();

//1.What are the names of countries with population greater than 8 million?
const countriesEightMillion = "SELECT name, POPULATION FROM country WHERE population > 8000000"
connection.query(countriesEightMillion, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//2.What are the names of countries that have “land” in their names?  0636257036
const countriesWithLand = "SELECT name FROM country WHERE name LIKE '%land%'";
connection.query(countriesWithLand, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//3.What are the names of the cities with population in between 500,000 and 1 million?
const citiesBetw500kAndMillion = "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000";
connection.query(citiesBetw500kAndMillion, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//4.What's the name of all the countries on the continent ‘Europe’?
const countriesEU = "SELECT name FROM country WHERE continent = 'Europe'";
connection.query(countriesEU, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//5. List all the countries in the descending order of their surface areas.
const countriesLargest = "SELECT name, surfacearea FROM country ORDER BY surfacearea DESC";
connection.query(countriesLargest, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//6.What are the names of all the cities in the Netherlands?
const dutchCities = "SELECT name FROM city WHERE countrycode = 'NLD'";
connection.query(dutchCities, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//7. What is the population of Rotterdam?
const rotterdamPopulation = "SELECT population FROM city WHERE name = 'Rotterdam'";
connection.query(rotterdamPopulation, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//8. What's the top 10 countries by Surface Area?
const topTenLargestCountries = "SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10";
connection.query(topTenLargestCountries, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//9.What's the top 10 most populated cities?
const topTenMostPopulatedCities = "SELECT name FROM city ORDER BY population DESC LIMIT 10";
connection.query(topTenMostPopulatedCities, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//10. What is the population number of the world?
const sql_10 = "SELECT SUM(population) as world_total_population FROM country";
connection.query(sql_10, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

connection.end();