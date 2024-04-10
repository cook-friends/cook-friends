import { Router } from "express";
import {
    profile,
    getUsers,
    getUser,
    searchUsers,
    follow,
    unfollow,
} from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/profile", authRequired, profile);

router.get("/users", authRequired, getUsers);

router.get("/users/:id", authRequired, getUser);

router.get("/users/search/:query", authRequired, searchUsers);

router.patch("/follow/:id", authRequired, follow);

router.patch("/unfollow/:id", authRequired, unfollow);

export default router;
