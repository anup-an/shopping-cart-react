/* eslint-disable import/no-cycle */
import { Router } from 'express';
import authenticationRoutes from './authentication.routes';
import productRoutes from './product.routes';
import userRoutes from './user.routes';

const routes = (): Router => {
    const router = Router();
    router.use('/api/products', productRoutes);
    router.use('/api', authenticationRoutes);
    router.use('/api/users', userRoutes);
    return router;
};

export default routes;
