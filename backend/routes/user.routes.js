import { Router } from "express";
import {
    profile,
    getUser,
    follow,
    unfollow,
} from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/profile", authRequired, profile);

router.get("/user/:id", authRequired, getUser);

router.patch("/follow/:id", authRequired, follow);

router.patch("/unfollow/:id", authRequired, unfollow);

export default router;
