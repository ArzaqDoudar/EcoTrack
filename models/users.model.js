import { executeSql } from "../utils/database.utils.js";
import { CONCERNS_CODES, getConcernModel, insertConcernModel } from "./concerns.models.js";
import { getInterestModel, insertInterestModel } from "./interests.models.js";

export const USER_CODES = {
    USER_INSERT_FAILED: 'USER_INSERT_FAILED',
    USER_TABLE_EMPTY: 'USER_TABLE_EMPTY',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    USER_UPDATE_FAILED: 'USER_UPDATE_FAILED',
    USER_PASSWORD_UPDATE_FAILD: 'USER_PASSWORD_UPDATE_FAILD',
    USER_SCORE_UPDATE_FAILED: 'USER_SCORE_UPDATE_FAILED',
    USER_DATA_NOT_CORRECT: 'USER_DATA_NOT_CORRECT',
    USER_CONCERN_INSERT_FAILD: 'USER_CONCERN_INSERT_FAILD',
    NO_USER_CONCERNS: 'NO_USER_CONCERNS',
    INTEREST_NOT_EXIST: 'INTEREST_NOT_EXIST',
    INTEREST_DELETE_FAILED: 'INTEREST_DELETE_FAILED',
    NO_USER_INTERESTS: 'NO_USER_INTERESTS',
    USER_INTEREST_INSERT_FAILED: 'USER_INTEREST_INSERT_FAILED',
}

export const getAllUsersModel = async () => {
    const results = await executeSql("SELECT id, username, name FROM users");
    if (results) {
        return [...results];
    } else {
        throw USER_CODES.USER_TABLE_EMPTY;
    }
}

// export const getUserByUsernameModel = async (user) => {
//     const result = await executeSql("SELECT * FROM users WHERE username = ?", [user.username]);

//     if (result && result.length) {
//         return { ...result[0] };
//     } else {
//         throw USER_CODES.USER_NOT_FOUND;
//     }
// }
export const getUserByUsernameModel = async (user) => {
    try {
        const result = await executeSql("SELECT * FROM users WHERE username = ?", [user.username]);

        if (result && result.length) {
            return { ...result[0] };
        } else {
            throw USER_CODES.USER_NOT_FOUND;
        }
    } catch (error) {
        console.error("Error in getUserByUsernameModel:", error);
        throw error; // Rethrow the error for further handling
    }
};

