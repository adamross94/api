const Record = require('../models/KPI');

exports.getAllRecords = async (req, res, next) => {
    try{
        const [records, _] = await Record.findAll();
        res.status(200).json({ count: records.length, records });
    } catch (err) {
        next(err);
    }
};

exports.createNewRecord = async (req, res, next) => {
try {
    let {  KPI_ID,
           Reporting_Period,
           Specialty_Code,
           Specialty_Name,
           Ward_Code,
           Ward_Name,
           Numerator,
           Denominator,
           Additional_1,
           Additional_2,
           Created_At_Date } = req.body;
    let record = new Record(KPI_ID,
        Reporting_Period,
        Specialty_Code,
        Specialty_Name,
        Ward_Code,
        Ward_Name,
        Numerator,
        Denominator,
        Additional_1,
        Additional_2,
        Created_At_Date);

    record = await record.save();

    res.status(201).json({ message: "KPI inserted into database." });
} catch (err) {
    next(err);
}
};

exports.getKPIByID = async (req, res, next) => {
try {

    let kpiID = req.params.KPI_ID;

    let [record, _] = await Record.getKPIByID(kpiID);

    res.status(200).json({ record: record });
} catch (err) {
    next(err);
}
};