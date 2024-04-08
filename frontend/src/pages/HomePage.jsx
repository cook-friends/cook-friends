import { useEffect } from "react";
import UserCard from "../components/UserCard";
import { useUser } from "../context/UserContext";

function HomePage() {
    const { mostFollowedUsers, getMostFollowedUsers } = useUser();

    const NUMBER_OF_MOST_FOLLOWED_USERS = 4;

    useEffect(() => {
        getMostFollowedUsers(NUMBER_OF_MOST_FOLLOWED_USERS);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="container bg-lime-400 p-20">
                    <form>
                        <h1 className="text-center font-bold text-white text-4xl">
                            Welcome to Cook&Friends!
                        </h1>
                        <p className="mx-auto font-normal text-white text-center text-sm my-6 max-w-lg">
                            Find your friends and share your recipes with them!
                        </p>
                        <div className="sm:flex items-center bg-white rounded-lg overflow-hidden mx-16 px-2 py-1 justify-between">
                            <input
                                className="text-base text-gray-400 flex-grow outline-none px-2 "
                                type="text"
                                placeholder="Search for users"
                            />
                            <button className="bg-lime-600 text-white text-base rounded-lg px-4 py-2 font-thin">
                                Search
                            </button>
                        </div>
                    </form>
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
                </div>
            </div>
        </>
    );
}

export default HomePage;
