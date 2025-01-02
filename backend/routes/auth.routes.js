import express from "express";
import {
  login,
  register,
  getProfile,
  updateUsername,
  updateEmail,
  updatePassword,
  deleteUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", getProfile);
router.put("/username", updateUsername);
router.put("/email", updateEmail);
router.put("/password", updatePassword);
router.delete("/deleteuser", deleteUser);

export default router;
