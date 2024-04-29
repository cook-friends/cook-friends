import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRecipe } from "../../context/RecipeContext";
import RecipeCard from "../../components/RecipeCard";

function ProfilePage() {
    const { user } = useAuth();
    const { creatorRecipes, fetchRecipesByCreator } = useRecipe();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecipesByCreator(user._id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="mt-10 p-6 flex flex-wrap items-center justify-center">
            <div className="container w-2/3 bg-white  shadow    transform   duration-200 easy-in-out ">
                <div className="flex justify-center px-5  -mt-12">
                    {user.picture.secure_url ? (
                        <img
                            className="size-32 rounded-full object-cover border-4 border-lime-400"
                            src={user.picture.secure_url}
                            alt="picture"
                        />
                    ) : (
                        <img
                            className="size-32 rounded-full object-cover border-4 border-lime-400"
                            src="/assets/user/avatar.jpg"
                            alt="picture"
                        />
                    )}
                </div>
                <div>
                    <div className="text-center px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">
                            {user.username}
                        </h2>
                        {user.bio ? (
                            <p className="mt-2 text-gray-500 text-sm">
                                {user.bio}
                            </p>
                        ) : (
                            <p className="mt-2 text-gray-500 text-sm italic">
                                No bio available
                            </p>
                        )}
                        <button
                            type="button"
                            className="mt-4 px-4 py-1 bg-lime-400 text-white rounded-md hover:bg-lime-500"
                            onClick={() => navigate("/recipes/create")}
                        >
                            New Recipe
                        </button>
                    </div>
                    <hr className="mt-6" />
                    <div className="flex  bg-gray-50 ">
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p>
                                <span className="font-semibold text-lime-400">
                                    {user.followers.length}{" "}
                                </span>{" "}
                                Followers
                            </p>
                        </div>
                        <div className="border"></div>
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p>
                                {" "}
                                <span className="font-semibold text-lime-400">
                                    {user.following.length}{" "}
                                </span>{" "}
                                Following
                            </p>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
                    {creatorRecipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
