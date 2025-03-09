/**
 * Main server file for the URL Shortener API.
 * Sets up Express, middleware, database connection, API routes, Swagger documentation, and error handling.
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {connectDB} from './infrastructure/database';
import {urlRouter} from './api/url.controller';
import {authRouter} from './api/auth.controller';
import './infrastructure/cron';
import {setupSwagger} from './infrastructure/swagger';
import {apiLimiter} from './middleware/rateLimit';
import {errorHandler} from './config/error.handler';
import {config} from './config/config.manager';

// Load environment variables
dotenv.config();

/**
 * Express application instance.
 */
const app = express();

/**
 * Port number for the server.
 */
const PORT = config.PORT || 3000;

/**
 * Apply global rate limiting middleware for API requests.
 */
app.use('/api/', apiLimiter);

/**
 * Middleware to parse incoming JSON payloads.
 */
app.use(express.json());

/**
 * Enables Cross-Origin Resource Sharing (CORS).
 */
app.use(cors());

/**
 * Sets security-related HTTP headers.
 */
app.use(helmet());

/**
 * Additional rate limiting for basic protection.
 */
app.use(rateLimit({windowMs: 60 * 1000, max: 100}));

/**
 * Global error handler middleware.
 */
app.use(errorHandler);

/**
 * Connect to the database.
 */
connectDB();

/**
 * Mount URL-related routes under `/api/url`.
 */
app.use('/api/url', urlRouter);

/**
 * Mount authentication-related routes under `/api/auth`.
 */
app.use('/api/auth', authRouter);

/**
 * Sets up Swagger API documentation.
 */
setupSwagger(app);

/**
 * Starts the Express server.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export {app};
