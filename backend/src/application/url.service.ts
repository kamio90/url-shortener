/**
 * Service for managing URL shortening, retrieval, updates, and deletions.
 * Uses MongoDB for persistent storage and Redis for caching.
 */

import {IUrl, UrlModel} from '../domain/url.entity';
import {redisClient} from '../infrastructure/redis';
import {v4 as uuidv4} from 'uuid';

/**
 * URL Service class handling all URL-related operations.
 */
export class UrlService {
    /**
     * Creates a shortened URL.
     * @param {string} originalUrl - The original URL to be shortened.
     * @param {string | null} ownerId - The ID of the user who owns the URL (nullable for anonymous users).
     * @param {string} [customShortId] - An optional custom short ID.
     * @param {Date} [expiresAt] - Optional expiration date for the shortened URL.
     * @returns {Promise<IUrl>} The newly created shortened URL document.
     * @throws {Error} If the short ID is already taken.
     */
    async shortenUrl(originalUrl: string, ownerId: string | null, customShortId?: string, expiresAt?: Date): Promise<IUrl> {
        const shortId = customShortId || uuidv4().slice(0, 6);

        const existingUrl = await UrlModel.findOne({shortId});
        if (existingUrl) {
            throw new Error('This short URL is already taken.');
        }

        const newUrl = new UrlModel({originalUrl, shortId, ownerId, expiresAt});
        await newUrl.save();
        await redisClient.set(shortId, originalUrl, {EX: 3600});

        return newUrl;
    }

    /**
     * Deletes a shortened URL if the owner is authorized.
     * @param {string} shortId - The short ID of the URL to delete.
     * @param {string} ownerId - The ID of the user attempting to delete the URL.
     * @returns {Promise<void>} Resolves when the URL is deleted.
     * @throws {Error} If the URL does not exist or if the user is unauthorized.
     */
    async deleteUrl(shortId: string, ownerId: string): Promise<void> {
        const url = await UrlModel.findOne({shortId});

        if (!url) {
            throw new Error('URL not found');
        }

        if (url.ownerId.toString() !== ownerId) {
            throw new Error('Unauthorized');
        }

        await UrlModel.deleteOne({shortId});
        await redisClient.del(shortId);
    }

    /**
     * Updates the destination of a shortened URL.
     * @param {string} shortId - The short ID of the URL to update.
     * @param {string} ownerId - The ID of the user attempting to update the URL.
     * @param {string} newUrl - The new original URL.
     * @returns {Promise<IUrl>} The updated URL document.
     * @throws {Error} If the URL does not exist or if the user is unauthorized.
     */
    async updateUrl(shortId: string, ownerId: string, newUrl: string): Promise<IUrl> {
        const url = await UrlModel.findOne({shortId});

        if (!url) {
            throw new Error('URL not found');
        }

        if (url.ownerId.toString() !== ownerId) {
            throw new Error('Unauthorized');
        }

        url.originalUrl = newUrl;
        await url.save();

        await redisClient.set(shortId, newUrl, {EX: 3600});

        return url;
    }

    /**
     * Retrieves the original URL based on a shortened ID.
     * Tracks the visit count and logs the click event.
     * Uses Redis caching to improve performance.
     *
     * @param {string} shortId - The short ID of the URL.
     * @param {string} ipAddress - The IP address of the visitor.
     * @returns {Promise<IUrl | null>} The original URL document or null if not found.
     */
    async getUrl(shortId: string, ipAddress: string): Promise<IUrl | null> {
        // Check if URL is cached in Redis
        const cachedUrl = await redisClient.get(shortId);

        if (cachedUrl === 'NOT_FOUND') {
            return null;
        }

        if (cachedUrl) {
            return {originalUrl: cachedUrl, shortId, createdAt: new Date()} as IUrl;
        }

        // Retrieve URL from the database
        const urlData = await UrlModel.findOne({shortId});

        if (!urlData) {
            await redisClient.set(shortId, 'NOT_FOUND', {EX: 300});
            return null;
        }

        // Check if the URL has expired
        if (urlData.expiresAt && urlData.expiresAt < new Date()) {
            await UrlModel.deleteOne({shortId});
            await redisClient.del(shortId);
            return null;
        }

        // Update visit count and log the click
        await UrlModel.updateOne(
            {shortId},
            {
                $inc: {visitCount: 1},
                $push: {clicks: {timestamp: new Date(), ipAddress}},
            }
        );

        // Store in Redis cache
        await redisClient.set(shortId, urlData.originalUrl, {EX: 3600});

        return urlData;
    }
}
