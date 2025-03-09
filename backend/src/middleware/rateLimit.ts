/**
 * Middleware for rate limiting API requests using Redis as a store.
 */
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import {redisClient} from '../infrastructure/redis';
import {config} from '../config/config.manager';

/**
 * API rate limiter configuration.
 * Uses Redis as a distributed store to prevent excessive requests from a single IP.
 */
export const apiLimiter = rateLimit({
    /**
     * Redis store for handling rate limits.
     * @property {function} sendCommand - Sends Redis commands for rate limiting.
     */
    store: new RedisStore({
        sendCommand: async (...args: string[]) => redisClient.sendCommand(args),
    }),

    /**
     * Time window for request rate limiting in milliseconds.
     */
    windowMs: config.RATE_LIMIT_WINDOW,

    /**
     * Maximum number of requests allowed per windowMs.
     */
    max: config.RATE_LIMIT_MAX,

    /**
     * Message returned when rate limit is exceeded.
     */
    message: {message: 'Too many requests, please try again later.'},

    /**
     * Include rate limit headers in responses.
     */
    standardHeaders: true,

    /**
     * Disable legacy rate limit headers.
     */
    legacyHeaders: false,
});
