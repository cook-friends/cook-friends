import { Router } from "express";
import {
    getRecipeById,
    getRecipes,
    createRecipe,
    likeRecipe,
    getMostLikedRecipes,
    dislikeRecipe,
    getRecipesByCreator,
} from "../controllers/recipe.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

/**
 * @openapi
 * /api/v1/recipes:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Get all recipes
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
 *                   recipeName:
 *                     type: string
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         quantity:
 *                           type: number
 *                         unit:
 *                           type: string
 *                         name:
 *                           type: string
 *                   instructions:
 *                     type: string
 *                   calories:
 *                     type: number
 *                   dietaryTags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   creator:
 *                     type: string
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
router.get("/recipes", authRequired, getRecipes);

/**
 * @openapi
 * /api/v1/recipes/popular:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Get most liked recipes
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           format: int32
 *         description: The maximum number of recipe IDs to return (default is 10)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: ID of the most liked recipe
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
router.get("/recipes/popular", authRequired, getMostLikedRecipes);

/**
 * @openapi
 * /api/v1/recipes/{id}:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Get recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipeName:
 *                   type: string
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       quantity:
 *                         type: number
 *                       unit:
 *                         type: string
 *                       name:
 *                         type: string
 *                 instructions:
 *                   type: string
 *                 calories:
 *                   type: number
 *                 dietaryTags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 creator:
 *                   type: string
 *                 likes:
 *                   type: number
 *                 liked:
 *                   type: boolean
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                       content:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe not found
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
router.get("/recipes/:id", authRequired, getRecipeById);

/**
 * @openapi
 * /api/v1/recipes/creator/{creatorId}:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Get recipes by creator
 *     parameters:
 *       - in: path
 *         name: creatorId
 *         required: true
 *         description: ID of the creator whose recipes to fetch
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
 *                 type: string
 *                 description: ID of the recipe
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
router.get("/recipes/creator/:creatorId", authRequired, getRecipesByCreator);

/**
 * @openapi
 * /api/v1/recipes:
 *   post:
 *     tags:
 *       - Recipe
 *     summary: Create a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeName:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     quantity:
 *                       type: number
 *                     unit:
 *                       type: string
 *                     name:
 *                       type: string
 *               instructions:
 *                 type: string
 *               calories:
 *                 type: number
 *               dietaryTags:
 *                 type: array
 *                 items:
 *                   type: string
 *               creator:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe created successfully
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
router.post("/recipes", authRequired, createRecipe);

/**
 * @openapi
 * /api/v1/recipes/{id}/like:
 *   patch:
 *     tags:
 *       - Recipe
 *     summary: Like a recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe to like
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               recipeId:
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
 *                   description: ID of the created like
 *                 userId:
 *                   type: string
 *                   description: ID of the user who liked the recipe
 *                 recipeId:
 *                   type: string
 *                   description: ID of the recipe that was liked
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You've already liked this recipe
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
router.patch("/recipes/:id/like", authRequired, likeRecipe);

/**
 * @openapi
 * /api/v1/recipes/{id}/dislike:
 *   patch:
 *     tags:
 *       - Recipe
 *     summary: Remove like from a recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe to remove like from
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: deleted
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You haven't previously liked this recipe
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
router.patch("/recipes/:id/dislike", authRequired, dislikeRecipe);

export default router;
