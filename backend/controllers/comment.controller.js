import Recipe from "../models/recipe.model.js";
import Comment from "../models/comment.model.js";

export const publishComment = async (req, res) => {
    try {
        const { content } = req.body;

        // Create a new comment document
        const newComment = new Comment({
            userId: req.user.id,
            recipeId: req.params.id,
            content,
        });

        // Save the new comment to the database
        const savedComment = await newComment.save();

        // Respond with the saved comment
        res.status(201).json(savedComment);
    } catch (error) {
        // If an error occurs, send a 500 status code and error message
        res.status(500).json({ message: error.message });
    }
};

export const getCommentsByRecipeId = async (req, res) => {
    try {
        const { recipeId } = req.params;

        // Find all comments associated with the given recipeId
        const comments = await Comment.find({ recipeId });

        // Respond with the fetched comments
        res.status(200).json(comments);
    } catch (error) {
        // If an error occurs, send a 500 status code and error message
        res.status(500).json({ message: error.message });
    }
};
