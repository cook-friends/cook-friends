import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Like = mongoose.model("Like", likeSchema);

export default Like;
