import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// Fez um middleware global que serve para as rotas apos o use
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
