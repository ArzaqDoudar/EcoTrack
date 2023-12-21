import express from "express";
import {getAllData } from "../controllers/data.controller.js";

const router = express.Router();

router.get('/' , getAllData);
// router.post('/login' , loginUser)
// router.post('/' , insertData);
// // router.get('/' , getUserById);
// //update the routes
// router.get('/:username' , getUserByUsername);
// router.put('/:username' , updateUser);
// router.delete('/:username' , deleteUser);

export default router;