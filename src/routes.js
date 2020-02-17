import { Router } from 'express';
import SessionController from './app/controllers/SessionController';

const routes = Router();

routes.get('/session', SessionController.store);

export default routes;
