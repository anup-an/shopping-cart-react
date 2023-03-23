/* eslint-disable import/no-cycle */
import { Router } from 'express';
import passport from 'passport';
import ProductSchema, { IProduct } from '../schemas/product';
import { create, deleteById, getAll, getById } from '../controllers/common';

const router = Router();

router.get('/', getAll<IProduct>('products', ProductSchema));
router.get('/:id', getById<IProduct>('products', ProductSchema));

router.use(passport.authenticate('jwt'));
router.post('/', create<IProduct>('products', ProductSchema));
router.delete('/:id', deleteById<IProduct>('products', ProductSchema));

export default router;
