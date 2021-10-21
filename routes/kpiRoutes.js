// The code below imports the Express dependencies.
// Next, importing the controllers for the KPI. 
// We then create a router from the Express dependency. 
const express = require('express');
const kpiControllers = require('../controllers/kpiControllers');
const router = express.Router();

// Route for GET & POST functions
// /kpi/ is the default route
router.route("https://restapitutorial.herokuapp.com/api/v1/kpi")
.get(kpiControllers.getAllRecords)
.post(kpiControllers.createNewRecord);

// Route for getting a record by its KPI_ID. 
router.route("https://restapitutorial.herokuapp.com/api/v1/kpi/:KPI_ID").get(kpiControllers.getKPIByID);

// This code exports the router as a module to be used.
module.exports = router;