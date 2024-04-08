import axios from "./axios.js";

export const getUsersRequest = async () => axios.get("/users");

export const getUserRequest = async (id) => axios.get(`/users/${id}`);

export const followRequest = async (id) => axios.patch(`/follow/${id}`);

export const unfollowRequest = async (id) => axios.patch(`/unfollow/${id}`);
