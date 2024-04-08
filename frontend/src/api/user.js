import axios from "./axios.js";

export const getUserRequest = async (id) => axios.get(`/user/${id}`);

export const followRequest = async (id) => axios.patch(`/follow/${id}`);

export const unfollowRequest = async (id) => axios.patch(`/unfollow/${id}`);
