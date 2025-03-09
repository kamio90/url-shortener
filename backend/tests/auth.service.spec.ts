import {AuthService} from '../src/application/auth.service';
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import dotenv from 'dotenv';

dotenv.config({path: '.env.test'});


describe('AuthService', () => {
    let authService: AuthService;
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        authService = new AuthService();
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it('should register a new user', async () => {
        const user = await authService.register('test@example.com', 'password123');
        expect(user).toBeDefined();
        expect(user.email).toBe('test@example.com');
    });

    it('should not register an existing user', async () => {
        await expect(authService.register('test@example.com', 'password123'))
            .rejects.toThrow('User already exists');
    });

    it('should login a user with correct credentials', async () => {
        const token = await authService.login('test@example.com', 'password123');
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
    });

    it('should not login with incorrect password', async () => {
        await expect(authService.login('test@example.com', 'wrongpassword'))
            .rejects.toThrow('Invalid email or password');
    });
});
