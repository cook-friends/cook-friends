import { Router } from "express";
import {
    getRecipeById,
    getRecipes,
    createRecipe,
    likeRecipe,
    getMostLikedRecipes,
    dislikeRecipe,
} from "../controllers/recipe.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/recipes", authRequired, getRecipes);
router.get("/recipes/popular", authRequired, getMostLikedRecipes);
router.get("/recipes/:id", authRequired, getRecipeById);
router.post("/recipes", authRequired, createRecipe);
router.patch("/recipes/:id/like", authRequired, likeRecipe);
router.patch("/recipes/:id/dislike", authRequired, dislikeRecipe);

export default router;
