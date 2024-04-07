import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const register = async (req, res) => {
    const { username, email, password, bio } = req.body;
    let picture;

    if (req.files && req.files.picture) {
        const { secure_url, public_id } = await uploadImage(
            req.files.picture.tempFilePath
        );

        await fs.remove(req.files.picture.tempFilePath);

        picture = {
            secure_url,
            public_id,
        };
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: passwordHash,
            bio,
            picture,
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({ id: userSaved._id });

        res.cookie("token", token);

        res.status(201).json({
            _id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            bio: userSaved.bio,
            picture: userSaved.picture,
            followers: userSaved.followers,
            following: userSaved.following,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({
            email,
        });

        if (!userFound) {
            return res.status(400).json(["Invalid credentials"]);
        }

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) {
            return res.status(400).json(["Invalid credentials"]);
        }

        const token = await createAccessToken({ id: userFound._id });

        res.cookie("token", token);

        res.status(200).json({
            _id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            bio: userFound.bio,
            picture: userFound.picture,
            followers: userFound.followers,
            following: userFound.following,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            bio: userFound.bio,
            picture: userFound.picture,
            followers: userFound.followers,
            following: userFound.following,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    });
};
