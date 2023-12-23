import express from "express";
import { getAllUsers, loginUser , insertUser , getUserByUsername , updateUser ,deleteUser ,changePassword} from "../controllers/users.controller.js";

const router = express.Router();

router.get('/' , getAllUsers);
router.post('/login' , loginUser);
router.post('/' , insertUser);
// router.get('/' , getUserById);
router.get('/:username' , getUserByUsername);
router.put('/' , updateUser);
router.put('/changepassword' , changePassword);

export default router;