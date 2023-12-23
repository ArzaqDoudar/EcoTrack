import express from "express";
import {
  getAllEducationalResources,
  getEducationalResourceByType,
} from "../controllers/educationalresources.controller.js";

const router = express.Router();
router.get('/', getAllEducationalResources);
router.post('/type', getEducationalResourceByType);
export default router;
