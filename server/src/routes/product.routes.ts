import { Router } from 'express';
import passport from 'passport';

import { create, deleteById, getAll, getById } from '../controllers/common';
import Product from '../models/product';
import { IProduct } from '../schemas/product';

const router = Router();

router.get('/', getAll<IProduct>(Product));
router.get('/:id', getById<IProduct>(Product));

router.use(passport.authenticate('jwt', { session: false }));
router.post('/', create<IProduct>(Product));
router.delete('/:id', deleteById<IProduct>(Product));

export default router;
