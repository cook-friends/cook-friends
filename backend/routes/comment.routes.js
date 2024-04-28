import { Router } from "express";
import {
    getCommentsByRecipeId,
    publishComment,
} from "../controllers/comment.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

/**
 * @openapi
 * /api/v1/recipes/{id}/comments:
 *   post:
 *     tags:
 *       - Comment
 *     summary: Publish a comment on a recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe to comment on
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the created comment
 *                 userId:
 *                   type: string
 *                   description: ID of the user who published the comment
 *                 recipeId:
 *                   type: string
 *                   description: ID of the recipe the comment belongs to
 *                 content:
 *                   type: string
 *                   description: Content of the comment
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred while processing your request.
 */
router.post("/recipes/:id/comments", authRequired, publishComment);

/**
 * @openapi
 * /api/v1/recipes/{id}/comments:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Get comments by recipe ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe to fetch comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the comment
 *                   userId:
 *                     type: string
 *                     description: ID of the user who published the comment
 *                   recipeId:
 *                     type: string
 *                     description: ID of the recipe the comment belongs to
 *                   content:
 *                     type: string
 *                     description: Content of the comment
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred while processing your request.
 */
router.get("/recipes/:id/comments", authRequired, getCommentsByRecipeId);

export default router;
