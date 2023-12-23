import { getAllDataModel, insertDataModel, getUserDataModel, getDataByLocationModel, DATA_CODES, getDataByTypeModel} from "../models/data.model.js";
import { USER_CODES } from "../models/users.model.js";

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
export const getUserData = async (req, res, next) => {
    const username = req.params.username;
    try {
        const dataCollection = await getUserDataModel(username);
        console.log(dataCollection);
        res.status(200).send(dataCollection);
    } catch (err) {
        switch (err) {
            case DATA_CODES.DATA_USER_EMPTY:
                res.status(400).send({
                    user: username,
                    message: 'this user dose not insert any data',
                    status: 400,
                });
                break;
             case USER_CODES.USER_NOT_FOUND:
                res.status(400).send({
                    user: username,
                    message: 'this user dose not exist',
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
export const getDataByLocation = async (req, res, next) => {
    const location = req.body.location;
    try {
        console.log("locatipn = " , location)
        const dataCollection = await getDataByLocationModel(location);
        console.log(dataCollection);
        res.status(200).send(dataCollection);
    } catch (err) {
        switch (err) {
            case DATA_CODES.DATA_LOCATION_EMPTY:
                res.status(400).send({
                    message: 'there is no data with this location',
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
export const getDataByType = async (req, res, next) => {
    const type = req.body.type;
    try {
        console.log("type = " , type)
        const dataCollection = await getDataByTypeModel(type);
        // console.log(dataCollection);
        res.status(200).send(dataCollection);
    } catch (err) {
        switch (err) {
            case DATA_CODES.DATA_TYPE_EMPTY:
                res.status(400).send({
                    message: 'there is no data with this type',
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
    const payload = {
        username: req.user.username,
        data_type: req.body.data_type,
        value: req.body.value,
        location: req.body.location,
    };
    try {
        const result = await insertDataModel(payload);
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        switch (err) {
            case DATA_CODES.DATA_NOT_CORRECT:
                res.status(400).send({
                    message: 'all fields must have values',
                    status: 400,
                });
                break;
            case DATA_CODES.DATA_INSERT_FAILD:
                res.status(400).send({
                    message: 'data insert failed',
                    status: 400,
                });
                break;
            case DATA_CODES.USER_SCORE_UPDATE_FAILED:
                res.status(400).send({
                    message: 'score increase failed',
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