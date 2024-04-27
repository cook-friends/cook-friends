import mongoose from "mongoose";
import User from "./user.model.js";
import Recipe from "./recipe.model.js";
import Like from "./like.model.js";
import Comment from "./comment.model.js";

mongoose.connect("mongodb://127.0.0.1:27017/cook-friends-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const createUser = async (
    username,
    email,
    password,
    bio = "",
    picture = {}
) => {
    try {
        const user = await User.create({
            username,
            email,
            password,
            bio,
            picture,
        });
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

const createRecipe = async (
    recipeName,
    ingredients,
    instructions,
    calories,
    dietaryTags,
    creatorId
) => {
    try {
        const recipe = await Recipe.create({
            recipeName,
            ingredients,
            instructions,
            calories,
            dietaryTags,
            creator: creatorId,
        });
        return recipe;
    } catch (error) {
        console.error("Error creating recipe:", error);
    }
};

const createLike = async (userId, recipeId) => {
    try {
        const like = await Like.create({
            userId,
            recipeId,
        });
        return like;
    } catch (error) {
        console.error("Error creating like:", error);
    }
};

const createComment = async (userId, recipeId, content) => {
    try {
        const comment = await Comment.create({
            userId,
            recipeId,
            content,
        });
        return comment;
    } catch (error) {
        console.error("Error creating comment:", error);
    }
};

const populateDatabase = async () => {
    try {
        // Create users
        const user1 = await createUser(
            "user1",
            "user1@example.com",
            "password1"
        );
        const user2 = await createUser(
            "user2",
            "user2@example.com",
            "password2"
        );
        const user3 = await createUser(
            "user3",
            "user3@example.com",
            "password3"
        );
        user1.followers.push(user2._id);
        user1.followers.push(user3._id);
        user1.save();

        // Create recipes
        const recipe1 = await createRecipe(
            "Recipe 1",
            [],
            "Recipe 1 instructions",
            200,
            ["Tag1", "Tag2"],
            user1._id
        );
        const recipe2 = await createRecipe(
            "Recipe 2",
            [],
            "Recipe 2 instructions",
            300,
            ["Tag1", "Tag3"],
            user2._id
        );
        const recipe3 = await createRecipe(
            "Recipe 3",
            [],
            "Recipe 3 instructions",
            400,
            ["Tag2", "Tag3"],
            user3._id
        );
        const recipe4 = await createRecipe(
            "Recipe 4",
            [],
            "Recipe 4 instructions",
            500,
            ["Tag1"],
            user1._id
        );
        const recipe5 = await createRecipe(
            "Recipe 5",
            [],
            "Recipe 5 instructions",
            600,
            ["Tag2"],
            user2._id
        );
        const recipe6 = await createRecipe(
            "Recipe 6",
            [],
            "Recipe 6 instructions",
            700,
            ["Tag3"],
            user3._id
        );

        // Create likes
        const allRecipes = [
            recipe1,
            recipe2,
            recipe3,
            recipe4,
            recipe5,
            recipe6,
        ];
        const allUsers = [user1, user2, user3];
        for (let i = 0; i < 12; i++) {
            const randomRecipe =
                allRecipes[Math.floor(Math.random() * allRecipes.length)];
            const randomUser =
                allUsers[Math.floor(Math.random() * allUsers.length)];
            await createLike(randomUser._id, randomRecipe._id);
        }

        // Create comments
        for (let i = 0; i < 12; i++) {
            const randomRecipe =
                allRecipes[Math.floor(Math.random() * allRecipes.length)];
            const randomUser =
                allUsers[Math.floor(Math.random() * allUsers.length)];
            await createComment(
                randomUser._id,
                randomRecipe._id,
                `Comment ${i} on ${randomRecipe.recipeName}`
            );
        }
    } catch (error) {
        console.error("Error populating database:", error);
    } finally {
        mongoose.disconnect();
    }
};

populateDatabase();