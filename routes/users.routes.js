import express from "express";
import { getAllUsers, loginUser , insertUser , getUserByUsername , updateUser ,deleteUser } from "../controllers/users.controller.js";

const router = express.Router();

router.get('/' , getAllUsers);
router.post('/login' , loginUser)
router.post('/' , insertUser);
// router.get('/' , getUserById);
//update the routes
router.get('/:username' , getUserByUsername);
router.put('/:username' , updateUser);
router.delete('/:username' , deleteUser);

export default router;