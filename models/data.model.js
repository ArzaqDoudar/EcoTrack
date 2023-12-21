import { executeSql } from "../utils/database.utils.js";

export const DATA_CODES = {
    // USER_INSERT_FAILED: 'USER_INSERT_FAILED',
    DATA_TABLE_EMPTY: 'DATA_TABLE_EMPTY',
    // USER_NOT_FOUND: 'USER_NOT_FOUND',
    // USER_UPDATE_FAILED: 'USER_UPDATE_FAILED',
}

export const getAllDataModel = async () => {
    const results = await executeSql("SELECT *  FROM data");
    console.log(results);
    if (results) {
        return { ...results };
    } else {
        throw DATA_CODES.DATA_TABLE_EMPTY;
    }
}

