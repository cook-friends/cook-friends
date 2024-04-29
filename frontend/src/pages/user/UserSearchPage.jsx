import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import UserCard from "../../components/UserCard";

function UserSearchPage() {
    const [query, setQuery] = useState("");
    const [searchErrorMessage, setSearchErrorMessage] = useState("");
    const { searchUsers, searchResults, getUsers, users } = useUser();
    const navigate = useNavigate();
    const params = useParams();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) {
            setSearchErrorMessage("Please enter a search query");
            return;
        }
        await searchUsers(query);
        navigate(`/users/search/${query}`);
    };

    useEffect(() => {
        const loadSearchResults = async () => {
            if (params?.query) {
                await searchUsers(params.query);
            } else {
                await getUsers();
            }
        };
        loadSearchResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <form onSubmit={handleSearch} className="mt-4 px-20">
                <p className="text-red-500 mb-1">{searchErrorMessage}</p>
                <div className="sm:flex items-center bg-white rounded-lg border border-lime-400 overflow-hidden px-2 py-1 justify-between">
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
            {params.query ? (
                searchResults.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <h1 className="text-lime-600 font-bold mt-4">
                            No users found for &quot;{params.query}&quot;
                        </h1>
                    </div>
                ) : (
                    <div className="container mx-auto px-20">
                        <div className="">
                            <p className="text-lime-600 font-bold mt-4">
                                Search results for &quot;{params.query}&quot;
                            </p>
                            <div className="grid grid-cols-4 gap-2 mt-4">
                                {searchResults.map((user) => (
                                    <UserCard key={user._id} user={user} />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="container mx-auto px-20">
                    <div className="">
                        <div className="grid grid-cols-4 gap-2 mt-4">
                            {users.map((user) => (
                                <UserCard key={user._id} user={user} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserSearchPage;
