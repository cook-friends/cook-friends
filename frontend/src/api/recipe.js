import axios from "./axios.js";

export const getRecipesRequest = async () => axios.get("/recipes");

export const getRecipeRequest = async (id) => axios.get(`/recipes/${id}`);

export const createNewRecipe = async (recipe) => axios.post(`/recipes`, recipe);

export const likeRecipeRequest = async (userId, recipeId) =>
    axios.patch(`/recipes/${recipeId}/like`, { userId, recipeId });
