import { executeSql } from "../utils/database.utils.js";

export const DATA_CODES = {
    DATA_TABLE_EMPTY: 'DATA_TABLE_EMPTY',
    DATA_INSERT_FAILD: 'DATA_INSERT_FAILD',
}

export const getAllDataModel = async () => {
    const results = await executeSql("SELECT *  FROM data");
    console.log(results);
    if (results && results.length) {
        return [ ...results ];
    } else {
        throw DATA_CODES.DATA_TABLE_EMPTY;
    }
}
export const insertDataModel = async () => {
    const results = await executeSql("SELECT *  FROM data");
    console.log(results);
    if (results && results.affectedRows) {
        return { ...results };
    } else {
        throw DATA_CODES.DATA_INSERT_FAILD;
    }
}