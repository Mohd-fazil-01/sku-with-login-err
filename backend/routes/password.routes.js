import express from "express";
import {
  forgotPassword,
  verifyCode,
  resetPassword,
} from "../controllers/password.controller.js";

const router = express.Router();

router.post("/forgot", forgotPassword);
router.post("/verify", verifyCode);
router.post("/reset", resetPassword);

export default router;
