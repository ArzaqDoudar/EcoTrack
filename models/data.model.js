import { executeSql } from "../utils/database.utils.js";
import { USER_CODES, addScoreUserModel, getUserByUsernameModel } from "./users.model.js";

export const DATA_CODES = {
    DATA_TABLE_EMPTY: 'DATA_TABLE_EMPTY',
    DATA_INSERT_FAILD: 'DATA_INSERT_FAILD',
    DATA_NOT_CORRECT: 'DATA_NOT_CORRECT',
    DATA_USER_EMPTY: 'DATA_USER_EMPTY',
    DATA_LOCATION_EMPTY: 'DATA_LOCATION_EMPTY',
    DATA_TYPE_EMPTY: 'DATA_TYPE_EMPTY',
}

export const getAllDataModel = async () => {
    const results = await executeSql("SELECT *  FROM data");
    if (results && results.length) {
        return [...results];
    } else {
        throw DATA_CODES.DATA_TABLE_EMPTY;
    }
}
export const insertDataModel = async (data) => {
    try {
        console.log("inside insert data model")
        const user = await getUserByUsernameModel({ username: data.username });
        if (!user) {
            throw DATA_CODES.USER_NOT_EXIST;
        }
        console.log("insert data model 1")

        if (data.data_type != "any" && data.value != "any" && data.location != "any") {
            const results = await executeSql(
                "INSERT INTO `data` (`user_id`, `data_type`, `value`, `location`) VALUES (?, ?, ?, ?)",
                [user.id, data.data_type, data.value, data.location]);
            console.log(results);
            if (results && results.affectedRows) {
                const resultScore = await addScoreUserModel(user.id ,user.username);

                return { message: "data inserted successfuly", status: 200, resultScore: resultScore };
            } else {
                throw DATA_CODES.DATA_INSERT_FAILD;
            }
        } else {
            throw DATA_CODES.DATA_NOT_CORRECT;
        }
    } catch (error) {
        switch (error) {
            case USER_CODES.USER_NOT_FOUND:
                throw USER_CODES.USER_NOT_FOUND;
            case DATA_CODES.DATA_USER_EMPTY:
                throw DATA_CODES.DATA_USER_EMPTY;
            case DATA_CODES.USER_SCORE_UPDATE_FAILED:
                throw DATA_CODES.USER_SCORE_UPDATE_FAILED;
        }
    }


}

export const getUserDataModel = async (username) => {
    try {
        const user = await getUserByUsernameModel({ username: username });
        console.log("user ", user[0]);

        if (!user) {
            throw DATA_CODES.USER_NOT_EXIST;
        }
        console.log("user found = ", user);
        const results = await executeSql("SELECT *  FROM data WHERE user_id = ?", [user.id]);
        console.log("test ", results.length);
        if (results && results.length) {
            return { ...results };
        } else {
            throw DATA_CODES.DATA_USER_EMPTY;
        }
    } catch (error) {
        switch (error) {
            case USER_CODES.USER_NOT_FOUND:
                throw USER_CODES.USER_NOT_FOUND;
            case DATA_CODES.DATA_USER_EMPTY:
                throw DATA_CODES.DATA_USER_EMPTY;
        }

    }

}

export const getDataByLocationModel = async (location) => {
    const results = await executeSql("SELECT *  FROM data WHERE location = ?", [location]);
    if (results && results.length) {
        return [...results];
    } else {
        throw DATA_CODES.DATA_LOCATION_EMPTY;
    }
}

export const getDataByTypeModel = async (data_type) => {
    const results = await executeSql("SELECT *  FROM data WHERE data_type = ?", [data_type]);
    console.log("SELECT *  FROM data WHERE data_type = '?'", data_type);
    if (results && results.length) {
        return [...results];
    } else {
        throw DATA_CODES.DATA_TYPE_EMPTY;
    }
}