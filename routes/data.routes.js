import express from "express";
import {getAllData, getDataByLocation, getDataByType, getUserData, insertData } from "../controllers/data.controller.js";

const router = express.Router();

router.get('/' , getAllData);
router.post('/' , insertData);
router.post('/user/:username' , getUserData);
router.post('/location' , getDataByLocation);
router.post('/type' , getDataByType);



export default router;