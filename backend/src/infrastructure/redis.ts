/**
 * Redis client setup and connection handling.
 * Provides a centralized Redis instance for caching and rate limiting.
 */

import {createClient} from 'redis';
import {config} from '../config/config.manager';

/**
 * Redis client instance.
 * Uses the configured Redis host or falls back to the local Redis server.
 */
const redisClient = createClient({url: config.REDIS_HOST || 'redis://localhost:6379'});

/**
 * Handles Redis connection errors.
 * Logs errors to the console for debugging purposes.
 * @param {Error} err - The error object containing the Redis connection error details.
 */
redisClient.on('error', (err) => console.error('❌ Redis Error:', err));

/**
 * Establishes the Redis connection.
 * Logs a success message upon a successful connection.
 */
redisClient.connect().then(() => console.log('✅ Redis connected'));

export {redisClient};
