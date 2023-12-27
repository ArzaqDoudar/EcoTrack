import express from "express";
import { getAllUsers, loginUser , insertUser , getUserByUsername , updateUser ,deleteUser ,changePassword,getAllUserConcerns, addUserConsern , alert} from "../controllers/users.controller.js";
import { getAllConcerns } from "../controllers/concerns.controller.js";

const router = express.Router();

router.get('/' , getAllUsers);
router.post('/login' , loginUser);
router.post('/' , insertUser);
// router.get('/' , getUserById);
router.get('/user/:username' , getUserByUsername);
router.put('/' , updateUser);
router.put('/changepassword' , changePassword);
router.get('/concern' , getAllUserConcerns);
router.post('/concern' , addUserConsern);
router.post('/alert' , alert);

export default router;