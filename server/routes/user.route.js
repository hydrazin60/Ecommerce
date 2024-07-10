import express from "express";
import { SignUpController } from "../controller/SignUp.controller.js";
const router = express.Router();

router.post("/sign-up", SignUpController);

export default router;
