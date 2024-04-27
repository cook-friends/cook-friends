import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRecipe } from "../../context/RecipeContext";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";

function RecipePage() {
    const [recipe, setRecipe] = useState({});
    const [creator, setCreator] = useState(null);
    const { user: authUser } = useAuth();
    const { fetchRecipe, likeRecipe, dislikeRecipe } = useRecipe();
    const { getUser } = useUser();
    const params = useParams();

    useEffect(() => {
        async function loadRecipe() {
            if (params.id) {
                const recipeFound = await fetchRecipe(params.id);
                setRecipe(recipeFound);
            }
        }
        loadRecipe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function loadCreator() {
            if (recipe.creator) {
                const creator = await getUser(recipe.creator);
                setCreator(creator);
            }
        }
        loadCreator();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipe]);

    const handleLike = async () => {
        if (recipe.liked) {
            await dislikeRecipe(authUser._id, recipe._id);
            setRecipe(await fetchRecipe(params.id));
        } else {
            await likeRecipe(authUser._id, recipe._id);
            setRecipe(await fetchRecipe(params.id));
        }
    };
    return (
        <div className="mt-10 p-6 flex flex-wrap items-center justify-center">
            <div className="container w-2/3 bg-white shadow transform duration-200 easy-in-out">
                <div className="bg-lime-400 p-4 rounded-t-md">
                    <h2 className="text-3xl text-white font-bold">
                        {recipe.recipeName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 flex justify-between mt-2 text-white">
                        <div className="flex">
                            {authUser?._id === creator?._id ? (
                                ""
                            ) : recipe.liked ? (
                                <button
                                    className="px-4 py-2 bg-white text-lime-400 rounded-lg hover:bg-gray-100"
                                    onClick={handleLike}
                                >
                                    Dislike
                                </button>
                            ) : (
                                <button
                                    className="px-4 py-2 bg-white text-lime-400 rounded-lg hover:bg-gray-100"
                                    onClick={handleLike}
                                >
                                    Like
                                </button>
                            )}
                            <p>{recipe.likes} Likes</p>
                        </div>
                        <p>
                            Shared by:{" "}
                            <Link
                                to={`/users/${creator?._id}`}
                                className="underline"
                            >
                                {creator?.username}
                            </Link>
                        </p>
                        <p className="mr-4">
                            {recipe.dietaryTags &&
                                recipe.dietaryTags.join(", ")}
                        </p>
                        <p>{recipe.calories} Calories</p>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-xl font-semibold">
                                Instructions
                            </h3>
                            <p className="mt-2">{recipe.instructions}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">
                                Ingredients
                            </h3>
                            <ul className="list-disc list-inside mt-2">
                                {recipe.ingredients &&
                                    recipe.ingredients.map(
                                        (ingredient, index) => (
                                            <li
                                                key={index}
                                            >{`${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}`}</li>
                                        )
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipePage;
