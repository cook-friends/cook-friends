import User from "../models/user.model.js";

export const profile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            picture: user.picture,
            followers: user.followers,
            following: user.following,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(
            users.map((user) => ({
                _id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                picture: user.picture,
                followers: user.followers,
                following: user.following,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }))
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            picture: user.picture,
            followers: user.followers,
            following: user.following,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const query = req.params.query;

        const users = await User.find({
            username: { $regex: query, $options: "i" },
        });

        res.status(200).json(
            users.map((user) => ({
                _id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                picture: user.picture,
                followers: user.followers,
                following: user.following,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }))
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const follow = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.followers.includes(req.user.id)) {
            return res
                .status(400)
                .json({ message: "You already follow this user" });
        }

        await User.findByIdAndUpdate(userId, {
            $push: { followers: req.user.id },
        });

        await User.findByIdAndUpdate(req.user.id, {
            $push: { following: userId },
        });

        res.status(200).json({ message: "User followed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const unfollow = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.followers.includes(req.user.id)) {
            return res
                .status(400)
                .json({ message: "You don't follow this user" });
        }

        await User.findByIdAndUpdate(userId, {
            $pull: { followers: req.user.id },
        });

        await User.findByIdAndUpdate(req.user.id, {
            $pull: { following: userId },
        });

        res.status(200).json({ message: "User unfollowed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
