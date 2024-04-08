import PropTypes from "prop-types";

function UserCard({ user }) {
    return (
        <a
            className="rounded-xl border bg-white p-4 hover:shadow-lg"
            href={`/users/${user._id}`}
        >
            <div className="flex items-center gap-4">
                <img
                    alt="picture"
                    src={
                        user.picture.secure_url
                            ? user.picture.secure_url
                            : "/assets/user/avatar.jpg"
                    }
                    className="size-16 rounded-full object-cover border-2 border-lime-400"
                />

                <div>
                    <h3 className="text-lg font-medium text-lime-400">
                        {user.username}
                    </h3>

                    <div className="flow-root">
                        <p className="text-sm text-gray-300 font-medium">
                            Followers:{" "}
                            <span className="font-semibold text-lime-400">
                                {user.followers.length}{" "}
                            </span>{" "}
                        </p>
                    </div>
                </div>
            </div>
        </a>
    );
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserCard;
