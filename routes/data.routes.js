import express from "express";
import {getAllData, insertData } from "../controllers/data.controller.js";

const router = express.Router();

router.get('/' , getAllData);
router.post('/' , insertData);

export default router;