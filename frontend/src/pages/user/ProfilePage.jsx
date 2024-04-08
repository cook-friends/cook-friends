import { useAuth } from "../../context/AuthContext";

function ProfilePage() {
    const { user } = useAuth();

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
                <div className=" ">
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
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
