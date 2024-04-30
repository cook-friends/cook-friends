import mongoose from "mongoose";
import User from "./user.model.js";
import Recipe from "./recipe.model.js";
import Like from "./like.model.js";
import Comment from "./comment.model.js";

mongoose.connect("mongodb://localhost:27017/cook-friends-db", {
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
            "AliceSmith",
            "alice.smith@example.com",
            "password123",
            "Food lover, amateur chef, always experimenting with new recipes!"
        );

        const user2 = await createUser(
            "ChefMike",
            "chef.mike@example.com",
            "chefpass456",
            "Professional chef passionate about creating delicious and innovative dishes."
        );

        const user3 = await createUser(
            "HealthyEats",
            "healthyeats@example.com",
            "greenfood789",
            "Promoting a healthy lifestyle through nutritious and tasty recipes."
        );

        const user4 = await createUser(
            "TasteExplorer",
            "taste.explorer@example.com",
            "foodie123",
            "Travel enthusiast exploring global cuisines one recipe at a time."
        );

        const user5 = await createUser(
            "BakerBuddy",
            "baker.buddy@example.com",
            "bakedgoods456",
            "Baking enthusiast sharing homemade treats and sweet delights."
        );

        // Set following and follwed relationships
        await User.findByIdAndUpdate(user1._id, {
            following: [user2._id, user3._id, user4._id, user5._id],
        });
        await User.findByIdAndUpdate(user2._id, {
            following: [user1._id, user3._id],
        });
        await User.findByIdAndUpdate(user3._id, {
            following: [user1._id, user4._id],
        });
        await User.findByIdAndUpdate(user5._id, {
            following: [user4._id],
        });

        await User.findByIdAndUpdate(user1._id, {
            followers: [user2._id, user3._id],
        });
        await User.findByIdAndUpdate(user2._id, {
            followers: [user1._id],
        });
        await User.findByIdAndUpdate(user3._id, {
            followers: [user1._id, user2._id],
        });
        await User.findByIdAndUpdate(user4._id, {
            followers: [user1._id, user3._id, user5._id],
        });
        await User.findByIdAndUpdate(user5._id, {
            followers: [user1._id],
        });

        // Create recipes
        const ingredient1 = {
            quantity: 1,
            unit: "pieces",
            name: "Carrot",
        };

        const ingredient2 = {
            quantity: 200,
            unit: "grams",
            name: "Chicken Breast",
        };

        const ingredient3 = {
            quantity: 50,
            unit: "grams",
            name: "Spinach",
        };

        const ingredient4 = {
            quantity: 250,
            unit: "milliliters",
            name: "Coconut Milk",
        };

        const ingredient5 = {
            quantity: 2,
            unit: "pieces",
            name: "Tomato",
        };

        const recipe1 = await createRecipe(
            "Vegan Lentil Soup",
            [ingredient1, ingredient2, ingredient3, ingredient4, ingredient5],
            "Combine all ingredients in a pot, simmer until lentils are tender, and enjoy a hearty vegan meal!",
            350,
            ["Vegan", "Gluten-free"],
            user1._id
        );

        const recipe2 = await createRecipe(
            "Grilled Chicken Salad",
            [ingredient2, ingredient3, ingredient5],
            "Grill chicken breast, toss with fresh spinach and tomatoes, and drizzle with coconut milk dressing for a flavorful salad.",
            400,
            ["Gluten-free", "Dairy-free"],
            user1._id
        );

        const recipe3 = await createRecipe(
            "Coconut Curry Stir-Fry",
            [ingredient2, ingredient4, ingredient5],
            "Stir-fry chicken with coconut milk and tomatoes, add spinach, and simmer until everything is cooked through, serve hot.",
            450,
            ["Gluten-free", "Dairy-free"],
            user2._id
        );

        const recipe4 = await createRecipe(
            "Paleo Carrot Cake",
            [ingredient1, ingredient2, ingredient3],
            "Mix grated carrots with almond flour and eggs, bake until golden brown, and indulge in a guilt-free dessert.",
            300,
            ["Paleo", "Gluten-free"],
            user4._id
        );

        const recipe5 = await createRecipe(
            "Creamy Spinach Pasta",
            [ingredient3, ingredient4],
            "Boil pasta until al dente, sauté spinach in coconut milk until wilted, toss with pasta, and serve hot.",
            500,
            ["Gluten-free", "Dairy-free"],
            user4._id
        );

        const recipe6 = await createRecipe(
            "Tomato Basil Soup",
            [ingredient5],
            "Simmer tomatoes with basil until soft, blend until smooth, and season to taste for a comforting soup.",
            150,
            ["Vegan", "Gluten-free", "Dairy-free"],
            user1._id
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
        const allUsers = [user1, user2, user3, user4, user5];
        for (let i = 0; i < 20; i++) {
            const randomRecipe =
                allRecipes[Math.floor(Math.random() * allRecipes.length)];
            const randomUser =
                allUsers[Math.floor(Math.random() * allUsers.length)];
            if (randomRecipe.creator.equals(randomUser._id)) {
                continue;
            }
            await createLike(randomUser._id, randomRecipe._id);
        }

        // Create comments
        const allComments = [
            "This recipe is amazing! I tried it last night and it was a hit with my family. Thanks for sharing!",
            "I love this dish! It's so flavorful and easy to make. I'll definitely be making it again soon.",
            "I'm always looking for new recipes to try, and this one is a winner. Thanks for posting!",
            "It was a hit with my kids. They loved it so much that they asked for seconds!",
            "I made this for dinner last night, and it was a hit with my family. The flavors are so delicious!",
            "This recipe is perfect for a quick weeknight meal. I love how easy it is to put together.",
        ];
        for (let i = 0; i < 10; i++) {
            const randomRecipe =
                allRecipes[Math.floor(Math.random() * allRecipes.length)];
            const randomUser =
                allUsers[Math.floor(Math.random() * allUsers.length)];
            if (randomRecipe.creator.equals(randomUser._id)) {
                continue;
            }
            await createComment(
                randomUser._id,
                randomRecipe._id,
                allComments[Math.floor(Math.random() * allComments.length)]
            );
        }
    } catch (error) {
        console.error("Error populating database:", error);
    } finally {
        console.log(">>> Database populated");
        mongoose.disconnect();
    }
};

populateDatabase();
