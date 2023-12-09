const { query } = require('./db.js');
const { listPerPage } = require('../config.js');
function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}
module.exports = {
    getMultiple: async function (table, ...col) {
        const rows = await query(
            `SELECT Id, Name
        FROM ${table}`
        );
        const data = emptyOrRows(rows);

        return {
            data,
        }
    },
    create: async function (User) {
        const result = await query(
            `INSERT INTO users 
        (Id,Username,Password,location,Name) 
        VALUES 
        ('${User.username}', ${User.password}, ${User.location}, ${User.name})`
        );

        let message = 'Error in creating new user';

        if (result.affectedRows) {
            message = 'User created successfully';
        }

        return { message };
    },
}