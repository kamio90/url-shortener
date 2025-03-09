import {UrlService} from '../src/application/url.service';
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

describe('UrlService', () => {
    let urlService: UrlService;
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        urlService = new UrlService();
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it('should create a short URL', async () => {
        const url = await urlService.shortenUrl('https://example.com', new mongoose.Types.ObjectId().toString(), 'custom123');
        expect(url).toBeDefined();
        expect(url.shortId).toBe('custom123');
    });

    it('should not allow duplicate shortId', async () => {
        await expect(urlService.shortenUrl('https://example.com', new mongoose.Types.ObjectId().toString(), 'custom123'))
            .rejects.toThrow('This short URL is already taken.');
    });

    it('should return an existing URL', async () => {
        const url = await urlService.getUrl('custom123', '127.0.0.1');
        expect(url).toBeDefined();
        expect(url?.originalUrl).toBe('https://example.com');
    });

    it('should return null for non-existent shortId', async () => {
        const url = await urlService.getUrl('fake123', '127.0.0.1');
        expect(url).toBeNull();
    });
});
