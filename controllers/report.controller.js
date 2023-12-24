import {
  getAllReportsModel,
  createReportModel,
  getReportByTypeModel,
  getReportByUsernameModel,
  REPORT_CODES
} from "../models/report.model.js";
import { uploadImage } from "./uploadimageapi.controller.js";

export const getAllReports = async (req, res, next) => {
  try {
    const reports = await getAllReportsModel();
    console.log(reports);
    res.status(200).send(reports);
  } catch (err) {
    switch (err) {
      case REPORT_CODES.REPORT_TABLE_EMPTY:
        res.status(400).send({
          message: "there is no reports in this sys",
          status: 400,
        });
        break;
      default:
        res.status(500).send({
          message: "internal server error",
          status: 500,
        });
    }
  }
};

export const uploadImageToReport = async (req, res, next) => {
  try {
    const imageLink = await uploadImage();

    res.status(200).send(imageLink);
  } catch (err) {
    switch (err) {
      case REPORT_CODES.REPORT_TABLE_EMPTY:
        res.status(400).send({
          message: "there is no image in this sys",
          status: 400,
        });
        break;
      default:
        res.status(500).send({
          message: "internal server error",
          status: 500,
        });
    }
  }
};

export const insertReport = async (req, res, next) => {
  try {
    const payload = {
      username: req.user.username,
      report_type: req.body.report_type,
      description: req.body.description,
      location: req.body.location,
      time_stamp: req.body.time_stamp || new Date().toISOString(),
    };
    const report = await createReportModel(payload);
    console.log(report);
    res.status(200).send(report);
  } catch (err) {
    switch (err) {
      case REPORT_CODES.REPORT_INSERT_FAILED:
        res.status(400).send({
          message: "insert failed",
          status: 400,
        });
        break;
      default:
        res.status(500).send({
          message: "internal server error",
          status: 500,
        });
    }
  }
};

export const getReportsByType = async (req, res, next) => {
    const payload = {
        report_type: req.params.report_type,
      };
  try {
    const reports = await getReportByTypeModel(payload);
    console.log(reports);
    res.status(200).send(reports);
  } catch (err) {
    switch (err) {
      case REPORT_CODES.REPORT_TABLE_EMPTY:
        res.status(400).send({
          message: "there is no reports with this type",
          status: 400,
        });
        break;
      default:
        res.status(500).send({
          message: "internal server error",
          status: 500,
        });
    }
  }
};


export const getUserReports = async (req, res, next) => {
  const username = req.params.username;
try {
  const reports = await getReportByUsernameModel(username);
  console.log(reports);
  res.status(200).send(reports);
} catch (err) {
  switch (err) {
    case REPORT_CODES.REPORT_TABLE_EMPTY:
      res.status(400).send({
        message: "there is no reports with this username",
        status: 400,
      });
      break;
    default:
      res.status(500).send({
        message: "internal server error",
        status: 500,
      });
  }
}
};