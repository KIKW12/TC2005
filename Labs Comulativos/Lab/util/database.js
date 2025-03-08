const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'LabsComulativos', // Change to your preferred database name
    password: 'Enr!q2e85737'      // Change to your actual MySQL password
});

module.exports = pool.promise();