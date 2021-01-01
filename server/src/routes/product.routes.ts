import { Router } from "express";
import { createProducts, deleteProducts, getProductById, getProducts } from "../controllers/product.controller";

const router = Router();

router.get('/', getProducts);
router.post('/', createProducts);
router.delete('/:id', deleteProducts);
router.get('/:id', getProductById);

export default router;

