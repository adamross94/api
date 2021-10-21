// We use dotenv to hide any environment variables from our code.
// ie. We don't want to expose our login credentials for SQL Server.
// https://www.npmjs.com/package/dotenv 
require("dotenv").config();

// The first line imports the Express module, the second lets us use it. 
// https://expressjs.com/
const express = require('express');
const app = express();

// Middleware which helps to parse json bodies in the request object.
app.use(express.json()); 

// This code redirects requests to endpoint /kpi to kpiRoutes.js
app.use ("https://restapitutorial.herokuapp.com/api/v1/kpi", require("./routes/kpiRoutes"));

// The global error handler catches any errors within this application.
// This script sends the error information to our console.log 
app.use ((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "A fatal error occured.",
        });
});

// The script below pulls the server port information from our variable file.
// It also sets the port.
const PORT  = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));