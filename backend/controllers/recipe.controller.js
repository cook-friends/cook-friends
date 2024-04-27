import Recipe from "../models/recipe.model.js";

export const createRecipe = async (req, res) => {
    try {
        // Extract recipe data from request body
        const {
            recipeName,
            ingredients,
            instructions,
            calories,
            dietaryTags,
            creator,
        } = req.body;

        // Create a new recipe document
        const newRecipe = new Recipe({
            recipeName,
            ingredients,
            instructions,
            calories,
            dietaryTags,
            creator,
        });

        // Save the new recipe to the database
        const savedRecipe = await newRecipe.save();

        // Respond with the saved recipe
        res.status(201).json(savedRecipe);
    } catch (error) {
        // If an error occurs, send a 500 status code and error message
        res.status(500).json({ message: error.message });
    }
};

export const getRecipes = async (req, res) => {
    try {
        // Fetch all recipes from the database
        const recipes = await Recipe.find();

        // Respond with the fetched recipes
        res.status(200).json(recipes);
    } catch (error) {
        // If an error occurs, send a 500 status code and error message
        res.status(500).json({ message: error.message });
    }
};

export const getRecipeById = async (req, res) => {
    try {
        // Extract recipe ID from request parameters
        const { id } = req.params;

        // Find the recipe by ID in the database
        const recipe = await Recipe.findById(id);

        // Check if recipe with the given ID exists
        if (!recipe) {
            // If recipe is not found, respond with a 404 status code and error message
            return res.status(404).json({ message: "Recipe not found" });
        }

        // If recipe is found, respond with the fetched recipe
        res.status(200).json(recipe);
    } catch (error) {
        // If an error occurs, send a 500 status code and error message
        res.status(500).json({ message: error.message });
    }
};
