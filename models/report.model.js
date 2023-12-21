
import { executeSql } from "../utils/database.utils.js";
import { getUserByUsernameModel } from "./users.model.js";

export const USER_CODES = {
    USER_INSERT_FAILED: 'USER_INSERT_FAILED',
    USER_TABLE_EMPTY: 'USER_TABLE_EMPTY',
    // USER_NOT_FOUND: 'USER_NOT_FOUND',
    // USER_UPDATE_FAILED: 'USER_UPDATE_FAILED',
}

export const getAllReportsModel = async () => {
    const results = await executeSql("SELECT id, user_id, report_type, description, location, time_stamp, image_link FROM community_report");
    console.log(results);
    if (results) {
        return { ...results };
    } else {
        throw USER_CODES.USER_TABLE_EMPTY;
    }
}

export const createReportModel = async (report) => {
    const payload = {
        username: report.username
    }
    const user = await getUserByUsernameModel(payload);
    console.log("user in createReportModel"+user.result);
    const results = await executeSql(
        "insert into community_report(user_id, report_type, description, location, time_stamp, image_link) values (?,?,?,?,?,?)",
        [report.user_id, report.report_type, report.description, report.location, report.time_stamp, report.image_link]
    );

    if (results && results.affectedRows) {
        return { ...user, id: results.insertId, password: undefined }; // return a copy of the user obj and override the id with the db id.
    } else {
        throw USER_CODES.USER_INSERT_FAILED;
    }
}


// app.js


