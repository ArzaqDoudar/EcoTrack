import {getAllDataModel, DATA_CODES } from "../models/data.model.js";

export const getAllData = async (req, res, next) => {
    try {
        const dataCollection = await getAllDataModel();
        console.log(dataCollection);
        res.status(200).send(dataCollection);
    } catch (err) {
        switch (err) {
            case DATA_CODES.DATA_TABLE_EMPTY:
                res.status(400).send({
                    message: 'there is no data collection in this sys',
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

export const insertData = async (req, res, next) => {
    // res.send({ message: "get all data" });
    const payload = {
        username: req.user.username,
        username: req.body.username,
        password: await generatePasswordHash(req.body.password),
        location: req.body.location,
    };
    try {
        const user = await createUserModel(payload);
        console.log(user);
        res.status(200).send(user);
    } catch (err) {
        switch (err) {
            case DATA_CODES.DATA_INSERT_FAILD:
                res.status(400).send({
                    message: 'data insert failed',
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
    // try {
    //     const result = await insertDataModel();
    //     console.log(result);
    //     res.status(200).send(result);
    // } catch (err) {
    //     switch (err) {
    //         case DATA_CODES.DATA_TABLE_EMPTY:
    //             res.status(400).send({
    //                 message: 'there is no users in this sys',
    //                 status: 400,
    //             });
    //             break;
    //         default:
    //             res.status(500).send({
    //                 message: 'internal server error',
    //                 status: 500
    //             });
    //     }
    // }
};