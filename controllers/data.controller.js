import { getAllDataModel, insertDataModel, getUserDataModel, getDataByLocationModel, DATA_CODES, getDataByTypeModel, deleteDataModel } from "../models/data.model.js";
import { USER_CODES } from "../models/users.model.js";

export const getAllData = async (req, res, next) => {
    const role = req.user.user_role;
    try {
        if (role != "normal") {
            const dataCollection = await getAllDataModel();
            res.status(200).send(dataCollection);
        }else{
            res.status(400).send({
                message: 'you have not access to see data collection',
                status: 400,
            });
        }
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
    const location = req.params.location;
    try {
        const dataCollection = await getDataByLocationModel(location);
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
    const type = req.params.type;
    try {
        const dataCollection = await getDataByTypeModel(type);
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

export const deleteData = async (req, res, next) => {
    const id = req.params.id
    console.log("data id = " , id)
    try {
        const result = await deleteDataModel(id);
        res.status(200).send(result);
    } catch (err) {
        switch (err) {
            case DATA_CODES.DATA_NOT_EXIST:
                res.status(400).send({
                    message: 'there is no data in this sys with this id',
                    status: 400,
                });
                break;
            case DATA_CODES.DATA_DELETE_FAILD:
                res.status(400).send({
                    message: 'data delete faild',
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