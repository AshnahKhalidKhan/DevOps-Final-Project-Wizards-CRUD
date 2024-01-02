import express from "express";
import { userLogin, registerUser, userLogout } from "../controllers/authController";

const router = express.Router();

router.post('/login', userLogin)

router.post('/register', registerUser)

router.delete('/logout', userLogout)

export default router;

