import express from "express";
import { getAllInterests, insertInterest, deleteInterest, updateInterest, getUsersByInterest } from "../controllers/interests.controller.js";

const router = express.Router();

router.get('/', getAllInterests);
router.post('/', insertInterest);
router.put('/', updateInterest);
router.get('/users/:interest_name', getUsersByInterest);
router.delete('/:name', deleteInterest);

export default router;
