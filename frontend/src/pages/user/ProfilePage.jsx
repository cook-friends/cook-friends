import { useAuth } from "../../context/AuthContext";

function ProfilePage() {
    const { user } = useAuth();

    console.log(user);

    return (
        <div className="mt-10 p-6 flex flex-wrap items-center justify-center">
            <div className="container w-2/3 bg-white  shadow    transform   duration-200 easy-in-out ">
                <div className="flex justify-center px-5  -mt-12">
                    <img
                        className="h-32 w-32 bg-white rounded-full border-lime-400 border-4"
                        src={user.picture}
                        alt="picture"
                    />
                </div>
                <div className=" ">
                    <div className="text-center px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">
                            {user.username}
                        </h2>
                        <button
                            className="mt-4 px-4 py-1 bg-lime-400 text-white rounded-md hover:bg-lime-500"
                            onClick={() => console.log("Follow")}
                        >
                            Follow
                        </button>
                        <p className="mt-2 text-gray-500 text-sm">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industrys standard dummy text ever since the 1500s,{" "}
                        </p>
                    </div>
                    <hr className="mt-6" />
                    <div className="flex  bg-gray-50 ">
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p>
                                <span className="font-semibold text-lime-400">
                                    2.5 k{" "}
                                </span>{" "}
                                Followers
                            </p>
                        </div>
                        <div className="border"></div>
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p>
                                {" "}
                                <span className="font-semibold text-lime-400">
                                    2.0 k{" "}
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
