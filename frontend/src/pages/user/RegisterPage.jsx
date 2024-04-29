import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    const [picture, setPicture] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isAuthenticated) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("bio", data.bio);
        formData.append("picture", picture);
        await signUp(formData);
        setIsSubmitting(false);
    });

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-lime-400 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-white">Register</h1>

            {registerErrors.map((error, i) => (
                <div className="text-red-500 mb-2" key={i}>
                    {error}
                </div>
            ))}

            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-white">Username *</label>
                    {errors.username && (
                        <p className="text-red-500">Username is required</p>
                    )}
                    <input
                        type="text"
                        {...register("username", { required: true })}
                        className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white">Email *</label>
                    {errors.email && (
                        <p className="text-red-500">Email is required</p>
                    )}
                    <input
                        type="email"
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
                    <label className="block text-white">Bio</label>
                    <textarea
                        {...register("bio")}
                        className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white">Picture</label>
                    <input
                        type="file"
                        {...register("picture")}
                        className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white rounded-lg"
                        onChange={(e) => setPicture(e.target.files[0])}
                        accept="image/*"
                    />
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-white text-lime-400 rounded-lg hover:bg-gray-100"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Register"}
                    </button>
                </div>
            </form>
            <p className="text-white">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-white font-bold hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
    );
}

export default RegisterPage;
