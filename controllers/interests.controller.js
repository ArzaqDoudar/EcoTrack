import { INTERESTS_CODES, getAllInterestsModel, getUsersByInterestModel, insertInterestModel, deleteInterestModel, updateInterestModel } from "../models/interests.models.js";

export const getAllInterests = async (req, res, next) => {
    try {
        const interests = await getAllInterestsModel();
        console.log(interests);
        res.status(200).send(interests);
    } catch (err) {
        switch (err) {
            case INTERESTS_CODES.INTERESTS_TABLE_EMPTY:
                res.status(400).send({
                    message: 'There are no interests in this system.',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'Internal server error',
                    status: 500
                });
        }
    }
};

export const getUsersByInterest = async (req, res, next) => {
    const name = req.params.interest_name;
    console.log("name = ", name);
    try {
        const users = await getUsersByInterestModel(name);
        console.log(users);
        res.status(200).send(users);
    } catch (err) {
        switch (err) {
            case INTERESTS_CODES.INTEREST_NOT_EXIST:
                res.status(400).send({
                    message: 'This interest does not exist.',
                    status: 400,
                });
                break;
            case INTERESTS_CODES.NO_USER_INTERESTS:
                res.status(400).send({
                    message: 'There are no users with this interest.',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'Internal server error',
                    status: 500
                });
        }
    }
};

export const insertInterest = async (req, res, next) => {
    const name = req.body.interest_name;
    try {
        const result = await insertInterestModel(name);
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        switch (err) {
            case INTERESTS_CODES.INTEREST_DATA_NOT_CORRECT:
                res.status(400).send({
                    message: 'All fields must have values.',
                    status: 400,
                });
                break;
            case INTERESTS_CODES.INTEREST_INSERT_FAILED:
                res.status(400).send({
                    message: 'Interest insert failed.',
                    status: 400,
                });
                break;
            case INTERESTS_CODES.INTEREST_EXIST:
                res.status(400).send({
                    message: 'Interest already exists.',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'Internal server error',
                    status: 500
                });
        }
    }
};

export const deleteInterest = async (req, res, next) => {
    const name = req.params.name;
    try {
        console.log("name ", name);
        const result = await deleteInterestModel(name);
        console.log("result ", result);
        res.status(200).send(result);
    } catch (err) {
        switch (err) {
            case INTERESTS_CODES.INTEREST_NOT_EXIST:
                res.status(400).send({
                    message: 'There is no interest in this system with this name.',
                    status: 400,
                });
                break;
            case INTERESTS_CODES.INTEREST_DELETE_FAILED:
                res.status(400).send({
                    message: 'Interest delete failed.',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'Internal server error',
                    status: 500
                });
        }
    }
};

export const updateInterest = async (req, res, next) => {
    const oldName = req.body.old_name;
    const newName = req.body.new_name;
    try {
        const result = await updateInterestModel(oldName, newName);
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        switch (err) {
            case INTERESTS_CODES.INTEREST_DATA_NOT_CORRECT:
                res.status(400).send({
                    message: 'All fields must have values.',
                    status: 400,
                });
                break;
            case INTERESTS_CODES.INTEREST_NOT_EXIST:
                res.status(400).send({
                    message: 'There is no interest in this system with this name.',
                    status: 400,
                });
                break;
            case INTERESTS_CODES.INTEREST_UPDATE_FAILED:
                res.status(400).send({
                    message: 'Interest update failed.',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'Internal server error',
                    status: 500
                });
        }
    }
};
