/**
 * Swagger API documentation setup.
 * Integrates Swagger with Express to provide an interactive API documentation page.
 */

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {Express} from 'express';

/**
 * Swagger configuration options.
 * Defines API metadata and the location of route documentation.
 */
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'URL Shortener API',
            version: '1.0.0',
            description: 'Documentation for the URL Shortener API',
        },
        servers: [{url: 'http://localhost:3000'}], // Base server URL
    },
    apis: ['src/api/*.ts'], // Location of API route definitions
};

/**
 * Generates the Swagger specification based on defined options.
 */
const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * Sets up Swagger UI middleware in an Express application.
 * @param {Express} app - The Express application instance.
 */
export function setupSwagger(app: Express): void {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('✅ Swagger UI available at: http://localhost:3000/api-docs');
}