export const createUserModel = async (user) => {
    if (user.name != "any" && user.username != "any" && user.password != "any" && user.location != "any" && user.role != "any") {
        const results = await executeSql(
            "insert into users(name, username, password, location , user_role) values (?,?,?,?,?)",
            [user.name, user.username, user.password, user.location, user.role]
        );
        if (results && results.affectedRows) {
            return { ...user, id: results.insertId, password: undefined }; // return a copy of the user obj and override the id with the db id.
        } else {
            throw USER_CODES.USER_INSERT_FAILED;
        }
    } else {
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
};

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


export const addUserConsernModel = async (user_id, concern_name) => {
    try {
        const ckeckExist = await getConcernModel(concern_name);
        console.log("ckeckExist , ", ckeckExist);
        if (ckeckExist) { // not exist, so, create new one 
            const result = await executeSql("INSERT INTO `user_concerns` (`user_id` , `concerns_id`) VALUES (?,?)", [user_id, ckeckExist.id]);
            if (result && result.affectedRows) {
                return {
                    message: "add exist consern for the user",
                    status: 200
                }
            } else {
                throw USER_CODES.USER_CONCERN_INSERT_FAILD;
            }
        } else {
            throw CONCERNS_CODES.CONCERNS_NOT_EXIST;
        }



    } catch (error) {
        switch (error) {
            case CONCERNS_CODES.CONCERNS_DELETE_FAILD:
                throw CONCERNS_CODES.CONCERNS_DELETE_FAILD;
            case CONCERNS_CODES.CONCERNS_NOT_EXIST:
                const resultInsert = await insertConcernModel(concern_name);
                const newConcern = await getConcernModel(concern_name);
                const result = await executeSql("INSERT INTO `user_concerns` (`user_id` , `concerns_id`) VALUES (?,?)", [user_id, newConcern.id]);
                if (result && result.affectedRows) {
                    return {
                        message: "add new consern for this user",
                        status: 200
                    }
                } else {
                    // throw USER_CODES.USER_CONCERN_INSERT_FAILD;
                }

                break;
            default:
                console.log(error);
                console.log("CONCERNS_CODES.CONCERNS_NOT_EXIST");
                throw error
        }
    }
};

export const getAllUserConcernsModel = async (user_id) => {

    try {
        const user_concerns = await executeSql("SELECT *  FROM user_concerns WHERE user_id = ? ", [user_id]);
        if (user_concerns && user_concerns.length) {

            console.log("user_id === ", user_concerns)
            let allConcerns = [];
            let concernsPromises = [];
            for (const concern of user_concerns) {

                console.log("user_concerns === ", concern)
                console.log("user_concerns id === ", concern.id)
                concernsPromises.push(executeSql("SELECT * FROM concerns WHERE id = ? ", [concern.id]));
            }
            let promise = new Promise((resolve, reject) => {
                Promise.all(concernsPromises).then((userconcernsResponse) => {
                    for (const concern of userconcernsResponse) {
                        if (concern && concern.length) {

                            console.log("user_id === ", concern[0])
                            allConcerns.push(concern[0]);
                        }
                    }
                    resolve(allConcerns);
                }).catch((err) => {
                    reject(err);
                });
            });
            return promise;
        } else {
            throw USER_CODES.NO_USER_CONCERNS;
        }
    } catch (error) {
        switch (error) {
            case USER_CODES.NO_USER_CONCERNS:
                throw USER_CODES.NO_USER_CONCERNS;
            default:
                throw error
        }
    }
}


export const addUserInterestModel = async (user_id, interest_name) => {
    try {
        const checkExist = await getInterestModel(interest_name);

        if (checkExist) {
            const result = await executeSql("INSERT INTO `user_interests` (`user_id`, `interest_id`) VALUES (?, ?)", [user_id, checkExist.interest_id]);

            if (result && result.affectedRows) {
                return {
                    message: "Added existing interest for the user",
                    status: 200
                };
            } else {
                throw USER_CODES.USER_INTEREST_INSERT_FAILED;
            }
        } else {
            throw INTERESTS_CODES.INTEREST_NOT_EXIST;
        }
    } catch (error) {
        switch (error) {
            case INTERESTS_CODES.INTEREST_DELETE_FAILED:
                throw INTERESTS_CODES.INTEREST_DELETE_FAILED;
            case INTERESTS_CODES.INTEREST_NOT_EXIST:
                const resultInsert = await insertInterestModel(interest_name);
                const newInterest = await getInterestModel(interest_name);
                const result = await executeSql("INSERT INTO `user_interests` (`user_id`, `interest_id`) VALUES (?, ?)", [user_id, newInterest.interest_id]);

                if (result && result.affectedRows) {
                    return {
                        message: "Added new interest for the user",
                        status: 200
                    };
                } else {
                    // throw USER_CODES.USER_INTEREST_INSERT_FAILED;
                }
                break;
            default:
                console.log(error);
                console.log("INTERESTS_CODES.INTEREST_NOT_EXIST");
                throw error;
        }
    }
};

export const getAllUserInterestsModel = async (user_id) => {
    try {
        const user_interests = await executeSql("SELECT * FROM user_interests WHERE user_id = ?", [user_id]);

        if (user_interests && user_interests.length) {
            let allInterests = [];
            let interestsPromises = [];

            for (const interest of user_interests) {
                interestsPromises.push(executeSql("SELECT * FROM interests WHERE interest_id = ?", [interest.interest_id]));
            }

            let promise = new Promise((resolve, reject) => {
                Promise.all(interestsPromises).then((userInterestsResponse) => {
                    for (const interest of userInterestsResponse) {
                        if (interest && interest.length) {
                            allInterests.push(interest[0]);
                        }
                    }
                    resolve(allInterests);
                }).catch((err) => {
                    reject(err);
                });
            });
            return promise;
        } else {
            throw USER_CODES.NO_USER_INTERESTS;
        }
    } catch (error) {
        switch (error) {
            case USER_CODES.NO_USER_INTERESTS:
                throw USER_CODES.NO_USER_INTERESTS;
            default:
                throw error;
        }
    }
};
