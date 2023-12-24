import { CONCERNS_CODES, deleteConcernModel, getAllConcernsModel, getUsersByConcernModel, insertConcernModel, updateConcernModel } from "../models/concerns.models.js";

export const getAllConcerns = async (req, res, next) => {
    try {
        const concerns = await getAllConcernsModel();
        console.log(concerns);
        res.status(200).send(concerns);
    } catch (err) {
        switch (err) {
            case CONCERNS_CODES.CONCERNS_TABLE_EMPTY:
                res.status(400).send({
                    message: 'there is no concerns in this sys',
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

export const getUsersByConcern = async (req, res, next) => {
    const name = req.params.concern_name
    console.log("nome  = " , name)
    try {
        const concerns = await getUsersByConcernModel(name);
        console.log(concerns);
        res.status(200).send(concerns);
    } catch (err) {
        switch (err) {
            case CONCERNS_CODES.CONCERNS_NOT_EXIST:
                res.status(400).send({
                    message: 'this consern dose not exist',
                    status: 400,
                });
                break;
             case CONCERNS_CODES.NO_USER_CONCERNS:
                res.status(400).send({
                    message: 'there is no users hse this concern',
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

export const insertConcern = async (req, res, next) => {

    const name = req.body.concern_name;

    try {
        const result = await insertConcernModel(name);
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        switch (err) {
            case CONCERNS_CODES.CONCERNS_DATA_NOT_CORRECT:
                res.status(400).send({
                    message: 'all fields must have values',
                    status: 400,
                });
                break;
            case CONCERNS_CODES.CONCERNS_INSERT_FAILD:
                res.status(400).send({
                    message: 'consern insert failed',
                    status: 400,
                });
                break;
            case CONCERNS_CODES.CONCERNS_EXIST:
                res.status(400).send({
                    message: 'consern already exist',
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

export const deleteConcern = async (req, res, next) => {
    const name = req.params.name
    try {
        console.log("name " , name)
        const result = await deleteConcernModel(name);
        console.log("result " , result);
        res.status(200).send(result);
    } catch (err) {
        switch (err) {
            case CONCERNS_CODES.CONCERNS_NOT_EXIST:
                res.status(400).send({
                    message: 'there is no concerns in this sys with this name',
                    status: 400,
                });
                break;
            case CONCERNS_CODES.CONCERNS_DELETE_FAILD:
                res.status(400).send({
                    message: 'consern delete faild',
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

export const updateConcern = async (req, res, next) => {
    const oldName = req.body.old_name
    const newName = req.body.new_name
    try {
        const result = await updateConcernModel(oldName , newName);
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        switch (err) {
            case CONCERNS_CODES.CONCERNS_DATA_NOT_CORRECT:
                res.status(400).send({
                    message: 'all fields must have values',
                    status: 400,
                });
                break;
            case CONCERNS_CODES.CONCERNS_NOT_EXIST:
                res.status(400).send({
                    message: 'there is no concerns in this sys with this name',
                    status: 400,
                });
                break;
            case CONCERNS_CODES.CONCERNS_UPDATE_FAILD:
                res.status(400).send({
                    message: 'consern update faild',
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