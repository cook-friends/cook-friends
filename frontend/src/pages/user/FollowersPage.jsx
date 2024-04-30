import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import UserCard from "../../components/UserCard";

function FollowersPage() {
    const { followers, getFollowers } = useUser();

    useEffect(() => {
        getFollowers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold my-4 text-lime-800">
                You are follwed by
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {followers.map((follower) => (
                    <UserCard key={follower._id} user={follower} />
                ))}
            </div>
        </div>
    );
}

export default FollowersPage;
