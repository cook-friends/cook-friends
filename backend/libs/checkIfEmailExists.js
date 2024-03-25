import User from "../models/user.model.js";

export async function checkIfEmailExists(email) {
    try {
        const user = await User.findOne({ email });
        return !!user;
    } catch (error) {
        console.error(error);
    }
}
