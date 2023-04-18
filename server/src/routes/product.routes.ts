import { Router } from 'express';
import passport from 'passport';

import { GenericController } from '../controllers/common';
import { verifyAdmin } from '../middlewares/authenticate';
import Product from '../models/product';
import { IProduct } from '../schemas/product';
import { GenericService } from '../services/common';

const router = Router();
const productService = new GenericService<IProduct>(Product)
const productController = new GenericController<IProduct>(productService);

router.get('/', productController.getAll.bind(productController));
router.get('/:id', productController.getById.bind(productController));

router.use(passport.authenticate('jwt', { session: false }));
router.post('/', verifyAdmin, productController.create.bind(productController));
router.delete('/:id', verifyAdmin, productController.delete.bind(productController));
router.patch('/:id', verifyAdmin, productController.update.bind(productController));

export default router;
