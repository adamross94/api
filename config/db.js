// Imports the dotenv dependencies for Node
require("dotenv").config();

// Imports the MySQL dependencies for Node
const mysql = require('mysql2');

// This creates a pool for the SQL Server credentials.
// Variables pulled with dotenv to prevent exposing credentials.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password:process.env.DB_PASSWORD,

});

// The script below allows us to execute a SQL statement.
// If it finds an error, it will throw the app to notify us.
// Otherwise, it will console log the data from the SQL statement. 
let sql = "SELECT * FROM `api.kpi`;";

pool.execute(sql, function (err, result) {
    if (err) throw err;

    console.log(result);
});

// Allows us to export the pool as a promise.
module.exports = pool.promise();

