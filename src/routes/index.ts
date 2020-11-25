import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'NJ Produções' }));

export default routes;
