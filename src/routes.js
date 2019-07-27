import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ hello: 'wocasarld' }));

export default routes;
