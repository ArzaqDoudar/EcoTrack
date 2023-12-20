import {create, getWhere} from "./general.js";
import {checkPasswordWithHash, generatePasswordHash} from "../utils/password.utils.js";
import {generateToken} from "../utils/token.utils.js";
import {getAllUsersModel, getUserByUsernameModel, createUserModel,updateUserModel, USER_CODES} from "../models/users.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersModel();
        console.log(users);
        res.status(200).send(users);
    } catch (err) {
        switch(err) {
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
        switch(err) {
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
    };
    try {
        const user = await createUserModel(payload);
        console.log(user);
        res.status(200).send(user);
    } catch (err) {
        switch(err) {
            case USER_CODES.USER_INSERT_FAILED:
                res.status(400).send({
                    message: 'insert failed',
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
        username: req.params.username,
        name: req.body.name,
        password: req.body.password,
        // password: await generatePasswordHash(req.body.password),
        location: req.body.location, 
    };
    // res.send({message: "update user" , user: payload});
    try {
        console.log(payload);
        const user = await updateUserModel(payload);
        console.log(user);
        res.status(200).send(user);
    } catch (err) {
        switch(err) {
        //     case USER_CODES.USER_INSERT_FAILED:
        //         res.status(400).send({
        //             message: 'insert failed',
        //             status: 400,
        //         });
        //         break;
        //     default:
        //         res.status(500).send({
        //             message: 'internal server error',
        //             status: 500
        //         });
        }
    }

};

export const deleteUser = async (req, res, next) => {
    res.send({message: "delete user"});
};

export const loginUser = async (req, res, next) => {
    /*
     #swagger.security = []
     */
    const username = req.body.username;
    const password = req.body.password;
    let user = (await getWhere('users', {
        columns: '*', // 'id , username , location , name',
        where: 'username',
        whereValue: username,
    }))[0];
    if (user && await checkPasswordWithHash(password, user.password)) {
        let token = await generateToken(user);
        console.log("token", token);
        res.send({
            token: token
        });
    } else {
        res.status(400).send({error: 'incorrect credential'});
    }
};