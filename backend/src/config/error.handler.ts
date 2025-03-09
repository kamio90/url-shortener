import {NextFunction, Request, Response} from 'express';

/**
 * Custom application error class for handling structured errors.
 * Extends the built-in `Error` class to include HTTP status codes.
 */
class AppError extends Error {
    /** HTTP status code representing the error type. */
    public statusCode: number;

    /**
     * Creates an instance of `AppError`.
     * @param {string} message - The error message.
     * @param {number} statusCode - The HTTP status code for the error.
     */
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Express middleware for handling errors globally.
 * Converts `AppError` instances into structured HTTP responses.
 *
 * @param {Error} err - The error object thrown by the application.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the pipeline.
 */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({message: err.message});
    } else {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export {AppError, errorHandler};
