// This imports the db credentials we need to connect to SQL
const db = require('../config/db');

// This creates a class called Record with a constructor.
// We use this to push / write data to our database.
// this.KPI_ID would be the KPI_ID value recorded during the user session.
// The API then links it with the column in SQL. 
class Record {
    constructor(KPI_ID, Reporting_Period, Specialty_Code, Specialty_Name, Ward_Code, Ward_Name, Numerator, Denominator, Additional_1, Additional_2) {
        this.KPI_ID = KPI_ID;
        this.Reporting_Period = Reporting_Period;
        this.Specialty_Code = Specialty_Code;
        this.Specialty_Name = Specialty_Name;
        this.Ward_Code = Ward_Code;
        this.Ward_Name = Ward_Name;
        this.Numerator = Numerator;
        this.Denominator = Denominator;
        this.Additional_1 = Additional_1;
        this.Additional_2 = Additional_2;
    }

    // This code builds an asynchronous function.
    // lets us save the date information of when a KPI is input via API.
    // We then define it as createdAtDate so we can link the data to SQL.
    // Date is formatted in line with SQL date format. 
    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();

        let createdAtDate = `${yyyy}-${mm}-${dd}`;

        // The code below inserts the KPI values into our SQL database.
        // The API will look for the processes in our constructor,
        // and will then write the data to the assigned field in SQL.       
        let sql = `
        INSERT INTO api.kpi(
         KPI_ID,
         Reporting_Period,
         Specialty_Code,
         Specialty_Name,
         Ward_Code,
         Ward_Name,
         Numerator,
         Denominator,
         Additional_1,
         Additional_2,
         Created_At_Date   
        )
        VALUES(
            '${this.KPI_ID}',
            '${this.Reporting_Period}',
            '${this.Specialty_Code}',
            '${this.Specialty_Name}',
            '${this.Ward_Code}',
            '${this.Ward_Name}',
            '${this.Numerator}',
            '${this.Denominator}',
            '${this.Additional_1}',
            '${this.Additional_2}',
            '${createdAtDate}'
        )
        `;

        return db.execute(sql);


    }

    // Executes a SELECT * FROM statement on our KPI database to retrieve all records.
    // 
    static findAll() {
        let sql = "select * FROM `api.kpi`;";

        return db.execute(sql);

    }

    // Executes a SELECT * FROM statement to retrieve records where KPI_ID parameter defined.
    static getKPIByID(kpi) {
        let sql = `SELECT * FROM api.kpi WHERE KPI_ID = ${kpi};`;

        return db.execute(sql);
    }
}

// Exports this as a module called Record
module.exports = Record;