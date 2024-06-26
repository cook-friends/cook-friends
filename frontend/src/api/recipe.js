import axios from "./axios.js";

export const getRecipesRequest = async () => axios.get("/recipes");

export const getPopularRecipesRequest = async () =>
    axios.get("/recipes/popular");

export const getRecipeRequest = async (id) => axios.get(`/recipes/${id}`);

export const getRecipesByCreatorRequest = async (creatorId) =>
    axios.get(`/recipes/creator/${creatorId}`);

export const createNewRecipe = async (recipe) => axios.post(`/recipes`, recipe);

export const likeRecipeRequest = async (userId, recipeId) =>
    axios.post(`/recipes/${recipeId}/like`, { userId, recipeId });

export const dislikeRecipeRequest = async (userId, recipeId) =>
    axios.delete(`/recipes/${recipeId}/dislike`);

export const postCommentRequest = async (recipeId, content) =>
    axios.post(`/recipes/${recipeId}/comments`, { content });

export const searchRecipesRequest = async (query) =>
    axios.get(`/recipes/search/${query}`);
