// this file is to connect with database
import { createConnection } from 'mysql2/promise';
import { config } from "../config.js";

export const query = async (sql, params) => {
    const connection = await createConnection(config.db);
    const [results,] = await connection.execute(sql, params);
    return results;
};