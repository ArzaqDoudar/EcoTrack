import express from "express";
import {getAllData, getDataByLocation, getDataByType, getUserData, insertData } from "../controllers/data.controller.js";

const router = express.Router();

router.get('/' , getAllData);
router.post('/' , insertData);
router.get('/user/:username' , getUserData);
router.get('/location/:location' , getDataByLocation);
router.get('/type/:type' , getDataByType);



export default router;