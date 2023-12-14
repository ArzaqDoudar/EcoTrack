// const { json } = require('body-parser');

import {query} from "./db.js"
export const create = async (table, data) => {
    var queryString = `INSERT INTO ${table} (${data.columns}) 
    VALUES (${data.values})`;
    const result = await query(queryString);
    
    let message = 'Error in creating new user';
    
    if (result.affectedRows) {
        message = 'User created successfully, the user with id = '+ result.insertId;
    }
    return { message };
};

export const getWhere = async (table, data) => {
    const queryString = `SELECT ${data.columns} FROM ${table} WHERE ${data.where}='${data.whereValue}'`;
    console.log(queryString);
    const rows = await query(queryString);
    const result = rows || [];
    return result;
};
// module.exports = {
//     getMultiple: async function (table, ...columns) {
//         const queryString = `SELECT ${columns} FROM ${table}`;
//         console.log(queryString);
//         const rows = await query(queryString);
//         const data = rows || [];
//         return data;
//     },
//     getWhere: async function (table, data) {
//         const queryString = `SELECT ${data.columns} FROM ${table} WHERE  ${data.where} =  ${data.whereValue}`;
//         console.log(queryString);
//         const rows = await query(queryString);
//         const result = rows || [];
//         return result;
//     },
//     create: async function (table, data) {
//         var queryString = `INSERT INTO ${table} (${data.columns}) 
//         VALUES (${data.values})`;
//         console.log(queryString);
//         const result = await query(queryString);
//         console.log('result id = ');
//         console.log(result.insertId);

//         let message = 'Error in creating new user';

//         if (result.affectedRows) {
//             message = 'User created successfully, the user with id = '+ result.insertId;
//         }
//         return { message };
//     },
//     update: async function (table, data) {
//         var queryString = `UPDATE  ${table} SET ${data.set} WHERE  id = ${data.id}`;
//         console.log(queryString);
//         const result = await query(queryString);
//         let message = 'Error in updating user';
//         let newResult ;
//         if (result.affectedRows) {
//             const newQueryString = `SELECT * FROM ${table} WHERE  id =  ${data.id}`;
//             console.log(newQueryString);
//             const newRow = await query(newQueryString);
//             newResult =newRow || [];

//             message = 'User updated successfully';
//         }
//         return {
//             message,
//             newResult
//         };
//     },
// }