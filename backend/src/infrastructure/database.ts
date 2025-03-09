/**
 * MongoDB's connection setup.
 * Establishes a connection to the database using Mongoose.
 */

import mongoose from 'mongoose';
import {config} from '../config/config.manager';

/**
 * Connects to the MongoDB database.
 * Logs a success message on successful connection and handles errors gracefully.
 * If the connection fails, the process exits with status code 1.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves when the database connection is successful.
 * @throws {Error} Logs an error and exits the process if the connection fails.
 */
export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(config.MONGO_URI as string);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ Database connection failed', error);
        process.exit(1); // Exit process with failure code
    }
};
