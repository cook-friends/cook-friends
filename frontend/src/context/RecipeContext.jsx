// RecipeContext.js
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import {
    getRecipeRequest,
    getRecipesRequest,
    createNewRecipe,
    likeRecipeRequest,
    dislikeRecipeRequest,
    getPopularRecipesRequest,
    postCommentRequest,
} from "../api/recipe";

const RecipeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useRecipe = () => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error("useRecipe must be used within a RecipeProvider");
    }
    return context;
};

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        try {
            const res = await getRecipesRequest();
            setRecipes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPopularRecipes = async () => {
        try {
            const res = await getPopularRecipesRequest();
            setRecipes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createRecipe = async (newRecipeData) => {
        try {
            const created = await createNewRecipe(newRecipeData);
            return created.data;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRecipe = async (id) => {
        try {
            const res = await getRecipeRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const likeRecipe = async (userId, recipeId) => {
        try {
            await likeRecipeRequest(userId, recipeId);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const dislikeRecipe = async (userId, recipeId) => {
        try {
            await dislikeRecipeRequest(userId, recipeId);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const postComment = async (recipeId, content) => {
        try {
            await postCommentRequest(recipeId, content);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    // Define other recipe-related functions...

    return (
        <RecipeContext.Provider
            // Pass these functions in the context value
            value={{
                recipes,
                fetchRecipes,
                fetchRecipe,
                createRecipe,
                likeRecipe,
                fetchPopularRecipes,
                dislikeRecipe,
                postComment,
                // Pass other recipe-related functions here...
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

RecipeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RecipeProvider;
