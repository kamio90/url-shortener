/**
 * URL Controller.
 * Handles API requests related to URL shortening, retrieval, updates, and deletion.
 */

import { Request, Response, Router } from 'express';
import { UrlService } from '../application/url.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { UrlModel } from '../domain/url.entity';
import validator from 'validator';

const router = Router();
const urlService = new UrlService();

/**
 * Retrieves all shortened URLs for the authenticated user.
 * @route GET /api/url/my-urls
 * @access Private
 */
router.get('/my-urls', authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const urls = await UrlModel.find({ ownerId: userId });

        res.json({ urls });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});

/**
 * Retrieves statistics for a specific shortened URL.
 * @route GET /api/url/:shortId/stats
 * @access Private
 */
router.get('/:shortId/stats', authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const { shortId } = req.params;
        const userId = (req as any).user.id;

        const urlData = await UrlModel.findOne({ shortId, ownerId: userId });

        if (!urlData) {
            res.status(404).json({ message: 'URL not found or access denied' });
            return;
        }

        res.json({ visitCount: urlData.visitCount, clicks: urlData.clicks });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});

/**
 * Deletes a shortened URL if the authenticated user is the owner.
 * @route DELETE /api/url/:shortId
 * @access Private
 */
router.delete('/:shortId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const { shortId } = req.params;
        const ownerId = (req as any).user.id;

        await urlService.deleteUrl(shortId, ownerId);
        res.status(200).json({ message: 'URL deleted successfully' });
    } catch (error) {
        const err = error as Error;

        if (err.message === 'URL not found') {
            res.status(404).json({ message: err.message });
        } else if (err.message === 'Unauthorized') {
            res.status(403).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
});

/**
 * Updates a shortened URL with a new destination.
 * @route PATCH /api/url/:shortId
 * @access Private
 */
router.patch('/:shortId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const { shortId } = req.params;
        const { newUrl } = req.body;
        const ownerId = (req as any).user.id;

        if (!newUrl) {
            res.status(400).json({ message: 'New URL is required' });
            return;
        }

        const updatedUrl = await urlService.updateUrl(shortId, ownerId, newUrl);
        res.status(200).json({ message: 'URL updated successfully', updatedUrl });
    } catch (error) {
        const err = error as Error;

        if (err.message === 'URL not found') {
            res.status(404).json({ message: err.message });
        } else if (err.message === 'Unauthorized') {
            res.status(403).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
});

/**
 * Redirects to the original URL based on the shortened ID.
 * @route GET /api/url/:shortId
 * @access Public
 */
router.get('/:shortId', async (req: Request, res: Response): Promise<void> => {
    try {
        const { shortId } = req.params;
        const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';

        const urlData = await urlService.getUrl(shortId, ipAddress);

        if (urlData) {
            res.redirect(urlData.originalUrl);
        } else {
            res.status(404).json({ message: 'URL not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});

/**
 * Shortens a URL and returns the shortened version.
 * @route POST /api/url/shorten
 * @access Public / Private (Authenticated users can associate URLs with their account)
 */
router.post('/shorten', async (req: Request, res: Response): Promise<void> => {
    try {
        const { url, customShortId, expiresAt } = req.body;
        const ownerId = (req as any).user?.id || null;

        if (!url || !validator.isURL(url, { require_protocol: true })) {
            res.status(400).json({ message: 'Invalid URL format. Please include http:// or https://' });
            return;
        }

        const shortUrl = await urlService.shortenUrl(url, ownerId, customShortId, expiresAt);
        res.status(201).json({ shortUrl: `http://localhost:3000/api/url/${shortUrl.shortId}` });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export { router as urlRouter };
