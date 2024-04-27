import PropTypes from "prop-types";

function RecipeCard({ recipe }) {
    // Function to display up to 3 ingredient names
    const getIngredientNames = () => {
        return recipe.ingredients
            .slice(0, 3)
            .map((ingredient) => ingredient.name)
            .join(", ");
    };

    return (
        <a
            className="rounded-xl border bg-white p-4 hover:shadow-lg"
            href={`/recipes/${recipe._id}`}
        >
            <div className="flex items-center gap-4">
                <div>
                    <h3 className="text-lg font-medium text-lime-400">
                        {recipe.recipeName}
                    </h3>

                    <div className="flow-root">
                        <p className="text-sm text-gray-300 font-medium">
                            Ingredients:{" "}
                            <span className="font-semibold text-lime-400">
                                {getIngredientNames()}
                            </span>
                        </p>
                        <p className="text-sm text-gray-300 font-medium">
                            Dietary Tags:{" "}
                            <span className="font-semibold text-lime-400">
                                {recipe.dietaryTags.join(", ")}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </a>
    );
}

RecipeCard.propTypes = {
    recipe: PropTypes.object.isRequired,
};

export default RecipeCard;
