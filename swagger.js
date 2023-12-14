import swaggerAutogen from 'swagger-autogen';

const apiDocument = {
    info: {
        version: '1.0.0',
        title: 'Echo Tracker',
        description: ''
    },
    servers: [],
    tags: [],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger.json';
const routes = ['./app.js'];

const options = {
    openapi: '3.0.3',
    language: 'en-US',
    disableLogs: false,
    autoHeaders: true,
    autoQuery: true,
    autoBody: true,
    writeOutputFile: true
};

swaggerAutogen(options)(outputFile, routes, apiDocument).then(async () => {
    await import('./bin/www.js');
});