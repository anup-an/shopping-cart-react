import { Router } from 'express';
import {
    createProducts,
    deleteProducts,
    getProductById,
    getProducts,
    searchProducts,
} from '../controllers/product.controller';

const router = Router();

router.get('/', getProducts);
router.post('/', createProducts);
router.delete('/:id', deleteProducts);
router.get('/:id', getProductById);
router.get('/search/:keywords', searchProducts);

export default router;
