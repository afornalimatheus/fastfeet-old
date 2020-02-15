import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.status(400).json({ msg: 'OK' });
});

export default routes;
