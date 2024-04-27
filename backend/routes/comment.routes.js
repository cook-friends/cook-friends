import { Router } from "express";
import {
    getCommentsByRecipeId,
    publishComment,
} from "../controllers/comment.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/recipes/:id/comments", authRequired, publishComment);
router.get("/recipes/:id/comments", authRequired, getCommentsByRecipeId);

export default router;
