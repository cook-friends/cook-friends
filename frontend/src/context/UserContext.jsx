import { createContext, useContext } from "react";
import { getUserRequest, followRequest, unfollowRequest } from "../api/user.js";
import PropTypes from "prop-types";

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within an UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const follow = async (id) => {
        try {
            await followRequest(id);
        } catch (error) {
            console.error(error);
        }
    };

    const unfollow = async (id) => {
        try {
            await unfollowRequest(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UserContext.Provider value={{ getUser, follow, unfollow }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserProvider;
