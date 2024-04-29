import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecipe } from "../../context/RecipeContext";
import RecipeCard from "../../components/RecipeCard";

function RecipeSearchPage() {
    const [query, setQuery] = useState("");
    const [maxCalories, setMaxCalories] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchErrorMessage, setSearchErrorMessage] = useState("");
    const { fetchRecipes, recipes, searchResults, searchRecipes } = useRecipe();
    const params = useParams();
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) {
            setSearchErrorMessage("Please enter a search query");
            return;
        }
        await searchRecipes(query);
        navigate(`/recipes/search/${query}`);
    };

    useEffect(() => {
        const loadSearchResults = async () => {
            if (params?.query) {
                await searchRecipes(params.query);
            } else {
                await fetchRecipes();
            }
        };
        loadSearchResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredRecipes = params.query
        ? searchResults.filter((recipe) => {
              if (maxCalories && recipe.calories > parseInt(maxCalories)) {
                  return false;
              }
              if (
                  selectedTags.length > 0 &&
                  !selectedTags.every((tag) => recipe.dietaryTags.includes(tag))
              ) {
                  return false;
              }
              return true;
          })
        : recipes.filter((recipe) => {
              if (maxCalories && recipe.calories > parseInt(maxCalories)) {
                  return false;
              }
              if (
                  selectedTags.length > 0 &&
                  !selectedTags.every((tag) => recipe.dietaryTags.includes(tag))
              ) {
                  return false;
              }
              return true;
          });

    const handleTagChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setSelectedTags([...selectedTags, name]);
        } else {
            setSelectedTags(selectedTags.filter((tag) => tag !== name));
        }
    };

    return (
        <>
            <form onSubmit={handleSearch} className="mt-4 px-20">
                <p className="text-red-500 mb-1">{searchErrorMessage}</p>
                <div className="sm:flex items-center bg-white rounded-lg border border-lime-400 overflow-hidden px-2 py-1 justify-between">
                    <input
                        className="text-base text-gray-400 flex-grow outline-none px-2 "
                        type="text"
                        placeholder="Search for recipes"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSearchErrorMessage("");
                        }}
                    />
                    <button
                        type="submit"
                        className="bg-lime-600 text-white text-base rounded-lg px-4 py-2 font-thin"
                    >
                        Search
                    </button>
                </div>
                <div className="mt-2">
                    <label htmlFor="maxCalories" className="block mb-1">
                        Max Calories
                    </label>
                    <input
                        id="maxCalories"
                        className="text-base text-gray-400 px-2 border border-lime-400 rounded-lg"
                        type="number"
                        placeholder="Max calories"
                        value={maxCalories}
                        onChange={(e) => setMaxCalories(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <label className="block mb-1">Dietary Tags</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="Vegan"
                                checked={selectedTags.includes("Vegan")}
                                onChange={handleTagChange}
                            />
                            Vegan
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="Gluten-free"
                                checked={selectedTags.includes("Gluten-free")}
                                onChange={handleTagChange}
                            />
                            Gluten-free
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="Paleo"
                                checked={selectedTags.includes("Paleo")}
                                onChange={handleTagChange}
                            />
                            Paleo
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="Dairy-free"
                                checked={selectedTags.includes("Dairy-free")}
                                onChange={handleTagChange}
                            />
                            Dairy-free
                        </label>
                    </div>
                </div>
            </form>
            {params.query ? (
                searchResults.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <h1 className="text-lime-600 font-bold mt-4">
                            No recipes found for &quot;{params.query}&quot;
                        </h1>
                    </div>
                ) : (
                    <div className="container mx-auto px-20">
                        <div className="">
                            <p className="text-lime-600 font-bold mt-4">
                                Search results for &quot;{params.query}&quot;
                            </p>
                            <div className="grid grid-cols-4 gap-2 mt-4">
                                {filteredRecipes.map((recipe) => (
                                    <RecipeCard
                                        key={recipe._id}
                                        recipe={recipe}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="container mx-auto px-20">
                    <div className="">
                        <div className="grid grid-cols-4 gap-2 mt-4">
                            {filteredRecipes.map((recipe) => (
                                <RecipeCard key={recipe._id} recipe={recipe} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default RecipeSearchPage;
