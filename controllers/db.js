// // this file is to connect with database
// const { createConnection } = require( 'mysql2/promise');
// const {db} =require("../config.js");

// module.exports = {
//   query: async function (sql, params){
//     const connection = await createConnection(db);
//     const [results, ] = await connection.execute(sql, params);
  
//     return results;
//   },
// }