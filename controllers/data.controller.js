import {getAllDataModel, DATA_CODES } from "../models/data.model.js";

export const getAllData = async (req, res, next) => {
    // res.send({ message: "get all data" });
    try {
        const dataCollection = await getAllDataModel();
        console.log(dataCollection);
        res.status(200).send(dataCollection);
    } catch (err) {
        switch (err) {
            case DATA_CODES.DATA_TABLE_EMPTY:
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

export const insertData = async (req, res, next) => {
    // res.send({ message: "get all data" });
    try {
        const result = await insertDataModel();
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        switch (err) {
            case DATA_CODES.DATA_TABLE_EMPTY:
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