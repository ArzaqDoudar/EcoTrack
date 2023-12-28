import { executeSql } from "../utils/database.utils.js";

export const INTERESTS_CODES = {
    INTERESTS_TABLE_EMPTY: 'INTERESTS_TABLE_EMPTY',
    INTEREST_INSERT_FAILED: 'INTEREST_INSERT_FAILED',
    INTEREST_DELETE_FAILED: 'INTEREST_DELETE_FAILED',
    INTEREST_UPDATE_FAILED: 'INTEREST_UPDATE_FAILED',
    INTEREST_DATA_NOT_CORRECT: 'INTEREST_DATA_NOT_CORRECT',
    INTEREST_EXIST: 'INTEREST_EXIST',
    INTEREST_NOT_EXIST: 'INTEREST_NOT_EXIST',
    NO_USER_INTERESTS: 'NO_USER_INTERESTS',
}

export const getAllInterestsModel = async () => {
    const results = await executeSql("SELECT * FROM interests");
    if (results && results.length) {
        return [...results];
    } else {
        throw INTERESTS_CODES.INTERESTS_TABLE_EMPTY;
    }
}

export const getInterestModel = async (name) => {
    const result = await executeSql("SELECT * FROM interests WHERE interest_name = ? ", [name]);
    if (result && result.length) {
        return { ...result[0] };
    } else {
        throw INTERESTS_CODES.INTEREST_NOT_EXIST;
    }
}

export const getUsersByInterestModel = async (name) => {
    try {
        const checkExist = await getInterestModel(name);
        if (!checkExist) {
            throw INTERESTS_CODES.INTEREST_NOT_EXIST;
        }
        const users = await executeSql("SELECT * FROM user_interests WHERE interest_id = ? ", [checkExist.interest_id]);
        if (users && users.length) {
            let allUsers = [];
            let usersPromises = [];
            for (const user of users) {
                usersPromises.push(executeSql("SELECT id, name, username, user_role FROM users WHERE id = ? ", [user.id]));
            }
            let promise = new Promise((resolve, reject) => {
                Promise.all(usersPromises).then((usersResponse) => {
                    for (const user of usersResponse) {
                        if (user && user.length) {
                            allUsers.push(user[0]);
                        }
                    }
                    resolve(allUsers);
                }).catch((err) => {
                    reject(err);
                });
            });
            return promise;
        } else {
            throw INTERESTS_CODES.NO_USER_INTERESTS;
        }
    } catch (error) {
        switch (error) {
            case INTERESTS_CODES.NO_USER_INTERESTS:
                throw INTERESTS_CODES.NO_USER_INTERESTS;
            case INTERESTS_CODES.INTEREST_NOT_EXIST:
                throw INTERESTS_CODES.INTEREST_NOT_EXIST;
            default:
                throw error
        }
    }
}

export const deleteInterestModel = async (name) => {
    try {
        const checkExist = await getInterestModel(name);
        if (!checkExist) {
            throw INTERESTS_CODES.INTEREST_NOT_EXIST;
        }
        const result = await executeSql("DELETE FROM interests WHERE interest_name = ? ", [name]);
        if (result && result.affectedRows) {
            return { message: "interest deleted successfully", status: 200 };
        } else {
            throw INTERESTS_CODES.INTEREST_DELETE_FAILED;
        }
    } catch (error) {
        switch (error) {
            case INTERESTS_CODES.INTEREST_DELETE_FAILED:
                throw INTERESTS_CODES.INTEREST_DELETE_FAILED;
            case INTERESTS_CODES.INTEREST_NOT_EXIST:
                throw INTERESTS_CODES.INTEREST_NOT_EXIST;
            default:
                throw error
        }
    }
}

export const updateInterestModel = async (oldValue, newValue) => {
    try {
        if (oldValue !== "any" && newValue !== "any") {
            const checkExist = await getInterestModel(oldValue);
            if (!checkExist) {
                throw INTERESTS_CODES.INTEREST_NOT_EXIST;
            }
            const result = await executeSql("UPDATE interests SET interest_name = ? WHERE interest_name = ?", [newValue, oldValue]);

            if (result && result.affectedRows) {
                return { message: "interest updated successfully", status: 200 };
            } else {
                throw INTERESTS_CODES.INTEREST_UPDATE_FAILED;
            }
        } else {
            throw INTERESTS_CODES.INTEREST_DATA_NOT_CORRECT;
        }
    } catch (error) {
        switch (error) {
            case INTERESTS_CODES.INTEREST_UPDATE_FAILED:
                throw INTERESTS_CODES.INTEREST_UPDATE_FAILED;
            case INTERESTS_CODES.INTEREST_NOT_EXIST:
                throw INTERESTS_CODES.INTEREST_NOT_EXIST;
            case INTERESTS_CODES.INTEREST_DATA_NOT_CORRECT:
                throw INTERESTS_CODES.INTEREST_DATA_NOT_CORRECT;
            default:
                throw error
        }
    }
}

export const insertInterestModel = async (name) => {
    console.log("Test 1");
    try {
        if (name !== "any") {
            
            const interestExist = await executeSql(
                "SELECT * FROM interests WHERE interest_name = ?", [name]);
                
            if (!interestExist.length) {
                
                const results = await executeSql(
                    "INSERT INTO `interests` (`interest_name`) VALUES (?)", [name]);
                    console.log("results ="+results);
                if (results && results.affectedRows) {
                    return { message: "interest inserted successfully", status: 200 };
                } else {
                    throw INTERESTS_CODES.INTEREST_INSERT_FAILED;
                }
            } else {
                throw INTERESTS_CODES.INTEREST_EXIST;
            }
        } else {
            throw INTERESTS_CODES.INTEREST_DATA_NOT_CORRECT;
        }
    } catch (error) {
        switch (error) {
            case INTERESTS_CODES.INTEREST_INSERT_FAILED:
                throw INTERESTS_CODES.INTEREST_INSERT_FAILED;
            case INTERESTS_CODES.INTEREST_DATA_NOT_CORRECT:
                throw INTERESTS_CODES.INTEREST_DATA_NOT_CORRECT;
            case INTERESTS_CODES.INTEREST_EXIST:
                throw INTERESTS_CODES.INTEREST_EXIST;
            default:
                throw error
        }
    }
}
