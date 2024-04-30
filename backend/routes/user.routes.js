import { Router } from "express";
import {
    profile,
    getUsers,
    getUser,
    searchUsers,
    follow,
    unfollow,
    getFollowers,
    getFollowing,
} from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();
/**
 * @openapi
 * /api/v1/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get the profile information of the authenticated user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 picture:
 *                   type: object
 *                   properties:
 *                     secure_url:
 *                       type: string
 *                     public_id:
 *                       type: string
 *                 followers:
 *                   type: array
 *                   items:
 *                     type: string
 *                 following:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred while processing your request.
 */
router.get("/profile", authRequired, profile);

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   picture:
 *                     type: object
 *                     properties:
 *                       secure_url:
 *                         type: string
 *                       public_id:
 *                         type: string
 *                   followers:
 *                     type: array
 *                     items:
 *                       type: string
 *                   following:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred while processing your request.
 */
router.get("/users", authRequired, getUsers);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 picture:
 *                   type: object
 *                   properties:
 *                     secure_url:
 *                       type: string
 *                     public_id:
 *                       type: string
 *                 followers:
 *                   type: array
 *                   items:
 *                     type: string
 *                 following:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred while processing your request.
 */
router.get("/users/:id", authRequired, getUser);

/**
 * @openapi
 * /api/v1/users/search/{query}:
 *   get:
 *     tags:
 *       - User
 *     summary: Search for users by username
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         description: Username query to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   picture:
 *                     type: object
 *                     properties:
 *                       secure_url:
 *                         type: string
 *                       public_id:
 *                         type: string
 *                   followers:
 *                     type: array
 *                     items:
 *                       type: string
 *                   following:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred while processing your request.
 */
router.get("/users/search/:query", authRequired, searchUsers);

/**
 * @openapi
 * /api/v1/follow/{id}:
 *   patch:
 *     tags:
 *       - User
 *     summary: Follow a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to follow
 *         schema:
 *           type: string
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User followed
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You already follow this user
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred while processing your request.
 */
router.patch("/follow/:id", authRequired, follow);

/**
 * @openapi
 * /api/v1/unfollow/{id}:
 *   patch:
 *     tags:
 *       - User
 *     summary: Unfollow a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to unfollow
 *         schema:
 *           type: string
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User unfollowed
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You don't follow this user
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred while processing your request.
 */
router.patch("/unfollow/:id", authRequired, unfollow);

/**
 * @openapi
 * /api/v1/followers:
 *   get:
 *     tags:
 *       - User
 *     summary: Get followers of the authenticated user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   picture:
 *                     type: object
 *                     properties:
 *                       public_id:
 *                         type: string
 *                         description: Public ID of the user's profile picture
 *                       secure_url:
 *                         type: string
 *                         description: Secure URL of the user's profile picture
 *                   _id:
 *                     type: string
 *                     description: ID of the user
 *                   username:
 *                     type: string
 *                     description: Username of the user
 *                   email:
 *                     type: string
 *                     description: Email of the user
 *                   bio:
 *                     type: string
 *                     description: Bio of the user
 *                   followers:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: IDs of the user's followers
 *                   following:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: IDs of the users the user is following
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time when the user was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time when the user was last updated
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred while processing your request.
 */
router.get("/followers", authRequired, getFollowers);

/**
 * @openapi
 * /api/v1/following:
 *   get:
 *     tags:
 *       - User
 *     summary: Get users followed by the authenticated user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   picture:
 *                     type: object
 *                     properties:
 *                       public_id:
 *                         type: string
 *                         description: Public ID of the user's profile picture
 *                       secure_url:
 *                         type: string
 *                         description: Secure URL of the user's profile picture
 *                   _id:
 *                     type: string
 *                     description: ID of the user
 *                   username:
 *                     type: string
 *                     description: Username of the user
 *                   email:
 *                     type: string
 *                     description: Email of the user
 *                   bio:
 *                     type: string
 *                     description: Bio of the user
 *                   followers:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: IDs of the user's followers
 *                   following:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: IDs of the users the user is following
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time when the user was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time when the user was last updated
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred while processing your request.
 */
router.get("/following", authRequired, getFollowing);

export default router;
