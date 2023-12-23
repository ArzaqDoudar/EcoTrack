
import { executeSql } from "../utils/database.utils.js";
import { getUserByUsernameModel } from "./users.model.js";

export const REPORT_CODES = {
    REPORT_INSERT_FAILED: 'REPORT_INSERT_FAILED',
    REPORT_TABLE_EMPTY: 'REPORT_TABLE_EMPTY',
    // USER_NOT_FOUND: 'USER_NOT_FOUND',
    // USER_UPDATE_FAILED: 'USER_UPDATE_FAILED',
}

export const getAllReportsModel = async () => {
    const results = await executeSql("SELECT id, user_id, report_type, description, location, time_stamp, image_link FROM community_report");
    console.log(results);
    if (results) {
        return { ...results };
    } else {
        throw REPORT_CODES.REPORT_TABLE_EMPTY;
    }
}

export const createReportModel = async (report) => {
    const payload = {
        username: report.username
    }
    const user = await getUserByUsernameModel(payload);
    console.log("user in createReportModel"+user.result);
    const results = await executeSql(
        "insert into community_report(user_id, report_type, description, location, time_stamp) values (?,?,?,?,?)",
        [user.id, report.report_type, report.description, report.location, report.time_stamp]
    );

    if (results && results.affectedRows) {
        return { ...user, id: results.insertId, password: undefined }; // return a copy of the user obj and override the id with the db id.
    } else {
        throw REPORT_CODES.REPORT_INSERT_FAILED;
    }
}

export const getReportByTypeModel = async (payload) => {
    const results = await executeSql("SELECT * FROM community_report WHERE report_type = ?",[payload.report_type]);
    console.log(results);
    if (results && results.length) {
        return [ ...results ];
    } else {
        throw REPORT_CODES.REPORT_TABLE_EMPTY;
    }
}
