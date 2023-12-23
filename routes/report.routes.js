import express from "express";
import { getAllReports, insertReport} from "../controllers/report.controller.js";
import {getReportsByType} from "../controllers/report.controller.js"

const router = express.Router();
import multer from 'multer';
var upload = multer();

router.get('/' , getAllReports);
// router.post('/uploadimage' , uploadImage)
router.post('/' , insertReport);
router.post('/type/', getReportsByType);

export default router;