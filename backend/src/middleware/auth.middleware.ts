/**
 * Middleware for handling authentication via JWT tokens.
 * Ensures that requests include a valid JWT before granting access to protected routes.
 */

import {NextFunction, Request, Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {AppError} from '../config/error.handler';

/**
 * Middleware to verify JWT authentication.
 * Extracts the token from the `Authorization` header, verifies it, and attaches the decoded payload to `req.user`.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the request pipeline.
 * @throws {AppError} If the token is missing, invalid, or expired.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
        if (!token) {
            throw new AppError('Unauthorized: No token provided', 401);
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        // Attach decoded token payload to request object
        (req as any).user = decoded;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        next(new AppError('Invalid or expired token', 401));
    }
};
