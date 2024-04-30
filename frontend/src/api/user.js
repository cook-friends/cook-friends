import axios from "./axios.js";

export const getUsersRequest = async () => axios.get("/users");

export const getUserRequest = async (id) => axios.get(`/users/${id}`);

export const searchUsersRequest = async (query) =>
    axios.get(`/users/search/${query}`);

export const followRequest = async (id) => axios.patch(`/follow/${id}`);

export const unfollowRequest = async (id) => axios.patch(`/unfollow/${id}`);

export const getFollowersRequest = async () => axios.get(`/followers`);

export const getFollowingRequest = async () => axios.get(`/following`);
