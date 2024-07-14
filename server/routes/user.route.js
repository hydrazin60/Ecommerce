import express from "express";
import { SignUpController } from "../controller/SignUp.controller.js";
import { SignIn } from "../controller/Signin.control.js";
import { UserDetailsController } from "../controller/Userdetails.controller.js";
import authToken from "../middleware/authToken.js";
import { userLogout } from "../controller/LogoutUser.controller.js";
import { AlluserList } from "../controller/AllUserList.controller.js";
const router = express.Router();

router.post("/sign-up", SignUpController);
router.post("/sign-in", SignIn);
router.get(`/user-details`, authToken, UserDetailsController);
router.delete(`/logout-user`, authToken, userLogout);
router.get("/all-user-list", authToken ,  AlluserList);
export default router;
