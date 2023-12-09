const { query } = require('./db.js');
const { listPerPage } = require('../config.js');
function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}
module.exports = {
    getMultiple: async function (table, ...columns) {
        console.log('inside get multiple');
        console.log(table);
        const rows = await query(
            `SELECT ${columns}
        FROM ${table}`
        );
        console.log("data");

        const data = emptyOrRows(rows);
        console.log(data);
        return data;
    },
    create: async function (table, data) {
        console.log("table ="+ table);
        console.log("data columns ="+ data.columns);
        console.log("data values ="+ data.values);
        var str =`INSERT INTO ${table} (${data.columns}) 
        VALUES (${data.values})`;
        console.log(str);
        const result = await query(str);


        // Username,Password,location,Name
        // 'arzaqziad3','12345','Nablus','Arzaq Doudar'
        // ('${User.username}', ${User.password}, ${User.location}, ${User.name})
        let message = 'Error in creating new user';

        if (result.affectedRows) {
            message = 'User created successfully';
        }

        return { message };
    },
}