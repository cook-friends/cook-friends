import { useState } from "react";
import { useRecipe } from "../../context/RecipeContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NewRecipeForm = () => {
    const { createRecipe } = useRecipe();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [recipeData, setRecipeData] = useState({
        recipeName: "",
        ingredients: [],
        instructions: "",
        calories: "",
        dietaryTags: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipeData({
            ...recipeData,
            [name]: value,
        });
    };

    const handleIngredientChange = (index, e) => {
        const newIngredients = [...recipeData.ingredients];
        newIngredients[index][e.target.name] = e.target.value;

        setRecipeData({
            ...recipeData,
            ingredients: newIngredients,
        });
    };

    const handleAddIngredient = () => {
        setRecipeData({
            ...recipeData,
            ingredients: [
                ...recipeData.ingredients,
                { quantity: "", unit: "pieces", name: "" },
            ],
        });
    };

    const handleDeleteIngredient = (index) => {
        const newIngredients = [...recipeData.ingredients];
        newIngredients.splice(index, 1);
        setRecipeData({
            ...recipeData,
            ingredients: newIngredients,
        });
    };

    const handleTagChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setRecipeData({
                ...recipeData,
                dietaryTags: [...recipeData.dietaryTags, name],
            });
        } else {
            setRecipeData({
                ...recipeData,
                dietaryTags: recipeData.dietaryTags.filter(
                    (tag) => tag !== name
                ),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const created = await createRecipe({
            ...recipeData,
            creator: user._id,
        });
        setIsSubmitting(false);
        navigate(`/recipes/${created._id}`);
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-lime-400 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-white">
                Create a New Recipe
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-white">Recipe Name *</label>
                    <input
                        type="text"
                        name="recipeName"
                        value={recipeData.recipeName}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Ingredients *</label>
                    {recipeData.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex">
                            <input
                                type="text"
                                name="quantity"
                                placeholder="Quantity"
                                value={ingredient.quantity}
                                onChange={(e) =>
                                    handleIngredientChange(index, e)
                                }
                                className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white rounded-lg"
                            />

                            <select
                                name="unit"
                                onChange={(e) =>
                                    handleIngredientChange(index, e)
                                }
                                className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white rounded-lg"
                            >
                                <option value="pieces">Pieces</option>
                                <option value="grams">Grams</option>
                                <option value="milliliters">Millilitres</option>
                            </select>

                            <input
                                type=""
                                name="name"
                                placeholder="Name"
                                value={ingredient.name}
                                onChange={(e) =>
                                    handleIngredientChange(index, e)
                                }
                                className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white rounded-lg"
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2"
                                onClick={() => handleDeleteIngredient(index)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddIngredient}
                        className="px-4 py-2 bg-white text-lime-400 rounded-lg hover:bg-gray-100"
                    >
                        Add Ingredient
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-white">Instructions *</label>
                    <textarea
                        name="instructions"
                        value={recipeData.instructions}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Calories *</label>
                    <input
                        type="text"
                        name="calories"
                        value={recipeData.calories}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Dietary tags</label>
                    <div>
                        <input
                            type="checkbox"
                            name="Vegan"
                            checked={recipeData.dietaryTags.includes("Vegan")}
                            onChange={handleTagChange}
                            className="mr-2"
                        />
                        <label htmlFor="Vegan" className="mr-4">
                            Vegan
                        </label>
                        <input
                            type="checkbox"
                            name="Gluten-free"
                            checked={recipeData.dietaryTags.includes(
                                "Gluten-free"
                            )}
                            onChange={handleTagChange}
                            className="mr-2"
                        />
                        <label htmlFor="Gluten-free" className="mr-4">
                            Gluten-free
                        </label>
                        <input
                            type="checkbox"
                            name="Paleo"
                            checked={recipeData.dietaryTags.includes("Paleo")}
                            onChange={handleTagChange}
                            className="mr-2"
                        />
                        <label htmlFor="Paleo" className="mr-4">
                            Paleo
                        </label>
                        <input
                            type="checkbox"
                            name="Dairy-free"
                            checked={recipeData.dietaryTags.includes(
                                "Dairy-free"
                            )}
                            onChange={handleTagChange}
                            className="mr-2"
                        />
                        <label htmlFor="Dairy-free">Dairy-free</label>
                    </div>
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-white text-lime-400 rounded-lg hover:bg-gray-100"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Create Recipe"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewRecipeForm;
