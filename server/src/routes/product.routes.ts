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

router.get('/', getProducts);
router.post('/', passport.authenticate('jwt', { session: false }), createProducts);
router.delete('/:id', passport.authenticate('jwt, {session: false}'), deleteProducts);
router.get('/:id', getProductById);
router.get('/search/:keywords', searchProducts);

export default router;
