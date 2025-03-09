/**
 * URL entity schema and model for MongoDB using Mongoose.
 * Stores information about shortened URLs, tracking visits, and expiration dates.
 */

import mongoose, {Document, Schema} from 'mongoose';

/**
 * Interface representing a single click event on a shortened URL.
 */
export interface IClick {
    /** Timestamp of when the click occurred. */
    timestamp: Date;

    /** IP address of the user who clicked the shortened URL. */
    ipAddress: string;
}

/**
 * Interface representing a shortened URL document in MongoDB.
 */
export interface IUrl extends Document {
    /** The original full URL before shortening. */
    originalUrl: string;

    /** The unique short ID associated with the URL. */
    shortId: string;

    /** Number of times the shortened URL has been accessed. */
    visitCount: number;

    /** Date when the URL was created. */
    createdAt: Date;

    /** ID of the user who owns the shortened URL. */
    ownerId: mongoose.Types.ObjectId;

    /** Array of click events tracking visits. */
    clicks: IClick[];

    /** Optional expiration date after which the URL will be deleted. */
    expiresAt?: Date;
}

/**
 * Mongoose schema defining the structure of a Click event.
 */
const ClickSchema = new Schema<IClick>({
    timestamp: {type: Date, default: Date.now},
    ipAddress: {type: String, required: true},
});

/**
 * Mongoose schema defining the structure of the URL document.
 */
const UrlSchema = new Schema<IUrl>({
    originalUrl: {type: String, required: true},
    shortId: {type: String, unique: true, required: true},
    visitCount: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    ownerId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    clicks: {type: [ClickSchema], default: []},
    expiresAt: {type: Date, required: false, default: null},
});

/**
 * Mongoose model for the URL collection.
 */
export const UrlModel = mongoose.model<IUrl>('Url', UrlSchema);
