/* eslint-disable import/no-cycle */
import { Router } from 'express';
import passport from 'passport';
import {
    createProducts,
    deleteProducts,
    getProductById,
    getProducts,
    searchProducts,
} from '../controllers/product.controller';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getProducts);
router.post('/', createProducts);
router.delete('/:id', deleteProducts);
router.get('/:id', getProductById);
router.get('/search/:keywords', searchProducts);

export default router;
