import { Router } from "express";
import { profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/profile", authRequired, profile);

export default router;
