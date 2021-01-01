import { Router } from "express";
import productRoutes from './product.routes';

const routes = (): Router => {
    const router = Router();
    router.use('/api/products', productRoutes);
    return router;
}

export default routes;