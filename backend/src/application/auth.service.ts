/**
 * Service for user authentication and account management.
 * Handles user registration, login, and JWT token generation.
 */

import {IUser, UserModel} from '../domain/user.entity';
import jwt from 'jsonwebtoken';
import {config} from "../config/config.manager";

/**
 * Authentication service class handling user authentication.
 */
export class AuthService {
    /**
     * Registers a new user.
     * Checks if the email is already in use before creating a new user.
     *
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<IUser>} The created user object.
     * @throws {Error} If the user already exists.
     */
    async register(email: string, password: string): Promise<IUser> {
        const existingUser = await UserModel.findOne({email});
        if (existingUser) {
            throw new Error('User already exists');
        }

        const user = new UserModel({email, password});
        await user.save();
        return user;
    }

    /**
     * Logs in a user and generates a JWT token.
     * Validates email and password before issuing a token.
     *
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<string>} The JWT token for authentication.
     * @throws {Error} If authentication fails due to incorrect credentials.
     */
    async login(email: string, password: string): Promise<string> {
        const user = await UserModel.findOne({email});
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Invalid email or password');
        }

        return jwt.sign(
            {id: user._id, email: user.email},
            config.JWT_SECRET as string,
            {expiresIn: '1h'}
        );
    }
}
