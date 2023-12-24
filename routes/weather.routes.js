import express from "express";
import { forcast } from "../controllers/weatherapi.controller.js";

const router = express.Router();

router.get('/:location/:time' , forcast);

export default router;