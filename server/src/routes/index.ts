/* eslint-disable import/no-cycle */
import { Router } from 'express';
import authenticationRoutes from './authentication.routes';
import productRoutes from './product.routes';

const routes = (): Router => {
    const router = Router();
    router.use('/api/products', productRoutes);
    router.use('/api', authenticationRoutes);
    return router;
};

export default routes;
