import { executeSql } from "../utils/database.utils.js";

export const EDUCATIONAL_RESOURCE_CODES = {
    RESOURCE_TABLE_EMPTY: 'RESOURCE_TABLE_EMPTY',
    RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
}


export const getAllEducationalResourcesModel = async () => {
    const results = await executeSql("SELECT * FROM educational_resources");
    if (results.length > 0) {
        return [...results];
    } else {
        throw EDUCATIONAL_RESOURCE_CODES.RESOURCE_TABLE_EMPTY;
    }
};

export const getEducationalResourceByTypeModel = async (payload) => {
    console.log("payload=");
    console.log(payload);
    const result = await executeSql("SELECT * FROM educational_resources WHERE resource_type = ?", [payload.resource_type]);

    if (result&&result.length) {
        return [...result];
    } else {
        throw EDUCATIONAL_RESOURCE_CODES.RESOURCE_NOT_FOUND;
    }
};
