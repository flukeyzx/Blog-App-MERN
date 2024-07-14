import { Router } from "express";
import {
  createUser,
  isAuthorized,
  loginUser,
  logoutUser,
  userProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", isAuthorized, logoutUser);
router.get("/profile", isAuthorized, userProfile);

export default router;
