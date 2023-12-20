import express from "express";
import { forcast } from "../controllers/weatherapi.controller.js";

const router = express.Router();

router.get('/' , forcast);

export default router;