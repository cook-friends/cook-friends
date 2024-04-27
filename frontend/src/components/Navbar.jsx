import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { user, isAuthenticated, logOut } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center py-4 px-6 bg-white shadow">
            <div>
                <Link to="/" className="text-white text-xl font-semibold">
                    <img
                        src="/assets/cook&friends-logo.png"
                        alt="logo"
                        className="h-10 inline-block mr-2"
                    />
                </Link>
                <Link
                    to="/recipes/search"
                    className="text-lime-400 mr-4 hover:font-semibold"
                >
                    All Recipes
                </Link>
                <Link
                    to="/users/search"
                    className="text-lime-400 mr-4 hover:font-semibold"
                >
                    All Users
                </Link>
            </div>
            <div>
                {isAuthenticated ? (
                    <>
                        <Link
                            to="/profile"
                            className="text-lime-400 mr-4 hover:font-semibold"
                        >
                            {user.username}
                        </Link>
                        <button
                            onClick={() => {
                                logOut();
                                navigate("/");
                            }}
                            className="text-lime-400 mr-4 hover:font-semibold"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="text-lime-400 mr-4 hover:font-semibold"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-lime-400 hover:font-semibold"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
