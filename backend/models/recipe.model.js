import mongoose from "mongoose";

// Define the schema for a recipe
const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [
            {
                quantity: {
                    type: Number,
                    required: true,
                },
                unit: {
                    type: String,
                    enum: ["pieces", "grams", "milliliters"],
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    dietaryTags: {
        type: [String],
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

// Create a model for the recipe schema
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
