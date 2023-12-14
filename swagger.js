import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: '1.0.0',
        title: 'Echo Tracker',
        description: ''
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: ''
        },
    ],
    tags: [],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            },
            none: {}
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

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(options)(outputFile, routes, doc).then(async () => {
    await import('./bin/www.js');
});