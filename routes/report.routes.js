import express from "express";
import { getAllReports, insertReport} from "../controllers/report.controller.js";
import {getReportsByType, getUserReports} from "../controllers/report.controller.js"

const router = express.Router();
import multer from 'multer';
var upload = multer();

router.get('/' , getAllReports);
router.get('/user/:username' , getUserReports);
router.post('/' , insertReport);
router.get('/type/:report_type', getReportsByType);

export default router;