import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signIn, isAuthenticated, errors: loginErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (data) => {
        await signIn(data);
    });

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-lime-400 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>

            {loginErrors.map((error, i) => (
                <div className="text-red-500 mb-2" key={i}>
                    {error}
                </div>
            ))}

            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-white">Email *</label>
                    {errors.email && (
                        <p className="text-red-500">Email is required</p>
                    )}
                    <input
                        type="text"
                        {...register("email", { required: true })}
                        className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white">Password *</label>
                    {errors.password && (
                        <p className="text-red-500">Password is required</p>
                    )}
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-white text-lime-400 rounded-lg hover:bg-gray-100"
                    >
                        Login
                    </button>
                </div>
            </form>
            <p className="text-white">
                Don&apos;t have an account?{" "}
                <Link
                    to="/register"
                    className="text-white font-bold hover:underline"
                >
                    Register
                </Link>
            </p>
        </div>
    );
}

export default LoginPage;
