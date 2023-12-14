import {createConnection} from "mysql2/promise";
import {config} from "../config.js";

export const executeSql = async (sql, params) => {
    const connection = await createConnection(config.db);
    const [results,]= await connection.query(sql, params);
    return results;
};