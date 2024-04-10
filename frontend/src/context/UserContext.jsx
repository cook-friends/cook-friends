import { createContext, useContext, useState } from "react";
import {
    getUsersRequest,
    getUserRequest,
    searchUsersRequest,
    followRequest,
    unfollowRequest,
} from "../api/user.js";
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
    const [users, setUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [mostFollowedUsers, setMostFollowedUsers] = useState([]);

    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const searchUsers = async (query) => {
        try {
            const res = await searchUsersRequest(query);
            setSearchResults(res.data);
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

    const getMostFollowedUsers = async (n) => {
        try {
            const res = await getUsersRequest();
            const users = res.data;
            users.sort((a, b) => b.followers.length - a.followers.length);
            setMostFollowedUsers(users.slice(0, n));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UserContext.Provider
            value={{
                getUsers,
                users,
                getUser,
                searchUsers,
                searchResults,
                follow,
                unfollow,
                getMostFollowedUsers,
                mostFollowedUsers,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserProvider;
