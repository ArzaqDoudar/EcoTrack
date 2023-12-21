import express from "express";
import { getAllReports, insertReport} from "../controllers/report.controller.js";

const router = express.Router();

router.get('/' , getAllReports);
// router.post('/uploadimage' , uploadImage)
router.post('/' , insertReport);
// router.post('/' , insertUser);
// // router.get('/' , getUserById);
// //update the routes
// router.get('/:username' , getUserByUsername);
// router.put('/:username' , updateUser);
// // router.delete('/' , deleteUser);

export default router;