import { getAllReportsModel, createReportModel } from "../models/report.model.js";
import { uploadImage } from "./uploadimageapi.controller.js";

export const getAllReports = async (req, res, next) => {
    try {
        const reports = await getAllReportsModel();
        console.log(reports);
        res.status(200).send(reports);
    } catch (err) {
        switch (err) {
            case USER_CODES.USER_TABLE_EMPTY:
                res.status(400).send({
                    message: 'there is no reports in this sys',
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


export const uploadImageToReport = async (req, res, next) => {

    try {
        const imageLink = await uploadImage();
        console.log(imageLink);
        res.status(200).send(imageLink);
    } catch (err) {
        switch (err) {
            case USER_CODES.USER_TABLE_EMPTY:
                res.status(400).send({
                    message: 'there is no image in this sys',
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

export const insertReport = async (req, res, next) => {
    /*
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['file'] = {
        in: 'formData',
        type: 'file',
        required: 'true',
        description: 'Some description...',
    }
    */
    const payload = {
        user_id: req.params.username,
        report_type: req.body.report_type,
        description: req.body.description,
        location: req.body.location,
        time_stamp: req.body.time_stamp || new Date().toISOString(),
        // image_link: req.imageLink,
    };
    try {
        const report = await createReportModel(payload);
        console.log(report);
        res.status(200).send(report);
    } catch (err) {
        switch (err) {
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