/* eslint-disable import/no-cycle */
import { Router } from 'express';
import authenticationRoutes from './authentication.routes';
import productRoutes from './product.routes';
import userRoutes from './user.routes';
import orderRoutes from './order.routes';

const routes = (): Router => {
    const router = Router();
    router.use('/api/products', productRoutes);
    router.use('/api', authenticationRoutes);
    router.use('/api/users', userRoutes);
    router.use('/api/orders', orderRoutes)
    return router;
};

export default routes;
