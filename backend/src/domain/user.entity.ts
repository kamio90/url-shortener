/**
 * User entity schema and model for MongoDB using Mongoose.
 * Handles user authentication, including password hashing and comparison.
 */

import mongoose, {Document, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Interface representing a User document in MongoDB.
 */
export interface IUser extends Document {
    /** User's email address. */
    email: string;

    /** Hashed user password. */
    password: string;

    /**
     * Compares a given password with the stored hashed password.
     * @param {string} candidatePassword - The password to compare.
     * @returns {Promise<boolean>} Whether the password matches the stored hash.
     */
    comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * Mongoose schema defining the structure of the User document.
 */
const UserSchema = new Schema<IUser>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

/**
 * Middleware to hash the password before saving the user document.
 * Runs only if the password field is modified.
 */
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/**
 * Method to compare the provided password with the stored hashed password.
 * @param {string} candidatePassword - The password to compare.
 * @returns {Promise<boolean>} True if passwords match, otherwise false.
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Mongoose model for User collection.
 */
export const UserModel = mongoose.model<IUser>('User', UserSchema);
