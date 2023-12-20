import { executeSql } from "../utils/database.utils.js";

export const USER_CODES = {
    USER_INSERT_FAILED: 'USER_INSERT_FAILED',
    USER_TABLE_EMPTY: 'USER_TABLE_EMPTY',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
}

export const getAllUsersModel = async () => {
    const results = await executeSql("SELECT id, username, name  FROM users");
    console.log(results);
    if (results) {
        return { ...results };
    } else {
        throw USER_CODES.USER_TABLE_EMPTY;
    }
}
export const getUserByUsernameModel = async (user) => {
    const result = await executeSql("SELECT id, username, name  FROM users WHERE username = ?", [user.username]);
    console.log(result);
    if (result) {
        return { result };
    } else {
        throw USER_CODES.USER_NOT_FOUND;
    }
}

export const createUserModel = async (user) => {
    const results = await executeSql(
        "insert into users(name, username, password, location) values (?,?,?,?)",
        [user.name, user.username, user.password, user.location]
    );

    if (results && results.affectedRows) {
        return { ...user, id: results.insertId, password: undefined }; // return a copy of the user obj and override the id with the db id.
    } else {
        throw USER_CODES.USER_INSERT_FAILED;
    }
}
export const updateUserModel = async (user) => {
    try {
        let sqlString = "UPDATE users SET ";

        if (user.name && user.name !== "any") {
            sqlString += "name = '" + user.name + "'";
        }

        if (user.location && user.location !== "any") {
            sqlString += (sqlString.endsWith('SET ') ? '' : ', ') + "location = '" + user.location + "'";
        }

        if (!user.name && !user.location) {
            throw USER_CODES.USER_UPDATE_FAILED;
        }

        sqlString += " WHERE username = '" + user.username + "'";

        console.log(sqlString);
        const results = await executeSql(sqlString);

        if (results && results.affectedRows) {
            const updatedUser = {
                name: user.name,
                location: user.location,
                password: user.password 
            };

            return updatedUser;
        } else {
            throw USER_CODES.USER_UPDATE_FAILED;
        }
    } catch (error) {
        console.error("Error updating user:", error);
        throw USER_CODES.USER_UPDATE_FAILED; 
    }
}
