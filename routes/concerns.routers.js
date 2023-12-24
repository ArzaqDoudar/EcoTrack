import express from "express";
import {getAllConcerns , insertConcern ,deleteConcern ,updateConcern, getUsersByConcern} from "../controllers/concerns.controller.js";

const router = express.Router();

router.get('/' , getAllConcerns);
router.post('/' , insertConcern);
router.put('/' , updateConcern);
router.get('/users/:concern_name' , getUsersByConcern);
router.delete('/:name' , deleteConcern);

export default router;