import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();

    if (loading) return;
    <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-lime-600">Loading...</h1>
    </div>;
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
