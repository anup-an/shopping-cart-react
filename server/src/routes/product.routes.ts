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
router.get('/:id', getProductById);
router.get('/search/:keywords', searchProducts);

router.use(passport.authenticate('jwt'));
router.post('/', createProducts);
router.delete('/:id', deleteProducts);

export default router;
