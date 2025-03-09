/**
 * Authentication Controller.
 * Handles user registration and login requests.
 */

import {Request, Response, Router} from 'express';
import {AuthService} from '../application/auth.service';
import validator from 'validator';
import {UserModel} from '../domain/user.entity';

const router = Router();
const authService = new AuthService();

/**
 * Registers a new user.
 * @route POST /api/auth/register
 * @access Public
 * @param {Request} req - The request object containing email and password.
 * @param {Response} res - The response object.
 * @returns {void} Responds with success message and user ID upon successful registration.
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        const existingUser = await UserModel.findOne({email});

        if (!email || !validator.isEmail(email)) {
            res.status(400).json({message: 'Invalid email format'});
            return;
        }

        if (existingUser) {
            res.status(400).json({message: 'Email is already registered'});
            return;
        }

        if (!password || password.length < 6) {
            res.status(400).json({message: 'Password must be at least 6 characters long'});
            return;
        }

        if (!email || !password) {
            res.status(400).json({message: 'Email and password are required'});
            return;
        }

        const user = await authService.register(email, password);
        res.status(201).json({message: 'User created', userId: user._id});
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({message: error.message});
        } else {
            res.status(400).json({message: 'Unknown error occurred'});
        }
    }
});

/**
 * Logs in an existing user and generates a JWT token.
 * @route POST /api/auth/login
 * @access Public
 * @param {Request} req - The request object containing email and password.
 * @param {Response} res - The response object.
 * @returns {void} Responds with a JWT token upon successful authentication.
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json({message: 'Email and password are required'});
            return;
        }

        const token = await authService.login(email, password);
        res.json({token});
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({message: error.message});
        } else {
            res.status(401).json({message: 'Unknown error occurred'});
        }
    }
});

export {router as authRouter};
