import express from "express";
import { getAllUsers, loginUser , insertUser } from "../controllers/users.controller.js";

const router = express.Router();

router.get('/' , getAllUsers);
router.post('/login' , loginUser)
// router.get('/' , getUserById);
//update the routes
router.post('/' , insertUser);
// router.put('/' , updateUser);
// router.delete('/' , deleteUser);

export default router;