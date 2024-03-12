import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import {userLogin,userSignup} from "../lib/utils/joi.schema.js";
import {joiBodyMiddleware} from "../middleware/joi.middleware.js";

const router = express.Router();

router.post("/signup",joiBodyMiddleware(userSignup), signup);

router.post("/login",joiBodyMiddleware(userLogin), login);

router.post("/logout", logout);

export default router;
