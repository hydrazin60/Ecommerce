import express from "express";
import { SignUpController } from "../controller/SignUp.controller.js";
import { SignIn } from "../controller/Signin.control.js";
const router = express.Router();

router.post("/sign-up", SignUpController);
router.post("/sign-in", SignIn);
export default router;
