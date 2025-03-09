/**
 * Cron job for deleting expired URLs from the database.
 * Runs every minute to remove URLs that have passed their expiration date.
 */

import cron from 'node-cron';
import {UrlModel} from '../domain/url.entity';

/**
 * Scheduled cron job that runs every minute.
 * Checks for expired URLs and deletes them from the database.
 */
cron.schedule('* * * * *', async () => {
    const now = new Date();

    /**
     * Deletes URLs that have expired.
     * @constant {number} deletedCount - The number of deleted documents.
     */
    const result = await UrlModel.deleteMany({expiresAt: {$lte: now}});

    if (result.deletedCount > 0) {
        console.log(`🗑️  Deleted ${result.deletedCount} expired URL(s).`);
    }
});

console.log('✅ Cron Job active – checking for expired URLs every 1 minute.');
