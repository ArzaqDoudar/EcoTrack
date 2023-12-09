// this file is to connect with database
const { createConnection } = require('mysql2/promise');
const { config } = require("../config");

module.exports = {
    query: async function (sql, params) {

        console.log("inside query");
        const connection = await createConnection(config.db);
        console.log("after connection");
        const [results,] = await connection.execute(sql, params);
        console.log("befor return");
        return results;
    },
}