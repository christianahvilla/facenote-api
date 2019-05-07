import * as express from 'express';
import * as http from 'http';
import * as jwtConfig from '../config/middleware/jwtAuth';
import * as swaggerUi from 'swagger-ui-express';
import AuthRouter from './AuthRouter';
import ImageRouter from './ImageRouter';
let swaggerDoc: Object;

try {
    swaggerDoc = require('../../swagger.json');
} catch (error) {
    console.log('***************************************************');
    console.log('  Seems like you doesn\`t have swagger.json file');
    console.log('  Please, run: ');
    console.log('  $ swagger-jsdoc -d swaggerDef.js -o swagger.json');
    console.log('***************************************************');
}

export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    app.use('/image', jwtConfig.isAuthenticated, ImageRouter);
    app.use('/auth', AuthRouter);
    if (swaggerDoc) {
        app.use('/docs', swaggerUi.serve);
        app.get('/docs', swaggerUi.setup(swaggerDoc));
    }
    app.use((req, res, next) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });
    app.use(router);
}
