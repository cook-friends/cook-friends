import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth.js";
import { verifyTokenRequest } from "../api/auth.js";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const checkUser = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user);
            if (res.status === 201) {
                setUser(res.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    };

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data);
        }
    };

    const logOut = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                signUp,
                signIn,
                logOut,
                user,
                isAuthenticated,
                loading,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
