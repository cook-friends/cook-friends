import { Router } from "express";
import {
    getRecipeById,
    getRecipes,
    createRecipe,
} from "../controllers/recipe.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/recipes", authRequired, getRecipes);
router.get("/recipes/:id", authRequired, getRecipeById);
router.post("/recipes", authRequired, createRecipe);

export default router;
