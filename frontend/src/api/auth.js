import axios from "./axios.js";

export const registerRequest = async (user) =>
    axios.post(`/register`, user, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const loginRequest = async (user) => axios.post(`/login`, user);

export const verifyTokenRequest = async () => axios.get(`/verify-token`);
