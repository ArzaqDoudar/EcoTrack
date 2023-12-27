import { checkPasswordWithHash, generatePasswordHash, comparePassword } from "../utils/password.utils.js";
import { generateToken } from "../utils/token.utils.js";
import { getAllUsersModel, getUserByUsernameModel, createUserModel, updateUserModel, updateUserPassword, USER_CODES, addUserConsernModel, getAllUserConcernsModel } from "../models/users.model.js";
import { getConcernModel, CONCERNS_CODES, insertConcernModel } from "../models/concerns.models.js";
import { getMessaging } from "firebase-admin/messaging"
import { response } from "express";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersModel();
        console.log(users);
        res.status(200).send(users);
    } catch (err) {
        switch (err) {
            case USER_CODES.USER_TABLE_EMPTY:
                res.status(400).send({
                    message: 'there is no users in this sys',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'internal server error',
                    status: 500
                });
        }
    }
};

export const getUserByUsername = async (req, res, next) => {

    const payload = {
        username: req.params.username,
    };

    try {
        const user = await getUserByUsernameModel(payload);
        console.log(user);
        res.status(200).send(user);
    } catch (err) {
        switch (err) {
            case USER_CODES.USER_NOT_FOUND:
                res.status(400).send({
                    message: 'this username not exist',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'internal server error',
                    status: 500
                });
        }
    }
};

export const insertUser = async (req, res, next) => {
    /*
        #swagger.security = []
     */
    const payload = {
        name: req.body.name,
        username: req.body.username,
        password: await generatePasswordHash(req.body.password),
        location: req.body.location,
        role: req.body.role,
    };
    try {
        const user = await createUserModel(payload);
        console.log(user);
        res.status(200).send(user);
    } catch (err) {
        switch (err) {
            case USER_CODES.USER_INSERT_FAILED:
                res.status(400).send({
                    message: 'insert failed',
                    status: 400,
                });
                break;
            case USER_CODES.USER_DATA_NOT_CORRECT:
                res.status(400).send({
                    message: 'all feilds must have data',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'internal server error',
                    status: 500
                });
        }
    }
};

export const updateUser = async (req, res, next) => {
    const payload = {
        username: req.user.username,
        name: req.body.name,
        location: req.body.location,
        role: req.body.role,
    };
    try {
        console.log(payload);
        const user = await updateUserModel(payload);
        console.log(user);
        res.status(200).send(user);
    } catch (err) {
        switch (err) {
            case USER_CODES.USER_UPDATE_FAILED:
                res.status(400).send({
                    message: 'update user failed',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'internal server error',
                    status: 500
                });
        }
    }

};

export const deleteUser = async (req, res, next) => {
    res.send({ message: "delete user" });
};

export const loginUser = async (req, res, next) => {
    /*
     #swagger.security = []
    
     */
    const username = req.body.username;
    const password = req.body.password;
    let user = await getUserByUsernameModel({ username: username })
    if (user && await checkPasswordWithHash(password, user.password)) {
        let token = await generateToken(user);
        console.log("token", token);
        res.send({
            token: token
        });
    } else {
        res.status(400).send({ error: 'incorrect credential' });
    }
};

export const changePassword = async (req, res, next) => {
    const payload = {
        username: req.user.username,
        oldPassword: req.body.password, // Include the old password here
        newPassword: req.body.newPassword, // Include the new password here
    };
    try {
        const user = await getUserByUsernameModel(payload);
        console.log(user);
        if (!user) {
            throw new Error('User not found');
        }

        // Verify the old password
        console.log("password is :");
        console.log(user.password);
        const isOldPasswordValid = await comparePassword(payload.oldPassword, user.password);

        if (!isOldPasswordValid) {
            throw new Error('Old password is incorrect');
        }

        // Generate a hash for the new password
        const newPasswordHash = await generatePasswordHash(payload.newPassword);
        // Update the user's password in the database
        const updatedUser = await updateUserPassword(user.username, newPasswordHash);
        res.status(200).send({ message: "password update successfuly" });
        //  return updatedUser;
    } catch (error) {
        switch (error) {
            case USER_CODES.USER_PASSWORD_UPDATE_FAILD:
                res.status(400).send({
                    message: 'password not updated ',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'internal server error',
                    status: 500
                });
        } // Handle the error appropriately in your application
    }
};
