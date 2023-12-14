import express from "express";
import swaggerUi from "swagger-ui-express";
import {readFile} from 'fs/promises';

const swaggerDocument = JSON.parse(
    await readFile(new URL('../swagger.json', import.meta.url))
);

const router = express.Router();


router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

export default router;