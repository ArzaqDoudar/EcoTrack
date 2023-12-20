import {executeSql} from "../utils/database.utils.js";

export const USER_CODES = {
    USER_INSERT_FAILED: 'USER_INSERT_FAILED'
}

/**
 *
 * @param user
 * @returns {Promise<user>}
 * @throws USER_CODES.USER_INSERT_FAILED
 */
export const createUser = async (user) => {
    const results = await executeSql(
        "insert into users(name, username, password, location) values (?,?,?,?)",
        [user.name, user.username, user.password, user.location]
    );

    if (results && results.affectedRows) {
        return {...user, id: results.insertId, password: undefined}; // return a copy of the user obj and override the id with the db id.
    } else {
        throw USER_CODES.USER_INSERT_FAILED;
    }
}
export const updateUser = async (user) => {
    const sqlString="UPDATE users SET ";
    if(user.name){
        sqlString = sqlString + "name = " + user.name;
    } 
    if(user.location){
        sqlString = sqlString + "location = " + user.location;
    }
    sqlString = sqlString + "WHERE username = " + user.username;
    return sqlString;
    // const results = await executeSql(sqlString
    //     ,
        
    //     "name = ?, location = ? WHERE username = ?;"
    //     [user.name, user.loaction, user.username]
    // );

    // if (results && results.affectedRows) {
        // return {...user, id: results.insertId, password: undefined}; // return a copy of the user obj and override the id with the db id.
    // } else {
    //     throw USER_CODES.USER_INSERT_FAILED;
    // }
}
