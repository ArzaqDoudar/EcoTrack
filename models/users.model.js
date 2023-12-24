import { executeSql } from "../utils/database.utils.js";

export const USER_CODES = {
    USER_INSERT_FAILED: 'USER_INSERT_FAILED',
    USER_TABLE_EMPTY: 'USER_TABLE_EMPTY',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    USER_UPDATE_FAILED: 'USER_UPDATE_FAILED',
    USER_PASSWORD_UPDATE_FAILD: 'USER_PASSWORD_UPDATE_FAILD',
    USER_SCORE_UPDATE_FAILED: 'USER_SCORE_UPDATE_FAILED',
    USER_DATA_NOT_CORRECT: 'USER_DATA_NOT_CORRECT',
}

export const getAllUsersModel = async () => {
    const results = await executeSql("SELECT id, username, name FROM users");
    if (results) {
        return [...results];
    } else {
        throw USER_CODES.USER_TABLE_EMPTY;
    }
}

export const getUserByUsernameModel = async (user) => {
    const result = await executeSql("SELECT * FROM users WHERE username = ?", [user.username]);

    if (result && result.length) {
        return { ...result[0] };
    } else {
        throw USER_CODES.USER_NOT_FOUND;
    }
}

export const createUserModel = async (user) => {
    if (user.name != "any" && user.username != "any" && user.password != "any" && user.location != "any"&& user.role != "any") {
        const results = await executeSql(
            "insert into users(name, username, password, location , user_role) values (?,?,?,?,?)",
            [user.name, user.username, user.password, user.location, user.role]
        );
        if (results && results.affectedRows) {
            return { ...user, id: results.insertId, password: undefined }; // return a copy of the user obj and override the id with the db id.
        } else {
            throw USER_CODES.USER_INSERT_FAILED;
        }
    }else {
        throw USER_CODES.USER_DATA_NOT_CORRECT;
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
        if (user.role && user.role !== "any") {
            sqlString += "user_role = '" + user.role + "'";
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

export const addScoreUserModel = async (user_id, username) => {
    try {
        const results = await executeSql("UPDATE users SET score = score + 1 WHERE id = ?", [user_id]);

        if (results && results.affectedRows) {
            const user = await getUserByUsernameModel({ username: username });
            return user;
        } else {
            throw USER_CODES.USER_SCORE_UPDATE_FAILED;
        }
    } catch (error) {
        console.error("Error updating user score: ", error);
        throw USER_CODES.USER_SCORE_UPDATE_FAILED;
    }
}

export const updateUserPassword = async (username, newPasswordHash) => {
    const results = await executeSql(
        "update users set password = ? where username = ?",
        [newPasswordHash, username]
    );

    if (results && results.affectedRows) {
        const updatedUser = await getUserByUsernameModel(username);
        return updatedUser;
    } else {
        throw USER_CODES.USER_PASSWORD_UPDATE_FAILD;
    }
};

