import Recipe from "../models/recipe.model.js";
import Like from "../models/like.model.js";

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

        // Find the total number of likes for the recipe
        const totalLikes = await Like.countDocuments({ recipeId: id });

        // Add the total number of likes to the recipe object
        const recipeWithLikes = { ...recipe.toObject(), likes: totalLikes };

        // If recipe is found, respond with the fetched recipe including likes
        res.status(200).json(recipeWithLikes);
    } catch (error) {
        // If an error occurs, send a 500 status code and error message
        res.status(500).json({ message: error.message });
    }
};

export const likeRecipe = async (req, res) => {
    try {
        // Extract user ID and recipe ID from request body
        const { userId, recipeId } = req.body;

        // Check if the user has already liked the recipe
        const existingLike = await Like.findOne({ userId, recipeId });

        if (existingLike) {
            // If the user has already liked the recipe, return a message indicating that
            return res
                .status(400)
                .json({ message: "You've already liked this recipe" });
        }

        // Create a new like document
        const newLike = new Like({ userId, recipeId });

        // Save the new like to the database
        const savedLike = await newLike.save();

        // Respond with the saved like
        res.status(201).json(savedLike);
    } catch (error) {
        // If an error occurs, send a 500 status code and error message
        res.status(500).json({ message: error.message });
    }
};

export const getMostLikedRecipes = async (req, res) => {
    try {
        // Get the value of N from query parameters (default to 10 if not provided)
        const limit = parseInt(req.query.limit) || 10;

        // Aggregate likes for each recipe and sort them based on the number of likes
        const mostLikedRecipes = await Like.aggregate([
            { $group: { _id: "$recipeId", likes: { $sum: 1 } } },
            { $sort: { likes: -1 } },
            { $limit: limit },
        ]);

        // Extract recipe IDs from the aggregated result
        const recipeIds = mostLikedRecipes.map((item) => item._id);

        // Find the recipes based on the extracted recipe IDs
        const recipes = await Recipe.find({ _id: { $in: recipeIds } });

        // Respond with the most liked recipes
        res.status(200).json(recipes);
    } catch (error) {
        // If an error occurs, send a 500 status code and error message
        res.status(500).json({ message: error.message });
    }
};
