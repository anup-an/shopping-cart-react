import { Router } from 'express';
import passport from 'passport';

import { GenericController } from '../controllers/common';
import Product from '../models/product';
import { IProduct } from '../schemas/product';
import { GenericService } from '../services/common';

const router = Router();
const productService = new GenericService<IProduct>(Product)
const productController = new GenericController<IProduct>(productService);

router.get('/', productController.getAll.bind(productController));
router.get('/:id', productController.getById.bind(productController));

router.use(passport.authenticate('jwt', { session: false }));
router.post('/', productController.create.bind(productController));
router.delete('/:id', productController.delete.bind(productController));
router.patch('/:id', productController.update.bind(productController));

export default router;
