import { executeSql } from "../utils/database.utils.js";

export const CONCERNS_CODES = {
    CONCERNS_TABLE_EMPTY: 'CONCERNS_TABLE_EMPTY',
    CONCERNS_INSERT_FAILD: 'CONCERNS_INSERT_FAILD',
    CONCERNS_DELETE_FAILD: 'CONCERNS_DELETE_FAILD',
    CONCERNS_UPDATE_FAILD: 'CONCERNS_UPDATE_FAILD',
    CONCERNS_DATA_NOT_CORRECT: 'CONCERNS_DATA_NOT_CORRECT',
    CONCERNS_EXIST: 'CONCERNS_EXIST',
    CONCERNS_NOT_EXIST: 'CONCERNS_NOT_EXIST',
    NO_USER_CONCERNS: 'NO_USER_CONCERNS',
}

export const getAllConcernsModel = async () => {
    const results = await executeSql("SELECT *  FROM concerns");
    if (results && results.length) {
        return [...results];
    } else {
        throw CONCERNS_CODES.CONCERNS_TABLE_EMPTY;
    }
}

export const getConcernModel = async (name) => {
    const result = await executeSql("SELECT *  FROM concerns WHERE name = ? ", [name]);
    if (result && result.length) {
        return { ...result[0] };
    } else {
        throw CONCERNS_CODES.CONCERNS_NOT_EXIST;
    }
}

export const getUsersByConcernModel = async (name) => { // this api retrive the all users have the same 
    try {
        const ckeckExist = await getConcernModel(name);
        if (!ckeckExist) {
            throw CONCERNS_CODES.CONCERNS_NOT_EXIST;
        }
        const users = await executeSql("SELECT *  FROM user_concerns WHERE concerns_id = ? ", [ckeckExist.id]);
        if (users && users.length) {
            let allUsers = [];
            let usersPromises = [];
            for (const user of users) {
                usersPromises.push(executeSql("SELECT id, name, username, user_role FROM users WHERE id = ? ", [user.user_id]));
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
            throw CONCERNS_CODES.NO_USER_CONCERNS;
        }
    } catch (error) {
        switch (error) {
            case CONCERNS_CODES.NO_USER_CONCERNS:
                throw CONCERNS_CODES.NO_USER_CONCERNS;
            case CONCERNS_CODES.CONCERNS_NOT_EXIST:
                throw CONCERNS_CODES.CONCERNS_NOT_EXIST;
            default:
                throw error
        }
    }
}

export const deleteConcernModel = async (name) => {
    try {
        const ckeckExist = await getConcernModel(name);
        if (!ckeckExist) {
            throw CONCERNS_CODES.CONCERNS_NOT_EXIST;
        }
        const result = await executeSql("DELETE FROM concerns WHERE name = ? ", [name]);
        if (result && result.affectedRows) {
            return { message: "concern deleted successfuly", status: 200 };
        } else {
            throw CONCERNS_CODES.CONCERNS_DELETE_FAILD;
        }

    } catch (error) {
        switch (error) {
            case CONCERNS_CODES.CONCERNS_DELETE_FAILD:
                throw CONCERNS_CODES.CONCERNS_DELETE_FAILD;
            case CONCERNS_CODES.CONCERNS_NOT_EXIST:
                throw CONCERNS_CODES.CONCERNS_NOT_EXIST;
            default:
                throw error
        }
    }
}

export const updateConcernModel = async (oldValue, newValue) => {
    try {
        if (oldValue != "any" && newValue != "any") {
            const ckeckExist = await getConcernModel(oldValue);
            if (!ckeckExist) {
                throw CONCERNS_CODES.CONCERNS_NOT_EXIST;
            }
            const result = await executeSql("UPDATE concerns SET name = ? WHERE name = ?", [newValue, oldValue]);

            if (result && result.affectedRows) {
                return { message: "concern update successfuly", status: 200 };
            } else {
                throw CONCERNS_CODES.CONCERNS_UPDATE_FAILD;
            }
        } else {
            throw CONCERNS_CODES.CONCERNS_DATA_NOT_CORRECT
        }


    } catch (error) {
        switch (error) {
            case CONCERNS_CODES.CONCERNS_UPDATE_FAILD:
                throw CONCERNS_CODES.CONCERNS_UPDATE_FAILD;
            case CONCERNS_CODES.CONCERNS_NOT_EXIST:
                throw CONCERNS_CODES.CONCERNS_NOT_EXIST;
            case CONCERNS_CODES.CONCERNS_DATA_NOT_CORRECT:
                throw CONCERNS_CODES.CONCERNS_DATA_NOT_CORRECT;
            default:
                throw error
        }
    }
}

export const insertConcernModel = async (name) => {
    try {
        if (name != "any") {
            const concernExist = await executeSql(
                "SELECT * FROM concerns WHERE name = ?", [name]);
            if (!concernExist.length) {
                const results = await executeSql(
                    "INSERT INTO `concerns` (`name`) VALUES (?)", [name]);
                if (results && results.affectedRows) {
                    return { message: "concern inserted successfuly", status: 200 };
                } else {
                    throw CONCERNS_CODES.CONCERNS_INSERT_FAILD;
                }
            } else {
                throw CONCERNS_CODES.CONCERNS_EXIST;
            }
        } else {
            throw CONCERNS_CODES.CONCERNS_DATA_NOT_CORRECT;
        }
    } catch (error) {
        switch (error) {
            case CONCERNS_CODES.CONCERNS_INSERT_FAILD:
                throw CONCERNS_CODES.CONCERNS_INSERT_FAILD;
            case CONCERNS_CODES.CONCERNS_DATA_NOT_CORRECT:
                throw CONCERNS_CODES.CONCERNS_DATA_NOT_CORRECT;
            case CONCERNS_CODES.CONCERNS_EXIST:
                throw CONCERNS_CODES.CONCERNS_EXIST;
            default:
                throw error
        }
    }
}