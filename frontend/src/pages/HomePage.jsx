import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import UserCard from "../components/UserCard";
import RecipeCard from "../components/RecipeCard";
import { useRecipe } from "../context/RecipeContext";

function HomePage() {
    const [query, setQuery] = useState("");
    const [searchErrorMessage, setSearchErrorMessage] = useState("");
    const { searchUsers, mostFollowedUsers, getMostFollowedUsers } = useUser();
    const { fetchPopularRecipes, recipes } = useRecipe();
    const navigate = useNavigate();

    const NUMBER_OF_MOST_FOLLOWED_USERS = 4;

    useEffect(() => {
        getMostFollowedUsers(NUMBER_OF_MOST_FOLLOWED_USERS);
        fetchPopularRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) {
            setSearchErrorMessage("Please enter a search query");
            return;
        }
        await searchUsers(query);
        navigate(`/users/search/${query}`);
    };

    return (
        <div className="mb-10">
            <div className="flex justify-center items-center">
                <div className="container bg-lime-400 p-20  flex flex-col items-center">
                    <h1 className="text-center font-bold text-white text-4xl">
                        Welcome to Cook&Friends!
                    </h1>
                    <p className="mx-auto font-normal text-white text-center text-sm my-6 max-w-lg">
                        Find your friends and discover new recipes with them!
                    </p>
                    <form className="w-full max-w-lg" onSubmit={handleSearch}>
                        <p className="text-red-500 mb-1">
                            {searchErrorMessage}
                        </p>
                        <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
                            <input
                                className="text-base text-gray-400 flex-grow outline-none px-2 "
                                type="text"
                                placeholder="Search for users"
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
                    </form>
                    <p className="mx-auto font-normal text-white text-center text-sm my-6 max-w-lg">
                        Or share one of your recipes!
                    </p>
                    <button
                        type="button"
                        className="bg-lime-600 text-white text-base rounded-lg px-4 py-2 font-thin"
                        onClick={() => navigate("/recipes/create")}
                    >
                        New Recipe
                    </button>
                </div>
            </div>
            <div className="container mx-auto px-20">
                <div className="">
                    <p className="text-2xl text-lime-600 font-bold mt-8">
                        Most followed users
                    </p>
                    <div className="grid grid-cols-4 gap-2 mt-4">
                        {mostFollowedUsers.map((user) => (
                            <UserCard key={user._id} user={user} />
                        ))}
                    </div>
                </div>
                <div className="">
                    <p className="text-2xl text-lime-600 font-bold mt-8">
                        Most popular recipes
                    </p>
                    <div className="grid grid-cols-4 gap-2 mt-4">
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
