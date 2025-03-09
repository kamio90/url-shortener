/**
 * Configuration manager for environment variables.
 * Loads environment variables using `dotenv` and provides a centralized config object.
 */

import dotenv from 'dotenv';

// Load environment variables from `.env` file
dotenv.config();

/**
 * Application configuration settings.
 * Provides centralized access to environment variables with default fallback values.
 */
export const config = {
    /**
     * MongoDB's connection URI.
     * Defaults to a local MongoDB instance if not set.
     */
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/url-shortener',

    /**
     * Secret key for signing JWT tokens.
     * Defaults to a hardcoded string if not set (should be overridden in production).
     */
    JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey',

    /**
     * Redis server host.
     * Defaults to `localhost` if not set.
     */
    REDIS_HOST: process.env.REDIS_URL || 'localhost',

    /**
     * Redis server port.
     * Defaults to `6379` if not specified.
     */
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,

    /**
     * Default cache expiration time in seconds.
     * Defaults to 3600 seconds (1 hour).
     */
    CACHE_EXPIRATION: Number(process.env.CACHE_EXPIRATION) || 3600,

    /**
     * Server port number.
     * Defaults to `3000` if not set.
     */
    PORT: Number(process.env.PORT) || 3000,

    /**
     * Rate limit time window in milliseconds.
     * Defaults to 15 minutes.
     */
    RATE_LIMIT_WINDOW: Number(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,

    /**
     * Maximum number of requests allowed per rate limit window per IP.
     * Defaults to `100`.
     */
    RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX) || 100,
};
